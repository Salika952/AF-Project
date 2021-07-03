const Proposal = require('../schemas/Proposals');



const addProposal = async (req, res) => {
    if (req.body) {
        const proposal = new Proposal(req.body);
        if(req.file){
            Proposal.pdf =req.file.path
        }
        await proposal.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}


const getAllProposal = async (req, res) => {

    await Proposal.find().populate('propo_author', 'user_name user_telephone')
        .then(data => {
            res.status(200).send({ data: data });
            console.log(data);
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getSpecificProposal = async (req, res) => {
    if (req.params && req.params.id) {
        await Proposal.findById(req.params.id)
            .populate('propo_author', 'user_name user_telephone')
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const editProposal = async (req, res) => {
    if (req.params && req.params.id) {

        const updated = req.body;

        await Proposal.findByIdAndUpdate(req.params.id,updated)
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const deleteProposal = async (req, res) => {
    if (req.params && req.params.id) {

        await Proposal.findByIdAndDelete(req.params.id)
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const addProposalIdEvents = async (req, res) => {
    if (req.params) {

        const userID = req.body.userID;
        const pID=req.body.proposalID;

        console.log("pID:",pID);
        console.log("UID:",userID);
        const post = await Proposal.findById(pID);

        console.log(post.propo_author);
        await post.propo_author.push(userID);

        console.log(post.propo_author);
        await Proposal.findByIdAndUpdate(pID,post)
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });

    }
}


module.exports = {
    addProposal,
    getAllProposal,
    getSpecificProposal,
    editProposal,
    deleteProposal,
    addProposalIdEvents
};
