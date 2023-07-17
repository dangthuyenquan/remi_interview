const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    // check for duplicate usernames in the db
    let userData = await User.findOne({ username: user }).exec();

    if (!userData) {
        try {
            //encrypt the password
            const hashedPwd = await bcrypt.hash(pwd, 10);
            //store the new user
            userData = await User.create({
                "username": user,
                "password": hashedPwd
            });
        } catch (err) {
            return res.status(500).json({ 'message': err.message });
        }
    }


    if (userData) {

        const match = await bcrypt.compare(pwd, userData.password);
        if (match) {
            const roles = Object.values(userData.roles).filter(Boolean);
            // create JWTs
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "_id": userData._id.toString(),
                        "username": userData.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10s' }
            );
            const refreshToken = jwt.sign(
                { "_id": userData._id, "username": userData.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            // Saving refreshToken with current user
            userData.refreshToken = refreshToken;
            const result = await userData.save();
            console.log(result);
            console.log(roles);

            // Creates Secure Cookie with refresh token
            res.cookie('refresh_token', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

            // Send authorization roles and access token to user
            res.json({ roles, accessToken });

        } else {
            res.json({
                'error': {
                    'message': 'Incorrect username or password',
                }
            });
            // res.sendStatus(403);
        }

    }

}

module.exports = { handleNewUser };