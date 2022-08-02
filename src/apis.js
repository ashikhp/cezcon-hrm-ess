
import axios from 'axios';
import { Alert } from 'react-native';
import { callAPI } from './apiCallFunction'

const API = {
  LOGIN: "Login/auth",
  EMPLOYEES: "Employees/employee_get",
}

export async function Login(params) {
  return callAPI(API.LOGIN, params);
}

export async function getEmployees(params) {
  return callAPI(API.EMPLOYEES, params);
}




