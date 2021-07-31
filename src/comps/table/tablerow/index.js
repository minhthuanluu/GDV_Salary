import color from 'color';
import React from 'react';
import { Text } from 'react-native';
import { Image } from 'react-native';
import { View } from 'react-native';
import { colors } from '../../../utils/Colors';
import { fontScale } from '../../../utils/Fonts';
import { styles } from "./styles";
const TableRow = (props) => {
    const { index, fields, numColumn, lastIcon, widthArray, main, contentTextColor,fontWeight } = props;

    return (
        <View
            style={[styles.container, props.style]}>
            <View key={index} style={{ flexDirection: "row",paddingVertical:fontScale(8) }}>
                <View style={{ flexDirection: "row" }}>
                    {
                        fields.map((item, i) =>
                            <View key={i} style={{ width: widthArray && widthArray[i] }}>
                                <Text style={{ fontWeight:props.fontWeight[index], fontSize: fontScale(14), textAlignVertical: "center",textAlign:i==0 ? "left":props.textAlign, marginLeft:i==0 || index==fields.length?fontScale(20):fontScale(0), color: i==0 ? colors.black : props.textColor }}>{fields[index][i]}</Text>
                                {i == numColumn?
                                    <View style={{ width: fontScale(10), height: fontScale(10) }}>
                                        <View style={{ marginTop: -fontScale(10), position: "absolute", left: fontScale(0) }}>
                                            <Image source={lastIcon} resizeMode="contain" style={[props.lastIconStyle,{ width: fontScale(13), height: fontScale(13),marginHorizontal: fontScale(5), marginTop: -fontScale(5) }]} />
                                        </View>
                                    </View>
                                    : null}
                            </View>
                        )
                    }
                </View>
            </View>
        </View>
    );
}


export default TableRow;