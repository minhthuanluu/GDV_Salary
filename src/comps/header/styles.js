import { StyleSheet } from "react-native";
import { colors } from "../../utils/Colors";
import { statusbarHeight, width } from "../../utils/Dimenssion";
import { fontScale } from "../../utils/Fonts";

export const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.primary,
        flexDirection:"row",
        paddingVertical:fontScale(5),
        marginTop:statusbarHeight,
        marginBottom: fontScale(10)
    },
    uInfoContainer:{
        marginLeft:fontScale(10)
    },
    uInfoContent:{
        height:fontScale(50),
        justifyContent:"center"
    },
    backIcon:{
        width:fontScale(50),
        left:-fontScale(30)
    },
    title:{
        textAlign:"center",
        fontSize:fontScale(17),
        fontWeight:"bold",
        marginLeft:-fontScale(50),
        color:"#F1E90F",
        width:width-fontScale(100),
        paddingVertical:fontScale(13),
       
    },
    uInfo:{
        marginLeft:fontScale(10),
        textAlignVertical:"center",
        color:'#FCEEEE',
        fontWeight:"bold",
        fontSize:fontScale(15),
        maxHeight:fontScale(25),
        marginTop:fontScale(5)
    },
    uStaff:{
        marginLeft:fontScale(10),
        textAlignVertical:"center",
        color:'#AFBFC1',
        fontWeight:"bold",
        maxHeight:fontScale(25),
        fontSize:fontScale(12),
        marginTop:fontScale(2)
    },
    backIconImg:{width:fontScale(30),height:fontScale(25),tintColor:colors.white},
    avatar:{ width: fontScale(50), height: fontScale(50), borderRadius: fontScale(25), marginLeft: fontScale(10) },
    headNotProfile:{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }
})