import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TouchableHighlight, Dimensions } from 'react-native';
import { colors } from '../../utils/Colors';
import { height } from '../../utils/Dimenssion';
import { fontScale } from '../../utils/Fonts';

const MonthYearPicker = (props) => {
    const month_data = props.month_data;
    const { width } = Dimensions.get("screen");
    const [month, setMonth] = useState(props.selectedMonth || month_data[new Date().getMonth()]);
    const [year, setYear] = useState(new Date().getFullYear());

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.isShow}
            onRequestClose={props.close}
            style={props.style}>
            <TouchableHighlight style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }} onPress={props.close}>
                <View />
            </TouchableHighlight>
            <View style={{ flex: 1 / 2, backgroundColor: 'white' }} >
                <View style={styles.yearContainer}>
                    <TouchableOpacity onPress={() => {
                        setYear(year - 1)
                        props.onChangeYear(year - 1)}}>
                        <Text style={{fontSize:fontScale(14)}}>Năm trước</Text>
                    </TouchableOpacity>
                    <Text style={styles.yearLabel}>{year}</Text>
                    <TouchableOpacity onPress={() => {
                        setYear(year + 1)
                        props.onChangeYear(year + 1)
                    }}>
                        <Text style={{fontSize:fontScale(14)}}>Năm sau</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.monthContainer}>
                    {props.month_data.map((item, index) =>
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                setMonth(item);
                                props.onChangeMonth(month);
                                props.onChangeYear(year);
                                props.onChangeDate(item.name + '/' + year);
                                props.close()
                            }}
                            style={[styles.month, { width: (width / 3), backgroundColor: item.key == month.key ? colors.primary : 'white' }]}>
                            <Text style={{ fontSize: fontScale(15),color: item.key == month.key ? 'white' : 'black' }}>{item.name}</Text>
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
        height: height/17, alignItems: 'center', justifyContent: 'center',
    },

    yearLabel: {
        fontWeight: 'bold', fontSize: fontScale(22),color:colors.primary
    },
}

export default MonthYearPicker