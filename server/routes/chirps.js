const express = require('express');
// pulls in express JS - rquire acts  like import/form
const chirpStore = require('../chirpstore');
// adds `GET`, `POST`, `PUT`, `DELETE` methods on a router that is created in `chirps.js`.

let router = express.Router();
// let id = req.params.id; REQ is not definesd this way

// grouped router 
// router.get("/:id?", (req, res) => {
//     const id = req.params.id;
//     if (id !== undefined) {
//         if (!id || id < 1) {
//             res.status(400).json({ message: 'Error -  Id code is not acceptable, please use positive number' })
//             return
//         }
//         res.status(200).json({
//             data: chirpStore.GetChirp(id),
//             message: 'chirps if echo, id =' + id
//         });
//     } else {
//         res.status(200).json({
//             data: chirpStore.GetChirps(),
//             message: 'api/chirps else echo has no id'
//         });
//     }
// });

router.get('/', (req, res) => {
    const orgChirps = chirpStore.GetChirps();
    delete orgChirps.nextid;
    const chirpIDs = Object.keys(orgChirps);

    const cleanChirp = chirpIDs.reverse().map((id) => {
        return {
            id,
            ...orgChirps[id]
        }
    });

    res.status(200).json({
    result: cleanChirp,
    message: 'api/chirps else echo has no id'
});
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    if (id !== undefined) {
        if (!id || id < 1) {
            res.status(400).json({ message: 'Error -  Id code is not acceptable, please use positive number' })
            return
        }
    }
    res.status(200).json({
        result: chirpStore.GetChirp(id),
        message: 'chirps if echo, id =' + id
    })
});
//  END split
router.post('/', (req, res) => {
    const { user, text } = req.body

    if (!user || !text || typeof user !== "string" || typeof text !== "string" || user.length > 32 || text.length > 280) {
        res.status(400).json({ message: "User/Text is either missing, not a string data type, or your username/text vaules is to long (32/280) " })
        return
    }

    chirpStore.CreateChirp({ user, text });
    res.status(201).json({ message: 'Successful posted a new new chirp! 201 == create' })
});

router.put('/:id', (req, res) => {
    // DATA VALIDATION
    let id = parseInt(req.params.id);
    //  use Number or parseInt -> parseInt forces the id it be a number value
    const { user, text } = req.body
    // deconstrucs and pick out what you want from the request values
    if (!id) {
        res.status(400).json({ message: 'Error -  Id code is not acceptable, please use positive number' })
        return
    }
    // checks if the id is positive number and prsent
    if (!user || !text || typeof user !== "string" || typeof text !== "string" || user.length > 32 || text.length > 280) {
        res.status(400).json({ message: "User/Text is either missing, not a string data type, or your username/text vaules is to long (32/280) " })
        return
    }

    chirpStore.UpdateChirp(id, { user, text })
    res.status(201).json({ message: "success on the put request" });
    // res.sendStatus(200); - ready build int
});

router.delete('/:id', (req, res) => {
    let id = parseInt(req.params.id);
    if (!id) {
        res.status(400).json({ message: 'Error -  Id code is not acceptable, please use positive number' })
        return
    }
    chirpStore.DeleteChirp(id);
    res.status(200).json({ message: `Successful delete of chirp ${id}` });

})

module.exports = router;

// res.json - prefered send for single and multiply
// res.send -
// res,sendStatus