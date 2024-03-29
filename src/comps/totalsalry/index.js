import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles'

const TotalSalary = (props) => {
    return (
        <View style={[{ flexDirection: 'row' }, props.style]}>
            <Text style={styles.total}>{props.title} </Text>
            <Text style={styles.salary}>{props.value}</Text>
        </View>
    );
}

export default TotalSalary;