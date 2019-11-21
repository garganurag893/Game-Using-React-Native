import Plane from '../components/Plane';
import Floor from '../components/Floor';
import Ceiling from '../components/Ceiling';
import Obstacle from '../components/Obstacle';
import Matter from 'matter-js';
import {height, width, heightRatio, widthRatio} from '../utils/styleSheet';
import {
  getRandom,
  topObstacleHeight,
  bottomObstacleHeight,
} from '../utils/random';
import Constants from '../utils/constants';

Matter.Common.isElement = () => false; //-- Overriding this function because the original references HTMLElement

export default restart => {
  //-- Cleanup existing entities..
  if (restart) {
    Matter.Engine.clear(restart.physics.engine);
  }

  let engine = Matter.Engine.create({enableSleeping: false});
  let world = engine.world;
  world.gravity.y = 0.25;

  return {
    physics: {engine: engine, world: world},
    Plane: Plane(
      world,
      'pink',
      {x: width / 2, y: height / 2},
      {height: heightRatio * 50, width: widthRatio * 70},
    ),
    Floor: Floor(
      world,
      'white',
      {x: width / 2, y: height - heightRatio * 40},
      {height: heightRatio * 90, width: width},
    ),
    Ceiling: Ceiling(
      world,
      'white',
      {x: width / 2, y: -heightRatio * 120},
      {height: heightRatio * 120, width: width},
    ),
    Obstacle1: Obstacle(
      world,
      'top',
      {
        x: width * 2 - Constants.TOP_PIPE_WIDTH / 2,
        y: getRandom(heightRatio * 100, heightRatio * 300),
      },
      {height: topObstacleHeight, width: Constants.TOP_PIPE_WIDTH},
    ),
    Obstacle2: Obstacle(
      world,
      'bottom',
      {
        x: width * 3 - Constants.BOTTOM_PIPE_WIDTH / 2,
        y: getRandom(heightRatio * 300, heightRatio * 500),
      },
      {height: bottomObstacleHeight, width: Constants.BOTTOM_PIPE_WIDTH},
    ),
  };
};
