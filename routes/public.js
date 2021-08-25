const express = require('express')
const router = express.Router()
const public = require('../controllers/public')

router.get('/dompet', public.getDompet)