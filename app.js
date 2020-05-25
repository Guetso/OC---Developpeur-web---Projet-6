const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  next()
})

app.use(bodyParser.json())

app.post('/api/sauces', (req, res, next)=>{
    console.log(req.body)
    res.status(201).json({
        message : 'sauce créée'
    })
})

app.use('/api/sauces', (req, res, next) => {
  const sauces = [
    {
      _id: '001',
      name: 'Béarnaise',
      manufacturer: 'Moi',
      description: 'La meilleure des sauces',
      heat: 3,
      likes: 0,
      dislikes: 0,
      imageUrl: '',
      mainPepper: '',
      usersLiked: '',
      usersDisliked: '',
      userId: '101',
    },
    {
      _id: '002',
      name: 'Tartare',
      manufacturer: 'Moi',
      description: 'La 2nd meilleure des sauces',
      heat: 2,
      likes: 0,
      dislikes: 0,
      imageUrl: '',
      mainPepper: '',
      usersLiked: '',
      usersDisliked: '',
      userId: '101',
    },
  ]
  res.status(200).json(sauces)
})

module.exports = app
