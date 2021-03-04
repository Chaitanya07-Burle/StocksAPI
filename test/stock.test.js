let stockTest = require('../service/stock.service');
const request = require('supertest');
const app = require('../app')
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);

describe("Server Side Agents API Tesing", () => {
    it("done,tesing agent Chat api", () => {
        request(app.app).post('/stock')
            .send({ "CompanyName": "Miracle", "user": "Chaitanya" })
            .then((res) => {
                let output = res.body;
                const body = res.status;
                expect(body).to.be.equal("Updated Successfully")
            }).catch(err => {
                console.log(err)
            })
    })

    it("done,tesing agent Chat api", () => {
        request(app.app).post('/stock')
            .send({ "CompanyName": "Miracle" })
            .then((res) => {
                let output = res.body;
                const body = res.status;
                expect(output.Status).to.be.equal(400)
                expect(output.Message).to.be.equal("Required Inputs Missing")
                // done();
            }).catch(err => {
                console.log(err)
            })
    })

    it("done,tesing agent Chat api", () => {
        request(app.app).get('/fetchstock')
            .then((res) => {
                let output = res.body;
                console.log(output,res,"reee")
                let body = res.status;
                console.log(body, output, "body")
                expect(body).to.be.equal(200)
                // done();
            }).catch(err => {
                console.log(err)
            })
    })

    it("done,tesing agent Chat api", () => {
        request(app.app).get('/fetchstock')
            .then((res) => {
                let output = res.body;
                let body = res.status;
                expect(output.Status).to.be.equal("No Data Found")
                // done();
            }).catch(err => {
                console.log(err)
            })
    })
});