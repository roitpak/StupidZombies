import {Dimensions} from 'react-native';

export const Constants = {
  MAX_WIDTH: Dimensions.get('screen').width,
  MAX_HEIGHT: Dimensions.get('screen').height,
  GAP_SIZE: 320,
  PIPE_WIDTH: 100,
  BIRD_WIDTH: 50,
  BIRD_HEIGHT: 41,
};
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scaleHorizontal = Constants.MAX_WIDTH / guidelineBaseWidth;
const scaleVertical = Constants.MAX_HEIGHT / guidelineBaseHeight;
const scaleAvg = (scaleHorizontal + scaleVertical) / 2;

export const responsive = (num: number) => scaleAvg * num;

export default Constants;
