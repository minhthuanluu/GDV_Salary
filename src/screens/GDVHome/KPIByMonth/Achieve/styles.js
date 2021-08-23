import { StyleSheet } from "react-native";
import { colors } from "../../../../utils/Colors";
import { width } from "../../../../utils/Dimenssion";
import { fontScale } from "../../../../utils/Fonts";

export const styles = StyleSheet.create({
    container:{ flex: 1,backgroundColor:colors.primary },
    sumKpiContainer:{ flexDirection: "row",justifyContent:"center" },
    bodyScr:{ marginTop: fontScale(11) },
    sumKpiTitle:{ color: colors.black,fontSize:fontScale(19),fontWeight:"bold" },
    sumKpi:{ color: colors.lightBlue,fontSize:fontScale(19),marginLeft:fontScale(2),fontWeight:"bold" },
    detailInfo:{paddingVertical:fontScale(15),marginHorizontal:fontScale(19),shadowColor: "#000",backgroundColor:colors.white,  marginTop:fontScale(18),borderRadius:fontScale(17),
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,    
        elevation: 5
    },
    dateView:{marginTop:fontScale(0)},
    monthPicker:{
        
    },
    subDetail:{
        marginLeft:fontScale(40)
    }
})