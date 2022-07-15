const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const auth = (req, res, next) => {
	const token = req.headers['authorization'];

	if(token){
		const foundToken = token.split(" ")[1];
		jwt.verify(foundToken, process.env.TOKEN_SECRET, (err, user) => {
			if(err) res.status(403).json({ message : "Your token is not valid" });
			req.user = user;
			next();
		})
	}else{
		return res.status(401).json({ message : "You are not authenticaed" });
	}
}

module.exports = auth;
