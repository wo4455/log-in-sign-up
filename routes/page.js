const express = require('express');
const path = require('node:path');
const router = express.Router();

router.get('', async (req, res) => {
    res.sendFile(path.dirname(__dirname) + '/views/index.html');
});


module.exports = router;