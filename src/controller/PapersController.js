const Paper = require('../schemas/Papers');

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




module.exports = {
    addPaper,
    getAllPapers,
    getSpecificPaper,
    editPaper,
    deletePaper

};

