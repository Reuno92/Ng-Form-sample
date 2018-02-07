import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
        // Construction du modèle de données pour le reactive form
        this.buildForm();
    }

    buildForm() {
        // Creation du formulaire.
        this.form = this.fb.group({
            name: ['', [Validators.minLength(3), Validators.maxLength(6)]],
            username: ['', Validators.minLength(3)]
        });

        // Observe les changement et la validation.
        this.form.valueChanges.subscribe(data => this.validateForm());
        console.log(this.form);
    }

    validateForm() {
        this.nameError     = '';
        this.usernameError = '';

        // Validation de chaque champs.
        const name     = this.form.get('name');
        const username = this.form.get('username');

        if (name.invalid && name.dirty) {

            if (name.errors['required']) {
                this.nameError = 'name is required.';
            }

            if (name.errors['minlength']) {
                this.nameError = 'Name must be at least  3 characters.';
            }

            if (name.errors['maxlength']) {
                this.nameError = 'Name can\'t be more than 6 characters.';
            }
        }

        if (username.invalid && username.dirty) {

            if (username.errors['required']) {
                this.usernameError = 'name is required.';
            }

            if (username.errors['minlength']) {
                this.usernameError = 'Name must be at least  3 characters.';
            }
        }
    }

    processForm() {
        console.log('Processing', this.form.value);
    }
}
