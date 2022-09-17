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
 * 95
*/
function merge<T, U>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}
const mergedObj = merge({ name: 'Max' }, { age: 30 });
mergedObj.age;
