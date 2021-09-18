import type { NextPage } from 'next'
import { useState, useEffect } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import apodService from '../lib/nasa/services/apodService';

/**
 * Home page
 */
const Home: NextPage = () => {
  const today = new Date()

  const [selectedDates, setSelectedDates] = useState({
    start: today,
    end: today,
  });

  useEffect(() => {
    const getImages = async () => {
      const res = await apodService.getApod(selectedDates)
      console.log(res)
    }

    getImages();
  }, [selectedDates])
 
  return (
    <Container>
      <Header siteName="Spacestagram" selectedDates={selectedDates} onDateChange={setSelectedDates} />
    </Container>
  )
}

export default Home
