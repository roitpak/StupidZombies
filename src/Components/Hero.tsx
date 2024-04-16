import Matter from 'matter-js';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import heroImgs from '../assets/hero';

interface HeroProps {
  body: Matter.Body;
  color: string;
}

const Hero: React.FC<HeroProps> = (props: any) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: color || 'pink',
      position: 'absolute',
      left: xBody,
      top: yBody,
      width: widthBody,
      height: heightBody,
    },
    image: {
      position: 'absolute',
      top: 0,
      right: -100 / 2,
      width: 100,
      height: heightBody,
      resizeMode: 'contain',
    },
  });

  const [currentIndex, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prevIndex => (prevIndex + 1) % heroImgs.length);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: color || 'pink'}]}>
      <Image source={heroImgs[currentIndex]} style={styles.image} />
    </View>
  );
};

interface HeroEntityParams {
  world: Matter.World;
  color: string;
  pos: {x: number; y: number};
  size: {width: number; height: number};
}

export default ({world, color, pos, size}: HeroEntityParams) => {
  const initialHero = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {label: 'Hero', isStatic: true},
  );
  Matter.World.add(world, initialHero);

  return {
    body: initialHero,
    color,
    renderer: <Hero body={initialHero} color={color} />,
  };
};
