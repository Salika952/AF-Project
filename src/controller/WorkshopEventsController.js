const WorkshopController = require('../schemas/WorkshopEvents');
const Users=require('../schemas/Users');
const nodemailer = require("nodemailer");



const addWorkshopEvents = async (req, res) => {
    if (req.body) {
        const workshop = new WorkshopController(req.body);
        if(req.file){
            WorkshopController.pdf =req.file.path
        }
        await workshop.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllWorkshopEvents = async (req, res) => {

    await WorkshopController.find()
        .populate('work_conductors', 'user_name user_telephone')
        .populate('work_proposal', 'propo_content propo_contact propo_sign')
        .then(data => {
            res.status(200).send({ data: data });
            console.log(data);
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}


const getSpecificWorkshopEvent = async (req, res) => {
    if (req.params && req.params.id) {
        await WorkshopController.findById(req.params.id)
            .populate('work_conductors', 'user_name user_telephone')
            .populate('work_proposal', 'propo_content propo_contact propo_sign')
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const editWorkshopEvents = async (req, res) => {
    if (req.params && req.params.id) {

        const updated = req.body;

        await WorkshopController.findByIdAndUpdate(req.params.id,updated)
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const deleteWorkshopEvents = async (req, res) => {
    if (req.params && req.params.id) {

        await WorkshopController.findByIdAndDelete(req.params.id)
            .then(response => {
                res.status(200).send({data: response});
            })
            .catch(error => {
                res.status(500).send({error: error.message});
            });
    }
}


const addProposalIdWorkshopEvents = async (req, res) => {
    if (req.params) {

        const pID = req.body.proposalsID;
        const wID=req.body.workshopID;

        console.log("pID:",pID);

        const post = await WorkshopController.findById(wID);

        console.log(post.work_proposal);
        await post.work_proposal.push(pID);

        await WorkshopController.findByIdAndUpdate(wID,post)
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });

    }
}


const MailSend = async (req, res) => {

    try {
        let status = req.body.status;

        var transporter = nodemailer.createTransport({

            service: 'Gmail',
            auth: {
                user: 'hugoproducts119@gmail.com',
                pass: '123hugo@12'
            },

            // tls: {
            //     rejectUnauthorized: false
            // },
        });

        var mailOptions = {

            from: 'hugoproducts119@gmail.com',
            to: 'salikamadhushanka33@gmail.com',
            subject: 'AF Conference Company',
            html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; color: black;">${status}.</h2>
            </div>`
        };

        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        // res.status(200).json({auth_token: 'token'})
    } catch (e) {
        console.log(e.message);
        return res.status(500).json({msg: "server Error..."});
    }
}


module.exports = {
    addWorkshopEvents,
    getAllWorkshopEvents,
    getSpecificWorkshopEvent,
    editWorkshopEvents,
    deleteWorkshopEvents,
    addProposalIdWorkshopEvents,
    MailSend
};
