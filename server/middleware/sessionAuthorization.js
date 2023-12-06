// const jwt = require("jsonwebtoken");

// const sessionAuthorization = (req, res, next) => {
//     console.log(req.cookies);
//     const refresh_token = req.cookies.refreshtoken;
//     const access_token = req.cookies.accesstoken;
//     // check if there are no tokens
//     if (!access_token && !refresh_token) {
//         return res.json({
//             message: "Access denied.No tokens",
//         });
//     }
//     try {
//         // check if access token is valid
//         const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         if (refresh_token) {
//             // check if refresh token is valid
//             try {
//                 const decoded = jwt.verify(
//                     refresh_token,
//                     process.env.REFRESH_TOKEN_SECRET
//                 );
//                 // create new access token
//                 const access_token = jwt.sign(
//                     { username: decoded.username, roles: decoded.roles },
//                     process.env.ACCESS_TOKEN_SECRET,
//                     {
//                         expiresIn: "1s",
//                     }
//                 );
//                 // send new access token
//                 res.cookie("accesstoken", access_token);
//                 req.user = decoded;
//                 next();
//                 console.log("New access token created");
//             } catch (error) {
//                 return res.json({
//                     message: "Invalid token, refresh token expired",
//                 });
//             }
//         }
//     }
// };

const jwt = require('jsonwebtoken');

const sessionAuthorization = (req, res, next) => {
    // Get the access token from the request cookies
    console.log(req.cookies);
    const accessToken = req.cookies.accesstoken;
    console.log(accessToken)
    // Check if the access token exists
    if (!accessToken) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: Access token missing',
        });
    }

    try {
        // Verify the access token
        const user_payload = jwt.verify(accessToken, process.env.SECRET);

        // Attach the user payload to the request for further use in route handlers
        req.user = user_payload;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: Invalid access token',
        });
    }
};





module.exports = { sessionAuthorization };