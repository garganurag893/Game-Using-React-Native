import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, Animated, TouchableOpacity} from 'react-native';
import {heightRatio, widthRatio} from '../../utils/styleSheet';
import styleGuide from '../../utils/styleGuide';

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.animatedValue = new Animated.Value(0);
    this.animatedValue2 = new Animated.Value(0);
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    this.animatedValue.setValue(0);
    this.animatedValue2.setValue(0);
    Animated.parallel([
      Animated.timing(this.animatedValue, {
        toValue: 1,
        duration: 1000,
      }),
      Animated.timing(this.animatedValue2, {
        toValue: 1,
        duration: 1000,
      }),
    ]).start();
  }

  render() {
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1],
    });
    const marginTop = this.animatedValue2.interpolate({
      inputRange: [0, 1],
      outputRange: [heightRatio * 0, heightRatio * 240],
    });
    const {props} = this;
    return (
      <View style={styles.gameOverContainer}>
        <Animated.View
          style={[
            styles.animatedCard,
            {opacity: opacity, marginTop: marginTop},
          ]}>
          <Text style={styles.gameOverText}>Game Over</Text>
          <Text style={styles.gameOverText}>{props.score}</Text>
          <TouchableOpacity onPress={props.restart}>
            <View style={[styles.container, styles.shadow]}>
              <Text style={[styles.textStyle]}>Resart</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gameOverContainer: {
    flex: 1,
    alignItems: 'center',
  },
  animatedCard: {
    width: widthRatio * 260,
    height: heightRatio * 200,
    padding: heightRatio * 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    ...styleGuide.bigShadow,
  },
  gameOverText: {
    fontSize: heightRatio * 30,
    fontWeight: 'bold',
    color: 'grey',
    marginBottom: heightRatio * 20,
    fontFamily: 'crackman-regular',
  },
  container: {
    height: heightRatio * 30,
    width: widthRatio * 100,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'transparent',
    backgroundColor: styleGuide.primaryColor,
  },
  shadow: {
    ...styleGuide.bigShadow,
  },
  textStyle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});
