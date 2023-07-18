const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {

    //config socket
    const server = require('http').createServer(app);
    const socket = require('./../socket');

    socket.initialize(server);

    await mongoose.connect(process.env.DATABASE_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});

describe("Test Api /video", () => {

    it("craete video without login", async () => {
        await request(app).post("/video")
            .send({
                videoYoutubeId: "dYx0mUDK1Xc",
            })
            .expect(403);
    });

    it("craete video without video youtube id", async () => {
        //Login
        const resLogin = await request(app)
            .post("/register")
            .send({
                user: "test@email.com",
                pwd: "123qwe",
            })
            .expect(200);

        expect(resLogin.body).toHaveProperty('accessToken');

        const access_token = resLogin.body.accessToken;

        const resCreateVideo = await request(app)
            .post("/video")
            .set('Authorization', `Bearer ${access_token}`)
            .expect(400);

        expect(resCreateVideo.body).toHaveProperty('error');
        expect(resCreateVideo.body.error).toHaveProperty('message');
        expect(resCreateVideo.body.error.message).toEqual('Video Youtube Id are required');
    });

    it("craete video with video youtube id not found", async () => {
        //Login
        const resLogin = await request(app)
            .post("/register")
            .send({
                user: "test@email.com",
                pwd: "123qwe",
            })
            .expect(200);

        expect(resLogin.body).toHaveProperty('accessToken');

        const access_token = resLogin.body.accessToken;

        const resCreateVideo = await request(app)
            .post("/video")
            .send({
                videoYoutubeId: "wrong_id",
            })
            .set('Authorization', `Bearer ${access_token}`)
            .expect(400);

        expect(resCreateVideo.body).toHaveProperty('error');
        expect(resCreateVideo.body.error).toHaveProperty('message');
        expect(resCreateVideo.body.error.message).toEqual('Youtube video not found');
    });


    it("craete video success", async () => {
        //Login
        const resLogin = await request(app)
            .post("/register")
            .send({
                user: "test@email.com",
                pwd: "123qwe",
            })
            .expect(200);

        expect(resLogin.body).toHaveProperty('accessToken');

        const access_token = resLogin.body.accessToken;

        const resCreateVideo = await request(app)
            .post("/video")
            .send({
                videoYoutubeId: "dYx0mUDK1Xc",
            })
            .set('Authorization', `Bearer ${access_token}`)
            .expect(201);

        expect(resCreateVideo.body).toHaveProperty('success');
        expect(resCreateVideo.body.success).toHaveProperty('message');
        expect(resCreateVideo.body.success.message).toEqual('Video shared successfully.');

        expect(resCreateVideo.body).toHaveProperty('data');
        expect(resCreateVideo.body.data).toHaveProperty('title');
        expect(resCreateVideo.body.data).toHaveProperty('videoYoutubeId');
        expect(resCreateVideo.body.data.videoYoutubeId).toEqual('dYx0mUDK1Xc');
        expect(resCreateVideo.body.data).toHaveProperty('description');
        expect(resCreateVideo.body.data).toHaveProperty('shareBy');
        expect(resCreateVideo.body.data.shareBy).toHaveProperty('email');
        expect(resCreateVideo.body.data.shareBy.email).toEqual('test@email.com');
    });


    it("get all videos", async () => {
        const res = await request(app).get("/video");
        expect(res.statusCode).toBe(200);
        expect(res.body.pageSize).toBeGreaterThan(0);
        expect(res.body.currentPage).toBeGreaterThan(0);
        expect(res.body).toHaveProperty('totalPages');
        expect(res.body).toHaveProperty('data');
    });

});