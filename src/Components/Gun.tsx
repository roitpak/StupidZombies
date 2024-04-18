import Matter from 'matter-js';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

interface GunProps {
  body: Matter.Body;
  moving: boolean;
  directionAngle: number;
}

const Gun: React.FC<GunProps> = ({
  body,
  moving = false,
  directionAngle,
}: GunProps) => {
  const widthBody = body.bounds.max.x - body.bounds.min.x;
  const heightBody = body.bounds.max.y - body.bounds.min.y;

  const xBody = body.position.x - widthBody / 2;
  const yBody = body.position.y - heightBody / 2;

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      left: xBody,
      top: yBody,
    },
    GunImage: {
      height: heightBody,
      width: widthBody,
      resizeMode: 'contain',
      position: 'absolute',
      top: -widthBody / 2,
      left: heightBody / 6,
      transform: [{rotate: `${directionAngle}deg`}],
    },
  });

  return (
    <View style={styles.container}>
      {moving && (
        <Image
          source={require('../assets/gun/gun.png')}
          style={styles.GunImage}
        />
      )}
    </View>
  );
};

interface GunEntityParams {
  world: Matter.World;
  pos: {x: number; y: number};
  size: {width: number; height: number};
  moving: boolean;
  directionAngle: number;
}

export default ({
  world,
  pos,
  size,
  moving,
  directionAngle,
}: GunEntityParams) => {
  const initialGun = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label: 'Gun',
      isStatic: true,
      collisionFilter: {
        mask: ~0x0002,
      },
    },
  );
  Matter.World.add(world, initialGun);

  return {
    body: initialGun,
    renderer: (
      <Gun moving={moving} directionAngle={directionAngle} body={initialGun} />
    ),
  };
};
