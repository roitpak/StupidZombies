import {Entities, PhysicsProps} from '../types/Types';
import level1Entities from './1/level1Entities';
import level1Physics from './1/level1Physics';
import level2Entities from './2/level2Entities';
import level2Physics from './2/level2Physics';

const levels = [
  {
    entities: () => level1Entities(),
    physics: (entities: Entities, {touches, time, dispatch}: PhysicsProps) =>
      level1Physics(entities, {touches, time, dispatch}),
  },
  {
    entities: () => level2Entities(),
    physics: (entities: Entities, {touches, time, dispatch}: PhysicsProps) =>
      level2Physics(entities, {touches, time, dispatch}),
  },
];

export default levels;
