export interface EmployeeDTO {
    id: number
    firstName: string
    lastName: string
    email: string
    phone?: string
    automobile: boolean
    electric: boolean
    role: 'EMPLOYEE' | 'MANAGER' | 'SECRETARY'
}