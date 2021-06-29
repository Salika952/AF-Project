const Payment = require('../schemas/Payment');
const nodemailer = require("nodemailer");

const addPayment = async (req, res) => {
    if (req.body) {
        const payment = new Payment(req.body);

        const {pay_creditCardNo,pay_email,pay_amount} = req.body

        let CN = await Payment.findOne({pay_creditCardNo})
        let mail = await Payment.findOne({pay_email})
        let amount = await Payment.findOne({pay_amount})

        var transporter = nodemailer.createTransport({

            service: 'Gmail',
            auth: {
                user: 'hugoproducts119@gmail.com',
                pass: '123hugo@12'
            }
        });

        var mailOptions = {

            from: 'hugoproducts119@gmail.com',
            to: pay_email,
            subject: 'AF Conference Company',
            html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">AF Conference 2021</h2>
            <h2>Payment Completed!</h2>
            <h4>Credit CardNo : ${pay_creditCardNo} <br>
            Amount : ${pay_amount}</h4>
            <p style="background: gold">Your are select the </p>
            <p>if the button is not working, please select the link below:</p>
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

        await payment.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });


    }
}


const addPaymentMail = async (req, res) => {
    if (req.body) {
        const payment = new Payment(req.body);

        const {pay_email} = req.body

        let mail = await Payment.findOne({pay_email})


        var transporter = nodemailer.createTransport({

            service: 'Gmail',
            auth: {
                user: 'hugoproducts119@gmail.com',
                pass: '123hugo@12'
            }
        });

        var mailOptions = {

            from: 'hugoproducts119@gmail.com',
            to: pay_email,
            subject: 'AF',
            html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">AF Conference 2021</h2>
            <h2>Payment Completed!</h2>
            <h4>Credit CardNo :<br>
            Amount : </h4>
            <p style="background: gold">Your are select the </p>
            <p>if the button is not working, please select the link below:</p>
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


    }
}

const getAllPayment = async (req, res) => {

    await Payment.find().populate('pay_users', 'user_name user_email user_telephone user_address user_position user_password')
        .then(data => {
            res.status(200).send({ data: data });
            console.log(data);
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getSpecificPayment = async (req, res) => {
    if (req.params && req.params.id) {
        await Payment.findById(req.params.id)
            .populate('pay_users', 'user_name')
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}
const editPayment = async (req, res) => {
    if (req.params && req.params.id) {

        const updated = req.body;

        await Payment.findByIdAndUpdate(req.params.id,updated)
            .populate('pay_users', 'user_name')
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}


const deletePayment = async (req, res) => {
    if (req.params && req.params.id) {

        await Payment.findByIdAndDelete(req.params.id)
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}


const calculateAmount = async (req, res) => {


    if (req.params && req.params.id) {
        const course = await Payment.findById(req.params.id)
        let amount = course.pay_amount;
        console.log("amount");

        res.status(200).send({ amount: amount });


    }


}


const MailSend = async (req, res) => {

    try {
        let mail = req.body.status;

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
            <h2>Payment Accepted!</h2>
            <p>Use the Following Link to access the Website</p>
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


// const adminAddUsers = async (req, res) => {
//     try {
//
//         let user = await Payment.findOne({pay_email});
//
//
//         var transporter = nodemailer.createTransport({
//
//             service: 'Gmail',
//             auth: {
//                 user: 'hugoproducts119@gmail.com',
//                 pass: '123hugo@12'
//             }
//         });
//
//         var mailOptions = {
//
//             from: 'hugoproducts119@gmail.com',
//             to: pay_email,
//             subject: 'AF Conference Company',
//             html: `
//             <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
//             <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to Conference 2021.</h2>
//             <h1>Congratulations! Conference 2021.
//             </h1>
//             <p style="background: gold">Your are select the ${user_position}</p>
//             <p>if the button is not working, please select the link below:</p>
//
//             </div>
//         `
//         };
//
//         await transporter.sendMail(mailOptions, function (error, info) {
//             if (error) {
//                 console.log(error);
//             } else {
//                 console.log('Email sent: ' + info.response);
//             }
//         });
//
//
//     } catch (e) {
//         console.log(e.message);
//         return res.status(500).json({msg: "server Error..."});
//     }
// }


module.exports = {
    addPayment,
    getAllPayment,
    getSpecificPayment,
    editPayment,
    calculateAmount,
    deletePayment,
    addPaymentMail,
    MailSend
};