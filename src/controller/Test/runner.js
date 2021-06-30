process.env.NODE_ENV = 'test';


const
    logger = require('mocha-logger'),
    mongoose = require('mongoose'),
    posts = require('../ResearchEventController'),
    Post = require('../../schemas/ResearchEvents'),
    should = require('should'),
    testUtils = require('../../../test/utils');

const dotenv = require('dotenv');


describe("Api Post", () => {
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

        dummyPost = new Post({
            'res_presenterFee':100,
            'res_topic':'topic',
            'res_description':'des',
        });

        dummyPost.save((err, post) => {
            if (err) { res.send(err);}
            id = post._id;
        });
    });

    describe("Create Research Event Post", () => {
        it("should create a new post", (done) => {
            let req = {
                body : { 'res_presenterFee':200,
                    'res_topic':'topic2',
                    'res_description':'des2',}
            };

            let res = testUtils.responseValidatorAsync(200, (post) => {
                post.should.have.property('res_topic');
                post.res_topic.should.equal('topic2');
                done();
            });

            posts.addResearchEvents(req, res);
            done();
        });
    });




    describe("Posts GET", () => {
        it("should respond with an array of posts", (done) => {
            let req = {};

            let res = testUtils.responseValidatorAsync(200, (posts) => {
                posts.length.should.equal(2);
                posts[0].should.have.property('res_description');
                done();
            });

            posts.getAllResearchEvents(req, res);
            done();
        });
    });

    describe("Post GET", () => {
        it("should get a post by id", (done) => {
            let req = {
                params: {id: id}
            };

            let res = testUtils.responseValidatorAsync(200, (post) => {
                post.res_topic.should.equal('topic');
                post.should.have.property('res_topic');
                done();
            });

            posts.getSpecificResearchEvent(req, res);
            done();
        });
    });


});