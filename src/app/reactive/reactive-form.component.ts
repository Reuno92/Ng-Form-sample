import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'reactive-form',
    templateUrl: './reactive-form.component.html'
})

export class ReactiveFormComponent implements OnInit {
    form: FormGroup;
    nameError: string;
    usernameError: string;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {

        // Creation du formulaire.
        /*
        this.form = new FormGroup({
              name: new FormControl(''),
          username: new FormControl('')
        });
        */

        this.form = this.fb.group({
           name:      [''],
            username: ['']
        });

        // Observe les changement et la validation.
        this.form.valueChanges.subscribe(data => {
            console.log(data);

            // Validation de chaque champs
            const name = this.form.get('name');
            const username = this.form.get('username');

            if (name.invalid && name.dirty) {
                this.nameError = 'name is required.';
            }

            if (username.invalid && username.dirty) {
                this.usernameError = 'name is required.';
            }
        });

        console.log(this.form);
    }

    processForm() {
        console.log('Processing', this.form.value);
    }
}
