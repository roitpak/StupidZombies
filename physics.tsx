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
  let translate = {x: 0, y: 0};
  touches
    .filter(t => t.type === 'press')
    .forEach(t => {
      console.log('Touch', t);
      console.log('Entity', entities?.Zombies?.body);
      const angleRadians = Math.atan2(
        t.event.locationY - entities.Bullet.body.position.y,
        t.event.locationX - entities.Bullet.body.position.x,
      );
      translate = {
        x: Math.cos(angleRadians),
        y: Math.sin(angleRadians),
      };
      Matter.Body.translate(entities.Bullet.body, translate);
    });
  Matter.Events.on(engine, 'collisionStart', e => {
    // console.log('Collision', e);
    // dispatch({type: 'game_over'});
  });
  Matter.Engine.update(engine, time.delta);
  Matter.Body.translate(entities.Bullet.body, translate);

  return entities;
};

export default Physics;
