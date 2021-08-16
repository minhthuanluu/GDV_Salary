import { StyleSheet } from "react-native";
import { colors } from "../../../../../../utils/Colors";
import { fontScale } from "../../../../../../utils/Fonts";

export const styles = StyleSheet.create({
    message:{
        color:colors.primary,
        textAlign:"center"
    },
    dataList:{ marginTop: fontScale(50), marginBottom: fontScale(30) }
})