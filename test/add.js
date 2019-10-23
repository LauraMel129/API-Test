const chai = require('chai');
const expect = chai.expect;
const sendRequest = require('../lib/sendRequest');
const getComment = require('../data/getComment');
const env = require('../endpoint/test');

describe('Get Comment by id', () => {

    getComment.map((data) => {
        let response;

        let id = parseInt(data.uri.split('/')[2]);

        before(async () => {
            data.uri = env.uri + data.uri;
            response = await sendRequest(data);
        });

        it('Verifying Status Code ', () => {
            expect(response.statusCode).to.eql(200);
        });

        it('Verifying Content-Type existence ', () => {
            const contentType = response.headers['content-type'];
            expect (contentType).to.exist;
        });

        it('Check that Content-Type header value ',() => {
            const contentType = response.headers['content-type'];
            expect(contentType).to.be.equal("application/json; charset=utf-8")
        })

        it('Verifying that the content of the response body is the array of 10 users ', () => {
            const body = response.body;
            expect(body.length).to.be.equal(10);
        });
    })

});