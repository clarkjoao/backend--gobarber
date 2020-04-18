import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinTable,
} from 'typeorm';
import Users from './Users';

@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: String;

    @Column('')
    provider_id: String;
    // provider_id: number;

    //Relacionamentos
    @ManyToOne(() => Users)
    @JoinTable({ name: 'provider_id' })
    provider: Users;

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Appointment;
