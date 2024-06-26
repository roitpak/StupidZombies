import Matter from 'matter-js';
import {Entities, Level, PhysicsProps} from '../types/Types';

const physicsGenerator = (
  entities: Entities,
  {touches, time, dispatch}: PhysicsProps,
  level: Level,
): Entities => {
  let engine = entities.physics.engine;
  const BOUNCES = level.bounces;

  let translate = {x: 0, y: 0};
  let currentBounce = 0;
  let hitZombies = [];
  let bulletRunning = false;
  let remainingBullets = level.bullets;
  let isFirstCall = true; //flag because collision called multiple times
  function moveBullet(value: {x: number; y: number}) {
    if (isFirstCall) {
      bulletRunning = true;
      translate = value;
      isFirstCall = false;
      currentBounce++;
      const angleRad = Math.atan2(value.y, value.x);
      entities.Bullet.directionAngle = angleRad * (180 / Math.PI);
      entities.Bullet.moving = true;
      setTimeout(() => {
        isFirstCall = true;
      }, 100);
    }
  }

  touches
    .filter(t => t.type === 'end')
    .forEach(t => {
      if (bulletRunning) {
        return;
      }
      remainingBullets--;
      const angleRadians = Math.atan2(
        t.event.locationY - entities.Bullet.body.position.y,
        t.event.locationX - entities.Bullet.body.position.x,
      );
      moveBullet({
        x: Math.cos(angleRadians) * 7,
        y: Math.sin(angleRadians) * 7,
      });
      entities.Gun.moving = false;
      entities.Aim.moving = false;
    });

  touches
    .filter(t => t.type === 'start')
    .forEach(t => {
      if (bulletRunning) {
        return;
      }
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
      if (bulletRunning) {
        return;
      }
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

  Matter.Events.on(engine, 'collisionStart', event => {
    event.pairs.forEach(pair => {
      const {bodyA, bodyB} = pair;
      if (bodyA === entities.Bullet?.body && bodyB === entities.Zombies?.body) {
        dispatch({type: 'win'});
        hitZombies.push(entities.Zombies?.body.label);
        entities.Zombies.dead = true;
        entities.Bullet.moving = false;
        bulletRunning = false;
      }
      if (
        bodyA === entities.Bullet?.body &&
        (bodyB === entities.FloorTop?.body ||
          bodyB === entities.FloorBottom?.body ||
          bodyB === entities.FloorLeft?.body ||
          bodyB === entities.FloorRight?.body)
      ) {
        if (currentBounce === BOUNCES) {
          if (remainingBullets === 0) {
            dispatch({type: 'game_over'});
            entities.Bullet.moving = false;
          }
          bulletRunning = false;
        }
        let tempTranslate;
        switch (bodyB) {
          case entities.FloorTop?.body || entities.FloorBottom?.body:
            tempTranslate = translate;
            moveBullet({x: tempTranslate.x, y: -tempTranslate.y});
            break;
          case entities.FloorBottom?.body:
            tempTranslate = translate;
            moveBullet({x: tempTranslate.x, y: -tempTranslate.y});
            break;
          case entities.FloorLeft?.body || entities.FloorRight?.body:
            tempTranslate = translate;
            moveBullet({x: -tempTranslate.x, y: tempTranslate.y});
            break;
          case entities.FloorRight?.body:
            tempTranslate = translate;
            moveBullet({x: -tempTranslate.x, y: tempTranslate.y});
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

export default physicsGenerator;
