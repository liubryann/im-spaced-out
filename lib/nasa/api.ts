import axios from 'axios';

const NASA_URL = 'https://api.nasa.gov/'
const NASA_API_KEY = 'nPouogJJQTZJkj6disetWFsC4ZDUtReeRDTVcJrw'

/**
 * Default client settings for accessing nasa api
 */
const client = axios.create({
  baseURL: NASA_URL,
  params: {
      api_key: NASA_API_KEY
  }
})

export default client;

