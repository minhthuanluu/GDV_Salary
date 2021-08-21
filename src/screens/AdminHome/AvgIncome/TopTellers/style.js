import { StyleSheet } from "react-native";
import { colors } from "../../../../utils/Colors";
import { width } from "../../../../utils/Dimenssion";
import { fontScale } from "../../../../utils/Fonts";

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.primary },
    bodyScr: { marginTop: fontScale(27) },
    body: {
        flex: 1,
        backgroundColor: colors.white
    },
    status: {
        textAlign: "center",
        alignSelf: "center",
        marginTop: -fontScale(5)
    },
    search: {
        marginTop: fontScale(20)
    },
    dateCol: { textAlign: "center", fontSize: fontScale(14),textAlignVertical:"center" },
    sumKpiContainer: {flexDirection: "row", alignSelf: "center", marginTop: -fontScale(35)},
    sumKpiTitle:{fontSize:fontScale(16)},
    sumKpiContainerSecond: {flexDirection: "row", alignSelf: "center", marginLeft: 20},
    preSub: {fontWeight: "bold", color: "#A89D02",fontSize:fontScale(16)},
    message: {
        color: colors.primary,
        textAlign: "center",
        marginTop: fontScale(15),
        fontSize: fontScale(15)
    },
    dataPicker:{ marginTop: fontScale(20), marginRight: fontScale(5) },
    notification: {
        color:colors.white,
        textAlign:"center",
        fontSize:fontScale(14),
        fontWeight:"bold",
        marginBottom:fontScale(20)
    }
})