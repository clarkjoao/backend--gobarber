import { Router } from 'express';
import appointmentsRouter from './appointments.routers';
const routes = Router();

routes.use('/appointments', appointmentsRouter);
export default routes;
