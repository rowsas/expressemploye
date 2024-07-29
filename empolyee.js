const express = require('express');
const router = express.Router();

// Initialize data array to store Employee records
const employees = [
  { id: 1, name: 'rees', roll_no:6 },
  { id: 2, name: 'rows', roll_no: 4 },
  { id: 3, name: 'ree', roll_no: 5}
  // Add more employee records as needed
];

// Get All Employees Data
router.get('/', (req, res) => {
  res.json(employees);
});

// Get a Single Employee Record by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const employee = employees.find(emp => emp.id === id);

  if (employee) {
    res.json(employee);
  } else {
    res.status(404).send('Employee not found');
  }
});

// Insert a New Employee Record
router.post('/', (req, res) => {
    const { name, roll_no } = req.body;
  
    if (!name || !roll_no) {
      return res.status(400).send('Name and roll_no are required');
    }
  
    const newEmployee = {
      id: employees.length + 1,
      name,
      roll_no
    };
  
    employees.push(newEmployee);
    res.status(201).send('Employee added successfully');
  });


  //put method
  router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name, roll_no } = req.body;
    const employeeIndex = employees.findIndex(emp => emp.id === id);
  
    if (employeeIndex !== -1) {
      const updatedEmployee = {
        ...employees[employeeIndex],
        name: name || employees[employeeIndex].name,
        roll_no: roll_no || employees[employeeIndex].roll_no
      };
  
      employees[employeeIndex] = updatedEmployee;
      res.status(200).send('Employee updated successfully');
    } else {
      res.status(404).send('Employee not found');
    }
  });


  // Delete an Employee Record
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const employeeIndex = employees.findIndex(emp => emp.id === id);
  
    if (employeeIndex !== -1) {
      employees.splice(employeeIndex, 1);
      res.status(204).send(); // No content
    } else {
      res.status(404).send('Employee not found');
    }
  });
module.exports = router;