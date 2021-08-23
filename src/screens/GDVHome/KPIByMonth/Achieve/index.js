import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StatusBar, ActivityIndicator, ScrollView } from 'react-native';
import { DateView, Header, Body, ListItem } from '../../../../comps';
import { styles } from './styles';
import { colors } from '../../../../utils/Colors';
import { images } from '../../../../utils/Images';
import { text } from '../../../../utils/Text';
import { useNavigation } from '@react-navigation/core';
import { fontScale } from '../../../../utils/Fonts';
import { getKPIByMonthAchieve, getProfile } from '../../../../api';
import { backHandler, checkn, thoundsandSep, ToastNotif } from '../../../../utils/Logistics';
import { _retrieveData } from '../../../../utils/Storage';
import { KPIByMonthAchieve, UserObj } from '../../../../models/Data';
import Toast from 'react-native-toast-message';

const Achieve = (props) => {
    const [data, setData] = useState(KPIByMonthAchieve);
    const [loading, setLoading] = useState(true);
    const [user, setUserData] = useState(UserObj);
    const navigation = useNavigation();

    const getData = async () => {
        await getKPIByMonthAchieve(navigation).then((res) => {
            if (res.status == "success") {
                setData(res.data);
                setLoading(false);
            }
            if (res.status == "failed") {
                ToastNotif('Cảnh báo', res.message, 'error', true);
                setLoading(false)
            }

            if (res.status == "v_error") {
                Toast.show({
                    text1: "Cảnh báo",
                    text2: res.message,
                    type: "error",
                    visibilityTime: 1000,
                    autoHide: true,
                    onHide: () => navigation.navigate("Home")
                })
            }
        })

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
        backHandler(navigation, "KPIByMonthDashboard");
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent backgroundColor={colors.primary} />
            <Header title={text.kpiByMonth} />
            <DateView dateLabel={data.dateRange} style={styles.dateView} />
            <Body style={styles.bodyScr} displayName={user.displayName} maGDV={user.gdvId.maGDV} />
            <View style={{ flex: 1, backgroundColor: colors.white }}>
                {
                    loading == true ? <ActivityIndicator size="small" color={colors.primary} /> :
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.sumKpiContainer}>
                                <Text style={styles.sumKpiTitle}>{text.totalKpi}: </Text>
                                <Text style={styles.sumKpi}>{data.sumKpi}</Text>
                            </View>
                            <View style={styles.detailInfo}>
                                <ListItem icon={images.sim} title={text.kpiPrepaidSubscribers} price={checkn(data.prePaid)} />
                                <ListItem icon={images.sim} title={text.kpiPostpaidSubscribers} price={checkn(data.postPaid)} />
                                <ListItem icon={images.vas} title={text.kpiVas} price={data.vas} />
                                <ListItem icon={images.important} title={text.kpiImportant} price={data.importantKpi + '\n(Theo kế hoạch MNP)'} />
                                <ListItem icon={images.retailsales} title={text.retailSales} price={data.retailSales} />
                            </View>
                            <View style={[styles.detailInfo, { marginBottom: fontScale(20) }]}>
                                <ListItem icon={images.percent} title={text.subRatio} justTitle />
                                <View style={styles.subDetail}>
                                    <ListItem icon={images.sim} title={text.prepaidSubscribers} price={data.ratePrePaid} />
                                    <ListItem icon={images.sim} title={text.postpaidSubscribers} price={data.ratePostPaid} />
                                </View>
                            </View>
                        </ScrollView>
                }
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaView>
    );
}

export default Achieve;