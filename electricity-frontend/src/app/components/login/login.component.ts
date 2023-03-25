import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  submitted = false;
  constructor(private router: Router, private messageService: MessageService) {
    this.loginForm = new FormGroup({
      'login': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }
  ngOnInit() {

  }

  onSubmit() {
    // Check form is valid and credentials are right or not
    if (this.loginForm.valid) {
      if (this.loginForm.value.login == 'admin' && this.loginForm.value.password == 'admin') {
        this.router.navigate(['/home']);
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Incorrect', detail: 'Username/Password Incorrect' });
      }
    }
    // this.submitted = true;
  }
}
