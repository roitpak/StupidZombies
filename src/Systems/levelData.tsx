import Constants from '../helpers/Constants';
import {Level} from '../types/Types';

export const levelData: [Level] = [
  {
    bounces: 5,
    bullets: 5,
    hero: {
      pos: {
        x: 70,
        y: 320,
      },
    },
    zombies: [{pos: {x: 700, y: 300}}],
    floors: [
      {
        pos: {x: Constants.MAX_WIDTH / 2, y: Constants.MAX_HEIGHT},
        size: {height: 50, width: Constants.MAX_WIDTH},
      },
      {
        pos: {x: Constants.MAX_WIDTH, y: Constants.MAX_HEIGHT / 2},
        size: {height: Constants.MAX_HEIGHT, width: 50},
      },
      {
        pos: {x: 0, y: Constants.MAX_HEIGHT / 2},
        size: {height: Constants.MAX_HEIGHT, width: 50},
      },
      {
        pos: {x: Constants.MAX_WIDTH / 2, y: 0},
        size: {height: 50, width: Constants.MAX_WIDTH},
      },
    ],
  },
];
