import type { NextPage } from 'next'
import { useState, useEffect } from 'react';

import { Range } from '@shopify/polaris';

import Container from '../components/Container';
import Header from '../components/Header';
import apodService from '../lib/nasa/services/apodService';
import { string } from 'prop-types';

/**
 * Home page
 */
const Home: NextPage = () => {
  const today = new Date()
  const aWeekAgo = new Date()
  aWeekAgo.setDate(aWeekAgo.getDate() - 7)

  const [selectedDates, setSelectedDates] = useState({
    start: aWeekAgo,
    end: today,
  });

  /**
   * Checks if date picker range is cached, otherwise default to 1 week ago from today
   */
  useEffect(() => {
    let cachedDateRange = JSON.parse(window.localStorage.getItem('spacestagramDateRange') || '""')
    if (cachedDateRange) {
      cachedDateRange.start = new Date(cachedDateRange.start)
      cachedDateRange.end = new Date(cachedDateRange.end)
      setSelectedDates(cachedDateRange);
    }
  }, [])

  /**
  * Caches date picker selected dates
  */
  const onDateChange = (date: Range) => {
    window.localStorage.setItem('spacestagramDateRange', JSON.stringify(date))
    setSelectedDates(date)
  }

  /**
   * Listens to changes in date picker selected range to make call to apod service
   */
  useEffect(() => {
    const getImages = async () => {
      const res = await apodService.getApod(selectedDates)
      console.log(res)
    }
    getImages();
  }, [selectedDates])
 
  return (
    <Container>
      <Header siteName="Spacestagram" selectedDates={selectedDates} onDateChange={onDateChange} />
    </Container>
  )
}

export default Home
