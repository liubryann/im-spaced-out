import { FunctionComponent, useState } from "react";

import { MediaCard } from '@shopify/polaris';

import styles from './image-card.module.scss'

interface ImageCardProps {
  title: string, 
  date: string
  imgSrc: string,
  likedImages: any,
  setLikedImages: (likedImages: any) => void,
  toggleToastActive: () => void,
}

/**
 * A card with a medium sized image
 */
const ImageCard: FunctionComponent<ImageCardProps> = ({ title, date, imgSrc, likedImages, setLikedImages, toggleToastActive }) => {
  const [liked, setLiked] = useState(imgSrc in likedImages);

  return (
    <MediaCard
      title={title}
      primaryAction={{
        content: liked ? 'UnLike' : 'Like' ,
        onAction: () => {
          if (imgSrc in likedImages) {
            delete likedImages[imgSrc]
            setLiked(false)
          } else {
            setLiked(true)
            likedImages[imgSrc] = true;
          }
          setLikedImages(likedImages)
        },
      }}
      description={date}
      popoverActions={[{content: 'Share', onAction: () => {
        navigator.clipboard.writeText(imgSrc).then(() => {
          toggleToastActive()
        })
      }}]}
      size="medium"
      portrait
    >
      <img
        alt={title}
        width="100%"
        height="100%"
        className={styles.image}
        src={imgSrc}
      />
    </MediaCard>
  )
}

export default ImageCard;