import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';

const MenuItem = (props) => {
    const { title, icon, onPress, style, width, value, view } = props;
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
                </View> :
                    <TouchableOpacity style={styles.container} onPress={onPress}>
                        <View style={styles.bg}>
                            <Text style={[styles.title, props.titleMenuStyle]}>{title}</Text>
                            <Image source={icon} style={[styles.icon,props.iconStyle]} />
                            {
                                value ? <Text style={styles.value}>{value}</Text> : null
                            }
                        </View>
                    </TouchableOpacity>
            }
        </View>
    );
}

export default MenuItem;