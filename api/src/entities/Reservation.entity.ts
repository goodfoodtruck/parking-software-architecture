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

  @Column({ name: "date" })
  date!: Date;

  @Column({ name: "checked_in", default: false })
  checkedIn!: boolean;

  // TODO rajouter un champ cancelled: boolean qu'on regardera pendant checkin et available
  @Column({ name: "cancelled", default: false })
  cancelled!: boolean;
}