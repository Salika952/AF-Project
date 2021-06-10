const UserSchema = require('../schemas/Users');
const {validationResult} = require ('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");


const getSpecificUser = async (req, res) => {
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


const getAllUsers = async (req, res) => {
    await UserSchema.find()
        .then(data => {
            res.status(200).send({ data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const editUsers = async (req, res) => {
    if (req.params && req.params.id) {
        UserSchema.findByIdAndUpdate(req.params.id)
            .then(user => {
                user.user_name = req.body.user_name;
                user.user_email = req.body.user_email;
                user.user_telephone = req.body.user_telephone;
                user.user_address = req.body.user_address;
                user.user_password = req.body.user_password;

                user.save()
                    .then(() => res.json('User Updated!'))
                    .catch(err => res.status(400).json('Error is: ' + err));
            })
            .catch(err => res.status(400).json('Error is:' + err));
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

const addUsers = async (req, res) => {
    try{
        let { user_name, user_email, user_telephone, user_address, password } = req.body;
        const user_position = "user";
        let user = await UserSchema.findOne({ user_email });
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        if(user){
            return res.status(400).json({alert: "There is a already uses this email"});
        }
        //hash the password
        const salt=await bcrypt.genSalt();
        const user_password=await bcrypt.hash(password,salt);
        console.log(user_password);

        user = new UserSchema({
            user_name,
            user_email,
            user_telephone,
            user_address,
            user_position,
            user_password
        });

         await user.save()
             .then(() => res.json('User added Successful'))
            .catch(err => res.status(400).json('Error: ' + err));

    }catch (e) {
        console.log(e.message);
        return res.status(500).json({msg:"server Error..."});
    }
}

const adminAddUsers = async (req, res) => {
    try{
        let { user_name, user_email, user_telephone, user_address, user_position, password} = req.body;
        let user = await UserSchema.findOne({ user_email });
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        if(user){
            return res.status(400).json({alert: "There is a already uses this email"});
        }
        //hash the password
        const salt=await bcrypt.genSalt();
        const user_password=await bcrypt.hash(password,salt);

        user = new UserSchema({
            user_name,
            user_email,
            user_telephone,
            user_address,
            user_position,
            user_password
        });

        await user.save()
         .then(() => res.json('User added Successful'))
         .catch(err => res.status(400).json('Error: ' + err));

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
            text: 'sending the admin message. You are ' + user_position
        };

        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return res.status(200).json({token:token});
    }catch (e) {
        console.log(e.message);
        return res.status(500).json({msg:"server Error..."});
    }
}

const loginUser =async (req,res)=>{
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
            return res.status(200).json({message:"Login successfully"});

        } else
            return res.status(401).json({msg:"Password is not Matching "})

    }catch (e){
         console.log(e.message);
         return res.status(500).json({alert:"server Error"});
    }
}

module.exports = {
    addUsers,
    getSpecificUser,
    getAllUsers,
    editUsers,
    deleteUsers,
    loginUser,
    adminAddUsers
}
