import { StyleSheet } from "react-native";
import { colors } from "../../utils/Colors";
import { width } from "../../utils/Dimenssion";
import { fontScale } from "../../utils/Fonts";

export const styles = StyleSheet.create({
    container: { flexDirection: "row", marginHorizontal: fontScale(15), marginVertical: fontScale(5) },
    titleContain: { flexDirection: "row", flex: 1 },
    mainTitle:{ fontWeight: "bold",fontSize:fontScale(19),paddingVertical:fontScale(5), marginLeft: fontScale(5), color: '#2E2E31', textAlignVertical: "center",width:width/2 },
    title: { fontWeight: "bold",fontSize:fontScale(16),paddingVertical:fontScale(10), marginLeft: fontScale(5), color: colors.grey,width:width/2 },
    price: { textAlign: "right",fontSize:fontScale(15),paddingVertical:fontScale(10),color:'#289AF3' },
    icon: { width: fontScale(22), alignItems:"center",justifyContent:"center",height: fontScale(22),marginRight:fontScale(5),marginTop:fontScale(6) }
});
