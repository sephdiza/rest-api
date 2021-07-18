const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

//Geting all
router.get('/', async (req, res) => {
    try {
        const subscriber = await Subscriber.find()
        res.json(subscriber)
    } catch(err) {
        res.status(500).res.json({ message: err.message })
    }
})

//Getting one
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber)
})

//Creating one
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedTo: req.body.subscribedTo
    })

    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch(err) {
        res.status(400).json({message : err.message})
    }
})

//Updating one
router.patch('/:id', getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if (req.body.subscribedTo != null) {
        res.subscriber.subscribedTo = req.body.subscribedTo
    }
    try{
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})

//Delete one
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove()
        res.json({ message: 'Deleted subscriber'})
    } catch(err) {
        res.status(500).json({ message: err.message})
    }
})

async function getSubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({ message: 'Cannot find subscriber'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message})
    }

    res.subscriber = subscriber
    next()
}

module.exports = router