const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const tracer = require('tracer')

chai.should()
chai.use(chaiHttp)
tracer.setLevel('warn')

const endpointToTest = '/api/user/:userId'

describe('UC206 Verwijderen van user', () => {
    it('TC-206-1 Verwijderen van eigen gebruikersaccount met valide token', (done) => {
        chai.request(server)
            .delete(endpointToTest)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('object')
                done()
            })
    })

    it('TC-206-2 Gebruiker heeft geen toegang tot het systeem', (done) => {
        chai.request(server)
            .delete(endpointToTest)
            .end((err, res) => {
                res.should.have.status(403)
                done()
            })
    })
})
