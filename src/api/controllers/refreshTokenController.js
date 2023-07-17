const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.refresh_token) return res.sendStatus(403);
    const refreshToken = cookies.refresh_token;

    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {

            if (err) return res.sendStatus(403);

            const foundUser = await User.findOne({ refreshToken }).exec();
            if (!foundUser) return res.sendStatus(403); //Forbidden 

            const accessToken = jwt.sign(

                {
                    "UserInfo": {
                        "_id": decoded._id.toString(),
                        "email": decoded.email,
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10s' }
            );
            return res.json({ accessToken })
        }
    );
}

module.exports = { handleRefreshToken }