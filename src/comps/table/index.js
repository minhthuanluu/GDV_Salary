import { useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { Text } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';
import { View } from 'react-native';
import { colors } from '../../utils/Colors';
import { getDimesions, width } from '../../utils/Dimenssion';
import { fontScale } from '../../utils/Fonts';
import { images } from '../../utils/Images';
import TableRow from "./tablerow/index";

const index = (props) => {
    const { data, numColumn, table, headers, headerIcons, headersTextColor, headerStyle, lastIcon, loading, widthArray, lastIconHeader, main, style, hideFirstColHeader, rowBg, onPress,loadingIconStyle,message } = props;
    const navigation = useNavigation();
    
    useEffect(() => {
        if (!data) {
            console.warn("Table Component\nYou must provide the required array of data")
        }
        if (!numColumn) {
            console.warn("Table Component\nYou must be provide numColumn variable")
        }
        if (!widthArray) {
            console.warn("Table Component\nYou must be provide widthArray variable")
        }
        if (numColumn != widthArray.length) {
            console.warn("Table Component\nThe numColumn must be equal to number of element in widthArray")
        }
        if (headerIcons && numColumn != headerIcons.length) {
            console.warn("Table Component\nThe numColumn must be equal to number of element in headerIcons")
        }
    })
    return (
        <View>
            {
                table ?
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={style}>
                        <View>
                            {
                                headers ?
                                    <View style={{ flexDirection: "row" }}>
                                        {
                                            headerIcons
                                                ?
                                                headers.map((item, index) => hideFirstColHeader && index == 0 ? <View style={{paddingHorizontal: fontScale(4), width: widthArray[0] }}/> :
                                                    <View  onLayout={(event) => {getDimesions(event.nativeEvent.layout)}} key={index} style={{ width: widthArray && widthArray[index], flexDirection: "row", alignItems: "center", paddingHorizontal: fontScale(4) }}>
                                                        <Image source={headerIcons[index]} resizeMode="contain" style={{ width: headerStyle.icon.size, height: headerStyle.icon.size }} />
                                                        <Text style={{ marginLeft: fontScale(5), color: headersTextColor, fontWeight: "bold", fontSize: headerStyle.text.size }}>{item}</Text>
                                                    </View>) :
                                                headers.map((item, index) => hideFirstColHeader && index == 0
                                                    ?
                                                    <View key={index} style={{ paddingHorizontal: fontScale(4), width: widthArray[index],marginLeft:1 }}>
                                                        <Text style={{ marginLeft: fontScale(5), color: headersTextColor, fontWeight: "bold" }} />
                                                    </View>
                                                    :
                                                    <View key={index} style={{ flex: 1, paddingHorizontal: fontScale(4), width: widthArray[index],marginLeft:1 }}>
                                                        <Text style={{ marginLeft: fontScale(5), color: headersTextColor, fontWeight: "bold", fontSize: headerStyle.text.size,textAlign:"center" }}>{item}</Text>
                                                    </View>)
                                        }
                                        {
                                            lastIcon ? <View style={{ width: fontScale(35) }}><Image source={lastIconHeader} resizeMode="cover" style={{ width: headerStyle.icon.size, height: headerStyle.icon.size }} /></View> : null
                                        }
                                    </View> : null
                            }
                            {/* <View style={{flex:1}}> */}
                            {
                                loading == true ? <ActivityIndicator style={[loadingIconStyle,{marginVertical:fontScale(20)}]} size="small" color={colors.primary} /> : null
                            }
                            {
                                message ? <Text  style={{ color: colors.white, textAlign: "center", marginTop: fontScale(15) }}>{message}</Text> : null
                            }
                            {
                                data ?
                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        data={data}
                                        keyExtractor={(item, index) => index.toString()}
                                        key={({ item }) => item.numberSub.toString()}
                                        renderItem={({ item, index }) => (
                                                <View style={{backgroundColor: index == 0 ? props.firstRowBg : rowBg[index] }}>
                                                    <TableRow
                                                        item={item}
                                                        index={index}
                                                        textColor={props.textColor[index]}
                                                        fontWeight={props.fontWeight}
                                                        widthArray={widthArray}
                                                        onPress = {()=>props.onPress(item,index)}
                                                        fields={props.fields}
                                                        numColumn={numColumn}
                                                        boldFirstColumn={props.boldFirstColumn}
                                                        rowWidth={widthArray[index]}
                                                        main={main}
                                                        lastIconStyle={props.lastIconStyle}
                                                        textAlign="center"
                                                        lastIcon={lastIcon&&lastIcon[index]} />
                                                </View>
                                        )} />
                                    : null
                            }
                        </View>
                    </ScrollView> : null
            }
        </View>
    );
}

export default index;