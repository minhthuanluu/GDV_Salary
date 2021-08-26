import { StyleSheet } from "react-native";
import { colors } from "../../../utils/Colors";
import { height, statusbarHeight, width } from "../../../utils/Dimenssion";
import { fontScale } from "../../../utils/Fonts";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        flex: 1
    },
    headerShape: {
        width: width,
        height: fontScale(310),
        marginTop: -statusbarHeight - fontScale(50),
        zIndex: -10,
        position: 'relative',
        tintColor: colors.primary
    },
    personInfo: {
        width: width / 2,
        position: 'absolute',
        marginTop: fontScale(112)
    },
    avatar: { position: 'absolute', marginTop: height/18, width: fontScale(110), height: fontScale(110), borderRadius: fontScale(110) / 2, marginLeft: width - fontScale(154) },
    avatarImg: { position: 'absolute', width: fontScale(104), height: fontScale(104), borderRadius: fontScale(104), marginLeft: width - (0.1896551724137931 * height) },
    closeIcon: { marginLeft: '87%', marginTop: fontScale(5), marginBottom: -fontScale(10) },
    changePasswordOption: { borderBottomWidth: 0.5, borderBottomColor: '#EFEFEF', marginTop: -fontScale(20) },
    optionContainer: {
        position: 'absolute', width: width - fontScale(100), backgroundColor: colors.white, marginTop: height / 3, marginHorizontal: fontScale(50), borderRadius: fontScale(20), borderColor: '#F5F5F5',
        shadowColor: "#CCC",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: fontScale(16),
        elevation: 9
    },
    staffCode: {
        fontSize: fontScale(19),
        width: width / 2,
        textAlign: 'center',
        color: '#D0D6D6'
    },
    staffName: {
        fontSize: fontScale(18),
        color: colors.white,
        width: width / 2,
        textAlign: 'center'
    },
    closeButton: { marginLeft: '87%', marginTop: fontScale(5), marginBottom: -fontScale(10) },
    option: { borderBottomWidth: 0.5, borderBottomColor: '#EFEFEF', marginTop: -fontScale(20) },
    optionWrapper: {
        backgroundColor: colors.primary,
        position: 'absolute', width: width, height: height
    },
    optionText: { color: colors.primary, fontSize: fontScale(16) },
    closeIcon: { resizeMode: "cover", width: fontScale(30), height: fontScale(30), alignSelf: "flex-end", margin: fontScale(10) },
    optionDialogs: {
        shadowColor: "#CCC",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 16,
        elevation: 9, 
        backgroundColor: "#fff", 
        marginHorizontal: fontScale(10), 
        borderRadius: fontScale(17), 
        marginTop: height / 2.5,
        height:fontScale(120)
    },
    optionMenu:{
        margin:fontScale(10),
        borderBottomColor:"#f7f7f7",
        paddingBottom:fontScale(10),
        borderBottomWidth:fontScale(1),
        top:-fontScale(40)
    },
    menuTitle:{fontSize:fontScale(20),color:colors.primary,textAlign:"center"},
    body:{ flex: 1, alignItems: "center", justifyContent: "center" }
}
)