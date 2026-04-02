import { NextFunction, Request, Response } from "express";
import { EmployeeService } from "../services/Employee.service";
import { AController } from "./AController";
import { ReservationService } from "../services/Reservation.service";

export class EmployeeController extends AController {
    constructor(
        private readonly employeeService: EmployeeService,
        private readonly reservationService: ReservationService
    ) {
        super()
        this.router.get("/", this.getEmployees)
        this.router.patch("/:id/reservations/:reservationId", this.checkIn)
        this.router.post("/createUser", this.createEmployee)
    }

    private getEmployees = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const employees = await this.employeeService.getEmployees()
            return res.status(200).json(employees)
        }
        catch(error) {
            next(error)
        }
    }

    private checkIn = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const { id, reservationId } = req.params;
            
            await this.reservationService.checkIn(+reservationId, +id);

            return res.status(204).send();
        }
        catch (error) {
            next(error)
        }
    }

    private createEmployee = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const { firstName, lastName, email, phone, automobile, electric } = req.body;

            const newEmployee = await this.employeeService.createEmployee({ firstName, lastName, email, phone, automobile, electric });

            return res.status(201).json(newEmployee);
        }
        catch (error) {
            next(error)
        }
    }
}