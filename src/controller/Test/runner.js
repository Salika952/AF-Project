process.env.NODE_ENV = 'test';


const
    logger = require('mocha-logger'),
    mongoose = require('mongoose'),
    posts = require('../ResearchEventController'),
    Post = require('../../schemas/ResearchEvents'),
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
            'res_presenterFee':100,
            'res_topic':'topic',
            'res_description':'des',
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




    // describe("GET Posts", () => {
    //     it("should respond with an array of posts", (done) => {
    //         let req = {};
    //
    //         let res = testUtils.responseValidatorAsync(200, (posts) => {
    //             posts.length.should.equal(2);
    //             posts[0].should.have.property('title');
    //             done();
    //         });
    //
    //         posts.getPosts(req, res);
    //     });
    // });
    //
    // describe("GET Post", () => {
    //     it("should get a post by id", (done) => {
    //         let req = {
    //             params : {id: id}
    //         };
    //
    //         let res = testUtils.responseValidatorAsync(200, (post) => {
    //             post.title.should.equal('dummy');
    //             post.should.have.property('title');
    //             done();
    //         });
    //
    //         posts.getPost(req, res);
    //     });
    //
    //     it("should throw an error for invalid id", (done) => {
    //         let req = {
    //             params : {id: '23545'}
    //         };
    //
    //         let res = testUtils.responseValidatorAsync(500, (err) => {
    //             done();
    //         });
    //
    //         posts.getPost(req, res);
    //     });
    // });
    //
    // describe("Update Post", () => {
    //     it("should update an existing post", (done) => {
    //         let req = {
    //             params: {id: id},
    //             body: {
    //                 'title': 'hey there peeps'
    //             }
    //         };
    //
    //         let res = testUtils.responseValidatorAsync(200, (post) => {
    //             post.should.have.property('title');
    //             post.title.should.equal('hey there peeps');
    //             done();
    //         });
    //
    //         posts.updatePost(req, res);
    //     });
    // });
    //
    // describe("Delete Post", () => {
    //     it("should delete an existing post", (done) => {
    //         let req = {
    //             params: {id: id},
    //         };
    //
    //         let res = testUtils.responseValidatorAsync(200, (post) => {
    //             post.should.have.property('removed');
    //             post.removed.should.equal(true);
    //             done();
    //         });
    //
    //         posts.removePost(req, res);
    //     });
    // });

    // after((done) => {
    //     Post.remove({}, (err) => {
    //         if(err) {console.log(err);}
    //     });
    //
    //     mongoose.disconnect(done);
    // });

});