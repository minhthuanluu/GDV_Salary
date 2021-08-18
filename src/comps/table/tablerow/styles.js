import { StyleSheet } from "react-native";
import { fontScale } from "../../../utils/Fonts";

export const styles = StyleSheet.create({
    container:{
        paddingTop: fontScale(5)
    },
    touchContainer:{ flexDirection: "row", paddingVertical: fontScale(1) }
})