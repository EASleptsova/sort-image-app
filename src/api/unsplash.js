import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: 'Client-ID laYP96kYWFiByH7GjtGHCMvAQV-VKIhHY8bXqUdxg70'
  },
});