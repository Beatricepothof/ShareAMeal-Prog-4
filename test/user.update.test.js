const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const tracer = require('tracer')

chai.should()
chai.use(chaiHttp)
tracer.setLevel('warn')

const endpointToTest = '/api/user/:userId'

describe('UC205 Updaten van usergegevens', () => {
    it('TC-205-1 Updaten van eigen gegevens met valide token en vereiste gegevens', (done) => {
        // Assuming you have the user data to update
        const userDataToUpdate = {
            // Updated user data
            firstName: 'Updated First Name',
            lastName: 'Updated Last Name',
            emailAdress: 'updated@example.com',
            postcode: '1234 AB',
            telefoonnummer: '1234567890'
        }

        chai.request(server)
            .put(endpointToTest)
            .send(userDataToUpdate)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('object')
                // Add more assertions to validate the updated user data
                done()
            })
    })

    it('TC-205-2 Gebruiker heeft geen valide token', (done) => {
        // Assuming you have the user data to update
        const userDataToUpdate = {
            // Updated user data
            firstName: 'Updated First Name',
            lastName: 'Updated Last Name',
            emailAdress: 'updated@example.com',
            postcode: '1234 AB',
            telefoonnummer: '1234567890'
        }

        chai.request(server)
            .put(endpointToTest)
            .send(userDataToUpdate)
            .end((err, res) => {
                res.should.have.status(403)
                // Add more assertions to validate the error response
                done()
            })
    })

    // Add more test cases to cover alternative paths (B, C, D, E)
})
