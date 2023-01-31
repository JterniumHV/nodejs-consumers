const {Router} = require('express');
const { GetAllOfas } = require('../controllers/OfaController');
const router = Router();

router.get('/',(req, res)=> res.json({message: "hello world"}))

router.get('/ofa',GetAllOfas)

module.exports = router;