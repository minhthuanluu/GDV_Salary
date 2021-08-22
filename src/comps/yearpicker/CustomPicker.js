import { useFocusEffect } from '@react-navigation/core';
import moment from 'moment';
import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, TouchableHighlight, Dimensions } from 'react-native';
import { colors } from '../../utils/Colors';
import { height } from '../../utils/Dimenssion';
import { fontScale } from '../../utils/Fonts';

const MonthYearPicker = (props) => {
    const { width } = Dimensions.get('window');
    const [year, setYear] = useState(props.defaultYear||new Date().getFullYear());
    const [yearArray, setYearArray] = useState([
        { "key": 0, "element": year },
        { "key": 1, "element": year + 1 },
        { "key": 2, "element": year + 2 },
        { "key": 3, "element": year + 3 },
        { "key": 4, "element": year + 4 },
        { "key": 5, "element": year + 5 },
        { "key": 6, "element": year + 6 },
        { "key": 7, "element": year + 7 },
        { "key": 8, "element": year + 8 },
        { "key": 9, "element": year + 9 },
        { "key": 10, "element": year + 10 },
        { "key": 11, "element": year + 11 }
    ]);
    const [selected, setSelected] = useState(true);
    const [selectedIndex,setSelectedIndex] = useState()
    const [secondTime,setSecondTime] = useState(false);
    
    const onNext = () => {
        let yearArr = [];
        for (let i = 0; i < yearArray.length; i++) {
            const element = yearArray[i].element;
            yearArr.push({ "key": i, "element": element + 12 });
        }
        setYearArray(yearArr);
        console.log(selectedIndex)
    }
    const onPrev = () => {
        let yearArr = []
        for (let i = 0; i < yearArray.length; i++) {
            const element = yearArray[i].element;
            yearArr.push({ "key": i, "element": element - 12 })
        }
        setYearArray(yearArr);
        console.log(selectedIndex)

    }


    useEffect(() => {
        let yearArr = [];
        let element = 0;
        for (let i = 0; i < yearArray.length; i++) {
            element = yearArray[i].element;
            yearArr.push({ "key": i, "element": element + 12 })
        }
        if(secondTime==false){
            setSelected(props.currentYear)
        }else{

        }
    })
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.hideModal}
            onRequestClose={props.close}
            style={props.style}>
            <TouchableHighlight style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }} onPress={props.close}>
                <View />
            </TouchableHighlight>
            <View style={{ flex: 1 / 2, backgroundColor: 'white' }} >
                <View style={styles.yearContainer}>
                    <TouchableOpacity onPress={() => onPrev()}>
                        <Text style={{ fontSize: fontScale(14) }}>Trở lại</Text>
                    </TouchableOpacity>
                    <Text style={styles.yearLabel}>Chọn năm</Text>
                    <TouchableOpacity onPress={() => onNext()}>
                        <Text style={{ fontSize: fontScale(14) }}>Kế tiếp</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.monthContainer}>
                    {yearArray.map((item, index) =>
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                props.onPress && props.onPress(item.element)
                                setSelected(item.element)
                                setSecondTime(true)
                                setSelectedIndex(index)
                            }}
                            style={[styles.month, { width: (width / 3), backgroundColor: index==selectedIndex || item.element == selected ? colors.primary : 'white' }]}>
                            <Text style={{ fontSize: fontScale(15), fontWeight: index==selectedIndex ||item.element == selected ? "bold" : "normal", color: index==selectedIndex ||item.element == selected ? 'white' : 'black' }}>{item.element}</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </Modal>
    )
}

const styles = {
    yearContainer: {
        padding: fontScale(10),
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    monthContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },

    month: {
        height: height / 17, alignItems: 'center', justifyContent: 'center',
    },

    yearLabel: {
        fontWeight: 'bold', fontSize: fontScale(20), color: colors.primary
    },
}

export default MonthYearPicker