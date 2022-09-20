/***
 * 105, 106
*/
function Logger(logString: string) {
    // console.log('LOGGER ファクトリ');
    return function(constructor: Function) {
        // console.log(logString);
        // console.log(constructor);
    }
}
/***
 * 107、108, 112
*/
function withTemplate(template: string, hookId: string) {
    // console.log('TEMPLATE ファクトリ');
    return function<T extends {new(...args: any[]): {name: string}}>(originalConstructor: T) {
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super();
                // console.log('テンプレートを表示');
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name;
                }
            }
        }
    }
}
/***
 * 108
*/
// @Logger('ログ出力中 - PERSON')
// @Logger('ログ出力中')
// @withTemplate('<h1>Personオブジェクト</h1>', 'app')
class Person {
    name = 'Max';
    constructor() {
        // console.log('Personオブジェクトを作成中...');
    }
}
const pers = new Person();
// console.log(pers);
/***
 * 109
*/
function Log(target: any, propertyName: string | Symbol) {
    console.log('Property デコレータ');
    console.log(target, propertyName);
}
/***
 * 110
*/
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accessor デコレータ');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('Method デコレータ');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log4(target: any, name: string | Symbol, position: number) {
    console.log('Parameter デコレータ');
    console.log(target);
    console.log(name);
    console.log(position);
}
/***
 * 111
*/
class Product {
    // @Log
    title: string;
    private _price: number;
    // @Log2
    set price(val: number) {
        if (val > 0) {
            this._price = val;
        } else {
            throw new Error('不正な価格です - 0以下は設定できません');
        }
    }
    constructor(t:string, p:number) {
        this.title = t;
        this._price = p;
    }
    // @Log3
    getPriceWithTax(tax: number) {
        return this._price * (1 + tax);
    }
}
const p1 = new Product('Book', 100);
const p2 = new Product('Book', 200);
/***
 * 114
*/
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
class Printer {
    message = 'クリックしました！';
    // @Autobind
    showMessage() {
        console.log(this.message);
    }
}
// const p = new Printer();
// const button = document.querySelector("button")!;
// button.addEventListener('click', p.showMessage);
/***
 * 115, 116, 117
*/
interface ValidatorCOnfig {
    [prop: string]: {
        [validatableProp: string]: string[] // ['required', 'positive']
    }
}
const registeredValidators: ValidatorCOnfig = {};
function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['required'],
    }
}
function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['positive'],
    }
}
function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}
class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;
    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
}
const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;
    const title = titleEl.value;
    const price = +priceEl.value;
    const createCourse = new Course(title, price);
    if (!validate(createCourse)) {
        alert('正しく入力してください！');
    }
    console.log(createCourse);
});
