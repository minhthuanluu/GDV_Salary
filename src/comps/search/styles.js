import { StyleSheet } from "react-native";
import { colors } from "../../utils/Colors";
import { width } from "../../utils/Dimenssion";
import { fontScale } from "../../utils/Fonts";

export const styles = StyleSheet.create({

leftIco: {
    width: fontScale(38),
    marginLeft: fontScale(10),
    height: fontScale(38)
},
homeSearch: {
    width: fontScale(230),
    backgroundColor: '#FFFFFF',
    // backgroundColor:'#000',
    // opacity: 0.65,
    height: fontScale(40),
    marginRight: fontScale(10),
    borderRadius: 12,
    marginLeft: fontScale(53),
    paddingLeft: -20,
    flexDirection: 'row',
    alignItems: "center",
    color: "#B7B7B7"
},
rightIco: {
    
    right: -fontScale(80),
    position: 'absolute',
    width: fontScale(25),
    height: fontScale(25)
},

})