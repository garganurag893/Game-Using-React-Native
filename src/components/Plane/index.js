import React, {Component} from 'react';
import {Animated} from 'react-native';
import {array, object, string} from 'prop-types';
import Matter from 'matter-js';

const airplane = require('../../assets/airplane.png');

class Plane extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(this.props.body.velocity.y);
  }
  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;
    this.animatedValue.setValue(this.props.body.velocity.y);
    let rotation = this.animatedValue.interpolate({
      inputRange: [-10, 0, 10, 20],
      outputRange: ['-30deg', '10deg', '20deg', '45deg'],
      extrapolate: 'clamp',
    });
    return (
      <Animated.Image
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: width,
          height: height,
          transform: [{rotate: rotation}],
        }}
        source={airplane}
        resizeMode="stretch"
      />
    );
  }
}

export default (world, color, pos, size) => {
  const initialPlane = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
  );
  Matter.World.add(world, [initialPlane]);

  return {
    body: initialPlane,
    size: [size.width, size.height],
    color: color,
    renderer: <Plane />,
  };
};

Plane.propTypes = {
  size: array,
  body: object,
  color: string,
};
