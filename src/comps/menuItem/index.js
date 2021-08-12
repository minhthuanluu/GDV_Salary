import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { colors } from '../../utils/Colors';
import { fontScale } from '../../utils/Fonts';
import { styles } from './styles';

const MenuItem = (props) => {
    const { title, icon, onPress, style, width, value, view, noneIcon, titleArray } = props;
    return (
        <View style={[style, { width: width, alignSelf: "center" }]}>
            {
                view ? <View style={styles.container} onPress={onPress}>
                    <View style={styles.bg}>
                    <Text style={[styles.title,props.titleStyle]}>{title}</Text>
                        <Image source={icon} style={[styles.icon, props.iconStyle]} />
                        {
                            value ? <Text style={styles.value}>{value}</Text> : null
                        }
                    </View>
                </View> : noneIcon
                        ? <TouchableOpacity style={[styles.container, { borderRadius: fontScale(12),width:props.width},props.style]} onPress={onPress}>
                            <View style={[styles.bg, { padding: fontScale(10) }]}>
                                <Text style={{ marginTop: fontScale(10), fontSize: fontScale(17), fontWeight: "bold" }}>{props.title}</Text>
                                 <View style={{flexDirection:"row",right:-fontScale(70),top:fontScale(-5)}}>
                                 {
                                    props.data.map((item,index)=><View style={{flexDirection:"row",flex:index==0 ? 0.5:1,marginTop:fontScale(20),marginLeft:index==0 ? fontScale(30):0,marginRight:index!=0 ? fontScale(40):0}} key={index}>
                                        <Text key={index} style={{fontSize:fontScale(15),fontWeight:"bold",color:colors.grey}}>{titleArray[index]}</Text>
                                        <Text style={{fontSize:fontScale(15),fontWeight:"bold",marginLeft:fontScale(5),color:colors.lightBlue}}>{item}</Text>
                                    </View>)
                                }
                                 </View>
                            </View>
                        </TouchableOpacity> :
                    <TouchableOpacity style={styles.container} onPress={onPress}>
                        <View style={styles.bg}>
                            <Text style={[styles.title, props.titleMenuStyle]}>{title}</Text>
                            <Image source={icon} style={[styles.icon,props.iconStyle]} />
                            {
                                value ? <Text style={[styles.value,props.rightStyle]}>{value}</Text> : null
                            }
                        </View>
                    </TouchableOpacity>
            }
        </View>
    );
}

export default MenuItem;