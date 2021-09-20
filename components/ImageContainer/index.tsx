import { FunctionComponent, useState, useEffect } from "react";

import ImageCard from '../ImageCard';

import styles from './image-container.module.scss';

interface Image {
  copyright?: string, 
  date: string,
  explanation?: string,
  hdurl?: string,
  media_type: string
  service_version?: string,
  title: string, 
  url: string,
}

interface ImageContainerProps {
  images: Image[],
  likedImages: any,
  cacheLikedImages: (likedImages: any) => void,
}

/**
 * Container for the image cards
 */
const ImageContainer: FunctionComponent<ImageContainerProps> = ({ images, likedImages, cacheLikedImages }) => {
  const imageCards = images.reduce((acc: any, { date, title, url, media_type }: Image) => {
    if (media_type !== 'video') {
      acc.push(
        <div key={url} className={styles.cardHolder}>
          <ImageCard title={title} date={date} imgSrc={url} likedImages={likedImages} setLikedImages={cacheLikedImages} />
        </div>
      )
    }
    return acc;
  }, []).reverse()
  
  return (
    <div>
      {imageCards}
    </div>
  )
}

export default ImageContainer;