import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server_url = "https://angular-employeemanagement-server.onrender.com"

  constructor(private http:HttpClient) { }

  //addEmployee
  addEmployeeAPI(reqbody:any){
    return this.http.post(`${this.server_url}/allEmployee`,reqbody)
  }

  //getallamployee
  getAllEmployeeAPI(){
    return this.http.get(`${this.server_url}/allEmployee`)
  }

  //deleteemployee
  deleteEmployeeAPI(id:any){
    return this.http.delete(`${this.server_url}/allEmployee/${id}`)
  }

  //updateemployee
  updateEmployeeAPI(id:any,reqbody:any){
    return this.http.put(`${this.server_url}/allEmployee/${id}`,reqbody)
  }

  getEmpolyeeAPI(id:any){
    return this.http.get(`${this.server_url}/allEmployee/${id}`)
  }

}
