import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
    selector: 'reactive-form',
    styles: [
        'details > summary::-webkit-details-marker { display: none; }',
        'details > summary { background: lightgrey; outline: none; }',
        'details[open] > summary { background: rgba(0, 123, 255, .8); outline: none;}'
    ],
    templateUrl: './reactive-form.component.html'
})
export class ReactiveFormComponent implements OnInit {
    form: FormGroup;

    formErrors = {
        name: '',
        username: '',
        addresses: [{
            city: '',
            country: ''
        }],
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
        addresses: {
            city: {
                required : 'City is required.',
                minlength: 'City must be 3 characters.'
            },
            country: {
                required : 'Country is required.'
            }
        }
    };

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        // Construction du modèle de données pour le reactive form
        this.buildForm();
        console.log(this.form);
    }

    buildForm() {
        // Creation du formulaire.
        this.form = this.fb.group({
            name: ['', [Validators.minLength(3), Validators.maxLength(6)]],
            username: ['', Validators.minLength(3)],
            addresses: this.fb.array([
                this.createAddress()
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

    validateAddresses() {
        // Grab the addresses formarray
        const addresses = <FormArray>this.form.get('addresses');
        // Clear the form errors
        this.formErrors.addresses = [];

        // Loop through however many formgroups are in the formarray
        let n = 1;

        while (n <= addresses.length) {
            // Add the clear errors back
            this.formErrors.addresses.push({city: '', country: ''});

            // Grab the specific group (Address)
            const address = <FormGroup>addresses.at(n - 1);

            // Validate that specific group. Loop through the groups controls
            for (let field in address.controls) {
                // Get the formcontrol
                const input = address.get(field);

                //  Do the validation and save errors to formerrors if necessary
                if (input.invalid && input.dirty) {
                    for (let error in input.errors) {
                        this.formErrors.addresses[n - 1][field] = this.validationMessages.addresses[field][error];
                    }
                }
            }

            n++;
        }
    }

    createAddress() {
        return this.fb.group({
            city: ['', Validators.minLength(3)],
            country: [''],
        });
    }

    addAdress() {
        const addresses = <FormArray>this.form.get('addresses');
        addresses.push(this.createAddress());
        console.log(this.form.controls);
    }

    removeAdress(i) {
        const addresses = <FormArray>this.form.get('addresses');
        addresses.removeAt(i);
    }

    processForm() {
        console.log('Processing', this.form.value);
    }
}
