import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { View } from 'react-native';
import { colors } from '../../../utils/Colors';
import { fontScale } from '../../../utils/Fonts';
import { styles } from "./styles";

const TableRow = (props) => {
    const { index, fields, numColumn, lastIcon, widthArray } = props;

    return (
        <View
            style={[styles.container, props.style]}>
            {
                props.item.detail == "true" && props.onPress ?
                    <TouchableOpacity key={index} style={styles.touchContainer} onPress={props.onPress}>
                        <View style={{ flexDirection: "row" }}>
                            {
                                fields.length == 1 ?
                                    <View key={fields.length} style={{ width: widthArray && widthArray[fields.length], justifyContent: "center", flexDirection: "row" }}>
                                        <Text>{Object.values(fields)[0]}</Text>
                                    </View>
                                    : fields.map((item, i) =>
                                        <View key={i} style={{ width: widthArray && widthArray[i], justifyContent: "center" }}>
                                            <Text style={{ fontWeight: props.fontWeight[index] || props.boldFirstColumn, fontSize: fontScale(14), textAlignVertical: "center", textAlign: i == 0 ? "left" : props.textAlign, marginLeft: i == 0 || index == fields.length ? fontScale(20) : fontScale(0), color: i == 0 ? colors.black : props.textColor }}>{fields[index][i]}</Text>
                                            {
                                                i == numColumn ?
                                                    <View style={{ width: fontScale(10), height: fontScale(10) }}>
                                                        <View style={{ marginTop: -fontScale(10), position: "absolute", left: fontScale(0) }}>
                                                            <Image source={lastIcon} resizeMode="contain" style={[props.lastIconStyle, { width: fontScale(20), height: fontScale(20), marginTop: -fontScale(5) }]} />
                                                        </View>
                                                    </View>
                                                    : null
                                            }
                                        </View>
                                    )
                            }
                        </View>
                    </TouchableOpacity>
                    :
                    <View key={index} style={{ flexDirection: "row", paddingVertical: fontScale(1) }}>
                        <View style={{ flexDirection: "row" }}>
                            {
                                fields.length == 1 ?
                                    fields[0].map((item, i) =>
                                        <View key={i} style={{ width: widthArray && widthArray[i], justifyContent: "center" }}>
                                            {
                                                props.firstColCenter ?
                                                    <Text style={{ fontWeight: props.fontWeight[index], fontSize: fontScale(14), textAlignVertical: "center", textAlign: "center", color: i == 0 ? colors.black : props.textColor }}>{fields && fields[index][i]}</Text>
                                                    :
                                                    <Text style={{ fontWeight: props.fontWeight[index], fontSize: fontScale(14), textAlignVertical: "center", textAlign: i == 0 ? "left" : props.firstColCenter ? "center" : props.textAlign, marginLeft: i == 0 || index == fields.length ? fontScale(0) : fontScale(0), color: i == 0 ? colors.black : props.textColor }}>{1}</Text>

                                            }
                                            {i == numColumn ?
                                                <View style={{ width: fontScale(10), height: fontScale(10) }}>
                                                    <View style={{ marginTop: -fontScale(10), position: "absolute", left: fontScale(0) }}>
                                                        <Image source={lastIcon} resizeMode="contain" style={[props.lastIconStyle, { width: fontScale(13), height: fontScale(13), marginHorizontal: fontScale(5), marginTop: -fontScale(5) }]} />
                                                    </View>
                                                </View>
                                                : null}
                                        </View>
                                    )
                                    :
                                    fields.map((item, i) =>
                                        <View key={i} style={{ width: widthArray && widthArray[i], justifyContent: "center" }}>
                                            {
                                                props.firstColCenter ?
                                                    <Text style={{ fontWeight: props.fontWeight[index], fontSize: fontScale(14), textAlignVertical: "center", textAlign: "center", color: i == 0 ? colors.black : props.textColor }}>{fields[index][i]}</Text>
                                                    :
                                                    <Text style={{ fontWeight: props.fontWeight[index], fontSize: fontScale(14), textAlignVertical: "center", textAlign: i == 0 ? "left" : props.firstColCenter ? "center" : props.textAlign, marginLeft: i == 0 || index == fields.length ? fontScale(20) : fontScale(0), color: i == 0 ? colors.black : props.textColor }}>{fields[index][i]}</Text>

                                            }
                                            {i == numColumn ?
                                                <View style={{ width: fontScale(10), height: fontScale(10) }}>
                                                    <View style={{ marginTop: -fontScale(10), position: "absolute", left: fontScale(0) }}>
                                                        <Image source={lastIcon} resizeMode="contain" style={[props.lastIconStyle, { width: fontScale(13), height: fontScale(13), marginHorizontal: fontScale(5), marginTop: -fontScale(5) }]} />
                                                    </View>
                                                </View>
                                                : null}
                                        </View>
                                    )
                            }
                        </View>
                    </View>
            }

        </View>
    );
}


export default TableRow;