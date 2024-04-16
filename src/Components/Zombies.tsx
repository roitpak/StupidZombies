import Matter from 'matter-js';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface ZombiesProps {
  body: Matter.Body;
  color: string;
}

const Zombies: React.FC<ZombiesProps> = (props: any) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: props.color || 'red',
      position: 'absolute',
      left: xBody,
      top: yBody,
      width: widthBody,
      height: heightBody,
    },
  });

  return <View style={styles.container} />;
};

interface ZombiesEntityParams {
  world: Matter.World;
  color: string;
  pos: {x: number; y: number};
  size: {width: number; height: number};
}

export default ({world, color, pos, size}: ZombiesEntityParams) => {
  const initialZombies = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label: 'Zombies',
      isStatic: true,
    },
  );
  Matter.World.add(world, initialZombies);

  return {
    body: initialZombies,
    color,
    renderer: <Zombies body={initialZombies} color={color} />,
  };
};
