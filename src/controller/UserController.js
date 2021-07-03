const UserSchema =require('../schemas/Users');
const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken');
const EmailSend =require('./EmailSend')
const nodemailer = require("nodemailer");
const {CLIENT_URL} = process.env

const addUsers= async (req, res) => {
    try {
        const {user_name, user_email, user_telephone, user_address, user_password} = req.body

        if (!user_name || !user_email || !user_telephone || !user_address || !user_password)
            return res.status(400).json({alert: "Please enter fill in fields"})

        if (!validateEmail(user_email)) {
            return res.status(400).json({alert: "Please enter Correct Email"})
        }
        const userCheckEmail = await UserSchema.findOne({user_email})

        if(userCheckEmail){
            return res.status(400).json({alert: "There is a already uses this email"});
        }
        if (user_password.length < 3) {
            return res.status(400).json({alert: "Password  at least 3 characters"});
        }

        const passwordHash = await bcrypt.hash(user_password, 12);

        const newUser = {
            user_name,
            user_email,
            user_telephone,
            user_address,
            user_password: passwordHash
        }

        const authToken = ActivationToken(newUser);

        const url = `${CLIENT_URL}/users/activate/${authToken}`
        EmailSend(user_email, url,"Verify Email Button");

        res.json({msg: "Register SuccessFull...!"});
    } catch (err) {
        return res.status(500).json({alert: "Server Error..."});
    }
}


const UserActiveEmail= async (req, res) => {
    try {
        const {auth_token} = req.body
        const user = jwt.verify(auth_token, process.env.JWT_SECRET)

        const { user_name, user_email, user_telephone, user_address, user_password} = user

        const userCheckEmail = await UserSchema.findOne({user_email})

        if(userCheckEmail){
            return res.status(400).json({alert: "There is a already uses this email"});
        }

        const newUser = new UserSchema({
            user_name,
            user_email,
            user_telephone,
            user_address,
            user_password
        })
        await newUser.save()

        res.json({msg: "Account activate"})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}


const loginUser = async (req, res)=>{
    try{
        const {user_email,user_password} =req.body;

        if(!user_email || !user_password){
            return  res.status(400).json({errormessage:"please enter all required fields"});
        }

        const user =await UserSchema.findOne({user_email});
        if(!user){
            return res.status(400).json({errormessage:"already use the email"});
        }

        const passwordMatch = await bcrypt.compare(user_password, user.user_password);


        if(passwordMatch){

            const payload = {
                user: {
                    id: user.id
                }
            };
            const token = ActivationToken(payload);
            res.json({token:token});

        } else return res.status(401).json({msg:"Password is not Matching "})
    }catch (e){
        console.log(e.message);
        return res.status(500).json({alert:"server Error"});
    }
}


const getSpecificUser = async (req,res) =>{
    try {
        const user = await UserSchema.findById(req.user.id).select('-user_password')

        res.json(user)
    }catch (e) {
        console.log(e.message);
        return res.status(500).json({alert:"server Error"});
    }
}


const getSpecificAdminUsers = async (req, res) => {
    try {
        if (req.params && req.params.id) {
            await UserSchema.findById(req.params.id)
                .then(response => {
                    res.status(200).send({data: response});
                })
                .catch(error => {
                    res.status(500).send({error: error.message});
                });
        }
    }catch (e){
        console.log(e.message);
        return res.status(500).json({msg:"server Error..."});
    }
}


const adminAddUsers = async (req, res) => {
    try {
        let {user_name, user_email, user_telephone, user_address, user_position, password} = req.body;
        let user = await UserSchema.findOne({user_email});

        if (user) {
            return res.status(400).json({alert: "There is a already uses this email"});
        }
        //hash the password
        const salt = await bcrypt.genSalt();
        const user_password = await bcrypt.hash(password, salt);

        const admin_user = new UserSchema({
            user_name,
            user_email,
            user_telephone,
            user_address,
            user_position,
            user_password
        });

        await admin_user.save();
        const payload = {
            admin_user: {
                id: admin_user.id
            }
        }

        const authToken = ActivationToken(payload);

        var transporter = nodemailer.createTransport({

            service: 'Gmail',
            auth: {
                user: 'hugoproducts119@gmail.com',
                pass: '123hugo@12'
            }
        });

        var mailOptions = {

            from: 'hugoproducts119@gmail.com',
            to: user_email,
            subject: 'AF Conference Company',
            html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to Conference 2021.</h2>
            <h1>Congratulations! Conference 2021.
            </h1>
            <p style="background: gold">Your are select the ${user_position}</p>           
            <p>if the button is not working, please select the link below:</p>
            <a href="${authToken}"></a>
            </div>
        `
        };

        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(200).json({auth_token: authToken})
    } catch (e) {
        console.log(e.message);
        return res.status(500).json({msg: "server Error..."});
    }
}


const forgotPassword = async (req, res)=>{
    try{
        const {user_email} = req.body;

        const user =await UserSchema.findOne({user_email});
        if(!user){
            return res.status(400).json({errormessage:"already use the email"});
        }

        const access_jwt_token  = ActivationToken({id:user._id});

        const url =`${CLIENT_URL}/users/reset_password/${access_jwt_token}`

        EmailSend(user_email,url,"Reset Your Password");

        res.status(200).json({alert:"please check the email"});

    }catch (e){
        console.log(e.message);
        return res.status(500).json({alert:"server Error"});
    }
}


const resetPassword = async (req, res)=>{
    try{
        const {user_password}= req.body;

        const passwordHash = await bcrypt.hash(user_password,12)

        await UserSchema.findOneAndUpdate({_id:req.user.id},{
            user_password:passwordHash
        });
        res.status(200).json({alert:"Password Reset Successful"})
    }catch (e){
        console.log(e.message);
        return res.status(500).json({alert:"server Error"});
    }
}


const getUserAll =async (req,res)=>{
    try{
        const users = await UserSchema.find().select('-user_password')

        res.json(users)
    }catch (e){
        console.log(e.message);
        return res.status(500).json({alert:"server Error"});
    }
}


const updateProfile = async (req,res)=>{
    try{
        const {user_name,user_address,user_telephone,user_imageUrl} =req.body
        await UserSchema.findOneAndUpdate({_id:req.user.id},{
            user_name,user_address,user_telephone,user_imageUrl
        })
        res.status(200).json({alert:"update Successful"})
    }catch (e){
        console.log(e.message);
        return res.status(500).json({alert:"server Error"});
    }
}


const updateAdminUser = async (req, res) => {
    if (req.params && req.params.id) {
        UserSchema.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body
            },
            (err)=>{
                if(err){
                    return res.status(400).json({error:err});
                }
                return res.status(200).json({success:"Update Successfully"});
            }
        )

    }
}
const deleteUsers = async (req, res) => {
    if (req.params && req.params.id) {
        console.log(req.params.id);
        await UserSchema.findByIdAndDelete(req.params.id)
            .then(() => res.json('User Deleted Successful!'))
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}
const ActivationToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:'20m'})
}
function validateEmail(user_email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(user_email).toLowerCase());
}

module.exports = {
    addUsers,
    loginUser,
    getSpecificUser,
    UserActiveEmail,
    adminAddUsers,
    forgotPassword,
    resetPassword,
    updateProfile,
    deleteUsers,
    getUserAll,
    updateAdminUser,
    getSpecificAdminUsers
}
