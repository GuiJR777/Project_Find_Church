import express, { response } from 'express';

import PointController from './controllers/pointsControler'
import TypesController from './controllers/typesControler'

const routes = express.Router();
const pointsController = new PointController()
const typesController = new TypesController()

routes.get('/types', typesController.index);

routes.post('/points', pointsController.create)
routes.get('/points', pointsController.index)
routes.get('/points/:id', pointsController.show)

export default routes;