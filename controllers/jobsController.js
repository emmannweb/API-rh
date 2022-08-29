const Job = require('../models/job');
const ErrorResponse = require('../utils/errorResponse');


//create job
exports.createJob = async (req, res, next) => {

    try {
        const job = await Job.create(req.body);
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
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            success: true,
            job
        })
        next();
    } catch (error) {
        return next(new ErrorResponse('Server error', 500));
    }
}

//delete job
exports.deleteJob = async (req, res, next) => {

    try {
        const job = await Job.findByIdAndRemove(req.params.id, req.body);
        res.status(200).json({
            success: true,
            job
        })
        next();
    } catch (error) {
        return next(new ErrorResponse('Server error', 500));
    }
}


//all my jobs
exports.allMyJobs = async (req, res, next) => {

    try {
        const job = await Job.findById(req.user._id);
        res.status(200).json({
            success: true,
            job
        })
        next();
    } catch (error) {
        return next(new ErrorResponse('Server error', 500));
    }
}

//all my jobs
exports.jobByType = async (req, res, next) => {
    const { type_id } = req.params;

    try {
        const job = await Job.find({ jobType: type_id }).populate('jobType');
        res.status(200).json({
            success: true,
            job
        })
        next();
    } catch (error) {
        return next(new ErrorResponse('Server error', 500));
    }
}



