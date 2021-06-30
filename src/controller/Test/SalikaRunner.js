process.env.NODE_ENV = 'test';


const
    logger = require('mocha-logger'),
    mongoose = require('mongoose'),
    posts = require('../WorkshopEventsController'),
    Post = require('../../schemas/WorkshopEvents'),
    should = require('should'),
    testUtils = require('../../../test/utils');

const dotenv = require('dotenv');

describe("Post api", () => {
    let id, dummyPost;

    before((done) => {

        dotenv.config();

        const MONGODB_URI = process.env.MONGODB_URI;

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
            work_topic:'Java_Project',
            work_description:'OOP Concept',
            work_place:'Malabe',
        });

        dummyPost.save((err, post) => {
            if (err) { res.send(err);}
            id = post._id;
        });
    });

    describe("Create Post", () => {
        it("should create a new post", (done) => {
            let req = {
                //body : {'title': 'bleh'}
                body : {'work_topic':'Java_Project',
                    'work_description':'OOP Concept',
                    'work_place':'Malabe',}
            };

            let res = testUtils.responseValidatorAsync(200, (post) => {
                post.should.have.property('work_topic');
                post.res_topic.should.equal('Java_Project');
                done();
            });

            posts.addWorkshopEvents(req, res);
            done();


        });
    });



});








