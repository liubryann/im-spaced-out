import type { NextPage } from 'next'
import { useState, useEffect, useRef } from 'react';

import { Range, Spinner } from '@shopify/polaris';

import Container from '../components/Container';
import Header from '../components/Header';
import ImageContainer from '../components/ImageContainer';

import apodService from '../lib/nasa/services/apodService';

import styles from './home.module.scss';

/**
 * Home page
 */
const Home: NextPage = () => {
  const aWeekAgo = new Date()
  aWeekAgo.setDate(aWeekAgo.getDate() - 7)

  const defaultDate = {
    start: aWeekAgo,
    end: aWeekAgo,
  }

  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([])
  const [likedImages, setLikedImages] = useState({})
  const [selectedDates, setSelectedDates] = useState(defaultDate);
  

  /**
   * Gets the liked images from the cache
   */
  useEffect(() => {
    let cachedLikes = JSON.parse(window.localStorage.getItem('spacestagramLikedImages') || '""');
    if (cachedLikes) {
      setLikedImages(cachedLikes);
    }
  }, [])


  /**
   * Caches the liked images
   */
  const cacheLikedImages = (likedImages: any) => {
    setLikedImages(likedImages);
    window.localStorage.setItem('spacestagramLikedImages', JSON.stringify(likedImages));
  }

    
  /**
   * Checks if date picker date is cached, otherwise default to 1 week ago from today
   */
  useEffect(() => {
    let cachedDateRange = JSON.parse(window.localStorage.getItem('spacestagramDateRange') || '""')
    if (cachedDateRange) {
      cachedDateRange.start = new Date(cachedDateRange.start)
      cachedDateRange.end = new Date(cachedDateRange.end)
      setSelectedDates(cachedDateRange)
    } else {
      setSelectedDates(defaultDate);
    }
  }, [])


  /**
  * Caches date picker selected date
  */
  const onDateChange = (date: Range) => {
    window.localStorage.setItem('spacestagramDateRange', JSON.stringify(date))
    setSelectedDates(date)
  }


  /**
   * Listens to changes in date picker selected range to make call to apod service
   */
  const firstRender = useRef(true)
  useEffect(() => {
    // Doesn't call api on first render in case there is a cached selected date
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const getImages = async () => {
      setLoading(true);
      const res = await apodService.getApod(selectedDates.start)
      setLoading(false)
      setImages(res)
    }
    getImages();
  }, [selectedDates])
 
  return (
    <Container>
      <Header siteName="Spacestagram" selectedDates={selectedDates} onDateChange={onDateChange} />

      { loading ? (
        <div className={styles.loadingContainer}>
          <Spinner accessibilityLabel="Spinner" size="large" />
        </div>
      ) : (
        <div className={styles.loadingContainer}>
          <ImageContainer images={images} likedImages={likedImages} cacheLikedImages={cacheLikedImages} />
        </div>
      )}
    </Container>
  )
}

export default Home
