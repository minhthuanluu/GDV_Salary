import React, { useEffect, useState } from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { images } from '../../utils/Images';
import { colors } from '../../utils/Colors';
import { fontScale } from '../../utils/Fonts';
import CustomPicker from './CustomPicker';
import { styles } from './styles';
import { width } from '../../utils/Dimenssion';
import Toast from 'react-native-toast-message';
import { ToastNotif } from '../../utils/Logistics';

const YearMonthPicker = (props) => {
    const [beginMonth, setBeginMonth] = useState('Tháng ' + props.beginMonth);
    const [defaultBeginMonth, setDefaultBeginMonth] = useState(props.beginMonth);
    const [endMonth, setEndMonth] = useState('Tháng ' + props.endMonth);
    const [showBeginMonth, setShowBeginMonth] = useState(false);
    const [showEndMonth, setShowEndMonth] = useState(false);
    const [index, setIndex] = useState();
    const [beginIndex, setBeginIndex] = useState(props.beginMonth.substring(1, 2));
    const [endIndex, setEndIndex] = useState(props.endMonth.substring(1, 2));

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

    const onChangeBeginMonth = (month) => {
        if (month.year > endMonth.substring(9, endMonth.length)) {
            console.log("Năm bắt đầu phải nhỏ hơn năm kết thúc")
        } else {
            if (month.item.key > endMonth.substring(6, 8) || month.year > endMonth.substring(9, endMonth.length)) {
                props.onError && props.onError("Tháng bắt đầu phải nhỏ hơn tháng kết thúc")
            } else {
                setBeginMonth(month.item.name + '/' + month.year);
                setBeginIndex(month.item.key);
                props.onChangeMonth({
                    'beginMonth': month.item.key < 10 ? '0' + month.item.key + '/' + month.year : month.item.key + '/' + month.year,
                    'endMonth': endMonth.substring(6, endMonth.length)
                })
            }
        }
    }

    const onChangeEndMonth = (month) => {
        console.log(month)
        console.log(beginMonth.substring(9, beginMonth.length))
        if (month.year < beginMonth.substring(9, beginMonth.length)) {
            props.onError && props.onError("Tháng bắt đầu phải nhỏ hơn tháng kết thúc")
        } else {
            if (month.item.key < beginMonth.substring(6, 8)) {
                props.onError && props.onError("Tháng bắt đầu phải nhỏ hơn tháng kết thúc")
            } else {
                setEndMonth(month.item.name + '/' + month.year);
                setEndIndex(month.item.key);
                props.onChangeMonth({
                    'beginMonth': beginMonth.substring(6, month.length),
                    'endMonth': month.item.key < 10 ? '0' + month.item.key + '/' + month.year : month.item.key + '/' + month.year
                })
            }
        }

    }

    useEffect(() => {
     
    })

    return (
        <View>
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
                <TouchableOpacity style={[{ width: width / 2 - fontScale(20), marginHorizontal: fontScale(10) }, props.style, styles.selectContainer]} onPress={() => setShowBeginMonth(!showBeginMonth)}>
                    <Text style={styles.monthLabel}>{beginMonth}</Text>
                    <Image source={images.arrowdown} resizeMode="cover" style={styles.arrowDown} />
                </TouchableOpacity>
                <TouchableOpacity style={[{ width: width / 2 - fontScale(20), marginHorizontal: fontScale(10) }, props.style, styles.selectContainer]} onPress={() => setShowEndMonth(!showEndMonth)}>
                    <Text style={styles.monthLabel}>{endMonth}</Text>
                    <Image source={images.arrowdown} resizeMode="cover" style={styles.arrowDown} />
                </TouchableOpacity>
            </View>

            <CustomPicker
                isShow={showBeginMonth}
                month_data={month_arr}
                defaultMonth={month_arr}
                defaultIndex={beginIndex}
                close={() => setShowBeginMonth(false)}
                selectedMonth={beginMonth}
                onChangeYear={(year) => { }}
                onChangeMonth={(month) => { }}
                onChangeText={(date) => { }}
                onChange={(date) => { onChangeBeginMonth(date); }}
                onChangeDate={(date) => { }}
            />

            <CustomPicker
                isShow={showEndMonth}
                month_data={month_arr}
                defaultMonth={month_arr}
                defaultIndex={endIndex}
                close={() => setShowEndMonth(false)}
                selectedMonth={endMonth}
                onChangeYear={(year) => { }}
                onChangeMonth={(month) => { }}
                onChangeText={(date) => { }}
                onChange={(date) => { onChangeEndMonth(date); }}
                onChangeDate={(date) => { }}
            />

        </View>
    );
}

export default YearMonthPicker;