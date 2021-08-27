import { StyleSheet } from "react-native";
import { colors } from "../../utils/Colors";
import { fontScale } from "../../utils/Fonts";

export const styles = StyleSheet.create({
    container:{ flexDirection: "row", backgroundColor: "#fff", borderRadius: fontScale(8), padding: fontScale(10)},
    selectContainer:{flexDirection:"row",backgroundColor: "#fff",borderRadius:fontScale(8), padding: fontScale(10)},
    monthLabel:{textAlign: "center",flex:1,color:colors.darkYellow,fontWeight:"bold",fontSize:fontScale(14),marginLeft:fontScale(10)},
    arrowDown:{marginLeft:fontScale(5),marginRight:fontScale(5),width:fontScale(20),height:fontScale(15)}
})