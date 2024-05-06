const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const tracer = require('tracer')

chai.should()
chai.use(chaiHttp)
tracer.setLevel('warn')

const endpointToTest = '/api/user/:userId'

describe('UC204 Opvragen van usergegevens bij ID', () => {
    it('TC-204-1 Opvragen van gebruikersgegevens bij geldig ID', (done) => {
        const userId = 'user123'
        chai.request(server)
            .get(`${endpointToTest}/${userId}`)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('object')

                done()
            })
    })

    it('TC-204-2 Opvragen van gebruikersgegevens bij ongeldig ID', (done) => {
        const invalidUserId = 'invalidUserId'
        chai.request(server)
            .get(`${endpointToTest}/${invalidUserId}`)
            .end((err, res) => {
                res.should.have.status(404)
                done()
            })
    })
})
