const express = require("express");
const router = express.Router();
const { createJob, updateJob, deleteJob, allMyJobs, jobByType } = require('../controllers/jobsController');
const { isAuthenticated, isAdmin } = require("../middleware/auth");


//Todas as rotas tem /api como prefixo
router.post('/job/create', isAuthenticated, createJob);
router.put('/job/update/:news_id', isAuthenticated, updateJob);
router.delete('/job/delete/:news_id', isAuthenticated, deleteJob);
router.get('/job/me/', isAuthenticated, allMyJobs);
router.get('/job/type/:type_id', isAuthenticated, jobByType);



module.exports = router; 