const Job = require('../models/job');
const ErrorResponse = require('../utils/errorResponse');


//create job
exports.createJob = async (req, res, next) => {

    try {
        const job = await Job.create({
            title: req.body.title,
            description: req.body.description,
            salary: req.body.salary,
            cvLinkendIn: req.body.cvLinkendIn,
            user: req.user.id,
            jobType: req.body.jobType

        });
        res.status(201).json({
            success: true,
            job
        });
    } catch (err) {
        next(err);
    }
}

//update job
exports.updateJob = async (req, res, next) => {

    try {
        const job = await Job.findByIdAndUpdate(req.params.news_id, req.body, { new: true }).populate('jobType', 'jobTypeName').populate('user', 'firstName lastName');
        res.status(200).json({
            success: true,
            job
        })
        next();
    } catch (error) {
        return next(error);
        console.log(error);
    }
}

//delete job
exports.deleteJob = async (req, res, next) => {

    try {
        const job = await Job.findByIdAndRemove(req.params.news_id, req.body);
        res.status(200).json({
            success: true,
            message: "vaga deletado"
        })
        next();
    } catch (error) {
        return next(error);
    }
}


//all my registred jobs
exports.allMyJobs = async (req, res, next) => {

    try {
        const jobs = await Job.find({ user: req.user._id }).populate('jobType', 'jobTypeName').populate('user', 'firstName lastName');
        res.status(200).json({
            success: true,
            jobs
        })
        next();
    } catch (error) {
        return next(new ErrorResponse('Server error', 500));
    }
}

//all jobs by type
exports.jobByType = async (req, res, next) => {
    const { type_id } = req.params;

    try {
        const jobs = await Job.find({ jobType: type_id }).populate('jobType', 'jobTypeName').populate('user', 'firstName lastName');
        res.status(200).json({
            success: true,
            jobs
        })
        next();
    } catch (error) {
        return next(new ErrorResponse('Server error', 500));
    }
}



