
const authAndAdmin = (req, res, next) => {
	if(req.user.isAdmin){
		next();
	}else{
		res.status(403).json("You are not permitted to perfom such");
	}
}

module.exports = authAndAdmin;
