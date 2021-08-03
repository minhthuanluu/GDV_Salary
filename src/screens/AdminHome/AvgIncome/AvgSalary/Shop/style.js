import { StyleSheet } from "react-native";
import { colors } from "../../../../../utils/Colors";
import { fontScale } from "../../../../../utils/Fonts";

export const styles = StyleSheet.create({
    container:{
        flex:1,backgroundColor:colors.primary
    },
    notif:{
        color:colors.white,
        textAlign:"center",
        fontSize:fontScale(14),
        fontWeight:"bold"
    },
    body:{
        flex:1,
        backgroundColor:colors.white
    }
})