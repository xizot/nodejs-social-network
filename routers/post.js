const { verifyAccessToken } = require("../middlewares/verifyAccessToken");

const router = require("express").Router();

router.post("/", verifyAccessToken, (req,res)=>{
    const userId = req.user__id
} )

module.exports = router;