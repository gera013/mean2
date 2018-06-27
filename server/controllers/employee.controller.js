'use strict'

const Employee = require('../models/employee');

const employeeCtrl = {};

/*************************
 * Listar Empleados
**************************/
employeeCtrl.getEmployees = async (req, res) => {
   const employees = await Employee.find();
   res.json(employees);
};

/*************************
 * Crear Empleados
**************************/
employeeCtrl.createEmployees = async (req, res) => {
    const employee = new Employee(req.body);
    await employee.save();
    res.json({
        status: 'Employee Saved'
    });
};

/*****************************
 * Seleccionar un Empleado
*****************************/
employeeCtrl.getEmployee = async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    res.json(employee);
};

/*************************
 * Editar Empleado
**************************/
employeeCtrl.editEmployee = async (req, res) => {
    const { id } = req.params;
    const employee = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    };

    await Employee.findByIdAndUpdate(id, {$set: employee}, {new: true});
    res.json({status: 'Employee updated'});
};

/*************************
 * Borrar Empleado
**************************/
employeeCtrl.deleteEmployee = async (req, res) => {
    await Employee.findByIdAndRemove(req.params.id);
    res.json({status: 'Employee Delete'});
};

module.exports = employeeCtrl;