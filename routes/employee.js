class Employee {
  constructor(firstName, lastName, id, roleId) {
    this.first_name = firstName;
    this.last_name = lastName;
    this.id = id;
    this.role_id = roleId;
  }
  getName() {
    return this.first_name + " " + this.last_name;
  }
  getId() {
    return this.id;
  }
  getRole() {
    return this.role_id;
  }
}

module.exports = Employee;
