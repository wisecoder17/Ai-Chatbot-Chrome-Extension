const router = require('express').Router();
const Intro  = require('../models/user');

router.get('/get-data', async (req, res) => {

    try {
        const intros = await Intro.find();

        res.status(200).send({
            intro: intros
            
        });


    } catch (error) {
        res.status(500).send(error);
    }
})
module.exports = router;