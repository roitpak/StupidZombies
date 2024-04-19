import Matter from 'matter-js';
import Hero from '../../Components/Hero';
import Gun from '../../Components/Gun';
import Bullet from '../../Components/Bullet';
import Aim from '../../Components/Aim';
import Zombies from '../../Components/Zombies';
import Floor from '../../Components/Floor';
import Constants from '../../helpers/Constants';

const level1Entities = () => {
  let engine = Matter.Engine.create({enableSleeping: false});

  let world = engine.world;

  engine.gravity.y = 0;

  return {
    physics: {engine, world},

    Hero: Hero({
      world: world,
      pos: {x: 70, y: 320},
      size: {height: 100, width: 100},
    }),
    Gun: Gun({
      world: world,
      size: {height: 30, width: 50},
      pos: {x: 80, y: 350},
      moving: false,
      directionAngle: 0,
    }),
    Bullet: Bullet({
      world: world,
      size: {height: 20, width: 20},
      pos: {x: 100, y: 330},
      moving: false,
      directionAngle: 0,
    }),
    Aim: Aim({
      world: world,
      size: {height: 60, width: 60},
      pos: {x: 0, y: 0},
      moving: false,
    }),
    Zombies: Zombies({
      world: world,
      pos: {x: 700, y: 320},
      size: {height: 100, width: 70},
    }),
    FloorBottom: Floor({
      world: world,
      color: 'black',
      pos: {x: Constants.MAX_WIDTH / 2, y: Constants.MAX_HEIGHT},
      size: {height: 50, width: Constants.MAX_WIDTH},
    }),
    FloorRight: Floor({
      world: world,
      color: 'black',
      pos: {x: Constants.MAX_WIDTH, y: Constants.MAX_HEIGHT / 2},
      size: {height: Constants.MAX_HEIGHT, width: 50},
    }),
    FloorLeft: Floor({
      world: world,
      color: 'black',
      pos: {x: 0, y: Constants.MAX_HEIGHT / 2},
      size: {height: Constants.MAX_HEIGHT, width: 50},
    }),
    FloorTop: Floor({
      world: world,
      color: 'black',
      pos: {x: Constants.MAX_WIDTH / 2, y: 0},
      size: {height: 50, width: Constants.MAX_WIDTH},
    }),
  };
};

export default level1Entities;
