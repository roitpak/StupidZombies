import Matter from 'matter-js';

interface Entities {
  Zombies: {body: any; color: string};
  Bullet: {body: any; color: string};
  Floor: {body: any; color: string};
  Hero: {body: any; color: string};
  physics: {
    engine: Matter.Engine;
    world: Matter.World;
  };
}
interface TouchEvent {
  type: string;
  event: any;
}

interface PhysicsProps {
  touches: TouchEvent[];
  time: {delta: number};
  dispatch: any;
}

const Physics = (
  entities: Entities,
  {touches, time, dispatch}: PhysicsProps,
): Entities => {
  let engine = entities.physics.engine;
  Matter.Engine.update(engine, time.delta);
  Matter.Body.translate(entities?.Zombies?.body, {x: -3, y: 0});
  return entities;
};

export default Physics;
