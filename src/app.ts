/***
 * 15, 17, 18
*/
const person: {
    name: string;
    age: number;
    hobbies: string[];
    role: [number, string]
} = {
    name: 'yota',
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    role: [2, 'author']
};
// person.role.push('admin');
// person.role[1] = 10;
// person.role = [0, 'admin', 'user'];
// console.log(person);
let favoriteActivities: string[];
favoriteActivities = ['Sports'];
for (const hobbies of person.hobbies) {
    console.log(hobbies.toUpperCase());
}
/***
 * 10, 11, 12, 13, 14
*/
function add(n1: number, n2: number, showResult: boolean, phrase: string) {
    // if (typeof n1 !== 'number' || typeof n2 !== 'number') {
    //     throw new Error('入力値が正しくありません');
    // }
    const result = n1 + n2;
    if (showResult) {
        return phrase + result;
    } else {
        return result;
    }
}
let number1;
number1 = 5;
const number2 = 2.8;
const printResult = true;
const resultPhrase = 'Result: ';
add(number1, number2, printResult, resultPhrase);
