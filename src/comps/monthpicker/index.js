import React, { useEffect, useState } from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { images } from '../../utils/Images';
import CustomPicker from './CustomPicker';
import { styles } from './styles';

const YearMonthPicker = (props) => {
    const [month, setMonth] = useState(null);
    const [showDate, setShowDate] = useState(false);
    const month_arr = [
        { key: 1, name: 'Tháng 01' },
        { key: 2, name: 'Tháng 02' },
        { key: 3, name: 'Tháng 03' },
        { key: 4, name: 'Tháng 04' },
        { key: 5, name: 'Tháng 05' },
        { key: 6, name: 'Tháng 06' },
        { key: 7, name: 'Tháng 07' },
        { key: 8, name: 'Tháng 08' },
        { key: 9, name: 'Tháng 09' },
        { key: 10, name: 'Tháng 10' },
        { key: 11, name: 'Tháng 11' },
        { key: 12, name: 'Tháng 12' },
    ];

    return (
        <View>
            <TouchableOpacity style={[{width: props.width },props.style,styles.selectContainer]} onPress={() => setShowDate(!showDate)}>
                <Text style={styles.monthLabel}>{month == null ? 'Tháng ' + props.month : month}</Text>
                <Image source={images.arrowdown} resizeMode="cover" style={styles.arrowDown}/>
            </TouchableOpacity>

            <CustomPicker
                isShow={showDate}
                month_data={month_arr}
                defaultMonth={month_arr}
                close={() => setShowDate(false)}
                selectedMonth={month || props.defaultMonth}
                onChangeYear={(year) => { }}
                onChangeMonth={(month) => { }}
                onChangeText={(date) => { }}
                onChangeDate={(date) => { setMonth(date); props.onChangeDate(date.substring(6, date.length)) }}
            />
        </View>
    );
}

export default YearMonthPicker;
