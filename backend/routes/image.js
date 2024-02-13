const express = require("express");
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Image = require('../models/Image');
const { body, validationResult } = require('express-validator');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');



//Route 1:get all images of user logged in 
router.get('/fetchallimages', fetchuser, async (req, res) => {
    try {
        const images = await Image.find({ user: req.user.id });
        res.json(images)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal error occured")
    }

})

//Route 2:add all images using post of user logged in 





router.post('/addimage', upload.single('image'), fetchuser, async (req, res) => {

    try {
        console.log(req.file);
        const result = await cloudinary.uploader.upload(req.file.path,{folder: 'blinkit', transformation: [{ width: 500, height: 500, crop: 'fill' }]});
        console.log(result);
        const cloudinaryurl = result.url;
        const saveImage = new Image({
            title: req.body.title,
            url: cloudinaryurl,
            tag: req.body.tag,
            user: req.user.id
        })
        const savedImage = await saveImage.save();
        res.json(savedImage)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal error occured")
    }
})

//Route 3:update  notes using put of user logged in using id of the note
router.put('/updatenote/:id', fetchuser,
    async (req, res) => {
        try {
            const { title, url, tag } = req.body;
            const newNote = {}
            if (title) {
                newNote.title = title
            }
            if (url) {
                newNote.url = url
            }
            if (tag) {
                newNote.tag = tag
            }
            //find note to be updated and update
            let note = await Image.findById(req.params.id);
            if (!note) {
                return res.status(404).send("Not Found")
            }
            // console.log(req.params.id,note.user)
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not allowed")
            }

            //now update the note with newNote

            note = await Image.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.json({ note })
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Internal error occured")
        }


    })

//Route 3:delete  note using put of user logged in using id of the note
router.delete('/deleteimages/:id', fetchuser,
    async (req, res) => {

        try {
            let image = await Image.findById(req.params.id);
            if (!image) {
                return res.status(404).send("Not Found")
            }
            if (image.user.toString() !== req.user.id) {
                return res.status(401).send("Not allowed")
            }
            // console.log(req.params.id,note.user)


            //now update the note with newNote

            image = await Image.findByIdAndDelete(req.params.id)
            res.json({ "Success": "Image has been delete", image: image })

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Internal error occured")
        }
        //find note to be deleted and delete it

    })

module.exports = router