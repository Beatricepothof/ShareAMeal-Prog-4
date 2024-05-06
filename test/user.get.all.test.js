const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const tracer = require('tracer')

chai.should()
chai.use(chaiHttp)
tracer.setLevel('warn')

const endpointToTest = '/api/user'

describe('UC202 Opvragen van overzicht van users', () => {
    it('TC-202-1 Opvragen van alle gebruikers', (done) => {
        chai.request(server)
            .get(endpointToTest)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('array')
                // Possibly add more assertions here?
                done()
            })
    })

    it('TC-202-2 Filteren op actieve/niet actieve gebruikers', (done) => {
        chai.request(server)
            .get(`${endpointToTest}?status=active`)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('array')
                res.body.forEach((user) => {
                    user.should.have.property('status').equal('active')
                })
                done()
            })
    })

    it('TC-202-3 Zoeken op basis van zoekcriterium', (done) => {
        const searchCriteria = {
            firstName: 'Voornaam',
            lastName: 'Achternaam'
        }
        chai.request(server)
            .get(endpointToTest)
            .query(searchCriteria)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('array')
                done()
            })
    })

    it('TC-202-4 Zoeken met niet-bestaande velden', (done) => {
        const invalidCriteria = {
            invalidField: 'testValue'
        }
        chai.request(server)
            .get(endpointToTest)
            .query(invalidCriteria)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('array').that.is.empty
                done()
            })
    })
})
