/***
 * 83
*/
type Admin = {
    name: string;
    privileges: string[];
}
type Employee = {
    name: string;
    startDate: Date;
}
// interface ElevatedEmploee extends Employee, Admin {};
type ElevatedEmploee = Admin & Employee;
const e1: ElevatedEmploee = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date()
}
type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;
