import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EmployeeManagementSystem';

  baseUrl="http://localhost:8080/"
  employees: any;
  constructor(public http:HttpClient){
    let url=this.baseUrl+'get';
    this.http.get(url).subscribe((data:any)=>
    {
      console.log(data);
      this.employees=data;
    }
    );
  }
  delete(employee: any) {
    // Check if the employee object is valid and has a defined empid
    if (!employee || typeof employee.empid === 'undefined') {
      console.error('Invalid employee object:', employee);
      alert('Failed to delete employee. Employee id is undefined.');
      return;
    }
  
    const url = `${this.baseUrl}delete/${employee.empid}`;
    this.http.delete(url).subscribe(
      (data: any) => {
        if (data === 1) {
          // Find the index using empid instead of relying on reference equality
          const index = this.employees.findIndex((e: { empid: any; }) => e.empid === employee.empid);
          if (index !== -1) {
            this.employees.splice(index, 1);
            console.log('Employee deleted successfully');
          }
        } else {
          alert('Exception on server');
        }
      },
      error => {
        console.error('Error deleting employee:', error);
      }
    );
  }
  


  empname:string='';
  emailid:string='';
  add(){
    let obj=
    {
      "empname":this.empname,
      "emailid":this.emailid
        }
    let url=this.baseUrl+'add';
    this.http.post(url,obj).subscribe((data:any)=>
    {
      if(data==null){
        alert('Exception on server')
      }
      else{
        this.employees.push(data);
        this.empname='';
        this.emailid='';
      }
    }
    );
  }

isLoggedIn:number=0;
  username:string='abc';
  password:string='abc';
  login(){
    let url=this.baseUrl+'login'+this.username;
    this.http.post(url, this.password).subscribe((data:any)=>
    {
      if(data==1){
        this.isLoggedIn=1;
      }
      else if(data==2){
        alert('Wrong Username');
      }
      else if(data==3){
        alert('Multiple account with same username');
      }
      else if(data==4){
        alert('Password Wrong');
      }
      else{
        alert('Something went wrong');
      }
    }
    );
  }

  logout(){
    this.isLoggedIn=0;
  }
}

