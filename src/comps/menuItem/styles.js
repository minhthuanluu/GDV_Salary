import { StyleSheet } from "react-native";
import { colors } from "../../utils/Colors";
import { width } from "../../utils/Dimenssion";
import { fontScale } from "../../utils/Fonts";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  bg: {
    backgroundColor: colors.white,
    borderRadius: fontScale(15),
    paddingTop: -fontScale(9),
    minHeight: fontScale(30),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  icon: {
    position: "absolute",
    right: fontScale(25),
    top: -fontScale(25),
    resizeMode: "contain",
    width: fontScale(50),
    height: fontScale(50),
  },
  title: {
    minHeight: fontScale(54),
    fontSize: fontScale(19),
    marginLeft: fontScale(15),
    fontWeight: "bold",
    paddingTop: fontScale(26),
    lineHeight: fontScale(23)
  },
  value: {
    textAlign: "right",
    right: fontScale(30),
    fontSize: fontScale(18),
    fontWeight: "bold",
    color: colors.primary,
    top: -fontScale(12),
    
  },
});
