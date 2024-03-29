/***
 * 59, 60, 62, 63, 64, 65, 66, 67, 68, 69
*/
abstract class Department {
    static fiscalYear = 2020;
    // private id: string;
    // name: string;
    protected employee: string[] = [];
    static createEmployee(name: string) {
        return { name: name };
    }
    constructor(protected readonly id: string, public name: string) {
        // this.id = id;
        // this.name = n;
    }
    abstract describe(this: Department): void;
    addEmployee(employee: string) {
        this.employee.push(employee);
    }
    printEmployeeInformation() {
        console.log(this.employee.length);
        console.log(this.employee);
    }
}
class ITDepartment extends Department {
    admins: string[];
    constructor(id: string, admins: string[]) {
        super(id, 'IT');
        this.admins = admins;
    }
    describe() {
        console.log('IT部門 - ID' + this.id);
    }
}
class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment;
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('レポートが見つかりません。');
    }
    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error('正しい値を設定してください。');
        }
        this.addReport(value);
    }
    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment('d2', []);
        return this.instance;
    }
    describe() {
        console.log('会計部門 - ID: ' + this.id);
    }
    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }
    printReports() {
        console.log(this.reports);
    }
    addEmployee(name: string) {
        if (name === 'Max') {
            return;
        }
        this.employee.push(name);
    }
}
const employee1 = Department.createEmployee('Max');
console.log(employee1, Department.fiscalYear);
// const it = new ITDepartment('d1', ['Max']);
// it.addEmployee('Max');
// it.addEmployee('Manu');
const accounting = AccountingDepartment.getInstance();
accounting.mostRecentReport = '通期会計レポート';
accounting.addReport('Something');
console.log(accounting.mostRecentReport);
accounting.addEmployee('Max');
accounting.addEmployee('Manu');
accounting.describe();
// accounting.printReports();
// accounting.printEmployeeInformation();
// accounting.employee[2] = 'Anna';
// accounting.name = 'NEW NAME';
// it.describe();
// it.printEmployeeInformation();
// console.log(it);
// const accountingCopy = { name: 'DUMMY', describe: accounting.describe };
// accountingCopy.describe();
/***
 * 53
*/
// const add = (...numbers: number[]) => {
//     return numbers.reduce((curResult, curValue) => {
//         return curResult + curValue;
//     }, 0);
// };
// const addedNumbers = add(5, 10, 2, 3.7);
// console.log(addedNumbers);
/***
 * 52
*/
// const hobbies = ['Sports', 'Cooking'];
// const activeHobbies = ['Hiking', ...hobbies];
// activeHobbies.push(...hobbies);
// const person = {
//     firstName: 'Max',
//     age: 30
// };
// const copiedPerson = {
//     ...person
// };
/***
 * 54
*/
// const [hobby1, hobby2, ...remainingHobbies] = hobbies;
// console.log(hobbies, hobby1, hobby2);
// const { firstName: userName, age } = person;
// console.log(userName, age, person);
/***
 * 50、51
*/
// const add = (a: number, b: number = 1) => a + b;
// const printOutput: (output: string | number) => void = output => {
//     console.log(output);
// };
// // printOutput(add(2));
// const button = document.querySelector('button');
// if (button) {
//     button.addEventListener('click', event => {
//         console.log(event);
//     });
// }
/***
 * 49
*/
// const userName = 'Max';
// let age = 30;
// age = 29;
// function add(a: number, b: number) {
//     let result;
//     result = a + b;
//     return result;
// }
// console.log(result);
// if (age >= 20) {
//     let isAdult = true;
// }
// console.log(isAdult);
/***
 * 29
*/
// function generateError(message: string, code: number): never {
//     throw { message: message, errorCode: code };
// }
// const result = generateError('エラーが発生しました', 500);
// console.log(result);
/***
 * 28
*/
// let userInput: unknown;
// let userName: string;
// userInput = 5;
// userInput = 'Max';
// if (typeof userInput === 'string') {
//     userName = userInput;
// }
/***
 * 25, 26
*/
// function add(n1: number, n2: number): number {
//     return n1 + n2;
// }
// function printResult(num: number): void {
//     console.log('Result: ' + num);
// }
// let combineValues: (a: number, b: number) => number;
// combineValues = add;
// combineValues = 5;
// combineValues = printResult;
// console.log(combineValues(8, 8));
// printResult(add(5, 12));
// function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
//     const result = n1 + n2;
//     cb(result);
// }
// addAndHandle(10, 20, result => {
//     console.log(result);
// });
/***
 * 23
*/
// type Combinable = number | string;
// type ConversionDescriptor = 'as-number' | 'as-text';
/***
 * 21, 22
*/
// function combine(
//     input1: Combinable,
//     input2: Combinable,
//     resultConversion: ConversionDescriptor
// ) {
//     let result;
//     if (typeof input1 === 'number' && typeof input2 === 'number' ||
//         resultConversion === 'as-number'
//     ) {
//         result = +input1 + +input2;
//     } else {
//         result = input1.toString() + input2.toString();
//     }
//     return result;
//     // if (resultConversion === 'as-number') {
//     //     return +result;
//     // } else {
//     //     return result.toString();
//     // }
// }
// const combinedAges = combine(30, 26, 'as-number');
// console.log(combinedAges);
// const combinedStringAges = combine('30', '26', 'as-number');
// console.log(combinedStringAges);
// const combinedNames = combine('Max', 'Anna', 'as-text');
// console.log(combinedNames);
/***
 * 19
*/
// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;
// enum Role {
//     ADMIN,
//     READ_ONLY,
//     AUTHOR
// }
// const person = {
//     name: 'yota',
//     age: 30,
//     hobbies: ['Sports', 'Cooking'],
//     role: Role.ADMIN
// };
// if (person.role === Role.ADMIN) {
//     console.log('管理者ユーザ');
// }
/***
 * 15, 17, 18, 20
*/
// const person: {
//     name: string;
//     age: number;
//     hobbies: string[];
//     role: [number, string]
// } = {
//     name: 'yota',
//     age: 30,
//     hobbies: ['Sports', 'Cooking'],
//     role: [2, 'author']
// };
// person.role.push('admin');
// person.role[1] = 10;
// person.role = [0, 'admin', 'user'];
// console.log(person);
// let favoriteActivities: string[];
// favoriteActivities = ['Sports'];
// for (const hobbies of person.hobbies) {
//     console.log(hobbies.toUpperCase());
// }
/***
 * 10, 11, 12, 13, 14
*/
// function add(n1: number, n2: number, showResult: boolean, phrase: string) {
//     // if (typeof n1 !== 'number' || typeof n2 !== 'number') {
//     //     throw new Error('入力値が正しくありません');
//     // }
//     const result = n1 + n2;
//     if (showResult) {
//         return phrase + result;
//     } else {
//         return result;
//     }
// }
// let number1;
// number1 = 5;
// const number2 = 2.8;
// const printResult = true;
// const resultPhrase = 'Result: ';
// add(number1, number2, printResult, resultPhrase);
