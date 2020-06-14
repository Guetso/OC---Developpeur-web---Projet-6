// L'application en elle même qui va faire appelle aux différentes fonctions implémentées dans l'APi : Accès aux images, aux route User, aux route Sauces

const express = require('express')
const bodyParser = require('body-parser') // Pour faciliter le traitement des données contenues dans le corp de la reqûete, le transformant en objet JSON
const mongoose = require('mongoose') // L'interface pour communiquer avec la BDD
const mongooseConfig= require('./config/mongoose.config')
const path = require ('path') // Pour le middleware express static pour acceder au chemin du système de fichier

const sauceRoutes = require('./routes/sauce')
const userRoutes = require('./routes/user')

mongoose
  .connect(
    `mongodb+srv://${mongooseConfig.id}:${mongooseConfig.pwd}@cluster0-uzjno.mongodb.net/piquante?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*') // On donne l'accès à toute origine '*'
  res.setHeader(
    'Access-Control-Allow-Headers', // On donne l'autorisation d'utiliser ces headers sur l'objet réponse
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods', // On donne l'autorisation d'utiliser ces actions aux réponse
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  next()
})

app.use(bodyParser.json()) 

app.use('/images', express.static(path.join(__dirname, 'images'))) //Va permettre à l'app de servir le dossier contenant les images, pour le middleware multer

app.use('/api/sauces', sauceRoutes)
app.use('/api/auth', userRoutes)

module.exports = app // L'application est exporté pour être 'servi' par le serveur
