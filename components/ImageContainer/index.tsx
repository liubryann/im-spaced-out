import { FunctionComponent, useState, useCallback } from "react";

import { Toast } from "@shopify/polaris";

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
  const [toastActive, setToastActive] = useState(false);
  const toggleActive = useCallback(() => setToastActive((active) => !active), [])

  const clipboardToast = toastActive ? (
    <Toast content="Link copied to clipboard." onDismiss={toggleActive} duration={3000} />
  ) : null;

  const imageCards = images.reduce((acc: any, { date, title, url, media_type }: Image) => {
    if (media_type !== 'video') {
      acc.push(
        <div key={url} className={styles.cardHolder}>
          <ImageCard title={title} date={date} imgSrc={url} likedImages={likedImages} setLikedImages={cacheLikedImages} toggleToastActive={toggleActive} />
        </div>
      )
    }
    return acc;
  }, []).reverse()
  
  return (
    <div>
      {imageCards}
      {clipboardToast}
    </div>
  )
}

export default ImageContainer;