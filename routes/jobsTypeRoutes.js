const express = require("express");
const router = express.Router();
const { createJobType, updateJobType, deleteJobType, myJobsType } = require('../controllers/jobsTypeController');
const { isAuthenticated, isAdmin } = require("../middleware/auth");


//Todas as rotas tem /api como prefixo
router.post('/type/create', isAuthenticated, createJobType);
router.put('/type/update/:type_id', isAuthenticated, updateJobType);
router.delete('/type/delete/:type_id', isAuthenticated, deleteJobType);
router.get('/type/me', isAuthenticated, myJobsType);


module.exports = router; 