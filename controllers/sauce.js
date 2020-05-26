// Contient la logique métier concernant les sauces, à appliquer aux différentes route CRUD

const Sauce = require('../models/Sauce') // On récupère le modèle' Sauce'
const fs = require('fs') // On récupère le module 'file system' de Node

exports.createSauce = (req, res, next) => { // Pour la route POST
  const sauceObject = JSON.parse(req.body.sauce)
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`,
  })
  sauce
    .save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
    .catch((error) => res.status(400).json({ error }))
}

exports.modifySauce = (req, res, next) => { // Pour la route PUT
  let sauceObject = 0

  if (req.file) { // Si la modification contient une image
    Sauce.findOne({ _id: req.params.id }).then((sauce) => { // On supprime l'ancienne image du serveur
      const filename = sauce.imageUrl.split('/images/')[1]
      fs.unlinkSync(`images/${filename}`)
    })
    sauceObject = { // On ajoute la nouvelle image
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`,
    }
  } else { // Si la modification ne contient pas de nouvelle image
    sauceObject = { ...req.body }
  }

  Sauce.updateOne( // On applique les paramètre de sauceObject
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
    .catch((error) => res.status(400).json({ error }))
}

exports.deleteSauce = (req, res, next) => { // Pour la route DELETE
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split('/images/')[1]
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
          .catch((error) => res.status(400).json({ error }))
      })
    })
    .catch((error) => res.status(500).json({ error }))
}

exports.getOneSauce = (req, res, next) => { // Pour la route READ d'une sauce
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }))
}

exports.getAllSauce = (req, res, next) => { // Pour la route READ de toutes les sauces
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }))
}

/* exports.addLikeDislike = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
  .then()
  .catch()
} */