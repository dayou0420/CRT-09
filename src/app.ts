import { Observable, switchMap, of, catchError } from 'rxjs'
import { fromFetch } from 'rxjs/fetch';
const observable$ = new Observable<string>(subscriber => {
    console.log('Observable executed');
    subscriber.next('Alice');
    setTimeout(() => subscriber.next('Ben'), 2000);
    setTimeout(() => subscriber.next('Charlie'), 4000);
});
console.log('Subscription 1 starts');
observable$.subscribe((value: string) => console.log('Subscription 1:', value));
setTimeout(() => {
    console.log('Subscription 2 starts');
    observable$.subscribe((value: string) => console.log('Subscription 2:', value));
}, 1000);
const data$ = fromFetch('https://webapi-695u.onrender.com/foods').pipe(
    switchMap(response => {
        if (response.ok) {
            return response.json();
        } else {
            return of({ error: true, message: `Error ${ response.status }` });
        }
    }),
    catchError(err => {
        console.error(err);
        return of({ error: true, message: err.message })
    })
);
data$.subscribe({
    next: result => console.log(result)
});
