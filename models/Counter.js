const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const counterSchema = mongoose.Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

module.exports = mongoose.model('Counter', counterSchema)