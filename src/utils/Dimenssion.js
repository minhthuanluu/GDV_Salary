import { Dimensions, StatusBar } from "react-native";

export const width = Dimensions.get("screen").width;
export const height = Dimensions.get("screen").height;
export const statusbarHeight = StatusBar.currentHeight;

export const getDimesions=(layout)=>{
    const {x, y, width, height} = layout;
    console.log(layout)
  }