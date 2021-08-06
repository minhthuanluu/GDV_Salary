import React, { useState } from 'react';
import { Image } from 'react-native';
import { Modal } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../utils/Colors';
import { height, width } from '../../utils/Dimenssion';
import { fontScale } from '../../utils/Fonts';
import { images } from '../../utils/Images';
import { styles } from './styles';

const index = (props) => {
    const [selectedItem, setSelectedItem] = useState(props.placeholder);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null)

    const _onPress = (value, index) => {
        setSelectedItem(value);
        setSelectedIndex(index)
        setShowDialog(!showDialog);
        props.onPress(value);
    }
    return (
        <View style={[styles.container, { width: props.width }, props.style]}>
            {props.advancedSearch ?
                props.fixed == true ?
                    <View style={[styles.advancedPicker, { width: props.width }]} onPress={() => setShowDialog(!showDialog)}>
                        <Image source={props.icon} resizeMode="contain" style={styles.leftIco} />
                        <Text style={{flex: 1, paddingHorizontal: fontScale(15)}}>{props.fixedData}</Text>
                        <Image source={images.arrowdown} resizeMode="contain" style={styles.arrDown} />
                    </View> 
                    :
                    <TouchableOpacity style={[styles.advancedPicker, { width: props.width }]} onPress={() => setShowDialog(!showDialog)}>
                        <Text style={{ flex: 1, paddingHorizontal: fontScale(15) }}>{selectedIndex == null ? props.placeholder : Object.values(selectedItem)[1]}</Text>
                        <Image source={images.arrowdown} resizeMode="contain" style={{
                            width: fontScale(20),
                            height: fontScale(20),
                            right: 0,
                            marginRight: fontScale(15)
                        }} />
                    </TouchableOpacity>
                :
                <TouchableOpacity style={[styles.picker, { width: props.width }]} onPress={() => setShowDialog(!showDialog)}>
                    <Image source={props.icon} resizeMode="contain" style={styles.leftIco} />
                    <Text style={styles.dateLabel}>{selectedItem.value || props.placeholder}</Text>
                    <Image source={images.arrowdown} resizeMode="contain" style={styles.arrDown} />
                </TouchableOpacity>
            }

            <Modal
                statusBarTranslucent={true}
                animationType={'slide'}
                transparent={true}
                visible={showDialog}
                onRequestClose={() => setShowDialog(!showDialog)}>
                <View style={{ backgroundColor: 'rgba(52, 52, 52, 0.7)', flex: 1 }}>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => setShowDialog(!showDialog)}>

                    </TouchableOpacity>
                    <View style={styles.modalContainer}>
                        <Text style={styles.dialogTitle}>{props.dialogTitle}</Text>
                        <View style={{ backgroundColor: '#8a8a8a', opacity: 0.5, height: 0.7 }} />
                        {
                            props.data.map((item, index) => {
                                return <TouchableOpacity key={index} onPress={() => _onPress(item, index)} style={[styles.selectContent, { backgroundColor: selectedItem != props.placeholder ? selectedItem.id == item.id ? "#f1f1f1" : "#fff" : "#fff" }]}><Text style={styles.selectItem} >{props.field[index]}</Text></TouchableOpacity>
                            })
                        }
                    </View>
                </View>
            </Modal>

        </View>
    );
}

export default index;