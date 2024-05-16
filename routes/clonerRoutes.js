const express = require('express');
const router = express.Router();

const {upload,create} = require('../controllers/clonerController');

const archiver = require('archiver');
router.post('/upload', upload.single('cloner'), async (req, res) => {
    try {
        const { name, serialNumber, md5 } = req.body;
        const cloner = await create(name, serialNumber, md5);
        res.status(201).json({"status": "success", cloner: cloner});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
