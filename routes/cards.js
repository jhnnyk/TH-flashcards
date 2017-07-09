const express = require('express')
const router = express.Router()
const { data } = require('../data/flashcardData.json')
const { cards } = data

router.get('/', (req, res) => {
  const randomCardId = Math.floor(Math.random() * cards.length)
  res.redirect(`/cards/${randomCardId}?side=question`)
})

router.get('/:id', (req, res) => {
  const { side } = req.query
  const { id } = req.params
  const text = cards[id][side]
  const { hint } = cards[id]
  
  const templateData = { text, id }

  if (side === 'question') {
    templateData.hint = hint
  } else if (side != 'question' || side != 'answer') {
    res.redirect(`/cards/${id}?side=question`)
  }

  res.render('card', templateData)
})

module.exports = router
