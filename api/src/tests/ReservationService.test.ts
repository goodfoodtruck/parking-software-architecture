// import { EmployeeDTO } from "../dtos/out/EmployeeDTO"
// import { Employee } from "../entities/Employee.entity"
// import { ParkingLot } from "../entities/ParkingLot.entity"
// import { Reservation } from "../entities/Reservation.entity"
// import { ReservationService } from "../services/Reservation.service"
// import { InMemoryEmployeeRepository } from "./mocks/repositories/InMemoryEmployeeRepository"
// import { InMemoryParkingLotRepository } from "./mocks/repositories/InMemoryParkingLotRepository"
// import { InMemoryReservationRepository } from "./mocks/repositories/InMemoryReservationRepository"

// describe("Tests on reservation creation", () => {
//     it("should create a reservation when parking lot is available", async () => {
//         const employees: Employee[] = [{ id: 1, firstName: "John", lastName: "Doe", phone: "1234567890", email: "john.doe@example.com" , automobile: "Toyota", electric: false, role: "EMPLOYEE", reservations: [] }]
//         const parkingLots: ParkingLot[] = [{ id: 1, name: "A1", electric: false, reservations: [] }]

//         const employeeRepository = new InMemoryEmployeeRepository(employees)
//         const parkingLotRepository = new InMemoryParkingLotRepository(parkingLots)
//         const reservationRepository = new InMemoryReservationRepository()

//         const reservationService = new ReservationService(employeeRepository, parkingLotRepository, reservationRepository)
//         const reservation = await reservationService.createReservation({
//             employeeId: 1,
//             parkingLotId: 1,
//             startDate: new Date("2026-04-01"),
//             endDate: new Date("2026-04-02")
//         })

//         expect(reservation).toBeDefined()
//     })
    

//     it("should throw an error while trying create a reservation when parking lot is not available", async () => {
//         const employee: Employee = { id: 1, firstName: "John", lastName: "Doe", phone: "1234567890", email: "john.doe@example.com" , automobile: "Toyota", electric: false, role: "EMPLOYEE", reservations: [] }
//         const parkingLot: ParkingLot = { id: 1, name: "A1", electric: false, reservations: [] }
//         const existingReservation: Reservation = {
//             id: 1,
//             employee,
//             parkingLot,
//             startDate: new Date("2026-04-01"),
//             endDate: new Date("2026-04-02"),
//             checkedIn: false
//         }

//         parkingLot.reservations.push(existingReservation)
//         employee.reservations.push(existingReservation)

//         const employeeRepository = new InMemoryEmployeeRepository([employee])
//         const parkingLotRepository = new InMemoryParkingLotRepository([parkingLot])
//         const reservationRepository = new InMemoryReservationRepository([existingReservation])

//         const reservationService = new ReservationService(employeeRepository, parkingLotRepository, reservationRepository)
//         await expect(
//             reservationService.createReservation({
//                 employeeId: 1,
//                 parkingLotId: 1,
//                 startDate: new Date("2026-04-01"),
//                 endDate: new Date("2026-04-02")
//             })
//         ).rejects.toThrow()
//     })

//     it("should validate employee reservation right and wrong durations", () => {
//         const EMPLOYEE_MAX_RESERVATION_DURATION_DAYS = 5
//         const employeeRepository = new InMemoryEmployeeRepository()
//         const parkingLotRepository = new InMemoryParkingLotRepository()
//         const reservationRepository = new InMemoryReservationRepository()
//         const reservationService = new ReservationService(employeeRepository, parkingLotRepository, reservationRepository)

//         const rightDurationValidated = reservationService.validateReservationDates(
//             new Date("2026-04-01"), 
//             new Date("2026-04-05"), 
//             EMPLOYEE_MAX_RESERVATION_DURATION_DAYS
//         )

//         const wrongDurationValidated = reservationService.validateReservationDates(
//             new Date("2026-04-01"), 
//             new Date("2026-04-06"), 
//             EMPLOYEE_MAX_RESERVATION_DURATION_DAYS
//         )

//         expect(rightDurationValidated).toBe(true)
//         expect(wrongDurationValidated).toBe(false)
//     })

//     it("should validate manager reservation right and wrong durations", () => {
//         const MANAGER_MAX_RESERVATION_DURATION_DAYS = 30
//         const employeeRepository = new InMemoryEmployeeRepository()
//         const parkingLotRepository = new InMemoryParkingLotRepository()
//         const reservationRepository = new InMemoryReservationRepository()
//         const reservationService = new ReservationService(employeeRepository, parkingLotRepository, reservationRepository)

//         // more than 1 and less than 30 days
//         const rightDurationValidated = reservationService.validateReservationDates(
//             new Date("2026-04-01"), 
//             new Date("2026-04-05"), 
//             MANAGER_MAX_RESERVATION_DURATION_DAYS
//         )

//         // more than 30 days
//         const wrongDurationValidated = reservationService.validateReservationDates(
//             new Date("2026-04-01"), 
//             new Date("2026-05-02"), 
//             MANAGER_MAX_RESERVATION_DURATION_DAYS
//         )

//         expect(rightDurationValidated).toBe(true)
//         expect(wrongDurationValidated).toBe(false)
//     })
// })

