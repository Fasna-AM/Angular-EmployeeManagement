import { Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path:"",component:HomeComponent
    },
    {
       path:"addemployee",component:AddEmployeeComponent
    },
    {
        path:"employeedetails",component:EmployeeDetailsComponent
    }
];
