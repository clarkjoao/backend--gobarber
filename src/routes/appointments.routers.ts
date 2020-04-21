import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentRepository from '../repositories/appointments.reporitory';
import CreateAppointmentService from '../services/CreateAppointmentServices';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
    const appointmentRepository = getCustomRepository(AppointmentRepository);
    const appointments = await appointmentRepository.find();
    return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
    try {
        const { provider_id, date } = request.body;
        const parseDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();
        const appointment = await createAppointment.execute({
            provider_id,
            date: parseDate,
        });
        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default appointmentsRouter;
