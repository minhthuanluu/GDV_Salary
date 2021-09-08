import React from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { width } from '../../utils/Dimenssion';
import { fontScale } from '../../utils/Fonts';

const ProfileItem = (props) => {
    return (
        <View style={[styles.container, props.extStyle]}>
            <Image source={props.icon} style={styles.icon} resizeMode="cover" />
            <View style={styles.textContent}>
                <Text style={styles.title}>{props.title}</Text>

                {
                    props.editMode == true
                        ?
                        <TextInput keyboardType={props.type == "email" ? "email-address" : props.type == "number" ? "number-pad" : props.type == "phone" ? "phone-pad" : "default"} style={[styles.inputContent, { width: width - fontScale(90) }]} onChangeText={props.onChangeText} defaultValue={props.defaultValue} value={props.value} />
                        :
                        props.linking ? <TouchableOpacity onPress={props.openLink}><Text style={[styles.textContent,{fontSize:fontScale(15)}]}>{props.value}</Text></TouchableOpacity>
                            : <Text style={styles.textContent}>{props.value ? props.value : '...'}</Text>


                }
            </View>
        </View>
    );
}


export default ProfileItem;