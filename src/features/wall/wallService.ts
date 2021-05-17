import axios from 'axios';
const apiURL = process.env.REACT_APP_API_URL;

export interface Message {
  id: number;
  body: string;
  title: string;
  authorName: string;
  date: string;
}
export const getMessagesService = async () => {
  try {
    const response = await axios.get<Message[]>(`${apiURL}/messages`);
    const messages = response.data.sort(function (a, b) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    return messages;
  } catch (error) {
    console.error(error.message);
    throw new Error('Service unavailable');
  }
};
