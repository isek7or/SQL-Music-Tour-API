// DEPENDENCIES
const events = require('express').Router();
const { Op } = require('sequelize');
const db = require('../models');
const { Band, Event, Stage, Meet_Greet, Set_Time} = db;

// FIND ALL EVENTS
events.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [['date', 'ASC']],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        });
        res.status(200).json(foundEvents)
    } catch (err) {
        res.status(500).json(err)
    }
})

// FIND SPECIFIC EVENT
events.get('/:name', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: { name: req.params.name },
            include: [
                {
                    model: Meet_Greet,
                    as: "meet_greets",
                    attributes: { exclude: ["event_id", "band_id"] },
                    include: {
                        model: Band,
                        as: "band",
                    }
                },
                {
                    model: Set_Time,
                    as: "set_times",
                    attributes: { exclude: ["event_id", "stage_id", "band_id"] },
                    include: [
                        { model: Band, as: "band" },
                        { model: Stage, as: "stage" }
                    ]
                },
                {
                    model: Stage,
                    as: "stages",
                    through: { attributes: [] }
                }
            ]
        })
        res.status(200).json(foundEvent)
    } catch (err) {
        res.status(500).json(err)
    }
})

// CREATE A EVENT
events.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new event',
            data: newEvent
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// UPDATE A EVENT
events.put('/:id', async (req, res) => {
    try {
        const updatedEvents = await Event.update(req.body, {
            where: { event_id: req.params.id }
        });
        res.status(200).json({
            message: `Successfully ${updatedEvents} event(s)`,
            data: updatedEvents
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE A EVENT
events.delete('/:id', async (req, res) => {
    try {
        const deletedEvents = await Event.destroy({
            where: { event_id: req.params.id }
        })
        res.status(200).json({
            message: `Successfully ${deletedEvents} event(s)`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// EXPORT
module.exports = events
