import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { NgForm } from '@angular/forms';

declare let M: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})


export class EmployeesComponent implements OnInit {
  btnsOcult: boolean;
  constructor(private employeeService: EmployeeService) { 
    this.btnsOcult = true;
  }

  ngOnInit() {
    this.getEmployees();
  }

  addEmployee(form: NgForm) {
    if (form.value._id) {
      this.employeeService.putEmploye(form.value)
      .subscribe( res => {
        M.toast({ html: res['status']});
        this.resetForm(form);
        this.getEmployees();
      });
    } else {
      this.employeeService.postEmployee(form.value)
      .subscribe(res => {
        M.toast({html: res['status']});
        this.resetForm(form);
        this.getEmployees();
      });
    }
    this.btnsOcult = true;
  }

  getEmployees() {
    this.employeeService.getEmployees()
    .subscribe(res => {
      this.employeeService.employees = res as Employee[];
    });
  }

  editEmployee(employee: Employee) {
    this.employeeService.selectedEmployee = employee;
    this.btnsOcult = false;
  }

  deleteEmployee(id: string) {
    if (confirm('Are you sure you want to delete it?')) {
    this.employeeService.deleteEmployee(id)
      .subscribe(res => {
        M.toast({html: res['status']});
        this.getEmployees();
      });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.employeeService.selectedEmployee = {
        _id: '',
        name: '',
        position: '',
        office: '',
        salary: null
      };
    }
  }

}
