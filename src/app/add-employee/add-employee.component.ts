import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {

  addEmployeeForm: FormGroup

  constructor(private fb:FormBuilder, private api:ApiService){
    this.addEmployeeForm = this.fb.group({
      username:["",[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      age:["",[Validators.required,Validators.pattern('[0-9]*')]],
      status:["",Validators.required],
      email:["",[Validators.required,Validators.email]]
    })
  }

  addEmployee(){
    if(this.addEmployeeForm.valid){
      const username = this.addEmployeeForm.value.username
      const age = this.addEmployeeForm.value.age
      const status = this.addEmployeeForm.value.status
      const email = this.addEmployeeForm.value.email
      //api call
      this.api.addEmployeeAPI({username,age,status,email}).subscribe((res:any)=>{
        alert("Employee Details Added Successfully!!!")
        this.addEmployeeForm.reset()
      })
    }else{
      alert("Invalid Form")
    }
  }

}
