import axios from 'axios';
const apiURL = process.env.REACT_APP_API_URL;

interface SignUpData {
  email: string;
  password: string;
  name: string;
}

export const registerUser = async (params: SignUpData) =>
  await axios.post(`${apiURL}/users`, params);
