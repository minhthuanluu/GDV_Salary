import { StyleSheet } from "react-native";
import { colors } from "../../../../../utils/Colors";


export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.primary
    },
    text: {
        alignSelf: "center",
        fontWeight: "bold",
        color: "#FFBF00"
    },
    title: {
        alignSelf: "center",
        fontWeight: "bold",
        color: "#6E6E6E"
    }
})