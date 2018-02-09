import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
    selector: 'reactive-form',
    templateUrl: './reactive-form.component.html'
})
export class ReactiveFormComponent implements OnInit {
    form: FormGroup;

    formErrors = {
        name: '',
        username: '',
        email: ''
    };

    validationMessages = {
        name: {
            required : 'Name is required.',
            minlength: 'Name must be at least 3 characters.',
            maxlength: 'Name can\'t be longer than 6 characters.'
        },
        username: {
            required : 'Username is required.',
            minlength: 'Username must be 3 characters.'
        },
        email: {
            required : 'email is required.',

        }
    };

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        // Construction du modèle de données pour le reactive form
        this.buildForm();
    }

    buildForm() {
        // Creation du formulaire.
        this.form = this.fb.group({
            name: ['', [Validators.minLength(3), Validators.maxLength(6)]],
            username: ['', Validators.minLength(3)],
            addresses: this.fb.array([
                this.fb.group({
                    city: [''],
                    country: ['']
                })
            ])
        });

        // Observe les changement et la validation.
        this.form.valueChanges.subscribe(data => this.validateForm());
    }

    validateForm() {
        // loop over the formErrors field names
        for (const field in this.formErrors) {
            // Clear that inpur field errors
            this.formErrors[field] = '';

            // Grab an input field by name
            const input = this.form.get(field);

            if (input.invalid && input.dirty) {
                // Figure out the type of error
                // Assign that type of error message to a variable
                for (const error in input.errors) {
                    // Assign that type of error message to a variable
                    this.formErrors[field] = this.validationMessages[field][error];
                }
            }
        }

        // Validation de chaque champs.
        const name     = this.form.get('name');
        const username = this.form.get('username');

    }

    addAdress() {
        const addresses = <FormArray>this.form.get('addresses');
        addresses.push(this.fb.group({
            city: [''],
            country: ['']
        }));
    }

    removeAdress(i) {
        const addresses = <FormArray>this.form.get('addresses');
        addresses.removeAt(i);
    }

    processForm() {
        console.log('Processing', this.form.value);
    }
}
