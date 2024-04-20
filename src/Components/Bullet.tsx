import Matter from 'matter-js';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

interface BulletProps {
  body: Matter.Body;
  moving: boolean;
  directionAngle: number;
}

const Bullet: React.FC<BulletProps> = ({
  body,
  moving = false,
  directionAngle,
}: BulletProps) => {
  const widthBody = body.bounds.max.x - body.bounds.min.x;
  const heightBody = body.bounds.max.y - body.bounds.min.y;

  const xBody = body.position.x - widthBody / 2;
  const yBody = body.position.y - heightBody / 2;

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      left: xBody,
      top: yBody,
      backgroundColor: 'yellow',
    },
    bulletImage: {
      height: heightBody,
      width: widthBody,
      resizeMode: 'contain',
      position: 'absolute',
      top: -widthBody / 8,
      right: -heightBody / 2,
      transform: [{rotate: `${directionAngle}deg`}],
    },
  });

  return (
    <View style={styles.container}>
      {moving && (
        <Image
          source={require('../assets/gun/bullet.png')}
          style={styles.bulletImage}
        />
      )}
    </View>
  );
};

interface BulletEntityParams {
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
}: BulletEntityParams) => {
  const initialBullet = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label: 'Bullet',
      collisionFilter: {
        category: 0x0002,
      },
    },
  );
  Matter.World.add(world, initialBullet);

  return {
    body: initialBullet,
    renderer: (
      <Bullet
        moving={moving}
        directionAngle={directionAngle}
        body={initialBullet}
      />
    ),
  };
};
