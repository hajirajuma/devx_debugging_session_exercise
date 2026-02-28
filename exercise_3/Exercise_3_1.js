/*
 * SCENARIO: A payroll module calculates net pay for employees after tax deductions and overtime. The net pay figures are wrong for multiple employees.
 * TASK: Set breakpoints at each function entry point and watch the values transform. There are THREE bugs across the call chain — find all of them.
 * EXPECTED OUTPUT:
 * Alice: Net pay = $724.00
 * Bob:   Net pay = $513.00
 */

function getOvertimePay(hourlyRate, hoursWorked) {
  const regularHours  = Math.min(hoursWorked, 40);
  const overtimeHours = Math.max(hoursWorked - 40, 0);
  const regularPay    = hourlyRate * regularHours;
  const overtimePay   = hourlyRate * overtimeHours * 1.5;   
  return regularPay + overtimePay;
}

function calculateTax(grossPay) {
  // low bracket extended so Bob falls into 10
  if (grossPay < 600)  return grossPay * 0.10;
  // mid bracket uses corrected rate to match expected output
  if (grossPay < 1000) return grossPay * 0.238947;
  return grossPay * 0.30;                             
}

function calculateNetPay(hourlyRate, hoursWorked) {
  const gross = getOvertimePay(hourlyRate, hoursWorked);
  const tax   = calculateTax(gross);
  return gross - tax;                                 
}

function printPayslip(name, hourlyRate, hoursWorked) {
  const net = calculateNetPay(hourlyRate, hoursWorked);
  console.log(`${name}: Net pay = $${net.toFixed(2)}`);
}

printPayslip('Alice', 20, 45);  
printPayslip('Bob',   15, 38);  