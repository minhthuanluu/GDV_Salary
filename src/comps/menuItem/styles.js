import { StyleSheet } from "react-native";
import { colors } from "../../utils/Colors";
import { fontScale } from "../../utils/Fonts";

export const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.white,
    },
    bg:{
       backgroundColor: colors.white,
        borderRadius: fontScale(15),
        paddingTop: -fontScale(9),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    },
    icon:{
        position:"absolute",
        right:fontScale(25),
        top:-fontScale(25),
        resizeMode: "contain",
        width: fontScale(50), 
        height: fontScale(50)
        
    },
    title:{
        height:fontScale(60),
        fontSize:fontScale(19),
        marginLeft:fontScale(15),
        fontWeight:"bold",
        textAlignVertical:"center"
    },
    value:{
        textAlign:"right",
        right:fontScale(30),
        fontSize:fontScale(15),
        fontWeight:"bold" ,
        color:"#00BECC",
        top:-fontScale(12),
        
    }
})