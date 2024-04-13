import express from 'express';
const route = express.Router();


import { works, createWork } from './src/controllers/worksController.js';
import { login } from './src/controllers/LoginController.js';
import { experiences, createExperience } from './src/controllers/ExperienceController.js';

import { checkToken } from './src/middlewares/middleware.js';

//telas inciais
route.post('/login', login)

route.get('/works', works)
route.post('/works/create', checkToken, createWork)

route.get('/experiences', experiences)
route.post('/experiences/create', checkToken, createExperience)

export default route;
