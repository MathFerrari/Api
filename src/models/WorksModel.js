import mongoose from 'mongoose';

const worksSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    skills: { type: Array, required: true },
    createdDate: { type: Date, required: true},
    imageSrc: { type: String, required: true },
    logDate: { type: Date, default: Date.now }
});

const worksModel = mongoose.model('works', worksSchema);
export default worksModel;