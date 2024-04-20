export type Entities = {
  Zombies: {body: any; color: string; dead: boolean};
  Zombies2: {body: any; color: string; dead: boolean};
  Bullet: {body: any; color: string; moving: boolean; directionAngle: number};
  Gun: {body: any; color: string; moving: boolean; directionAngle: number};
  Aim: {body: any; color: string; moving: boolean};
  FloorBottom: {body: any; color: string};
  FloorTop: {body: any; color: string};
  FloorRight: {body: any; color: string};
  FloorLeft: {body: any; color: string};
  FloorMid: {body: any; color: string};
  Hero: {body: any; color: string};
  physics: {
    engine: Matter.Engine;
    world: Matter.World;
  };
};
