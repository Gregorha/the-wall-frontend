import axios from 'axios';
const apiURL = process.env.REACT_APP_API_URL;

interface NewMessage {
  title: string;
  body: string;
  token: string;
}

export const newMessageService = async ({ body, title, token }: NewMessage) => {
  const bodyParameters = {
    message: {
      body,
      title,
    },
  };
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return await axios.post(`${apiURL}/messages`, bodyParameters, config);
};
