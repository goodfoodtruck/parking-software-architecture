import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Reservation } from "./Reservation.entity";

@Entity("employee")
export class Employee {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "name" })
  name!: string;

  @OneToMany(() => Reservation, (reservation: Reservation) => reservation.employee)
  reservations!: Reservation[];
}