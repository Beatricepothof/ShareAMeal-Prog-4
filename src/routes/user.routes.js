const express = require('express')
const assert = require('assert')
const chai = require('chai')
chai.should()
const router = express.Router()
const userController = require('../controllers/user.controller.js')
const userService = require('src/services/user.service')
const logger = require('../util/logger')

// Tijdelijke functie om niet bestaande routes op te vangen
const notFound = (req, res, next) => {
    next({
        status: 404,
        message: 'Route not found',
        data: {}
    })
}

const validateUserCreateChaiShould = (req, res, next) => {
    try {
        req.body.firstName.should.not.be.empty.and.a('string')
        req.body.lastName.should.not.be.empty.and.a('string')
        req.body.emailAdress.should.not.be.empty.and.a('string').and.match(/@/)

        // Check if the email address is unique
        database.emailExists(req.body.emailAdress, (err, emailExists) => {
            if (err) {
                throw new Error(err.message)
            }
            if (emailExists) {
                throw new Error('Email address already exists')
            }
            next()
        })
    } catch (ex) {
        next({
            status: 400,
            message: ex.message,
            data: {}
        })
    }
}

// Userroutes
router.post('/api/user', validateUserCreateChaiShould, userController.create)
router.get('/api/user', userController.getAll)
router.get('/api/user/:userId', userController.getById)
router.put('/api/user/:userId', userController.update)
router.delete('/api/user/:userId', userController.delete)

module.exports = router
