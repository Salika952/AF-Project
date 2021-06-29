const Paper = require('../schemas/Papers');
const nodemailer = require("nodemailer");
const http = require("http");
const fs = require("fs");


const addPaper = async (req, res) => {
    if (req.body) {
        const paper = new Paper(req.body);
        if(req.file){
            paper.pdf =req.file.path
        }
        await paper.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }

    // let paper = new Paper({
    //     auther: req.body.paper_author,
    //     content: req.body.paper_content,
    //     contact: req.body.paper_contact,
    //     sign: req.body.paper_sign
    // })
    //
    // if(req.file){
    //             paper.avatar =req.file.path
    //         }
    //
    // paper.save()
    //     .then(data => {
    //                     res.status(200).send({ data: data });
    //                 })
    //                 .catch(error => {
    //                     res.status(500).send({ error: error.message });
    //                 });

}

const getAllPapers = async (req, res) => {

    await Paper.find().populate('paper_author', 'user_name user_email user_telephone user_address user_position user_password')
        .then(data => {
            res.status(200).send({ data: data });
            console.log(data);
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getSpecificPaper = async (req, res) => {
    if (req.params && req.params.id) {

        await Paper.findById(req.params.id)
            .populate('paper_author', 'user_name')
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getSpecificPaperId = async (req, res) => {
    if (req.params && req.params.id) {

        await Paper.findOne({paper_author})
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}


const editPaper = async (req, res) => {
    if (req.params && req.params.id) {

        const updated = req.body;

        await Paper.findByIdAndUpdate(req.params.id,updated)
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const deletePaper = async (req, res) => {
    if (req.params && req.params.id) {

        await Paper.findByIdAndDelete(req.params.id)
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
        let mail = req.body.status;
        let id = req.body.id;

        var transporter = nodemailer.createTransport({

            service: 'Gmail',
            auth: {
                user: 'hugoproducts119@gmail.com',
                pass: '123hugo@12'
            },

            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false
            },
        });

        var mailOptions = {

            from: 'hugoproducts119@gmail.com',
            to: mail,
            subject: 'AF Conference Company',
            html: `
             <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">AF Conference 2021</h2>
            <h2>Paper Accepted!</h2>
            <p>Use the Following Link to access the Website </p>
            <p>http://localhost:1234/userSpecfPaper/${id}</p>
            </div>`


        };

        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(200).json({auth_token: 'token'})
    } catch (e) {
        console.log(e.message);
        return res.status(500).json({msg: "server Error..."});
    }
}


const downloadPaper = async (req, res) => {

    res.download(__dirname + '/uploadFolder/file.png','file.png');
}



module.exports = {
    addPaper,
    getAllPapers,
    getSpecificPaper,
    getSpecificPaperId,
    editPaper,
    deletePaper,
    MailSend,
    downloadPaper,
};