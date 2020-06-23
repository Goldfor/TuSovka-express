var express = require('express');
var router = express.Router();

var partyList = require('../db/Scheme/party');

router.get('/AllList', function (req, res, next) {
	partyList.getAll().then(data =>{
		res.json(data)
	})
})

router.get('/oneById', function (req, res, next) {
	partyList.getParty(req.query['_id'])
		.then(data =>{
			res.json(data)
		})
		.catch((err) => {res.json({bad: true})})
})

module.exports = router;