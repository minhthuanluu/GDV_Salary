import { StyleSheet } from "react-native";
import { colors } from "../../../../../utils/Colors";
import { fontScale } from "../../../../../utils/Fonts";

export const styles = StyleSheet.create({
    avatar: {
        marginTop: fontScale(150),
        width: "100%",
        height: "50%"
    },
   icon: {
       width: fontScale(29),
       height: fontScale(29),
       marginTop: fontScale(20),
       marginLeft: fontScale(15),
       tintColor: colors.white
       
   }
})