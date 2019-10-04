const express = require('express');
const router = express.Router();

const Cheerup = require('../db/models/Cheerup');
const User = require('../db/models/User');

router.get('/', (req, res) => {
	User.find().then(allUsers => {
		res.json(allUsers);
	});
});

module.exports = router;
