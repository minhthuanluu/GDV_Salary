import { StyleSheet } from "react-native";
import { colors } from "../../../../../../utils/Colors";
import { fontScale } from "../../../../../../utils/Fonts";


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
    outcomeSal: {
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
        elevation: 5,
        marginTop: fontScale(50)
    },
    remainTitle:{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: colors.black, marginLeft: fontScale(18) },
    remainContent:{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: "#1AC4D1", marginLeft: fontScale(21) },
    branchCode:{ fontSize: fontScale(18), textAlign: "center", fontWeight: "bold", color: "#151515", marginTop: fontScale(10), marginLeft: fontScale(10) },
    branchIcon:{ width: fontScale(47), height: fontScale(47), position: "absolute", right: fontScale(10), top: -fontScale(25) }
})