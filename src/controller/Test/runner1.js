process.env.NODE_ENV = 'test';


const
    logger = require('mocha-logger'),
    mongoose = require('mongoose'),
    posts = require('../UserController'),
    Post = require('../../schemas/Users'),
    should = require('should'),
    testUtils = require('../../../test/utils');

const dotenv = require('dotenv');
const res = require("express");


describe("Post api", () => {
    let id, dummyPost;

    before((done) => {

        dotenv.config();

        const MONGODB_URI = process.env.MONGODB_URI2;

        mongoose.connect(MONGODB_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }, (error) => {
            if (error) {
                console.log('Database Error: ', error.message);
            }
        });

        done();
        mongoose.connection.once('open', () => {
            console.log('Database Synced');
        });

    });

    describe("Create Post", () => {
        it("should create a new post", (done) => {
            let req = {
                //body : {'title': 'bleh'}
                body : { 'user_email':"abc@gmail.com",
                    'user_password':1234,}
            };

            let res = testUtils.responseValidatorAsync(200, (post) => {
                post.should.have.property('user_email');
                post.res_topic.should.equal('abc@gmail.com');
                done();
            });

            posts.addUsers(req, res);
            done();
        });
    });

    describe("GET Posts", () => {
        it("should respond with an array of posts", (done) => {
            let req = {};

            let res = testUtils.responseValidatorAsync(200, (posts) => {
                posts.length.should.equal(2);
                posts[0].should.have.property('user_email');
                done();
            });

            posts.getUserAll(req, res);
            done();
        });

    });
});