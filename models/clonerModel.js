const mongoose = require('mongoose');

const clonerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    serialNumber: {type: String, required:true, unique: true},
    md5: { type: String, required: true },
}, { timestamps: true });

const Cloner = mongoose.model('Cloner', clonerSchema);

module.exports = Cloner;
