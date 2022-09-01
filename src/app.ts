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
 * 73, 78
*/
function toUpperCase(x: string): string;
function toUpperCase(x: number): number;
function toUpperCase(x: string | number) {
    if (typeof x === 'string') {
        return x.toUpperCase();
    }
    return x;
}
const upperHello = toUpperCase('hello');
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
