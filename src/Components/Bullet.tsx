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
      width: widthBody,
      height: heightBody,
    },
    bulletImage: {
      height: 25,
      width: 25,
      resizeMode: 'contain',
      position: 'absolute',
      top: -25 / 2,
      right: -25 / 2,
      transform: [{rotate: `${directionAngle}deg`}],
    },
  });

  return (
    <View style={styles.container}>
      {/* {console.log(directionAngle)} */}
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
