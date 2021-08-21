import React, { useEffect, useState } from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { images } from '../../utils/Images';
import { styles } from './styles';
import CustomPicker from './CustomPicker';

const YearPicker = (props) => {
    const [year, setYear] = useState(null);
    const [showDate, setShowDate] = useState(false);
    
    return (
        <View>
            <TouchableOpacity style={[{width: props.width },props.style,styles.selectContainer]} onPress={() => setShowDate(!showDate)}>
                <Text style={styles.monthLabel}>{year == null ? 'Năm ' + props.defaultYear : 'Năm ' + year}</Text>
                <Image source={images.arrowdown} resizeMode="cover" style={styles.arrowDown}/>
            </TouchableOpacity>

            <CustomPicker
                isShow={showDate}
                close={() => setShowDate(false)}
                currentYear={year || props.defaultYear}
                onPress={(year)=>{
                    setShowDate(!showDate)
                    setYear(year)
                    props.onPress(year)
                }}
                hideModal={showDate}
            />
        </View>
    );
}

export default YearPicker;
