const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const tracer = require('tracer')

chai.should()
chai.use(chaiHttp)
tracer.setLevel('warn')

const endpointToTest = '/api/user'

// Multiple bundled testcases for UC201
describe('UC201 Registreren als nieuwe user', () => {})

/**
 * Hier starten de testcases
 */
it('TC-201-1 Verplicht veld ontbreekt', (done) => {
    chai.request(server)
        .post(endpointToTest)
        .send({
            firstName: 'Voornaam',
            lastName: 'Achternaam',
            emailAdress: 'v.a@server.nl'
        })
        .end((err, res) => {
            /**
             * Uitwerking met chai.expect
             */
            chai.expect(res).to.have.status(400)
            chai.expect(res).not.to.have.status(200)
            chai.expect(res.body).to.be.a('object')
            chai.expect(res.body).to.have.property('status').equals(400)
            chai.expect(res.body)
                .to.have.property('message')
                .equals('Missing or incorrect firstName field')
            chai.expect(res.body).to.have.property('data').that.is.a('object')
                .that.is.empty

            done()
        })
})

it('TC-201-2 Niet-valide email adres', (done) => {
    // Invalid email address formats
    const invalidEmails = [
        'invalid email',
        'john.doe@example',
        'john.doe@example..com',
        'john doe@example.com',
        '123@example.com',
        'john@exa_mple.com',
        'john.doe@example.com@example.com'
    ]

    invalidEmails.forEach((invalidEmail) => {
        chai.request(server)
            .post(endpointToTest)
            .send({
                firstName: 'Voornaam',
                lastName: 'Achternaam',
                emailAdress: invalidEmail
            })
            .end((err, res) => {
                res.should.have.status(400)
                res.should.not.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('status').equal(400)
                res.body.should.have
                    .property('message')
                    .equal(`Invalid email address: ${invalidEmail}`)
                res.body.should.have.property('data').which.is.an('object').and
                    .is.empty

                done()
            })
    })
})

it('TC-201-3 Niet-valide password', (done) => {
    // Send request with empty password field, password must be filled in
    chai.request(server)
        .post(endpointToTest)
        .send({
            firstName: 'Valid First Name',
            lastName: 'Valid Last Name',
            emailAdress: 'valid@example.com',
            password: ''
        })
        .end((err, res) => {
            res.should.have.status(400)
            res.should.not.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('status').equal(400)
            res.body.should.have
                .property('message')
                .equal('Password is required')
            res.body.should.have.property('data').which.is.an('object').and.is
                .empty

            done()
        })
})

it.skip('TC-201-4 Gebruiker bestaat al', (done) => {
    //
    // Couldn't figure this one out yet
    //
    done()
})

it('TC-201-5 Gebruiker succesvol geregistreerd', (done) => {
    chai.request(server)
        .post(endpointToTest)
        .send({
            firstName: 'Voornaam',
            lastName: 'Achternaam',
            emailAdress: 'v.a@server.nl'
        })
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')

            res.body.should.have.property('data').that.is.a('object')
            res.body.should.have.property('message').that.is.a('string')

            const data = res.body.data
            data.should.have.property('firstName').equals('Voornaam')
            data.should.have.property('lastName').equals('Achternaam')
            data.should.have.property('emailAdress')
            data.should.have.property('id').that.is.a('number')

            done()
        })
})
