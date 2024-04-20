import Matter from 'matter-js';
import Hero from '../../Components/Hero';
import Gun from '../../Components/Gun';
import Bullet from '../../Components/Bullet';
import Aim from '../../Components/Aim';
import Zombies from '../../Components/Zombies';
import Floor from '../../Components/Floor';
import Constants, {responsive} from '../../helpers/Constants';

const level2Entities = () => {
  let engine = Matter.Engine.create({enableSleeping: false});

  let world = engine.world;

  engine.gravity.y = 0;

  return {
    physics: {engine, world},

    Hero: Hero({
      world: world,
      pos: {x: responsive(50), y: responsive(230)},
      size: {height: responsive(80), width: responsive(80)},
    }),
    Gun: Gun({
      world: world,
      size: {height: responsive(25), width: responsive(35)},
      pos: {x: responsive(55), y: responsive(250)},
      moving: false,
      directionAngle: 0,
    }),
    Bullet: Bullet({
      world: world,
      size: {height: responsive(15), width: responsive(15)},
      pos: {x: responsive(70), y: responsive(230)},
      moving: false,
      directionAngle: 0,
    }),
    Aim: Aim({
      world: world,
      size: {height: responsive(50), width: responsive(50)},
      pos: {x: 0, y: 0},
      moving: false,
    }),
    Zombies: Zombies({
      world: world,
      pos: {x: responsive(550), y: responsive(235)},
      size: {height: responsive(70), width: responsive(50)},
    }),
    Zombies2: Zombies({
      world: world,
      pos: {
        x: Constants.MAX_WIDTH / 2,
        y: Constants.MAX_HEIGHT / 2 - responsive(35), // about floor width
      },
      size: {height: responsive(70), width: responsive(50)},
    }),
    FloorBottom: Floor({
      world: world,
      color: 'black',
      pos: {x: Constants.MAX_WIDTH / 2, y: Constants.MAX_HEIGHT},
      size: {height: responsive(38), width: Constants.MAX_WIDTH},
    }),
    FloorRight: Floor({
      world: world,
      color: 'black',
      pos: {x: Constants.MAX_WIDTH, y: Constants.MAX_HEIGHT / 2},
      size: {height: Constants.MAX_HEIGHT, width: responsive(38)},
    }),
    FloorLeft: Floor({
      world: world,
      color: 'black',
      pos: {x: 0, y: Constants.MAX_HEIGHT / 2},
      size: {height: Constants.MAX_HEIGHT, width: responsive(38)},
    }),
    FloorTop: Floor({
      world: world,
      color: 'black',
      pos: {x: Constants.MAX_WIDTH / 2, y: 0},
      size: {height: responsive(38), width: Constants.MAX_WIDTH},
    }),
    FloorMid: Floor({
      world: world,
      color: 'black',
      pos: {x: Constants.MAX_WIDTH / 2, y: Constants.MAX_HEIGHT / 2},
      size: {height: responsive(5), width: Constants.MAX_WIDTH / 3},
    }),
  };
};

export default level2Entities;
