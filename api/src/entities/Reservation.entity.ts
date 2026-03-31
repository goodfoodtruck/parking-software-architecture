import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Employee } from "./Employee.entity";
import { ParkingLot } from "./ParkingLot.entity";

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @ManyToOne(() => Employee, employee => employee.reservations)
  @JoinColumn({ name: "employee_id" })
  employee!: Employee;

  @ManyToOne(() => ParkingLot, parkingLot => parkingLot.reservations)
  @JoinColumn({ name: "parking_lot_id" })
  parkingLot!: ParkingLot;

  @Column({ name: "start_date" })
  startDate!: Date;

  @Column({ name: "end_date" })
  endDate!: Date;

  @Column({ name: "checked_in" })
  checkedIn!: boolean;
}