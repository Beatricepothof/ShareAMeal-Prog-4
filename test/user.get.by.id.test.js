const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const tracer = require('tracer')

chai.should()
chai.use(chaiHttp)
tracer.setLevel('warn')

const endpointToTest = '/api/user/1'

describe('UC204 Opvragen van usergegevens bij ID', () => {
    it('TC-204-1 Opvragen van gebruikersgegevens bij geldig ID', (done) => {
        const userId = '1'

        chai.request(server)
            .get(`${endpointToTest}/${userId}`)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('object')
                // Add more assertions to validate the user details and meals offered
                done()
            })
    })

    it('TC-204-2 Opvragen van gebruikersgegevens bij ongeldig ID', (done) => {
        const invalidUserId = '4'

        chai.request(server)
            .get(`${endpointToTest}/${invalidUserId}`)
            .end((err, res) => {
                res.should.have.status(404)
                done()
            })
    })
})
