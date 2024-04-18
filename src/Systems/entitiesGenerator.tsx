import Matter from 'matter-js';
import Hero from '../Components/Hero';
import Floor from '../Components/Floor';
import Zombies from '../Components/Zombies';
import Bullet from '../Components/Bullet';
import Gun from '../Components/Gun';
import Aim from '../Components/Aim';
import {Level} from '../types/Types';

const entitiesGenerator = (level: Level) => {
  let engine = Matter.Engine.create({enableSleeping: false});

  let world = engine.world;

  engine.gravity.y = 0;

  const entities: any = {
    physics: {engine, world},
  };
  entities.Hero = Hero({
    world: world,
    pos: level.hero.pos,
    size: {height: 100, width: 100},
  });

  entities.Gun = Gun({
    world: world,
    size: {height: 30, width: 50},
    pos: {x: level.hero.pos.x + 10, y: level.hero.pos.y + 20},
    moving: false,
    directionAngle: 0,
  });

  entities.Bullet = Bullet({
    world: world,
    size: {height: 20, width: 20},
    pos: {x: level.hero.pos.x, y: level.hero.pos.y + 230},
    moving: false,
    directionAngle: 0,
  });

  entities.Aim = Aim({
    world: world,
    size: {height: 60, width: 60},
    pos: {x: 0, y: 0},
    moving: false,
  });

  level.zombies.forEach((zombie: any, index: number) => {
    entities[`Zombies${index}`] = Zombies({
      world: world,
      pos: zombie.pos,
      size: {height: 100, width: 70},
    });
  });

  level.floors.forEach((floor: any, index: number) => {
    entities[`Floor${index}`] = Floor({
      world: world,
      color: 'black',
      pos: floor.pos,
      size: floor.size,
    });
  });

  return entities;
};

export default entitiesGenerator;
