import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Company name is require'],
    },
    position: {
        type: String,
        required: [true, 'Job position is required'],
        minlength: 10
    },
    status: {
        type: String,
        enum: ['pending', 'reject', 'interview'],
        default: 'pending'
    },
    workType: {
        type: String,
        enum: ['full-time', 'part-time', 'internship', 'contract']
    },
    workLocation: {
        type: String,
        default: 'Mumbai',
        required: [true, 'work location is required']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true }
)

export default mongoose.model('job', jobSchema)