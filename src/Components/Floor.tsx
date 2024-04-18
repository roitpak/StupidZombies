import Matter from 'matter-js';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface FloorProps {
  body: Matter.Body;
  color: string;
}

const Floor: React.FC<FloorProps> = (props: any) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: props.color || 'green',
      position: 'absolute',
      left: xBody,
      top: yBody,
      width: widthBody,
      height: heightBody,
    },
  });

  return <View style={styles.container} />;
};

interface FloorEntityParams {
  world: Matter.World;
  color: string;
  pos: {x: number; y: number};
  size: {width: number; height: number};
}

export default ({world, color, pos, size}: FloorEntityParams) => {
  const initialFloor = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label: 'Floor',
      isStatic: true,
      collisionFilter: {
        category: 0x0002,
      },
    },
  );
  Matter.World.add(world, initialFloor);

  return {
    body: initialFloor,
    color,
    renderer: <Floor body={initialFloor} color={color} />,
  };
};
