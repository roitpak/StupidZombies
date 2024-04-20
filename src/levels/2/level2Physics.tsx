import Matter from 'matter-js';
import {PhysicsProps} from '../../types/Types';
import {Entities} from './types';
import { responsive } from '../../helpers/Constants';

var Sound = require('react-native-sound');
Sound.setCategory('Playback');
var fire = new Sound('fire.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});
var impact = new Sound('impact.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});

// TODO there values stays persistent even when going back

const BOUNCES = 5;
const TOTAL_ZOMBIES = 2;

let translate = {x: 0, y: 0};
let currentBounce = -1;
let hitZombies: [string] = [];
let bulletMoving = false;

let isFirstCall = true;

function updateMovement(value: {x: number; y: number}, entities: Entities) {
  if (isFirstCall) {
    bulletMoving = true;
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

function resetValues(entities: Entities) {
  translate = {x: 0, y: 0};
  currentBounce = -1;
  hitZombies = [];

  isFirstCall = true;
  bulletMoving = false;
  entities.Bullet.body.x = responsive(70);
  entities.Bullet.body.y = responsive(70);
}

const level2Physics = (
  entities: Entities,
  {touches, time, dispatch}: PhysicsProps,
): Entities => {
  let engine = entities.physics.engine;
  touches
    .filter(t => t.type === 'end')
    .forEach(t => {
      entities.Gun.moving = false;
      entities.Aim.moving = false;
      if (bulletMoving) {
        return;
      }
      fire.play();
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
        Matter.Body.set(entities.Zombies.body, 'collisionFilter', {
          mask: ~0x0002,
        }); // bullet will continue its path
        !hitZombies.includes('Zombie1') && hitZombies.push('Zombie1');
        entities.Zombies.dead = true;
      }
      if (
        bodyA === entities.Bullet?.body &&
        bodyB === entities.Zombies2?.body
      ) {
        Matter.Body.set(entities.Zombies2.body, 'collisionFilter', {
          mask: ~0x0002,
        }); // bullet will continue its path
        !hitZombies.includes('Zombie2') && hitZombies.push('Zombie2');
        entities.Zombies2.dead = true;
      }

      if (hitZombies.length === TOTAL_ZOMBIES) {
        dispatch({type: 'win'});
        resetValues(entities);
      }

      let tempTranslate;

      if (
        bodyA === entities.Bullet?.body &&
        (bodyB === entities.FloorTop?.body ||
          bodyB === entities.FloorBottom?.body ||
          bodyB === entities.FloorLeft?.body ||
          bodyB === entities.FloorRight?.body)
      ) {
        impact.play();
        if (currentBounce === BOUNCES) {
          bulletMoving = false;
          dispatch({type: 'game_over'});
          entities.Bullet.moving = false;
          resetValues(entities);
        }
        switch (bodyB) {
          case entities.FloorTop?.body:
            tempTranslate = translate;
            updateMovement({x: tempTranslate.x, y: -tempTranslate.y}, entities);
            break;
          case entities.FloorBottom?.body:
            tempTranslate = translate;
            updateMovement({x: tempTranslate.x, y: -tempTranslate.y}, entities);
            break;
          case entities.FloorLeft?.body:
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

      if (
        bodyA === entities.Bullet?.body &&
        bodyB === entities.FloorMid?.body
      ) {
        impact.play();
        const {bodyA, bodyB} = pair;

        const collisionPoint = {
          x: (bodyA.position.x + bodyB.position.x) / 2,
          y: (bodyA.position.y + bodyB.position.y) / 2,
        };

        // // 351
        // if (collisionPoint.x <= bodyB.bounds.min.x) {
        //   console.log('left');
        // } else if (collisionPoint.x >= bodyB.bounds.max.x) {
        //   // 501
        //   console.log('right');
        // }

        if (collisionPoint.y <= bodyB.bounds.min.y + 2) {
          // +2 added sometimes inside bounds
          tempTranslate = translate;
          updateMovement({x: tempTranslate.x, y: -tempTranslate.y}, entities);
        } else if (collisionPoint.y >= bodyB.bounds.max.y + 1) {
          tempTranslate = translate;
          updateMovement({x: tempTranslate.x, y: -tempTranslate.y}, entities);
        }
      }
    });
  });
  Matter.Engine.update(engine, time.delta);
  Matter.Body.translate(entities.Bullet.body, translate);
  return entities;
};

export default level2Physics;
