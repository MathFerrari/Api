import expModel from '../models/ExperienceModel.js';

const dateFormat = (date) => {
    const dateObj = new Date(date)
    return dateObj.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' })
}

export const experiences = async (req, res) => {
    const limitItem = req.query.limitItem ? parseInt(req.query.limitItem) : 5

    try {
        const expData = await expModel.find({});

        expData.sort((a, b) => {
            return b.startDate - a.startDate;
        });

        const resultFormat = expData.slice(0, limitItem).map(exp => {
            return {
                id: exp._id,
                company: exp.company,
                position: exp.position,
                startDate: exp.startDate,
                endDate: exp.endDate,
                description: exp.description,
                skills: exp.skills,
                isEmployed: exp.isEmployed,
                workTime: exp.workTime
            }
        });
        return res.status(200).json(resultFormat);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ messageError: 'Internal Server Error' });
    }
}

export const createExperience = async (req, res) => {
    let { company, position, startDate, description, skills, endDate, workTime } = req.body;

    startDate = new Date(startDate);

    const expData = await expModel.find({})
    let existsElementError = false;

    if (!company || !position || !startDate || !description || !skills || !workTime) return res.status(422).json({ messageError: 'All fields are required' })
    expData.forEach(exp => {
        if (exp.company === company) return existsElementError = true;
    });


    const newExp = new expModel({
        company,
        position,
        startDate,
        description,
        skills,
        workTime
    });

    if (!endDate) {
        newExp.isEmployed = true;
    } else {
        endDate = new Date(endDate);
        newExp.endDate = endDate;
    }

    if( endDate < startDate ) return res.status(422).json({ messageError: 'End date must be greater than start date' })
        
    try {
        if (existsElementError) {
            return res.status(409).json({ messageError: 'Experience already exists' })
        } else {
            newExp.save();
            return res.status(201).json({ message: 'Experience created successfully' });
        };

    } catch (error) {
        return res.status(500).json({ messageError: 'Internal Server Error' });
    }
}