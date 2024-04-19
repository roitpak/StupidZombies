import Matter from 'matter-js';
import {Entities, PhysicsProps} from '../../types/Types';

const BOUNCES = 5;

let translate = {x: 0, y: 0};
let currentBounce = -1;
let hitZombies = [];

let isFirstCall = true;

function updateMovement(value: {x: number; y: number}, entities: Entities) {
  if (isFirstCall) {
    translate = value;
    isFirstCall = false;
    currentBounce++;
    const angleRad = Math.atan2(value.y, value.x);
    entities.Bullet.directionAngle = angleRad * (180 / Math.PI);
    entities.Bullet.moving = true;
    setTimeout(() => {
      isFirstCall = true;
    }, 20);
  }
}

const level1Physics = (
  entities: Entities,
  {touches, time, dispatch}: PhysicsProps,
): Entities => {
  let engine = entities.physics.engine;
  touches
    .filter(t => t.type === 'end')
    .forEach(t => {
      const angleRadians = Math.atan2(
        t.event.locationY - entities.Bullet.body.position.y,
        t.event.locationX - entities.Bullet.body.position.x,
      );
      updateMovement(
        {
          x: Math.cos(angleRadians) * 7,
          y: Math.sin(angleRadians) * 7,
        },
        entities,
      );
      entities.Gun.moving = false;
      entities.Aim.moving = false;
    });
  touches
    .filter(t => t.type === 'start')
    .forEach(t => {
      const angleRadians = Math.atan2(
        t.event.locationY - entities.Bullet.body.position.y,
        t.event.locationX - entities.Bullet.body.position.x,
      );
      entities.Gun.directionAngle = angleRadians * (180 / Math.PI);
      entities.Gun.moving = true;
      entities.Aim.moving = true;
      entities.Aim.body.position.y = t.event.locationY;
      entities.Aim.body.position.x = t.event.locationX;
    });
  touches
    .filter(t => t.type === 'move')
    .forEach(t => {
      const angleRadians = Math.atan2(
        t.event.locationY - entities.Bullet.body.position.y,
        t.event.locationX - entities.Bullet.body.position.x,
      );
      entities.Gun.directionAngle = angleRadians * (180 / Math.PI);
      entities.Aim.body.position.y = t.event.locationY;
      entities.Aim.body.position.x = t.event.locationX;
    });
  Matter.Events.on(engine, 'collisionStart', event => {
    event.pairs.forEach(pair => {
      const {bodyA, bodyB} = pair;
      if (bodyA === entities.Bullet?.body && bodyB === entities.Zombies?.body) {
        dispatch({type: 'win'});
        hitZombies.push(entities.Zombies?.body.label);
        entities.Zombies.dead = true;
        entities.Bullet.moving = false;
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
          entities.Bullet.moving = false;
        }
        let tempTranslate;
        switch (bodyB) {
          case entities.FloorTop?.body || entities.FloorBottom?.body:
            tempTranslate = translate;
            updateMovement({x: tempTranslate.x, y: -tempTranslate.y}, entities);
            break;
          case entities.FloorBottom?.body:
            tempTranslate = translate;
            updateMovement({x: tempTranslate.x, y: -tempTranslate.y}, entities);
            break;
          case entities.FloorLeft?.body || entities.FloorRight?.body:
            tempTranslate = translate;
            updateMovement({x: -tempTranslate.x, y: tempTranslate.y}, entities);
            break;
          case entities.FloorRight?.body:
            tempTranslate = translate;
            updateMovement({x: -tempTranslate.x, y: tempTranslate.y}, entities);
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

export default level1Physics;
