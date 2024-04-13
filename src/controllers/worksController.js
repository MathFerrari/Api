import worksModel from '../models/WorksModel.js';

export const works = async (req, res) => {
    try {
        const worksData = await worksModel.find({});
        const resultFormat = worksData.map(work => {
            return {
                id: work._id,
                name: work.name,
                description: work.description,
                skills: work.skills,
                imageSrc: work.imageSrc,
                createdDate: work.createdDate
            }
        });
        return res.status(200).json(resultFormat);
    } catch (error) {
        return res.status(500).json({ messageError: 'Internal Server Error' });
    }
}

export const createWork = async (req, res) => {
    let { name, description, skills, createdDate, imageSrc } = req.body;
    createdDate = new Date(createdDate);

    const worksData = await worksModel.find({})
    let validationError = false;

    if (!name || !description || !skills || !createdDate || !imageSrc) return res.status(422).json({ messageError: 'All fields are required' })
    worksData.forEach(work => {
        if (work.name === name) return validationError = true;
    });

    const newWork = new worksModel({
        name,
        description,
        skills,
        imageSrc,
        createdDate
    });

    try {
        if (validationError) {
            return res.status(409).json({ messageError: 'Work already exists' })
        } else {
            newWork.save();
            return res.status(201).json({ message: 'Work created successfully' });
        };
    } catch (error) {
        return res.status(500).json({ messageError: 'Internal Server Error' });
    }
}