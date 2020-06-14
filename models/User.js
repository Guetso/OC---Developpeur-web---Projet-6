const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator') //Plugin Mongoose nécessaire dans le cas d'un champ unique

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

userSchema.plugin(uniqueValidator) // On lui passe le plugin avant d'exporter le modèle

module.exports = mongoose.model('User', userSchema)
