import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Donut } from "./Donut";
import { View } from "./Themed";

export function Timer(props: iTimer) {
  return (
    <View>
      <Donut value={52} max={100} radius={100}></Donut>
    </View>
  );
}

export interface iTimer {}
