import { StyleSheet } from "react-native";
import { colors } from "../../utils/Colors";
import { fontScale } from "../../utils/Fonts";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginRight: fontScale(2)
    },
    icon: {
        width: fontScale(15),
        height: fontScale(15),
        marginTop: 0
    },
    title: {
        color: colors.primary,
        fontSize: fontScale(14),
        fontWeight: 'bold',
        marginLeft:fontScale(4),
        marginHorizontal: fontScale(5)
    }
});
