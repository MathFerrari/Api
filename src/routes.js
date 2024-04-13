import express from 'express';
const route = express.Router();

import { works, createWork } from './controllers/worksController.js';
import { login } from './controllers/LoginController.js';
import { experiences, createExperience } from './controllers/ExperienceController.js';

import { checkToken } from './middlewares/middleware.js';

//telas inciais
route.post('/login', login)

route.get('/works', works)
route.post('/works/create', checkToken, createWork)

route.get('/experiences', experiences)
route.post('/experiences/create', checkToken, createExperience)

export default route;
