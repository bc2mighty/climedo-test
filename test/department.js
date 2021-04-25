const expect = require('chai').expect
const request = require('supertest')

describe('Create Department', () => {
    it('Should Create Department or return error', (done) => {
        request('http://localhost:4000').post('/department')
            .send({
                "title": "Radiology",
                "otherFields": {},
                "contactPerson": {
                    "name": "Tunmise Akinade",
                    "email": "sherif@gmail.com",
                    "telephone": "09137392489",
                    "otherFields": {}
                }
            })
            .then((res) => {
                const body = res.body
                expect(body).to.contain.property('message')
                expect(body).to.contain.property('department')
                expect(body.department).to.be.an('object')
                expect('Content-Type', /json/)
                expect(200)
                done()
            })
            .catch((err) => {
                expect(err).to.contain.property('message')
                expect('Content-Type', /json/)
                done()
            })
    })
})

describe('Update Department', () => {
    it('Should Update Department or return error', (done) => {
        request('http://localhost:4000').put('/department')
            .send({
                "id": "608592416a822f467073fd18",
                "title": "Cardiologist",
                "otherFields": {
                    "group": "Heart",
                    "Association": "Cadi"
                },
                "contactPerson": {
                    "name": "Tunmise Ebenezer",
                    "email": "akinadetunmi@gmail.com",
                    "telephone": "09137392480",
                    "otherFields": {
                        "gender": "Male"
                    }
                }
            })
            .then((res) => {
                const body = res.body
                expect(body).to.contain.property('message')
                expect(body).to.contain.property('department')
                expect(body.department).to.be.an('object')
                expect('Content-Type', /json/)
                expect(200)
                done()
            })
            .catch((err) => {
                expect(err).to.contain.property('message')
                expect('Content-Type', /json/)
                done()
            })
    })
})

describe('Get All Departments', () => {
    it('Should Return All Department or return error', (done) => {
        request('http://localhost:4000').get('/department')
            .then((res) => {
                const body = res.body
                expect(body).to.contain.property('message')
                expect(body).to.contain.property('departments')
                expect(body.departments).to.be.an('array')
                expect('Content-Type', /json/)
                expect(200)
                done()
            })
            .catch((err) => {
                expect(err).to.contain.property('message')
                expect('Content-Type', /json/)
                done()
            })
    })
})

describe('Get A Department', () => {
    it('Should Return A Department or return error', (done) => {
        request('http://localhost:4000').get('/department/608592416a822f467073fd18')
            .then((res) => {
                const body = res.body
                expect(body).to.contain.property('message')
                expect(body).to.contain.property('dpt')
                expect(body.department).to.be.an('object')
                expect('Content-Type', /json/)
                expect(200)
                done()
            })
            .catch((err) => {
                expect(err).to.contain.property('message')
                expect('Content-Type', /json/)
                done()
            })
    })
})