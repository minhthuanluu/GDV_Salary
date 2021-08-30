import { StyleSheet } from "react-native";
import { colors } from "../../utils/Colors";
import { width } from "../../utils/Dimenssion";
import { fontScale } from "../../utils/Fonts";

export const styles = StyleSheet.create({
  container: {
    width: fontScale(395),
    alignSelf:"center",
    paddingTop: 20,
  },

  text: {
    color: "#000000",
    alignSelf: "center",
    marginTop: -fontScale(25),
    fontWeight: "bold", 
    fontSize: fontScale(18)
  },
  bg: {
    backgroundColor: colors.white,
    borderRadius: fontScale(15),
    paddingBottom:fontScale(10),
    marginBottom:fontScale(10),
    marginTop:fontScale(30),
    marginHorizontal:fontScale(10),
    paddingHorizontal:fontScale(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  dateView: {
    marginTop: -8

  },

  list: {
    flex:1,
    marginTop: fontScale(15)
  },

  icon: {
    position: "absolute",
    right: fontScale(30),
    top: -fontScale(25),
    resizeMode: "contain",
    width: fontScale(42),
    height: fontScale(42),
  },
  title: {
    minHeight: fontScale(54),
    fontSize: fontScale(19),
    marginLeft: fontScale(15),
    fontWeight: "bold",
    paddingTop: fontScale(26),
    lineHeight: fontScale(23),
  },
  value: {
    textAlign: "right",
    right: fontScale(30),
    fontSize: fontScale(18),
    fontWeight: "bold",
    color: "#00BECC",
    top: -fontScale(12),
  },
  
  labelDataOne: {
    color: "#151515",
    marginLeft: fontScale(5),
    fontSize: fontScale(15)
  },

  labelDataTwo: {
    color: "#151515",
    marginLeft: -fontScale(12),
    fontSize: fontScale(15)
  },

  labelDataThree: {
    color: "#151515",
    marginLeft: -fontScale(15),
    fontSize: fontScale(15)
  },

  labelDataFour: {
    color: "#151515",
    marginLeft: -fontScale(5),
    fontSize: fontScale(15)
    
  },


//   labelDataFive: {
// marginLeft: 20
//   },


  fieldData: {
    color: "#151515",
    marginTop: fontScale(8),
    marginLeft: 15,
    fontWeight: "bold",
    fontSize: fontScale(16),
    width: "75%"
  },
  fieldDataOne: {
    color: "#00BECC",
    marginLeft: fontScale(5),
    fontWeight: "bold",
    fontSize: fontScale(15),
  },

  fieldDataTwo: {
    color: "#00BECC",
    marginLeft: fontScale(5),
    fontWeight: "bold",
    fontSize: fontScale(15),
  },
  fieldDataThree: {
    color: "#00BECC",
    marginLeft: fontScale(5),
    fontWeight: "bold",
    fontSize: fontScale(15),
  },
  fieldDataFour: {
    color: "#00BECC",
    marginLeft: fontScale(5),
    fontWeight: "bold",
    fontSize: fontScale(15),
    
  },

  bodyScr: {
    marginTop: fontScale(18)
  }

  
});
