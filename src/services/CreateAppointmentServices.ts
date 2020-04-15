import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/appointments.reporitory';
import { response } from 'express';
interface Request {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    private appointmentRepository: AppointmentRepository;
    constructor(appointmentRepository: AppointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }
    public execute({ provider, date }: Request): Appointment {
        const appointmentDate = startOfHour(date);
        const findAppointment = this.appointmentRepository.findByDate(
            appointmentDate,
        );

        if (findAppointment) {
            throw Error('This appointment is aready book ');
        }
        const appointment = this.appointmentRepository.create({
            provider,
            date: appointmentDate,
        });
        return appointment;
    }
}

export default CreateAppointmentService;
