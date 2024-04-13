import mongoose from 'mongoose';

const expSchema = new mongoose.Schema({
    company: { type: String, required: true },
    position: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: false},
    isEmployed: { type: Boolean, default: false},
    description: { type: String, required: true },
    skills: { type: Array, required: true },
    workTime: { type: String, required: true },
    logDate: { type: Date, default: Date.now }
});

const expModel = mongoose.model('experiences', expSchema);
export default expModel;