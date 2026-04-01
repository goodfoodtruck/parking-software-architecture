import { Employee } from "../entities/Employee.entity"
import { ParkingLot } from "../entities/ParkingLot.entity"
import { Reservation } from "../entities/Reservation.entity"
import { ReservationService } from "../services/Reservation.service"
import { InMemoryEmployeeRepository } from "./mocks/repositories/InMemoryEmployeeRepository"
import { InMemoryParkingLotRepository } from "./mocks/repositories/InMemoryParkingLotRepository"
import { InMemoryReservationRepository } from "./mocks/repositories/InMemoryReservationRepository"

describe("Tests on reservation creation", () => {
    it("should create a reservation when parking lot is available", async () => {
        const employees = [{ id: 1, name: "John", reservations: [] }]
        const parkingLots = [{ id: 1, name: "A1", reservations: [] }]

        const employeeRepository = new InMemoryEmployeeRepository(employees)
        const parkingLotRepository = new InMemoryParkingLotRepository(parkingLots)
        const reservationRepository = new InMemoryReservationRepository()

        const reservationService = new ReservationService(employeeRepository, parkingLotRepository, reservationRepository)
        const reservation = await reservationService.createReservation({
            employeeId: 1,
            parkingLotId: 1,
            startDate: new Date("2026-04-01"),
            endDate: new Date("2026-04-02")
        })

        expect(reservation).toBeDefined()
    })
    

    it("should throw an error while trying create a reservation when parking lot is not available", async () => {
        const employee: Employee = { id: 1, name: "John", reservations: [] }
        const parkingLot: ParkingLot = { id: 1, name: "A1", reservations: [] }
        const existingReservation: Reservation = {
            id: 1,
            employee,
            parkingLot,
            startDate: new Date("2026-04-01"),
            endDate: new Date("2026-04-02"),
            checkedIn: false
        }

        parkingLot.reservations.push(existingReservation)
        employee.reservations.push(existingReservation)

        const employeeRepository = new InMemoryEmployeeRepository([employee])
        const parkingLotRepository = new InMemoryParkingLotRepository([parkingLot])
        const reservationRepository = new InMemoryReservationRepository([existingReservation])

        const reservationService = new ReservationService(employeeRepository, parkingLotRepository, reservationRepository)
        await expect(
            reservationService.createReservation({
                employeeId: 1,
                parkingLotId: 1,
                startDate: new Date("2026-04-01"),
                endDate: new Date("2026-04-02")
            })
        ).rejects.toThrow()
    })
})

