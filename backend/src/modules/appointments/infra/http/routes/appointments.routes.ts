import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentController from '../controllers/AppointmentsController';

const appointmentsRoutes = Router();
const appointmentsController = new AppointmentController();

appointmentsRoutes.use(ensureAuthenticated);

/*
appointmentsRoutes.get('/', async (request, response) => {
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
}); */

appointmentsRoutes.post('/', appointmentsController.create);

export default appointmentsRoutes;
