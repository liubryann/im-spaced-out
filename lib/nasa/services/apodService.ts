import api from '../api';
import { Range } from '@shopify/polaris';
import { formatToSimpleDate } from '../../helpers/dateFormatter';

const APOD_URL = 'planetary/apod'

/**
 * Gets Astronomy Picture of the Day
 * @param {Range} param0 - contains a start date and end date
 * @returns the Astronomy Picture of the Day up to 7 days from start date
 */
const getApod = async (start: Date) => {
  let endDate = new Date()
  endDate.setDate(start.getDate() + 6)
  const today = new Date()
  if (endDate > today) {
    endDate = today
  }

  const startString = formatToSimpleDate(start)
  const endString = formatToSimpleDate(endDate)

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