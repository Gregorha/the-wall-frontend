import axios from 'axios';
const apiURL = process.env.REACT_APP_API_URL;

interface AuthData {
  email: string;
  password: string;
}

export const authUser = async (params: AuthData) =>
  await axios.post(`${apiURL}/sessions/new`, params);
