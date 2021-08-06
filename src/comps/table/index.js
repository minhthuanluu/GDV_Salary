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
                                    <View style={{ flexDirection: "row",paddingVertical:fontScale(10),marginLeft:props.headerMarginLeft }}>
                                        {
                                            headerIcons
                                                ?
                                                headers.map((item, index) => hideFirstColHeader && index == 0 ? <View style={{paddingLeft: fontScale(6), width: widthArray[0] }}/> :
                                                    <View  onLayout={(event) => {getDimesions(event.nativeEvent.layout)}} key={index} style={{ width: widthArray && widthArray[index], flexDirection: "row", alignItems: "center", paddingHorizontal: fontScale(4) }}>
                                                        <Image source={headerIcons[index]} resizeMode="contain" style={{ width: headerStyle.icon.size, height: headerStyle.icon.size }} />
                                                        <Text style={{ marginLeft: fontScale(5), color: headersTextColor, fontWeight: "bold", fontSize: headerStyle.text.size }}>{item}</Text>
                                                    </View>) :
                                                headers.map((item, index) => hideFirstColHeader && index == 0
                                                    ?
                                                    <View key={index} style={{ justifyContent:"center",alignItems:"center", width: widthArray[1]+fontScale(25)}}>
                                                        <Text style={{ marginLeft: fontScale(5), color: headersTextColor, fontWeight: "bold" }} />
                                                    </View>
                                                    :
                                                    <View key={index} style={{ marginRight:1,width: widthArray[index]}}>
                                                        <Text style={{ color: headersTextColor, fontWeight: "bold", fontSize: headerStyle.text.size,textAlign:"center" }}>{item}</Text>
                                                    </View>)
                                        }
                                        {
                                            lastIcon ? <View style={{ width: fontScale(35) }}><Image source={lastIconHeader} resizeMode="cover" style={{ width: headerStyle.icon.size, height: headerStyle.icon.size }} /></View> : null
                                        }
                                    </View> : null
                            }
                            {/* <View style={{flex:1}}> */}
                            {
                                message&&message.length>0 ? <Text  style={{ color: colors.primary, textAlign: "center", marginTop: fontScale(15),width:width }}>{message}</Text> : null
                            }

                            {
                                data ?
                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        data={data}
                                        keyExtractor={(item, index) => index.toString()}
                                        key={({ item }) => item.numberSub.toString()}
                                        renderItem={({ item, index }) => (
                                                <View style={{backgroundColor: index == 0 ? props.firstRowBg : rowBg[index],flex:1,justifyContent:"center",paddingBottom:fontScale(5) }}>
                                                    <TableRow
                                                        item={item}
                                                        index={index}
                                                        textColor={props.textColor[index] || props.textColor}
                                                        fontWeight={props.fontWeight}
                                                        widthArray={widthArray}
                                                        onPress = {()=>props.onPress(item,index)}
                                                        fields={props.fields}
                                                        numColumn={numColumn}
                                                        boldFirstColumn={props.boldFirstColumn}
                                                        rowWidth={widthArray[index]}
                                                        firstColCenter={props.firstColCenter}
                                                        loading={loading}
                                                        seeDetail={props.seeDetail}
                                                        main={main}
                                                        lastIconStyle={props.lastIconStyle}
                                                        textAlign={props.textAlign || "left"}
                                                        lastIcon={props.lastIcon&&props.lastIcon[index]} />
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
