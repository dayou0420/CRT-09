/***
 * 105, 106
*/
function Logger(logString: string) {
    return function(constructor: Function) {
        console.log(logString);
        console.log(constructor);
    }
}
/***
 * 107
*/
function withTemplate(template: string, hookId: string) {
    return function(constructor: any) {
        const hookEl = document.getElementById(hookId);
        const p = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector('h1')!.textContent = p.name;
        }
    }
}
// @Logger('ログ出力中 - PERSON')
@withTemplate('<h1>Personオブジェクト</h1>', 'app')
class Person {
    name = 'Max';
    constructor() {
        console.log('Personオブジェクトを作成中...');
    }
}
const pers = new Person();
console.log(pers);
