import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Body, DatePicker, Header, ListItem, MenuItem, Table } from '../../../../../comps';
import { text } from '../../../../../utils/Text';
import { width } from '../../../../../utils/Dimenssion';
import moment from 'moment';
import { styles } from './style'
import { fontScale } from '../../../../../utils/Fonts';
import { colors } from '../../../../../utils/Colors';
import { images } from '../../../../../utils/Images';
import { Text } from 'react-native';
import { ScrollView } from 'react-native';
import { getExpenseManagement } from '../../../../../api';
import { useEffect } from 'react';
import { expenseManagement } from '../../../../../models/Admin';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Toast from 'react-native-toast-message';
import { ToastNotif } from '../../../../../utils/Logistics';

const index = (props) => {
    const [month, setMonth] = useState(moment(new Date()).subtract(1, "months").format("MM/YYYY"));
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(expenseManagement);
    const navigation = useNavigation();

    const getData = async (month) => {

    }

    const _setMonth = (value) => {
        setMonth(value)
    }

    const fields = [text.totalOutcome, text.fixed, text.incentive, text.supportOutcome, text.otherExpenses]

    useEffect(() => {
        getData(month)
    }, [month])

    return (
        <SafeAreaView style={styles.container}>
            <Header title={text.expenseManagement} />
            <Body />
            <View style={{ flex: 1, backgroundColor: colors.white }}>
                <MenuItem
                    style={{ marginTop: fontScale(30) }}
                    title={text.generalFee}
                    icon={images.otherExpenses}
                    width={width - fontScale(60)}
                    value={'   '}
                    onPress={() => navigation.navigate("AdminExpenseGeneral")}
                />
                 <MenuItem
                    style={{ marginTop: fontScale(50) }}
                    title={text.outcomeDetail}
                    icon={images.money}
                    width={width - fontScale(60)}
                    value={'   '}
                    onPress={() => navigation.navigate("AdminExpenseDetailOutcomes")}
                />
                 <MenuItem
                    style={{ marginTop: fontScale(50) }}
                    title={text.outcomePlanSupport}
                    icon={images.list}
                    width={width - fontScale(60)}
                    value={'   '}
                    onPress={() => navigation.navigate("AdminExpensePlanSupport")}
                />
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaView>
    );
}

export default index;