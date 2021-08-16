import { StyleSheet } from "react-native";
import { colors } from "../../utils/Colors";
import { fontScale } from "../../utils/Fonts";

export const styles = StyleSheet.create({
    container:{
        borderColor:colors.white,
        borderWidth:1,
        padding:fontScale(10),
        justifyContent:"center",
        borderRadius:fontScale(10),
        backgroundColor:"#33A3FB"
    },
    label:{
        textAlign:"center",
        fontWeight:"bold",
        color:colors.white,
        textTransform:"uppercase",
        fontSize:fontScale(14)
    },
    text: {
        color: colors.white,
        fontSize: fontScale(18),
        fontWeight: 'bold',
        textAlign: "center"

    },
    button: {
        minWidth: fontScale(120),
        borderRadius: fontScale(10),
        alignContent: 'center',
        justifyContent: 'center',
        paddingHorizontal: fontScale(5),
        paddingVertical: fontScale(8)

    },
    icon: {
        width: fontScale(20),
        height: fontScale(20),
        tintColor: colors.white,
        marginRight: fontScale(7),
        marginTop: fontScale(3)
    },
})