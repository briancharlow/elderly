
const jwt = require("jsonwebtoken");

const sessionAuthorization = (req, res, next) => {
    console.log(req.cookies);
    const refresh_token = req.cookies.refreshtoken;
    const access_token = req.cookies.accesstoken;
    // check if there are no tokens
    if (!token && !refresh_token) {
        return res.status(404).json({
            message: "Access denied.No tokens",
        });
    }
    try {
        // check if access token is valid
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (refresh_token) {
            // check if refresh token is valid
            try {
                const decoded = jwt.verify(
                    refresh_token,
                    process.env.REFRESH_TOKEN_SECRET
                );
                // create new access token
                const token = jwt.sign(
                    { username: decoded.fullname, roles: decoded.roles },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: "1s",
                    }
                );
                // send new access token
                res.cookie("accesstoken", token);
                req.user = decoded;
                next();
                console.log("New access token created");
            } catch (error) {
                return res.status(401).json({
                    message: "Invalid token, refresh token expired",
                });
            }
        }
    }
};

module.exports = { sessionAuthorization };