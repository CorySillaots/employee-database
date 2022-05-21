const connection = require("./db");

class dbQueries {
  constructor(connection) {
    this.connection = connection;
  }
  //Employee (get, add, update)
  getAllEmployees() {
    return this.connection.query("SELECT * FROM employee");
  }

  createEmployee(first_name, last_name, role_id, department_id){
    return this.connection.query(`INSERT INTO employees 'first_name', 'last_name', 'role_id', 'department_id' VALUES  ${first_name}, ${last_name}, ${role_id}, ${department_id}`);
  } 

  updateEmployee(employee_id, manager_id){
    return this.connection.query(`UPDATE employee WHERE 'employee_id' EQUALS ${employee_id}`)
  }

  getEmployeesByManager(manager_id){
    return this.connection.query(`SELECT * FROM employees WHERE 'manager_id' EQUALS ${manager_id}`)
  }

  getEmployeesByDepartment(department_id){
    return this.connection.query(`SELECT * FROM employees WHERE 'department_id' EQUALS ${department_id}`)
  }

  getAllRoles(){
    return this.connection.query("SELECT * FROM roles");
  }

  createRole(title, salary, department_id){
    return this.connection.query(`INSERT INTO roles 'title', 'salary', 'department_id' VALUES ${title}, ${salary}, ${department_id}`);
  }

  getAllDepartments() {
    return this.connection.query("SELECT * FROM department");
  }

  getDepartmentBudget(department_id){
    return this.connection.query(`SELECT `)
  }

  createDepartment(name){
    return this.connection.query(`INSERT INTO department 'name' VALUES ${department_name}`);
  }

  deleteDepartment(department_id){
    return this.connection.query(`DELETE FROM department WHERE 'department_id' EQUALS ${department_id}`)
  }

  deleteRole(role_id){
    return this.connection.query(`DELETE FROM roles WHERE 'role_id' EQUALS ${role_id}`)
  }

  deleteEmployee(employee_id){
    return this.connection.query(`DELETE FROM employees WHERE 'employee_id' EQUALS ${employee_id}`)
  }

}

module.exports = new dbQueries(connection);