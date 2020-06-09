import { User } from './../../../core/models/user';
import { UserService } from './../../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormValidators } from '../../../core/helper/form.validators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formState: boolean = false;
  SignInFormGroup: FormGroup;
  SignUpFormGroup: FormGroup;
  errorHandling = false;
  user: User;
  faFacebookF = faFacebookF;


  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    public toast: ToastrService,
    public router: Router
  ) { }

  ngOnInit() {
    this.SignInFormGroup = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        FormValidators.validateEmail
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        FormValidators.validatePassword
      ])
    });

    this.SignUpFormGroup = this.formBuilder.group(
      {
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.pattern('[A-Za-zА-Яа-яЁёІіЇїЄє]{3,50}'),
          FormValidators.validateName
        ]),
        surname: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.pattern('[A-Za-zА-Яа-яЁёІіЇїЄє]{3,50}'),
          FormValidators.validateName
        ]),
        email_su: new FormControl('', [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          FormValidators.validateEmail
        ]),
        password_su: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          FormValidators.validatePassword
        ]),
        repeatPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(6)
        ])
      },
      {
        validators: [
          FormValidators.validatePasswords('password_su', 'repeatPassword')
        ]
      }
    );
  }

  get SignInForm() {
    return this.SignInFormGroup.controls;
  }

  get SignUpForm() {
    return this.SignUpFormGroup.controls;
  }

  onSubmit(): void {
    if (this.SignInFormGroup.invalid) {
      return;
    }

    const { email, password } = this.SignInFormGroup.value;
    this.authService.login(email, password).subscribe();
  }

  onSubmitSignUp(): void {
    if (this.SignUpFormGroup.invalid) {
      return;
    }

    if (this.errorHandling === true) {
      this.toast.error(
        'Користувач з такою поштою вже існує!<br> Можливо використайте відновлення паролю? '
        , 'Помилка :('
        , { enableHtml: true });

      return;
    }

    this.user = {
      name: this.SignUpFormGroup.get(['firstName']).value,
      surname: this.SignUpFormGroup.get(['surname']).value,
      email: this.SignUpFormGroup.get(['email_su']).value,
      password: this.SignUpFormGroup.get(['password_su']).value
    };

    this.userService.insertUser(this.user).subscribe(
      res => {
        const emailDomain = this.user.email.split('@', 2);
        this.toast.success(
          `Ваша реєстрація пройшла успішно! <br> Будь ласка перегляньте вашу пошту </a> <br> <a target="_blank" rel="noopener noreferrer" href="http://${emailDomain[1]}">Клік тут щоб перейти на домен пошти</a>`,
          'Вітаємо!', { enableHtml: true }
        );
        this.formState = false;
        this.router.navigate(['home']);
      },
      err => {
        this.toast.error('Реєстрація невдала!', 'Помилка :(');
      });

  }

  checkEmail(): void {
    if (this.SignUpFormGroup.controls.email_su.errors === null) {
      this.userService
        .getUserByEmail(this.SignUpFormGroup.get(['email_su']).value)
        .subscribe(res => {
          this.toast.error(
            'Користувач з такою поштою вже існує!',
            'Помилка!'
          );
          this.errorHandling = true;
          this.SignUpFormGroup.controls.email_su.setErrors({ error: true });
        },
          error => {
            this.errorHandling = false;
          }
        );
    }
  }
}
