import { StyleSheet } from "react-native";
import { colors } from "../../../../../utils/Colors";
import { fontScale } from "../../../../../utils/Fonts";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    text: {
        fontSize: fontScale(14),
        color: colors.white,
        textAlign: "center"
    },
    squareShapeOne: {
        flex: 1,
        margin: fontScale(5),
        paddingHorizontal: fontScale(10),
        paddingBottom: fontScale(15),
        borderRadius: fontScale(17),
        shadowColor: "#000",
        backgroundColor: colors.white,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }
})