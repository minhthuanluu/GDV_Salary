import { StyleSheet } from "react-native";
import { colors } from "../../utils/Colors";
import { width } from "../../utils/Dimenssion";
import { fontScale } from "../../utils/Fonts";

export const styles = StyleSheet.create({
    container:{ backgroundColor: colors.lightGrey, marginHorizontal: fontScale(30), padding: fontScale(5), borderRadius: fontScale(15), marginTop: fontScale(20) },
    leftIco: {
        width: fontScale(28),
        left:fontScale(10),
        marginVertical:fontScale(6),
        height: fontScale(28),
    },
    homeSearch: {
        borderRadius: fontScale(20),
        alignItems: "center",
        color: "#B7B7B7",
        fontSize: fontScale(13),
        textAlign:"center",
       
    },
    rightIco: {
        width: fontScale(25),
        height: fontScale(25),
        right:fontScale(10)
    },
    placeholder:{
        textAlign:"center",fontSize:fontScale(14)
    },
    modalTitle:{textAlign:"center",fontSize:fontScale(16),marginTop:fontScale(20),fontWeight:"bold"},
    modalContainer:{flex:1,backgroundColor:colors.white,borderWidth:1,borderColor:'#c9c9c9',borderTopLeftRadius:fontScale(50),borderTopRightRadius:fontScale(50)},
    message:{ textAlign: "center", color: colors.primary, marginVertical: fontScale(5) },
    radioForm:{width:width - fontScale(65),justifyContent:"space-between"},
    searchInput:{ marginTop: fontScale(30), marginHorizontal: fontScale(15),fontSize:fontScale(17) }
})