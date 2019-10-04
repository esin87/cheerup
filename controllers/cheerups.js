const express = require('express');
const router = express.Router();

const Cheerup = require('../db/models/Cheerup');
const User = require('../db/models/User');

router.get('/', (req, res) => {
	Cheerup.find({}).then(allCheerups => res.json(allCheerups));
});

module.exports = router;
