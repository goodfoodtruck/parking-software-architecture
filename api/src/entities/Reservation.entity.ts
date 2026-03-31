import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Employee } from "./Employee.entity";
import { ParkingLot } from "./ParkingLot.entity";

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @ManyToOne(() => Employee, employee => employee.reservations)
  employee!: Employee;

  @ManyToOne(() => ParkingLot, parkingLot => parkingLot.reservations)
  parkingLot!: ParkingLot;

  @Column()
  startDate!: Date;

  @Column()
  endDate!: Date;

  @Column()
  checkedIn!: boolean;
}