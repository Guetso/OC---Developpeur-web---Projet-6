// Contient les fonctions qui s'appliquent aux différentes routes pour les sauces

const express = require('express') // Nécessaire pour utiliser le router d'Express
const router = express.Router() // On appelle le routeur d'Express pour pouvoir déporter notre logique de routing dans ce fichier

const sauceCtrl = require('../controllers/sauce') // Récupère les logiques métiers à appliquer à chaque route du CRUD
const auth = require('../middleware/auth') // Récupère notre configuration d'authentification JsonWebToken
const multer = require ('../middleware/multer-config') // Récupère notre configuration 'multer' pour traitement des fichiers images

router.post('/', auth, multer, sauceCtrl.createSauce) // Route post : suit le chemin '/', vérifie le token, applique multer pour l'ajout d'image, fait appel à la logique pour création de sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce)
router.delete('/:id', auth, sauceCtrl.deleteSauce)
router.get('/:id', auth, sauceCtrl.getOneSauce)
router.get('/', auth, sauceCtrl.getAllSauce)
router.post('/:id/like', auth, sauceCtrl.addLikeDislike)

module.exports = router
