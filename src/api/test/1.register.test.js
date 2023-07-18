const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.DATABASE_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});

describe("GET /register", () => {

    it("Register/login with empty input", async () => {
        const res = await request(app)
            .post("/register")
            .expect(400);

        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toHaveProperty('message');
        expect(res.body.error.message).toEqual('Email and password are required.');
    });

    it("Register/login account success", async () => {
        const res = await request(app)
            .post("/register")
            .send({
                user: "test@email.com",
                pwd: "123qwe",
            })
            .expect(200);

        expect(res.body).toHaveProperty('accessToken');

        const setCookieHeader = res.headers['set-cookie'];

        // Assert the set cookie value
        expect(setCookieHeader).toBeDefined();

        // Parse the cookie value from the response headers
        const parsedCookie = parseCookieValue(setCookieHeader);

        // Perform further assertions on the cookie value
        expect(parsedCookie).toHaveProperty('refresh_token');
    });

    it("login with wrong password", async () => {
        const res = await request(app)
            .post("/register")
            .send({
                user: "test@email.com",
                pwd: "123qwe2",
            })
            .expect(200);

        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toHaveProperty('message');
        expect(res.body.error.message).toEqual('Incorrect email or password');
    });

    it("Check refresh token", async () => {

        const res = await request(app)
            .post("/register")
            .send({
                user: "test@email.com",
                pwd: "123qwe",
            })
            .expect(200);

        const setCookieHeader = res.headers['set-cookie'];

        // Assert the set cookie value
        expect(setCookieHeader).toBeDefined();

        // Parse the cookie value from the response headers
        const parsedCookie = parseCookieValue(setCookieHeader);


        // Perform further assertions on the cookie value
        expect(parsedCookie).toHaveProperty('refresh_token');

        const resRefreshToken = await request(app)
            .post("/refresh")
            .set('Cookie', 'refresh_token=' + parsedCookie.refresh_token)
            .expect(200);

        expect(resRefreshToken.body).toHaveProperty('accessToken');
    });


    it("Check get info-account", async () => {

        //not yet login
        const resGetInfoWrong = await request(app)
            .get("/info-account")
            .expect(403);

        //login
        const resLogin = await request(app)
            .post("/register")
            .send({
                user: "test@email.com",
                pwd: "123qwe",
            })
            .expect(200);

        expect(resLogin.body).toHaveProperty('accessToken');

        const access_token = resLogin.body.accessToken;

        const resGetInfo = await request(app)
            .get("/info-account")
            .set('Authorization', `Bearer ${access_token}`)
            .expect(200);

        expect(resGetInfo.body).toHaveProperty('email');
        expect(resGetInfo.body.email).toEqual('test@email.com');
        expect(resGetInfo.body).toHaveProperty('_id');

    });

    it("Logout", async () => {
        const res = await request(app)
            .get("/logout")
            .expect(204);
    });

});



function parseCookieValue(cookieHeader) {
    const cookieString = Array.isArray(cookieHeader) ? cookieHeader.join(';') : cookieHeader;
    const cookiePairs = cookieString.split(';');
    const cookie = {};

    cookiePairs.forEach((pair) => {
        const [name, value] = pair.trim().split('=');
        cookie[name] = value;
    });

    return cookie;
}