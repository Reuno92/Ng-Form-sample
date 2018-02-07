import { Component, OnInit } from '@angular/core';
import {Validators} from '@angular/forms';

export class User {
    name: string;
    username: string;
}

@Component({
    selector: 'template-form',
    styleUrls: ['./template-form.component.css'],
    templateUrl: './template-form.component.html'
})

export class TemplateFormComponent implements OnInit {
    user: User;
    submitted: boolean = false; // Vérification si le formulaire est soumis.

    ngOnInit() {
        this.user = {
            name: '',
            username: ''
        };
    }

    get diagnostic() {
        return JSON.stringify(this.user);
    }

    processForm() {
        console.log(this.user);
        this.submitted = true;
    }

    // Créer un utilisateur
    // this.service.createUser(this.user)…
}
