"use client";
import React, { Suspense } from 'react';
import Xarrow from 'react-xarrows';
import Image from 'next/image';
import styles from './adventure-map.module.css'
import Lottie from 'lottie-react';
import loadingAnimation from '@/components/loading.json';

const CustomConnection = ({ start, end }) => (
  <Xarrow
    start={start}
    end={end}
    color="#fff"
    strokeWidth={20}
    path="smooth"
    dashness={{ animation: 2 }}  
    headSize={0}
    tailSize={0}
    curveness={0.4}

    />
);

export const AdventureMap = () => {

  const islandsXL = [
    { id: 'island1', x: 1, y: 1 , image: '/island-1.png', href: '/questions/1'},
    { id: 'island2', x: 2, y: 3 , image: '/island-2.png', href: '/questions/2'},
    { id: 'island3', x: 3, y: 1 , image: '/island-3.png', href: '/questions/3'},
    { id: 'island4', x: 4, y: 3 , image: '/island-4.png', href: '/questions/4'},
    { id: 'island5', x: 5, y: 1 , image: '/island-5.png', href: '/questions/5'},
    { id: 'island6', x: 6, y: 3 , image: '/island-6.png', href: '/questions/6'},
    { id: 'island7', x: 7, y: 1 , image: '/island-7.png', href: '/questions/7'},
  ];

  const islandsMobile = [
    { id: 'island1', x: 1, y: 1 , image: '/island-1.png', href: '/questions/1'},
    { id: 'island2', x: 1, y: 3 , image: '/island-2.png', href: '/questions/2'},
    { id: 'island3', x: 1, y: 5 , image: '/island-3.png', href: '/questions/3'},
    { id: 'island4', x: 1, y: 7 , image: '/island-4.png', href: '/questions/4'},
    { id: 'island5', x: 1, y: 9 , image: '/island-5.png', href: '/questions/5'},
    { id: 'island6', x: 1, y: 11 , image: '/island-6.png', href: '/questions/6'},
    { id: 'island7', x: 1, y: 13 , image: '/island-7.png', href: '/questions/7'},
  ];

  const islandsTablet = [
    { id: 'island1', x: 1, y: 1 , image: '/island-1.png', href: '/questions/1'},
    { id: 'island2', x: 2, y: 3 , image: '/island-2.png', href: '/questions/2'},
    { id: 'island3', x: 1, y: 5 , image: '/island-3.png', href: '/questions/3'},
    { id: 'island4', x: 2, y: 7 , image: '/island-4.png' , href: '/questions/4'},
    { id: 'island5', x: 1, y: 9 , image: '/island-5.png', href: '/questions/5'},
    { id: 'island6', x: 2, y: 11 , image: '/island-6.png', href: '/questions/6'},
    { id: 'island7', x: 1, y: 13 , image: '/island-7.png', href: '/questions/7'},
  ];

  const islandsDesktop = [
    { id: 'island1', x: 1, y: 1 , image: '/island-1.png', href: '/questions/1'},
    { id: 'island2', x: 1, y: 3 , image: '/island-2.png', href: '/questions/2'},
    { id: 'island3', x: 2, y: 1 , image: '/island-3.png', href: '/questions/3'},
    { id: 'island4', x: 2, y: 3 , image: '/island-4.png', href: '/questions/4'},
    { id: 'island5', x: 3, y: 1 , image: '/island-5.png', href: '/questions/5'},
    { id: 'island6', x: 3, y: 3 , image: '/island-6.png', href: '/questions/6'},
    { id: 'island7', x: 4, y: 1 , image: '/island-7.png', href: '/questions/7'},
  ];

  const [islandsList, setIslandsList] = React.useState(islandsDesktop);

  React.useEffect(() => {
    const handleResize = () => {
      console.log(window.innerWidth);
      if (window.innerWidth < 768) {
        setIslandsList(islandsMobile);
      }
      if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setIslandsList(islandsTablet);
      }
      if (window.innerWidth >= 1024 && window.innerWidth < 1440) {
        setIslandsList(islandsDesktop);
      }
      if (window.innerWidth >= 1440) {
        setIslandsList(islandsXL);
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
      <div className={styles.mapContainer} style={{
        backgroundImage: 'url(/bg.jpg)',
      }}
      >
        {islandsList.map(island => (
          <div
            key={island.id}
            id={island.id}
            className={styles.island}
            style={{
              gridColumn: island.x,
              gridRow: island.y,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <img src={island.image} alt={island.id} onClick={() => window.location.href = island.href} 
              style={{ 
                maxWidth: '200px',
                cursor: 'pointer',
              }}
            />
          </div>
        ))}
        <CustomConnection start="island1" end="island2" />
        <CustomConnection start="island2" end="island3" />
        <CustomConnection start="island3" end="island4" />
        <CustomConnection start="island4" end="island5" />
        <CustomConnection start="island5" end="island6" />
        <CustomConnection start="island6" end="island7" />
      </div>
  );
};

export default AdventureMap;
