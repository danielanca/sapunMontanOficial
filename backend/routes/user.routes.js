import express from 'express';
var router = express.Router();

router.get("/message", function (req, res, next) {
	res.json("Welcome To React my boy");
});

export default router;