import { StyleSheet } from "react-native";
import { fontScale } from "../../utils/Fonts";
 
export const styles = StyleSheet.create({
    container:{
        marginHorizontal:fontScale(10),
        marginVertical:fontScale(15),
        backgroundColor: "#fff",
         shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, borderRadius: fontScale(17),
        paddingTop:fontScale(10),
        paddingBottom:fontScale(15)
    },
    compContainer:{
        top:50,
        margin:fontScale(5),
        paddingHorizontal:fontScale(5),
        paddingVertical:fontScale(15),
        borderRadius:fontScale(17),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})
