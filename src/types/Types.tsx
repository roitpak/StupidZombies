export type Pos = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type Level = {
  bounces: number;
  bullets: number;
  hero: {
    pos: Pos;
  };
  zombies: {pos: Pos}[];
  floors: {
    pos: Pos;
    size: Size;
  }[];
};

export type Entities = {
  Zombies: {body: any; color: string; dead: boolean};
  Bullet: {body: any; color: string; moving: boolean; directionAngle: number};
  Gun: {body: any; color: string; moving: boolean; directionAngle: number};
  Aim: {body: any; color: string; moving: boolean};
  FloorBottom: {body: any; color: string};
  FloorTop: {body: any; color: string};
  FloorRight: {body: any; color: string};
  FloorLeft: {body: any; color: string};
  Hero: {body: any; color: string};
  physics: {
    engine: Matter.Engine;
    world: Matter.World;
  };
};

export type TouchEvent = {
  type: string;
  event: any;
};

export type PhysicsProps = {
  touches: TouchEvent[];
  time: {delta: number};
  dispatch: any;
};
