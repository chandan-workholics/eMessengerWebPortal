const express = require('express');
const router = express.Router();
const CombineController = require('../controllers/combinedController');
const { authMiddleware ,authMiddlewares} = require('../middlewares/authMiddleware.js');

router.get('/getCombineHomePageDetail/:sch_short_nm/:mobile_no',authMiddlewares, CombineController.getCombineHomePageDetail);
router.get('/getRelatedProfile', CombineController.getRelatedProfile);
router.get('/dashboardcount',authMiddleware, CombineController.dashboardcount);
router.post('/updateStudentTabStatus',authMiddleware, CombineController.updateStudentTabStatus);

module.exports = router;
