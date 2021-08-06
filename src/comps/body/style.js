import { StyleSheet } from "react-native";
import { colors } from "../../utils/Colors";
import { fontScale } from "../../utils/Fonts";

export const styles = StyleSheet.create({
    userInfo: {
        textAlign: "center",
        fontSize: fontScale(15),
        fontWeight: "bold",
        color: colors.white
    },
    container: { flex: 1, backgroundColor: colors.primary },
    body: { backgroundColor: colors.white, flex: 1 },
    sumKpiContainer: { flexDirection: "row", justifyContent: "center" },
    sumKpiTitle: { color: colors.black, fontSize: fontScale(18), fontWeight: "bold", marginTop: -fontScale(16) },
    sumKpiMonth: { color: colors.black, fontSize: fontScale(18), fontWeight: "bold", marginTop: -fontScale(16) },
    sumKpi: { color: colors.lightBlue, fontSize: fontScale(21), textAlign: "center", fontWeight: "bold", marginTop: fontScale(9) },
    text: {alignSelf:"center", color:colors.white}
})