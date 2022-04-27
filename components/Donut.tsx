// stolen from https://www.youtube.com/watch?v=x2LtzCxbWI0
import { StyleSheet, View, Animated, TextInput } from "react-native";
import React, { useEffect, useRef, useState } from "react";

import Svg, { G, Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedInput = Animated.createAnimatedComponent(TextInput);

export function Donut({
  min = 0,
  max,
  value,
  radius = 40,
  strokeWidth = 10,
  animationDuration = 500,
  animationDelay = 0,
  color = "tomato",
  textColor = "#000",
}: iDonut) {
  const uiRadius = radius + strokeWidth;
  const circumference = 2 * Math.PI * radius;

  const [isInitialized, setIsInitialized] = useState(false);

  const circleRef = useRef();
  const inputRef = useRef();
  const animatedValue = useRef(new Animated.Value((isInitialized ? value : min) as number)).current;

  const animation = (toValue: number) => {
    return Animated.timing(animatedValue, {
      toValue,
      duration: animationDuration,
      delay: animationDelay,
      useNativeDriver: true,
    }).start(() => {
      setIsInitialized(true);
    });
  };

  useEffect(() => {
    animation(value as number);
    animatedValue.addListener((event) => {
      const maxPercentage = (event.value / max) * 100;
      const strokeDashoffset = circumference - (circumference * maxPercentage) / 100;

      // TODO:  remove as any with proper typings
      (circleRef?.current as any).setNativeProps({ strokeDashoffset });
      (inputRef?.current as any).setNativeProps({ text: `${Math.round(event.value)}` });
    });

    return () => {
      animatedValue.removeAllListeners();
    };
  }, [max, value]);
  return (
    <View>
      <Svg width={radius * 2} height={radius * 2} viewBox={`0 0 ${uiRadius * 2} ${uiRadius * 2}`}>
        <G rotation="-90" origin={`${uiRadius}, ${uiRadius}`}>
          <Circle
            cx="50%"
            cy="50%"
            fill="transparent"
            r={radius}
            stroke={color}
            strokeOpacity={0.3}
            strokeWidth={strokeWidth}
          />
          <AnimatedCircle
            ref={circleRef}
            cx="50%"
            cy="50%"
            fill="transparent"
            r={radius}
            stroke={color}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference / 2}
          />
        </G>
      </Svg>
      <AnimatedInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue="0"
        style={[StyleSheet.absoluteFillObject, { fontSize: radius / 2, color: textColor ?? color }, styles.textValue]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textValue: {
    fontWeight: "700",
    textAlign: "center",
  },
});

export interface iDonut {
  value: number;
  max: number;
  min?: number;
  radius?: number;
  strokeWidth?: number;
  animationDelay?: number;
  animationDuration?: number;
  color?: string;
  textColor?: string;
}
