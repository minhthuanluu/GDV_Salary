import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StatusBar, ActivityIndicator, BackHandler, ScrollView } from 'react-native';
import { DateView, Header, Body, MenuItem, ListItem } from '../../../../comps';
import { styles } from './styles';
import { colors } from '../../../../utils/Colors';
import { text } from '../../../../utils/Text';
import { images } from '../../../../utils/Images';
import { backHandler, thoundsandSep, ToastNotif } from '../../../../utils/Logistics';
import { width } from '../../../../utils/Dimenssion';
import { fontScale } from '../../../../utils/Fonts';
import moment from 'moment';
import { getProfile, getTempSalary } from '../../../../api';
import { DetailTempContract, UserObj } from '../../../../models/Data';
import { useNavigation } from '@react-navigation/core';
import Toast from 'react-native-toast-message';
import { useIsFocused } from '@react-navigation/native';

const ExpectedSalary = (props) => {
    const [data, setData] = useState(DetailTempContract);
    const [month, setMonth] = useState(moment(new Date()).format("MM/YYYY"))
    const [showDate, setShowDate] = useState(false);
    const [loading, setLoading] = useState(true)
    const [user, setUserData] = useState(UserObj)
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const getData = async () => {
        await getTempSalary(navigation).then((res) => {
            if (res.status == "success") {
                setData(res.data)
                setLoading(false);

            }
            if (res.status == "failed") {
                ToastNotif('Cảnh báo', res.message, 'error', true);
                setLoading(false);
            }
            if (res.status == "v_error") {
                Toast.show({
                    text1: "Cảnh báo",
                    text2: res.message,
                    type: "error",
                    visibilityTime: 100,
                    autoHide: true,
                    onHide: () => navigation.navigate("Home")
                })
            }
        });

        await getProfile(navigation).then((res) => {
            if (res.status == "success") {
                setLoading(false)
                setUserData(res.data)
            }
            if (res.status == "failed") {
                setLoading(false)
            }
        })

    }

    useEffect(() => {
        getData();
        getProfile();
        backHandler(navigation, "KPIByMonthDashboard");
        return ()=>{
            
        }
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent backgroundColor={colors.primary} />
            <Header title={text.kpiByMonth} />
            {loading == true ? null : <DateView dateLabel={data.dateRange} />}
            <Body style={styles.bodyScr} displayName={user.displayName} maGDV={user.gdvId.maGDV} />

            <View style={{ flex: 1, backgroundColor: colors.white }}>
                {
                    loading == true ? <ActivityIndicator size="small" color={colors.primary} /> :
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.sumKpiContainer}>
                                <Text style={styles.sumKpiTitle}>{text.expectedSalary} </Text>
                                <Text style={styles.sumKpiMonth}></Text>

                            </View>
                            <Text style={styles.sumKpi}>{thoundsandSep(data.expectedSalary)}</Text>

                            <View>
                                <MenuItem view style={{ marginTop: fontScale(35) }} titleStyle={{ paddingTop: fontScale(27) }} title={text.fixedSalary} icon={images.salaryByMonth} width={width - fontScale(40)} value={thoundsandSep(data.permanentSalary)} />
                            </View>
                            <View style={styles.detailInfo}>
                                <ListItem main icon={images.sim} title={text.contractSalary} price={thoundsandSep(data.contractSalary)} />
                                <ListItem icon={images.sim} title={text.prepaidSubscriptionFee} price={thoundsandSep(data.prePaid)} />
                                <ListItem icon={images.sim} title={text.postpaidSSubscriptionFee} price={thoundsandSep(data.postPaid)} />
                                <ListItem icon={images.vas} title={text.vasFee} price={thoundsandSep(data.vas)} />
                                <ListItem icon={images.sim5g} title={text.ordersServiceFee} price={thoundsandSep(data.otherService)} />
                                <ListItem icon={images.phone} title={text.terminalServiceFee} price={thoundsandSep(data.terminalDevice)} />
                            </View>
                        </ScrollView>
                }
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaView>
    );
}

export default ExpectedSalary;