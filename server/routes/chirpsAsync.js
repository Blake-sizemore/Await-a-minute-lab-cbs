const express = require('express');
const chirpStoreAsync = require('../chirpstoreAsync')

let router = express.Router();

router.get('/:id?', async (req, res) => {
    // ? means optional
    let id = req.params.id;
    if (id) {
        try {
            const chirp = await chirpStoreAsync.GetChirp(id);
            res.status(200).json({ message: 'success on GET id' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error })
        }
    } else {
        try {
            const chirpsAll = await chirpStoreAsync.GetChirps();
            res.status(200).json({ message: 'success on GET all' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error })
        }
    }
})

router.post('/', async (req, res) => {
    try {
        let chirpPost = await chirpStoreAsync.CreateChirp(req.body);
        res.status(200).json({ message: "success on the POST" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
})

router.put('/:id', async (req, res) => {
    // no  ? means must have
    try {
        let id = req.params.id;
        let chirpPut = await chirpStoreAsync.UpdateChirp(id, req.body);
        res.status(200).json({ message: "success on the PUT" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
})

router.delete("/:id?", async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        if (!id || id < 1) {
            res.status(400).json({ message: 'Error -  Id code is not acceptable, please use positive number' })
            return
        }
        chirpStore.DeleteChirp(id);
        res.status(200).json({ message: `Successful delete of chirp ${id}` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
})

module.exports = router;