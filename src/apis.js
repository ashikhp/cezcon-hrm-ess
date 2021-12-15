import axios from 'axios';
export async function Login(params) {
    const response = await axios.post(`https://www.mai-saloon.com/app/opm/api/Login/auth`,  params )
    return response.data;
  }
  export async function getContacts(params) {
    const response = await axios.post(`https://www.mai-saloon.com/app/opm/api/Master/site_contact`,  params )
    return response.data;
  }
  export async function getAboutMaisaloon() {
    const response = await axios.post(`https://www.mai-saloon.com/app/opm/api/Master/about_maisaloon` )
    return response.data;
  }
  