import { StyleSheet } from "react-native";
import { colors } from "../../utils/Colors";
import { width } from "../../utils/Dimenssion";
import { fontScale } from "../../utils/Fonts";

export const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignSelf: "center"
    },
    picker: {
        flexDirection: "row",
        backgroundColor: colors.white,
        paddingVertical: fontScale(8),
        borderRadius: fontScale(12),

    },
    dateLabel: {
        flex: 1,
        fontSize: fontScale(14),
        textAlignVertical:"center",
        color: "#848484",
        paddingLeft:fontScale(145)
    },
    selectContent: {
        borderBottomColor: "#f1f1f1",
        borderBottomWidth: 1
    },
    selectItem: {
        textAlign: "center",
        paddingVertical: fontScale(15),
        fontSize: fontScale(13),
        borderBottomColor: "#f1f1f1",
        borderBottomWidth: 1
    },
    dialogTitle: {
        textAlign: "center",
        paddingBottom: fontScale(13),
        fontSize: fontScale(13),
        fontWeight: "bold",
    },
    arrDown: {
        position: "absolute",
        width: fontScale(20),
        height: fontScale(20),
        right: 0,
        marginTop: fontScale(11),
        marginRight: fontScale(15)

    },

    leftIco: {
        width: fontScale(25),
        left:fontScale(10),
        height: fontScale(23),
    },
    modelContainer:{
        width: width,
        backgroundColor: "#fff", shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, borderTopLeftRadius: fontScale(30), borderTopRightRadius: fontScale(30), paddingTop: fontScale(15), paddingBottom: fontScale(30)
    },
    advancedPicker:{
        backgroundColor:colors.lightGrey,
        paddingVertical:fontScale(15),
        borderRadius:fontScale(10),
        flexDirection:"row"
    },
    modalContainer:{
        backgroundColor:colors.white,
        paddingTop:fontScale(10),
        borderTopLeftRadius:fontScale(20),
        borderTopRightRadius:fontScale(20)
    }
})