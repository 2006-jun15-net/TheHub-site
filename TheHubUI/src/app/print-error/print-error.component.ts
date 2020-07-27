import {Component, Input} from '@angular/core';

@Component({
    selector: 'print-error',
    templateUrl: './print-error.component.html',
    providers: []
})
export class PrintErrorComponent {

    @Input("control")
    control: any;

}