import { Router } from '@angular/router';
import { RequestLogin } from './../../../interfaces/RequestLogin.model';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: [ '', Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
    });
  }

  checkEmail() {
    return (
      this.loginForm.controls['email'].dirty &&
      this.loginForm.hasError('required', 'email')
    );
  }

  checkEmailValid() {
    return (
      this.loginForm.controls['email'].dirty &&
      this.loginForm.hasError('email', 'email')
    );
  }

  checkPassword() {
    return (
      this.loginForm.controls['senha'].dirty &&
      this.loginForm.hasError('required', 'senha')
    );
  }

  checkPasswordValid() {
    return (
      this.loginForm.controls['senha'].dirty &&
      this.loginForm.hasError('minlength', 'senha')
    );
  }

  onSubmit() {
    if (this.loginForm.valid) {
      //ENVIAR DADOS PARA A API
      this.fazerLogin();
    }
      else {
      //Disparo do erro
      this.validateAllFormFields(this.loginForm);
    }
  }

  fazerLogin(): void{
    const apiUrl = 'api/usuario/login'
    const requestLogin: RequestLogin = this.loginForm.value;
    this.loginService.Login(apiUrl, requestLogin).subscribe(()=>{
      this.router.navigate(['/home']);
    }, (error) => alert('Erro ao efetuar login!'))
  }

  //Percorre o formulario e valida os inputs caso estejam vazios
  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
