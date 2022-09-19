/***
 * 105, 106
*/
function Logger(logString: string) {
    console.log('LOGGER ファクトリ');
    return function(constructor: Function) {
        console.log(logString);
        console.log(constructor);
    }
}
/***
 * 107
*/
function withTemplate(template: string, hookId: string) {
    console.log('TEMPLATE ファクトリ');
    return function(constructor: any) {
        console.log('テンプレートを表示');
        const hookEl = document.getElementById(hookId);
        const p = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector('h1')!.textContent = p.name;
        }
    }
}
/***
 * 108
*/
// @Logger('ログ出力中 - PERSON')
@Logger('ログ出力中')
@withTemplate('<h1>Personオブジェクト</h1>', 'app')
class Person {
    name = 'Max';
    constructor() {
        console.log('Personオブジェクトを作成中...');
    }
}
const pers = new Person();
console.log(pers);
