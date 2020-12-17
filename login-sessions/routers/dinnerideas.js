const express = require('express');
const router = express.Router();

const {
    list,
    showForm,
    processForm
} = require('../controllers/dinneridea');

router
    .get('/', list)
    .get('/new', showForm)
    .post('/new', processForm)

module.exports = router;