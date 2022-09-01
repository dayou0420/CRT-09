/***
 * 72
*/
interface Engineer {
    name: string;
    role: string;
}
interface Blogger {
    name: string;
    follower: number;
}
// type EngineerBlogger = Engineer & Blogger;
interface EngineerBlogger extends Engineer, Blogger {};
const quill: EngineerBlogger = {
    name: 'Quill',
    role: 'front-end',
    follower: 1000
};
type NumberBoolean = number | boolean;
type StringNumber = string | number;
type Mix = NumberBoolean & StringNumber;
/***
 * 73, 78, 84
*/
function toUpperCase(x: string): string;
function toUpperCase(x: number): number;
function toUpperCase(x: string | number) {
    if (typeof x === 'string') {
        return x.toUpperCase();
    }
    return x;
}
interface TmpFunc {
    (x: string): number;
    (x: number): number;
}
const upperHello: TmpFunc = function (x: string | number) { return 0 };
/***
 * 85
*/
// interface FuncA {
//     (a: number, b: string): number;
//     (a: string, b: number): number;
// }
// interface FuncB {
//     (a: string): number;
// }
// let intersectionFunc: FuncA & FuncB;
// intersectionFunc = function(a: number | string, b?: number | string){ return 0 };
/***
 * 86
*/
interface FuncA {
    (a: number): number;
}
interface FuncB {
    (a: string): string;
}
let unionFunc: FuncA | FuncB;
unionFunc = function (a: string) { return 'hi' };
// const upperHello = toUpperCase('hello');
// const upperHello = toUpperCase;
// upperHello('hi');
//  upperHello(32);
type NomadWorker = Engineer | Blogger;
function describeProfile(nomadWorker: NomadWorker) {
    console.log(nomadWorker.name);
    if ('role' in nomadWorker) {
        console.log(nomadWorker.role);
    }
    if ('follower' in nomadWorker) {
        console.log(nomadWorker.follower);
    }
}
/***
 * 74
*/
class Dog {
    kind: 'dog' = 'dog';
    speak() {
        console.log('bow-wow');
    }
}
class Bird {
    kind: 'bird' = 'bird';
    speak() {
        console.log('tweet-tweet');
    }
    fly() {
        console.log('flutter');
    }
}
type Pet = Dog | Bird;
function havePet(pet: Pet) {
    pet.speak();
    switch (pet.kind) {
        case 'bird':
            pet.fly();
    }
    if (pet instanceof Bird) {
        pet.fly();
    }
}
havePet(new Bird());
/***
 * 75, 76
*/
const input = document.getElementById('input') as HTMLInputElement;
// const input = document.getElementById('input')!;
input.value = 'initial input value';
/***
 * 77
*/
interface Desiner {
    name: string;
    [index: string]: string;
}
const desiner: Desiner = {
    name: 'Quill',
    role: 'web'
}
/***
 * 79
*/
interface DownloadedData {
    id: number;
    user?: {
        name?: {
            first: string;
            last: string;
        }
    }
}
const downloadedData: DownloadedData = {
    id: 1
};
console.log(downloadedData.user?.name?.first);
/***
 * 80
*/
const userData = downloadedData.user ?? 'no-user';
/***
 * 81
*/
type id = DownloadedData["id" | "user"];
/***
 * 82
*/
enum Color {
    RED,
    BLUE
}
class AdvancedPerson {
    name: string = 'Peter';
    age: number = 35;
}
class AdvancedCar {
    name: string = 'Prius';
    age: number = 5;
}
let target = new AdvancedPerson();
let source = new AdvancedCar();
target = source;
/***
 * 87
*/
function advancedFn(...args: [number, string, boolean?, ...number[]]) {
}
advancedFn(0, 'hi', true, 3, 3, 3, 3);
