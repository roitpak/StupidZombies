import Matter from 'matter-js';
import Hero from '../Components/Hero';
import Floor from '../Components/Floor';
import Constants from '../Constants';
import Zombies from '../Components/Zombies';
import Bullet from '../Components/Bullet';

const restart = () => {
  let engine = Matter.Engine.create({enableSleeping: false});

  let world = engine.world;

  engine.gravity.y = 0.4;

  return {
    physics: {engine, world},

    Hero: Hero({
      world: world,
      color: 'green',
      pos: {x: 50, y: 300},
      size: {height: 40, width: 40},
    }),
    Bullet: Bullet({
      world: world,
      color: 'red',
      size: {height: 5, width: 5},
      pos: {x: 70, y: 300},
    }),
    Zombies: Zombies({
      world: world,
      color: 'green',
      pos: {x: 700, y: 50},
      size: {height: 100, width: 40},
    }),
    FloorBottom: Floor({
      world: world,
      color: 'yellow',
      pos: {x: Constants.MAX_WIDTH / 2, y: Constants.MAX_HEIGHT},
      size: {height: 50, width: Constants.MAX_WIDTH},
    }),
    FloorTop: Floor({
      world: world,
      color: 'yellow',
      pos: {x: Constants.MAX_WIDTH / 2, y: 0},
      size: {height: 50, width: Constants.MAX_WIDTH},
    }),
    FloorRight: Floor({
      world: world,
      color: 'yellow',
      pos: {x: Constants.MAX_WIDTH, y: Constants.MAX_HEIGHT / 2},
      size: {height: Constants.MAX_HEIGHT, width: 50},
    }),
    FloorLeft: Floor({
      world: world,
      color: 'yellow',
      pos: {x: 0, y: Constants.MAX_HEIGHT / 2},
      size: {height: Constants.MAX_HEIGHT, width: 50},
    }),
  };
};

export default restart;
