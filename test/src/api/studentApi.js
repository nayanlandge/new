import axios from 'axios';

const API = axios.create({
  baseURL: 'https://new-api-peach-beta.vercel.app/students/',
});

export const getAllStudents = () => API.get('/');
export const getStudent = (id) => API.get(`/${id}`);
export const createStudent = (student) => API.post('/', student);
export const updateStudent = (id, data) => API.put(`/${id}`, data);
export const deleteStudent = (id) => API.delete(`/${id}`);
export const downloadReceipt = (id) => API.get(`/${id}/receipt`, { responseType: 'blob' });
export const addPaymentToStudent = (id, paymentData) => {
  return API.post(`/${id}/payment`, paymentData);  
};

export const getStudentDetails = (id) => API.get(`/${id}`);
