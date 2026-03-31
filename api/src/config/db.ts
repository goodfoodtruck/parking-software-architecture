import { DataSource } from 'typeorm';
import { Employee } from "../entities/Employee.entity";
import { ParkingLot } from "../entities/ParkingLot.entity";
import { Reservation } from "../entities/Reservation.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: process.env.NODE_ENV === "development",
  entities: ["dist/entities/*.js"],
  migrations: ["src/migrations/**/*.js"],
});

async function seed(appdatasource: DataSource) {
  const employeeRepository = appdatasource.getRepository(Employee);
  const parkingLotRepository = appdatasource.getRepository(ParkingLot);
  const reservationRepository = appdatasource.getRepository(Reservation);
  
  const employees = employeeRepository.create([
    { name: "Alice" },
    { name: "Bob" },
    { name: "Charlie" },
  ]);
  await employeeRepository.save(employees);

  const lots = parkingLotRepository.create([
    { name: "A01" },
    { name: "B01" },
  ]);
  await parkingLotRepository.save(lots);

  const reservations = reservationRepository.create([
    { employee: employees[0], parkingLot: lots[0], startDate: new Date(), endDate: new Date(Date.now() + 3600*1000), checkedIn: false },
    { employee: employees[1], parkingLot: lots[1], startDate: new Date(), endDate: new Date(Date.now() + 7200*1000), checkedIn: true },
  ]);
  await reservationRepository.save(reservations);

  console.log("✅ DB seedée !");
}

export async function connectDatabase() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("✅ Connecté à PostgreSQL via TypeORM");
      await seed(AppDataSource);
    }
  } catch (err: unknown) {
    console.error("❌ Échec connexion TypeORM :", err);
    setTimeout(connectDatabase, 5000);
  }
}