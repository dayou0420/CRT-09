/***
 * 94
*/
const names: Array<string> = []; // string[]
// names[0].split(' ');
const promise = new Promise<string>((resolve, reject) => {
    setTimeout(() => {
        resolve('終わりました！');
    }, 2000);
});
promise.then(data => {
    data.split(' ');
});
/***
 * 95, 96
*/
function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}
const mergedObj = merge({ name: 'Max', hobbies: ['Sports'] }, { age: 30 });
console.log(mergedObj.age);
