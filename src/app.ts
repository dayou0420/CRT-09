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
declare var Chart: any;
type WeightType = [{
    _id: string;
    __v: number;
    date: string;
    weight: number;
    body_mass_index: number;
    body_fat_percentage: number;
}];
class WeightClient {
    private static instance: WeightClient;
    private data$: any;
    private constructor() {
        this.fetch();
        this.subscribe();
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new WeightClient();
        return this.instance;
    }
    private fetch() {
        this.data$ = fromFetch('https://webapi-695u.onrender.com/weights').pipe(
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
        )
    }
    private subscribe() {
        this.data$.subscribe({
            next: (result: WeightType) => {
                const date = result.map(m => m.date);
                const weight = result.map(m => m.weight);
                const body_mass_index = result.map(m => m.body_mass_index);
                const body_fat_percentage = result.map(m => m.body_fat_percentage);
                const weights = {
                    labels: date,
                    datasets:
                    [{
                        label: 'Weight',
                        data: weight,
                        borderColor: 'rgb(75, 192, 192)'
                    },
                    {
                        label: 'BMI',
                        data: body_mass_index,
                        borderColor: 'rgb(255, 99, 132)',
                    },
                    {
                        label: 'Body Fat Percentage',
                        data: body_fat_percentage,
                        borderColor: 'rgb(54, 162, 235)',
                    }]
                };
                new Chart(document.getElementById('weight'), {
                    type: 'line',
                    data: weights,
                    options: {
                        layout: {
                            padding: 20
                        }
                    }
                });
            }
        });
    }
}
WeightClient.getInstance();
