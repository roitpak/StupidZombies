import Matter from 'matter-js';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import zombiesAppearImgs from '../assets/zombies/appear';
import zombieDieImgs from '../assets/zombies/die';

interface ZombiesProps {
  body: Matter.Body;
  dead?: boolean;
}

const Zombies: React.FC<ZombiesProps> = ({body, dead}) => {
  const widthBody = body.bounds.max.x - body.bounds.min.x;
  const heightBody = body.bounds.max.y - body.bounds.min.y;

  const xBody = body.position.x - widthBody / 2;
  const yBody = body.position.y - heightBody / 2;

  const [currentIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        prevIndex => prevIndex + (1 % zombiesAppearImgs.length),
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (dead) {
      setCurrentImageIndex(0);
      interval = setInterval(() => {
        setCurrentImageIndex(
          prevIndex => prevIndex + (1 % zombieDieImgs.length),
        );
      }, 100);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [dead]);

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      left: xBody,
      top: yBody,
    },
    zombieAlive: {
      position: 'absolute',
      top: 0,
      left: -widthBody / 2,
      width: widthBody,
      height: heightBody,
      resizeMode: 'contain',
    },
    zombieDie: {
      position: 'absolute',
      top: 0,
      left: -100 / 2,
      width: 120,
      height: heightBody,
      resizeMode: 'contain',
    },
  });

  return (
    <View style={styles.container}>
      <Image
        source={
          dead ? zombieDieImgs[currentIndex] : zombiesAppearImgs[currentIndex]
        }
        style={dead ? styles.zombieDie : styles.zombieAlive}
      />
    </View>
  );
};

interface ZombiesEntityParams {
  world: Matter.World;
  pos: {x: number; y: number};
  size: {width: number; height: number};
  dead?: boolean;
}

export default ({world, pos, size, dead}: ZombiesEntityParams) => {
  const initialZombies = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label: 'Zombies',
      isStatic: true,
      isSensor: false,
    },
  );
  Matter.World.add(world, initialZombies);

  return {
    body: initialZombies,
    dead,
    renderer: <Zombies body={initialZombies} dead={dead} />,
  };
};
