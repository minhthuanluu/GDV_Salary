import { StyleSheet } from "react-native";
import { colors } from "../../../../../utils/Colors";
import { fontScale } from "../../../../../utils/Fonts";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.primary
    },
    dateContainer: {
        flexDirection: "row"
    },
    notification: {
        color: colors.white,
        fontSize: fontScale(15),
        marginTop:fontScale(15),
        fontWeight:"bold",
        textAlign: "center"
    },
    subContainer:{
        flex:1,
        backgroundColor:colors.white
    },
    empAmount:{
        flexDirection:"row",
        justifyContent:"center"
    },
    empAmountTitle:{
        fontSize:fontScale(17),
        fontWeight:"bold"
    },
    empAmountContent:{
        fontSize:fontScale(18),
        fontWeight:"bold",
        top:-fontScale(2),
        color:"#1AC4D1"
    }
})