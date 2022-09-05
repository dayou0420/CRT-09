/***
 * 50
*/
const add = (a: number, b: number) => a + b;
const printOutput: (output: string | number) => void = output => {
    console.log(output);
};
printOutput(add(2, 5));
const button = document.querySelector('button');
if (button) {
    button.addEventListener('click', event => {
        console.log(event);
    });
}
/***
 * 49
*/
const userName = 'Max';
let age = 30;
age = 29;
// function add(a: number, b: number) {
//     let result;
//     result = a + b;
//     return result;
// }
// console.log(result);
if (age >= 20) {
    let isAdult = true;
}
// console.log(isAdult);
/***
 * 29
*/
function generateError(message: string, code: number): never {
    throw { message: message, errorCode: code };
}
// const result = generateError('エラーが発生しました', 500);
// console.log(result);
/***
 * 28
*/
let userInput: unknown;
// let userName: string;
userInput = 5;
userInput = 'Max';
if (typeof userInput === 'string') {
    // userName = userInput;
}
/***
 * 25, 26
*/
// function add(n1: number, n2: number): number {
//     return n1 + n2;
// }
function printResult(num: number): void {
    // console.log('Result: ' + num);
}
let combineValues: (a: number, b: number) => number;
// combineValues = add;
// combineValues = 5;
// combineValues = printResult;
// console.log(combineValues(8, 8));
// printResult(add(5, 12));
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
    const result = n1 + n2;
    cb(result);
}
addAndHandle(10, 20, result => {
    // console.log(result);
});
/***
 * 23
*/
type Combinable = number | string;
type ConversionDescriptor = 'as-number' | 'as-text';
/***
 * 21, 22
*/
function combine(
    input1: Combinable,
    input2: Combinable,
    resultConversion: ConversionDescriptor
) {
    let result;
    if (typeof input1 === 'number' && typeof input2 === 'number' ||
        resultConversion === 'as-number'
    ) {
        result = +input1 + +input2;
    } else {
        result = input1.toString() + input2.toString();
    }
    return result;
    // if (resultConversion === 'as-number') {
    //     return +result;
    // } else {
    //     return result.toString();
    // }
}
const combinedAges = combine(30, 26, 'as-number');
// console.log(combinedAges);
const combinedStringAges = combine('30', '26', 'as-number');
// console.log(combinedStringAges);
const combinedNames = combine('Max', 'Anna', 'as-text');
// console.log(combinedNames);
/***
 * 19
*/
// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;
enum Role {
    ADMIN,
    READ_ONLY,
    AUTHOR
}
const person = {
    name: 'yota',
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    role: Role.ADMIN
};
if (person.role === Role.ADMIN) {
    // console.log('管理者ユーザ');
}
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
let favoriteActivities: string[];
favoriteActivities = ['Sports'];
for (const hobbies of person.hobbies) {
    // console.log(hobbies.toUpperCase());
}
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
let number1;
number1 = 5;
const number2 = 2.8;
// const printResult = true;
// const resultPhrase = 'Result: ';
// add(number1, number2, printResult, resultPhrase);
