import { StyleSheet } from "react-native";
import { colors } from "../../utils/Colors";
import { fontScale } from "../../utils/Fonts";

export const styles = StyleSheet.create({
  userInfo: {
    textAlign: "center",
    fontSize: fontScale(14),
    fontWeight: "bold",
    color: colors.white,
  },
  container: { flexDirection: 'row' },
  body: {
    backgroundColor: colors.white,
  },
  statusTitle: {
    color: "#FCFCFC",
    fontSize: fontScale(15)
  },
  statusData: { color: "#FEF500", fontSize: fontScale(15) }

});
