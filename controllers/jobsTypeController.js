const JobType = require('../models/jobType');
const ErrorResponse = require('../utils/errorResponse');


//create job
exports.createJobType = async (req, res, next) => {

    try {
        const jobT = await JobType.create(req.body);
        res.status(201).json({
            success: true,
            jobT
        });
    } catch (err) {
        next(err);
    }
}


//update job type
exports.updateJobType = async (req, res, next) => {

    try {
        const jobT = await JobType.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            success: true,
            jobT
        })
        next();
    } catch (error) {
        return next(new ErrorResponse('Server error', 500));
    }
}



//delete job type
exports.deleteJobType = async (req, res, next) => {

    try {
        const jobT = await JobType.findByIdAndRemove(req.params.id, req.body);
        res.status(200).json({
            success: true,
            jobT
        })
        next();
    } catch (error) {
        return next(new ErrorResponse('Server error', 500));
    }
}


//all my jobs type
exports.myJobsType = async (req, res, next) => {

    try {
        const jobT = await JobType.find(req.user._id);
        res.status(200).json({
            success: true,
            jobT
        })
        next();
    } catch (error) {
        return next(new ErrorResponse('Server error', 500));
    }
}