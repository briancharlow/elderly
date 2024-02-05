const jwt = require("jsonwebtoken");

const sessionAuthorization = (req, res, next) => {
    console.log(req.cookies);
    const refresh_token = req.cookies.refreshtoken;
    const access_token = req.cookies.accesstoken;
    // check if there are no tokens
    if (!access_token && !refresh_token) {
        return res.json({
            message: "Access denied.No tokens",
        });
    }
    try {
        // check if access token is valid
        const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET);
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
                const access_token = jwt.sign(
                    { username: decoded.username, roles: decoded.roles },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: "1s",
                    }
                );
                // send new access token
                res.cookie("accesstoken", access_token);
                req.user = decoded;
                next();
                console.log("New access token created");
            } catch (error) {
                return res.json({
                    message: "Invalid token, refresh token expired",
                });
            }
        }
    }
};

module.exports = { sessionAuthorization };