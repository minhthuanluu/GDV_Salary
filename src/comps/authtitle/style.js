import { StyleSheet } from "react-native";
import { colors } from "../../utils/Colors";
import { fontScale } from "../../utils/Fonts";

export const styles = StyleSheet.create({
    container:{
        textTransform:"uppercase",
        color:colors.white,
        fontWeight:"bold",
        fontSize:fontScale(15)
    }
})