import { StyleSheet } from "react-native";
import { colors } from "../../utils/Colors";
import { fontScale } from "../../utils/Fonts";

export const styles = StyleSheet.create({
    leftIco: {
        width: fontScale(38),
        left:fontScale(10),
        height: fontScale(38),
    },
    homeSearch: {
        borderRadius: fontScale(12),
        alignItems: "center",
        color: "#B7B7B7",
        fontSize: fontScale(13),
        textAlign:"center",
       
    },
    rightIco: {
        width: fontScale(25),
        height: fontScale(25),
        right:fontScale(-5)
    },
    placeholder:{
        textAlign:"center"
    },
    modalTitle:{textAlign:"center",fontSize:fontScale(16),marginTop:fontScale(20),fontWeight:"bold"},
    modalContainer:{flex:1,backgroundColor:colors.white,borderWidth:1,borderColor:'#c9c9c9',borderTopLeftRadius:fontScale(50),borderTopRightRadius:fontScale(50)},
    message:{ textAlign: "center", color: colors.primary, marginVertical: fontScale(5) }
})