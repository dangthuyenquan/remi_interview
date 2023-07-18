const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'error': { 'message': 'Email and password are required.' } });

    // check for duplicate emails in the db
    let userData = await User.findOne({ email: user }).exec();

    if (!userData) {
        try {
            //encrypt the password
            const hashedPwd = await bcrypt.hash(pwd, 10);
            //store the new user
            userData = await User.create({
                "email": user,
                "password": hashedPwd
            });
        } catch (err) {
            return res.status(500).json({ 'error': { 'message': err.message } });
        }
    }


    if (userData) {

        const match = await bcrypt.compare(pwd, userData.password);
        if (match) {
            // create JWTs
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "_id": userData._id.toString(),
                        "email": userData.email,
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10s' }
            );
            const refreshToken = jwt.sign(
                { "_id": userData._id, "email": userData.email },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            // Saving refreshToken with current user
            userData.refreshToken = refreshToken;
            const result = await userData.save();
            console.log(result);

            // Creates Secure Cookie with refresh token
            res.cookie('refresh_token', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

            // Send authorization roles and access token to user
            res.json({ accessToken });

        } else {
            res.json({
                'error': {
                    'message': 'Incorrect email or password',
                }
            });
            // res.sendStatus(403);
        }

    }

}

module.exports = { handleNewUser };