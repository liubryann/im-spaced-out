import { FunctionComponent, ReactNode } from 'react';

import Head from 'next/head';

import { Frame } from '@shopify/polaris';

import styles from './container.module.scss';

interface ContainerProps {
  children: ReactNode; 
}

const SITE_TITLE = 'Spacestagram';

/**
 * Container to keep consistent horizontal and vertical margins throughout the app
 */
const Container: FunctionComponent<ContainerProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <meta
          name="description"
          content="Image-sharing from the final frontier"
        />
        <meta name="og:title" content={SITE_TITLE} />
        <title>{SITE_TITLE}</title>
      </Head>
      <main className={styles.main}><Frame>{ children }</Frame></main>
    </div>
  )
}

export default Container;