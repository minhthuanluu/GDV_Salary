import React from "react";
import { FlatList } from "react-native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";

const ListMenu = (props) => {
  const { title, icon, onPress, style, width, value, view, data } = props;
  return (
    <View
      style={[
        style,
        {
          width: width,
          marginBottom: 10,
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <TouchableOpacity style={styles.container} onPress={props.onPress}>
        <View style={styles.bg}>
          <Text style={styles.fieldData}>{props.fieldData[0]}</Text>
          <View>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <View style={{ flexDirection: "row", flex: 1 }} key={1}>
                {props.labelData.map((item, index) => (
                  <Text style={styles.labelDataOne}>{item}</Text>
                ))}
                {props.fieldDataOne.map((item, index) => (
                  <Text style={styles.fieldDataOne}>{item}</Text>
                ))}
              </View>
              <View style={{ flexDirection: "row", flex: 0.8 }} key={2}>
                {props.labelDataTwo.map((item, index) => (
                  <Text style={styles.labelDataTwo}>{item}</Text>
                ))}
                {props.fieldDataTwo.map((item, index) => (
                  <Text style={styles.fieldDataTwo}>{item}</Text>
                ))}
              </View>
              <View style={{ flexDirection: "row", flex: 0.8 }} key={3}>
                {props.labelDataThree.map((item, index) => (
                  <Text style={styles.labelDataThree}>{item}</Text>
                ))}
                {props.fieldDataThree.map((item, index) => (
                  <Text style={styles.fieldDataThree}>{item}</Text>
                ))}
              </View>
              <View style={{ flexDirection: "row", flex: 0.8 }} key={4}>
                {props.labelDataFour.map((item, index) => (
                  <Text style={styles.labelDataFour}>{item}</Text>
                ))}
                {props.fieldDataFour.map((item, index) => (
                  <Text style={styles.fieldDataFour}>{item}</Text>
                ))}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      { props.iconOne ? <Image source={props.icon} style={styles.icon} />
        :
        <Image source={props.icon[props.index]} style={styles.icon} />
      }


    </View>
  );
};

export default ListMenu;
