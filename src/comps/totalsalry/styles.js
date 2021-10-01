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
  container: {
    backgroundColor: colors.primary,
  },
  body: {
    backgroundColor: colors.white,
  },
  total: {
    color: "#2E2E31",
    fontWeight: 'bold',
    fontSize:fontScale(19)

  },
  salary: {
    color: "#289AF3",
    fontWeight: 'bold',
    fontSize:fontScale(19)
  },
  
});