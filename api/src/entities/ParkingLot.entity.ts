import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from "typeorm";
import { Reservation } from "./Reservation.entity";

@Entity()
export class ParkingLot {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Reservation, (reservation: Reservation) => reservation.parkingLot)
  reservations!: Reservation[];
}