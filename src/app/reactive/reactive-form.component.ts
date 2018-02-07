import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'reactive-form',
    templateUrl: './reactive-form.component.html'
})
export class ReactiveFormComponent implements OnInit {
    form: FormGroup;

    constructor() {}

    ngOnInit() {

        // Creation du formulaire.
        this.form = new FormGroup({
              name: new FormControl(''),
          username: new FormControl('')
        });

        console.log(this.form);
    }

    processForm() {
        console.log('Processing', this.form.value);
    }
}
