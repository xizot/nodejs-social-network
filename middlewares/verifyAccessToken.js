const jwt = require("jsonwebtoken");
module.exports.verifyAccessToken = (req, res, next) => {
    const bearerAccessToken = req.headers.authorization;
    if (!bearerAccessToken) {
        res.status(401).send("Access Denied");
    }
    try {
        const token = bearerAccessToken.split(" ")[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Your session is not valid",
            data: error,
        });
    }
};
