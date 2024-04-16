import Matter from 'matter-js';

interface Entities {
  Zombies: {body: any; color: string; dead: boolean};
  Bullet: {body: any; color: string};
  FloorBottom: {body: any; color: string};
  FloorTop: {body: any; color: string};
  FloorRight: {body: any; color: string};
  FloorLeft: {body: any; color: string};
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

const BOUNCES = 5;

let translate = {x: 0, y: 0};
let currentBounce = 0;
let hitZombies = [];

let isFirstCall = true;
function setTranslate(value: {x: number; y: number}) {
  if (isFirstCall) {
    // Do something with the argument for the first call
    translate = value;
    isFirstCall = false;
    currentBounce++;
    // Set a timeout to reset isFirstCall after a delay
    setTimeout(() => {
      isFirstCall = true;
    }, 100); // Adjust the delay as needed
  }
}

const Physics = (
  entities: Entities,
  {touches, time, dispatch}: PhysicsProps,
): Entities => {
  let engine = entities.physics.engine;
  touches
    .filter(t => t.type === 'press')
    .forEach(t => {
      const angleRadians = Math.atan2(
        t.event.locationY - entities.Bullet.body.position.y,
        t.event.locationX - entities.Bullet.body.position.x,
      );
      translate = {
        x: Math.cos(angleRadians) * 7,
        y: Math.sin(angleRadians) * 7,
      };
    });
  Matter.Events.on(engine, 'collisionStart', event => {
    event.pairs.forEach(pair => {
      const {bodyA, bodyB} = pair;
      if (bodyA === entities.Bullet?.body && bodyB === entities.Zombies?.body) {
        dispatch({type: 'win'});
        hitZombies.push(entities.Zombies?.body.label);
        entities.Zombies.dead = true;
      }
      if (
        bodyA === entities.Bullet?.body &&
        (bodyB === entities.FloorTop?.body ||
          bodyB === entities.FloorBottom?.body ||
          bodyB === entities.FloorLeft?.body ||
          bodyB === entities.FloorRight?.body)
      ) {
        if (currentBounce === BOUNCES) {
          dispatch({type: 'game_over'});
        }
        let tempTranslate;
        switch (bodyB) {
          case entities.FloorTop?.body || entities.FloorBottom?.body:
            tempTranslate = translate;
            setTranslate({x: tempTranslate.x, y: -tempTranslate.y});
            break;
          case entities.FloorBottom?.body:
            tempTranslate = translate;
            setTranslate({x: tempTranslate.x, y: -tempTranslate.y});
            break;
          case entities.FloorLeft?.body || entities.FloorRight?.body:
            tempTranslate = translate;
            setTranslate({x: -tempTranslate.x, y: tempTranslate.y});
            break;
          case entities.FloorRight?.body:
            tempTranslate = translate;
            setTranslate({x: -tempTranslate.x, y: tempTranslate.y});
            break;
          default:
            break;
        }
      }
    });
  });
  Matter.Engine.update(engine, time.delta);
  Matter.Body.translate(entities.Bullet.body, translate);

  return entities;
};

export default Physics;
