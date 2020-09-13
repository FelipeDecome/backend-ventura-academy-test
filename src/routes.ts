import express from 'express';
import ActionsController from './controllers/ActionsController';
import { actionCreateValidation, actionIndexOneValidation } from './middlewares/actionRequestsValidation';

const routes = express.Router();
const actionsController = new ActionsController();

routes.get('/actions', actionIndexOneValidation, actionsController.indexOne);
routes.get('/actions/all', actionIndexOneValidation, actionsController.indexAllActionsByEmail);

routes.post('/actions', actionCreateValidation, actionsController.create);

export default routes;
