import { Router } from 'express';
import appointmentsRouter from './appointments.routers';
import usersRouter from './users.routers';
const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
export default routes;
