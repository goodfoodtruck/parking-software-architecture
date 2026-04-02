import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Reservation } from "./Reservation.entity";

@Entity("employee")
export class Employee {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255, name: "first_name" })
  firstName: string;

  @Column({ type: "varchar", length: 255, name: "last_name" })
  lastName: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email: string;

  @Column({ type: "varchar", length: 255 })
  phone: string;

  @Column({ type: "varchar" })
  automobile: string;

  @Column({ type: "boolean" })
  electric: boolean;

  @Column({ type: "varchar", length: 255 })
  role: string;

  @OneToMany(() => Reservation, (reservation: Reservation) => reservation.employee)
  reservations!: Reservation[];

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    automobile: string,
    electric: boolean,
    role: string

  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.automobile = automobile;
    this.electric = electric;
    this.role = role;
  }
}