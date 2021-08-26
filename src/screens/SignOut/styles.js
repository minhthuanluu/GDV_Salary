import { StyleSheet } from "react-native";
import { colors } from "../../utils/Colors";
import { height, width } from "../../utils/Dimenssion";
import { fontScale } from "../../utils/Fonts";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    dialog: {
        backgroundColor: colors.white,
        borderTopLeftRadius: fontScale(40),
        borderTopRightRadius: fontScale(40),
        position:"absolute",
        height:height/5,
        width:width,
        bottom:0
    },
    logoutMessage: {
        textAlign: "center",
        padding: fontScale(10),
        marginTop: fontScale(30),
        fontSize: fontScale(17),
        fontWeight: "bold"
    },
    buttonContainer: {
        marginVertical: fontScale(20),
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "space-between"
    }

})