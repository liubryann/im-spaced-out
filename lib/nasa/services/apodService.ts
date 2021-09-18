import api from '../api';
import { Range } from '@shopify/polaris';
import { formatToSimpleDate } from '../../helpers/dateFormatter';

const APOD_URL = 'planetary/apod'

/**
 * Gets Astronomy Picture of the Day
 * @param {Range} param0 - contains a start date and end date
 * @returns the Astronomy Picture of the Day for each day in the specified range
 */
const getApod = async ({start, end}: Range) => {
  const startString = formatToSimpleDate(start)
  const endString = formatToSimpleDate(end)

  try {
    const res = await api.get(APOD_URL, {
      params: {
        start_date: startString,
        end_date: endString,
      }
    })
    return res.data;
  } catch(err) {
    console.error(err)
  }
}

const apodService = {
  getApod,
}

export default apodService; 