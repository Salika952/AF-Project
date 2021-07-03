const Conferences = require('../schemas/Conferences');
const NotifySchema = require('../schemas/Notification');
const Paper = require('../schemas/Papers');
const Payment = require('../schemas/Payment');
const Proposal = require('../schemas/Proposals');
const ResearchEvents = require('../schemas/ResearchEvents');
const UserSchema =require('../schemas/Users');
const WorkshopController = require('../schemas/WorkshopEvents');

const calculateAmount = async (req, res) => {

    const conference = await Conferences.find()
    const notify = await NotifySchema.find()
    const paper = await Paper.find()
    const payment = await Payment.find()
    const proposal = await Proposal.find()
    const research = await ResearchEvents.find()
    const users = await UserSchema.find()
    const workshop = await WorkshopController.find()

    let totalConference =0
    let Notification =0
    let Papers =0
    let ProposalCount =0
    let researChcount =0
    let UsersCount =0
    let WorkshopCount =0
    let PaymentCount =0


    if (conference.length > 0) {
        conference.map(() => {
            totalConference +=1
        });
    }

    if (notify.length > 0) {
        notify.map(() => {
            Notification +=1
        });
    }

    if (paper.length > 0) {
        paper.map(() => {
            Papers +=1
        });
    }
    if (payment.length > 0) {
        payment.map(() => {
            PaymentCount +=1
        });
    }
    if (proposal.length > 0) {
        proposal.map(() => {
            ProposalCount +=1
        });
    }
    if (research.length > 0) {
        research.map(() => {
            researChcount +=1
        });
    }
    if (users.length > 0) {
        users.map(() => {
            UsersCount +=1
        });
    }
    if (workshop.length > 0) {
        workshop.map(() => {
            WorkshopCount +=1
        });
    }

    let data = {totalConference: totalConference,
        Notification: Notification,
        Papers:Papers,
        ProposalCount:ProposalCount,
        researChcount:researChcount,
        UsersCount:UsersCount,
        WorkshopCount:WorkshopCount,
        PaymentCount:PaymentCount}

    res.status(200).json({data:data});

}
module.exports = {
    calculateAmount
}
