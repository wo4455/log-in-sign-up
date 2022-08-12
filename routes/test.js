const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const names = ['Will', 'Michael', 'Jack' ];

router.get('/', auth, async (req, res) => {
    res.send(names);
});

module.exports = router;