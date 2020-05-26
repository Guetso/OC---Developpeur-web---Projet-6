// Contient la logique métier concernant les utilisateurs, à appliquer aux différentes route CRUD (ici uniquement POST)

const bcrypt = require('bcrypt') // On fait appel à bcrypt pour hasher le mot de passe
const jwt = require('jsonwebtoken') // On fait appel à JsonWebToken pour attribuer un TOKEN à un utilisateur quand il se connecte
const User = require('../models/User') // On fait appel à notre modèle 'User'

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      })
      user
        .save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé ! ' }))
        .catch((error) => res.status(400).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' })
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' })
          }
          res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                  { userId: user._id},
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: '24h'}
              )
          })
        })
        .catch((error) => res.status(500).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}
