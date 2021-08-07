import { StyleSheet } from "react-native";
import { colors } from "../../../utils/Colors";
import { fontScale } from "../../../utils/Fonts";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.primary
    },
    message: {
        color: colors.primary,
        textAlign: "center",
        marginTop: fontScale(15),
        fontSize: fontScale(15)
    }
})