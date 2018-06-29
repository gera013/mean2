import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Employee } from '../models/employee';
import { Ruta } from '../ruta_global';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  selectedEmployee: Employee;
  URL_API: string;
  employees: Employee[];

  constructor(private http: HttpClient) {

    this.URL_API = `${Ruta.url}/employees`;
    this.selectedEmployee = {
      _id: '',
      name: '',
      position: '',
      office: '',
      salary: null
    };

  }

  getEmployees() {
    return this.http.get(this.URL_API);
  }

  postEmployee(newEmployee: Employee) {
    return this.http.post(this.URL_API, newEmployee);
  }

  putEmploye(newEmployee: Employee) {
    return this.http.put(`${this.URL_API}/${newEmployee._id}`, newEmployee);
  }

  deleteEmployee(_id: string) {
    return this.http.delete(`${this.URL_API}/${_id}`);
  }
}
