import Matter from 'matter-js';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

interface AimProps {
  body: Matter.Body;
  moving: boolean;
}

const Aim: React.FC<AimProps> = ({body, moving = false}: AimProps) => {
  const widthBody = body.bounds.max.x - body.bounds.min.x;
  const heightBody = body.bounds.max.y - body.bounds.min.y;

  const xBody = body.position.x - widthBody / 2;
  const yBody = body.position.y - heightBody / 2;

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      left: xBody,
      top: yBody,
      width: widthBody,
      height: heightBody,
    },
    aimImage: {
      height: heightBody,
      width: widthBody,
      resizeMode: 'contain',
      position: 'absolute',
      top: -widthBody / 4,
      left: heightBody / 6,
      tintColor: 'black',
    },
  });

  return (
    <View style={styles.container}>
      {moving && (
        <Image
          source={require('../assets/gun/aim.png')}
          style={styles.aimImage}
        />
      )}
    </View>
  );
};

interface AimEntityParams {
  world: Matter.World;
  pos: {x: number; y: number};
  size: {width: number; height: number};
  moving: boolean;
}

export default ({world, pos, size, moving}: AimEntityParams) => {
  const initialAim = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label: 'Aim',
      isStatic: true,
      isSensor: false,
      collisionFilter: {
        mask: ~0x0002,
      },
    },
  );
  Matter.World.add(world, initialAim);

  return {
    body: initialAim,
    renderer: <Aim moving={moving} body={initialAim} />,
  };
};
