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
        textAlign:"center"
    }
})