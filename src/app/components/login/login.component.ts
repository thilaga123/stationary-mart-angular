import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  submitted:boolean = false;

  constructor(private fb:FormBuilder,  private router: Router, private service: AppService) { }

  ngOnInit() {
    this.setForm();
  }

  setForm():void{
    this.form = this.fb.group({
      userName: [null, Validators.required],
      password: [null,[Validators.required]]
    });
  }

  hasError(controlName, validationName){
    return this.form.get(controlName).hasError(validationName) && (this.form.get(controlName).touched || this.submitted);
  }

  onSubmit():void{
    this.submitted = true;
    if(this.form.valid){
      this.service.login(this.form.value).subscribe((res)=>{
        if(this.service.loggedIn()){
          this.router.navigate(['/home']);
        }else{
          console.log('error',res.message);
        }
      });
    }
  }

}



