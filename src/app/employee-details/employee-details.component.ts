import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [FormsModule,RouterLink,ReactiveFormsModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent {

  allEmployee:any=[]
  dummyAllEmployee:any=[]
  statusArray:any=[]
  employeeDetails:any={}



  EditEmployeeForm: FormGroup

  constructor(private api:ApiService,private fb:FormBuilder){
    this.EditEmployeeForm = this.fb.group({
      username:["",[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      age:["",[Validators.required,Validators.pattern('[0-9]*')]],
      status:["",Validators.required],
      email:["",[Validators.required,Validators.email]]
    })
  }

  ngOnInit(){
    this.getAllEmployee()
  }
  getAllEmployee(){
    this.api.getAllEmployeeAPI().subscribe((res:any)=>{
      this.allEmployee = res
      this.dummyAllEmployee=this.allEmployee
      // console.log(this.allEmployee);
      this.allEmployee.forEach((emp:any)=>{
        !this.statusArray.includes(emp.status) && this.statusArray.push(emp.status)
      })
    })
  }
  filterEmployee(value:string){
    this.allEmployee = this.dummyAllEmployee.filter((emp:any)=>emp.status==value)
  }

  deleteEmployee(id:any){
    this.api.deleteEmployeeAPI(id).subscribe((res:any)=>{
      alert("Employee deleted successfully !!! ")
      this.getAllEmployee()
    })
  }  

  getEmployeeDetails(id:any){
    this.api.getEmpolyeeAPI(id).subscribe((res:any)=>{
      this.employeeDetails=res
      console.log(this.employeeDetails);
      this.EditEmployeeForm.patchValue({
        username:this.employeeDetails.username,
        age:this.employeeDetails.age,
        status:this.employeeDetails.status,
        email:this.employeeDetails.email
      })
      
    })
  }

 editEmployee(){
  
    if(this.EditEmployeeForm.valid){
      const id = this.employeeDetails.id
      const username = this.EditEmployeeForm.value.username
      const age = this.EditEmployeeForm.value.age
      const status = this.EditEmployeeForm.value.status
      const email = this.EditEmployeeForm.value.email
      //api call
      this.api.updateEmployeeAPI(id,{username,age,status,email}).subscribe((res:any)=>{
        alert("Employee Details Updated Successfully!!!")
        this.EditEmployeeForm.reset()
        this.getAllEmployee()
      })
    }else{
      alert("Invalid Form")
    }
  }
}
