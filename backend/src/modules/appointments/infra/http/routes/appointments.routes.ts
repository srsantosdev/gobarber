import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRoutes = Router();

const appointmentsController = new AppointmentController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRoutes.use(ensureAuthenticated);

appointmentsRoutes.post('/', appointmentsController.create);
appointmentsRoutes.get('/me', providerAppointmentsController.index);

export default appointmentsRoutes;
