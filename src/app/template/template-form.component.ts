import { Component, OnInit } from '@angular/core';

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

    ngOnInit() {
        this.user = {
            name: '',
            username: ''
        };
    }

    get diagnostic() {
        return JSON.stringify(this.user);
    }
}
