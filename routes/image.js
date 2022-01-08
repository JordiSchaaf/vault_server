const image = require('../middleware/upload-image')
const express = require('express')
const Grid = require('gridfs-stream')
const mongoose = require('mongoose')
const logger = require('../utils/logger')

const router = express.Router()

let gfs

mongoose.connection.once('open', () => {
    gfs = Grid(mongoose.connection.db, mongoose.mongo)
    gfs.collection("images")
})

router.get("/:filename", async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename })
        const readStream = gfs.createReadStream(file.filename)
        readStream.pipe(res)
    } catch (err) {
        res.status(404).json("Image was not found")
    }
})

router.post("/upload", image.single("file"), async (req, res) => {
    if (req.file === undefined) return res.send("Please select a file")
    return res.status(202).json({
        imgUrl: req.file.filename,
        imgId: req.file.id
    })
})

router.delete("/:filename", async (req, res) => {
    try {
        await gfs.files.deleteOne({ filename: req.params.filename })
        res.status(200).json("Image deleted")
    } catch (err) {
        logger.error(err)
        res.status(500).json("An error occured")
    }
})

module.exports = router