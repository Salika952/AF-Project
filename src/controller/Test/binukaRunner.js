process.env.NODE_ENV = 'test';


const
    logger = require('mocha-logger'),
    mongoose = require('mongoose'),
    posts = require('../PapersController'),
    Post = require('../../schemas/Papers'),
    should = require('should'),
    testUtils = require('../../../test/utils');

const dotenv = require('dotenv');


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

        dummyPost = new Post({
            'paper_content':'AF',
            'paper_contact':723119202,
            'paper_mail':'shihanbinuka@gmail.com',
        });

        dummyPost.save((err, post) => {
            if (err) { res.send(err);}
            id = post._id;
        });
    });

    describe("Create Post", () => {
        it("should create a new post", (done) => {
            let req = {
                body : {
                    'paper_content':'SA',
                    'paper_contact':72131920,
                    'paper_mail':'shihanbinuka1@gmail.com',
                }
            };

            let res = testUtils.responseValidatorAsync(200, (post) => {
                post.should.have.property('paper_content');
                post.paper_content.should.equal('SA');
                done();
            });

            posts.addPaper(req, res);
            done();
        });
    });
});
