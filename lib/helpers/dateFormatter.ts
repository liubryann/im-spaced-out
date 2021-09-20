/**
 * Formats a Date object into YYYY-MM-DD with timezone consideration
 * @param {Date} date  - the date to foramt
 * @returns {string} the date in YYYY-MM-DD format
 */
const formatToSimpleDate = (date: Date) => {
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - (offset*60*1000))
  return date.toISOString().split('T')[0]
}

export { formatToSimpleDate }