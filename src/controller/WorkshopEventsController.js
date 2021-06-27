const WorkshopController = require('../schemas/WorkshopEvents');
const Users=require('../schemas/Users')

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

    //
    // const addProposalIdWorkshopEvents = async (req, res) => {
    //     if (req.params && req.params.id) {
    //
    //         const workShop_id = req.params.id;
    //         const proposal_id=req.body.id;
    //
    //      const proposal=   await WorkshopController.findById(req.params.id);
    //      const proposalArray =proposal.work_proposal;
    //         proposalArray.append(proposal_id);
    //
    //         await WorkshopController.findByIdAndUpdate({ _id: workShop_id },
    //             { work_proposal: proposalArray }
    //         );
    //     }

const addProposalIdWorkshopEvents = async (req, res) => {
    if (req.params) {

        const rID = req.body.p;

        console.log("rid:",rID);

        const post = await Conferences.findById(req.body.conferenceID);

        console.log(post);

        await post.con_researchList.push(rID);

        await Conferences.findByIdAndUpdate(req.body.conferenceID,post)
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });

    }
}




module.exports = {
    addWorkshopEvents,
    getAllWorkshopEvents,
    getSpecificWorkshopEvent,
    editWorkshopEvents,
    deleteWorkshopEvents,
    addProposalIdWorkshopEvents
};
