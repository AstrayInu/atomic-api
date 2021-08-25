const express = require('express')
const router = express.Router()
const public = require('../controllers/public')

router.get('/atomic', public.getData)
router.post('/atomic', public.createData)
router.put('/atomic', public.updateData)
router.put('/atomic/update-status', public.setStatus)

module.exports = router;