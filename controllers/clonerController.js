const multer = require('multer');
const fs = require('fs');
const Cloner = require("../models/clonerModel");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/cloners');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const clonerController = {};
clonerController.upload = multer({ storage: storage });

clonerController.create = async (name, serialNumber, md5) => {
    try {
        const isClonerUpToDate = await Cloner.findOne({md5: md5});
        if (isClonerUpToDate) throw new Error("Cloner already up to date");
        const isClonerExist = await Cloner.findOne({serialNumber: serialNumber});
        if (isClonerExist){
            const updatedCloner = await Cloner.findOneAndUpdate({serialNumber: serialNumber}, {md5: md5}, {new: true});
            return updatedCloner;
        }
        // New Cloner
        const cloner = new Cloner({ name, serialNumber, md5 });
        await cloner.save();
        return cloner;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = clonerController;
