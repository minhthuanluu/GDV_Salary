import React from 'react';
import { Image, View, Text } from 'react-native';
import { colors } from '../../utils/Colors';

function GeneralListItem(props) {
  return (
    <View
      style={{
        backgroundColor: props.index % 2 ? colors.lightGrey : colors.white,
        paddingVertical: 8
      }}    >
      <View style={{ flexDirection: "row" }}>
        {
          props.fields.map((item, index) => {
            return props.lastIcon && index == props.fields.length - 1
              ? <View style={props.lastIconViewStyle}><Image resizeMode="contain" style={props.lastIconStyle} source={props.lastIcon} /></View>
              : <Text style={props.style[index]}>{item}</Text>
          })
        }
      </View>
    </View>
  );
}

export default GeneralListItem;