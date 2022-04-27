import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { calculateTimeBetweenTwoDates } from "../utils/time.utils";
import { Donut } from "./Donut";
import { View } from "./Themed";

const input = {
  start: "2022-04-27T22:51:07",
  end: "2022-04-27T22:52:07",
  result: "25m 07s",
};

let v = calculateTimeBetweenTwoDates(input.end, input.start);
export function Timer(props: iTimer) {
  const [value, setValue] = useState(0);
  const [text, setText] = useState("");
  // handle value === 0

  const max = calculateTimeBetweenTwoDates(input.end, input.start);

  useEffect(() => {
    let interval = setInterval(() => {
      v -= 1000;
      setValue(v);
      setText(DateTime.fromMillis(v).toFormat("mm'm 'ss's"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <Donut value={value} max={max} radius={100} displayedText={text}></Donut>
    </View>
  );
}

export interface iTimer {}
