const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleGetInfoAccount = async (req, res) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(403);
    const token = authHeader.split(' ')[1];

    // evaluate jwt 
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decoded) => {

            console.log(err);
            if (err) return res.sendStatus(403);

            let userData = await User.findById(decoded.UserInfo._id.toString());

            if (userData) {
                return res.json({
                    _id: userData._id.toString(),
                    email: userData.username,
                });
            }
            return res.sendStatus(403);
        }
    );
}

module.exports = { handleGetInfoAccount }