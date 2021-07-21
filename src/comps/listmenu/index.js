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
      {/* view ? <View style={styles.container} onPress={onPress}>
                    <View style={styles.bg}>
                    <Text style={[styles.title,props.titleStyle]}>{title}</Text>
                        <Image source={icon} style={styles.icon} />
                        {
                            value ? <Text style={styles.value}>{value}</Text> : null
                        }
                    </View>
                </View> :
                 */}

      <TouchableOpacity style={styles.container}>
        <View style={styles.bg}>
          <Text style={styles.fieldData}>{props.fieldData[0]}</Text>
          <View>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <View style={{ flexDirection: "row", flex: 1 }}>
                {props.labelData.map((item, index) => (
                  <Text style={styles.labelDataOne}>{item}</Text>
                ))}
                {props.fieldDataOne.map((item, index) => (
                  <Text style={styles.fieldDataOne}>{item}</Text>
                ))}
              </View>
              <View style={{ flexDirection: "row", flex: 0.8 }}>
                {props.labelDataTwo.map((item, index) => (
                  <Text style={styles.labelDataTwo}>{item}</Text>
                ))}
                {props.fieldDataTwo.map((item, index) => (
                  <Text style={styles.fieldDataTwo}>{item}</Text>
                ))}
              </View>
            </View>

            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <View style={{ flexDirection: "row", flex: 1 }}>
                {props.labelDataThree.map((item, index) => (
                  <Text style={styles.labelDataThree}>{item}</Text>
                ))}
                {props.fieldDataThree.map((item, index) => (
                  <Text style={styles.fieldDataThree}>{item}</Text>
                ))}
              </View>

              <View style={{ flexDirection: "row", flex: 0.8 }}>
                {props.labelDataFour.map((item, index) => (
                  <Text style={styles.labelDataFour}>{item}</Text>
                ))}
                {props.fieldDataFour.map((item, index) => (
                  <Text style={styles.fieldDataFour}>{item}</Text>
                ))}
              </View>
            </View>

            {/* <View style={{ flex: 3 }}>
              {props.fieldData.map((item, index) =>
                props.lastIcon && index == props.fieldData.length - 1 ? (
                  <Image
                    source={props.lastIcon}
                    resizeMode="contain"
                    style={{ width: 10, height: 10 }}
                  />
                ) : (
                  <Text>{index == 0 ? "" : item}</Text>
                )
              )}
            </View> */}
          </View>
        </View>
      </TouchableOpacity>

      <Image source={props.icon[props.index]} style={styles.icon} />
    </View>
  );
};

export default ListMenu;
