import { Router, request, response } from 'express';
import { parseISO } from 'date-fns';

import AppointmentRepository from '../repositories/appointments.reporitory';
import CreateAppointmentService from '../services/CreateAppointmentServices';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentRepository();

appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentRepository.all();
    return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
    try {
        const { provider, date } = request.body;
        const parseDate = parseISO(date);

        const createAppointment = new CreateAppointmentService(
            appointmentRepository,
        );
        const appointment = createAppointment.execute({
            provider,
            date: parseDate,
        });
        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default appointmentsRouter;
