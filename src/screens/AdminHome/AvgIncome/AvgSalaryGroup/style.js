import { StyleSheet } from "react-native";
import { colors } from "../../../../utils/Colors";
import { fontScale } from "../../../../utils/Fonts";

export const styles = StyleSheet.create({
    container:{
        flex: 1,backgroundColor:colors.primary 
    },
    table: {
         marginBottom: -50
    },
    notification: {
        color:colors.white,
        textAlign:"center",
        fontSize:fontScale(14),
        fontWeight:"bold"
    }
})