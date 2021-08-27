import { StyleSheet } from "react-native";
import { colors } from "../../../../../utils/Colors";
import { fontScale } from "../../../../../utils/Fonts";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.primary
    },
    subContainer:{
        flex:1,
        backgroundColor:colors.white,
        paddingHorizontal:fontScale(10)
    },
    planTwelveText:{
        fontWeight:"bold",
        color:colors.black,
        fontSize:fontScale(16),
        marginTop:fontScale(10),
        textAlign:"center"
    },
    subTitle:{ fontSize: fontScale(14), marginTop: fontScale(15), marginLeft: fontScale(5), fontWeight: "bold" },
    expectOutcome:{ fontSize: fontScale(14), marginTop: fontScale(15), marginLeft: fontScale(20), fontWeight: "bold", color: colors.red },
    subTitleLeft:{ fontSize: fontScale(14), marginTop: fontScale(15), marginLeft: fontScale(15), fontWeight: "bold" },
    subContentLeft:{ fontSize: fontScale(14), marginTop: fontScale(15), marginLeft: fontScale(10), fontWeight: "bold", color: colors.lightBlue }
})