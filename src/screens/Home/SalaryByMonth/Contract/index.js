import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, View, Text } from 'react-native';
import { getContractSalaryByMonth } from '../../../../api';
import { Body, DatePicker, DateView, Header, ListItem, MetricStatus } from '../../../../comps';
import { ContractSalaryByMonth } from '../../../../models/Data';
import { colors } from '../../../../utils/Colors';
import { width } from '../../../../utils/Dimenssion';
import { fontScale } from '../../../../utils/Fonts';
import { images } from '../../../../utils/Images';
import { thoundsandSep } from '../../../../utils/Logistics';
import { text } from '../../../../utils/Text';
import { styles } from './styles';

const Contract = (props) => {
    const [month, setMonth] = useState(moment(new Date()).format("MM/YYYY"));
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(ContractSalaryByMonth);

    const getData = async (month) => {
        await getContractSalaryByMonth(month).then((res) => {
            if (res.status == "success") {
                setData(res.data);
            }
            if (res.status == "failed") {
                
            }
        })

    }

    useEffect(() => {
        getData(month)
    }, [""]);

    const _onChangeMonth = async (value) => {
        setMonth(value);
        await getData(value)
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent backgroundColor={colors.primary} />
            <Header title={text.upSalary} />
            <DatePicker month={month} width={width - fontScale(120)} style={{ alignSelf: "center" }} onChangeDate={(date) => _onChangeMonth(date)} />
            <MetricStatus status={data.status} style={{ alignSelf: "center", marginTop: fontScale(20) }} />
            <Body userInfo={"Võ N Kim Trang ( GDV - 1.009 )"} style={styles.bodyScr} />
            <View style={{ flex: 1, backgroundColor: colors.white }}>
                <View style={styles.sumKpiContainer}>
                    <Text style={styles.sumKpiTitle}>{text.upSalary}: </Text>
                    <Text style={styles.sumKpi}>{thoundsandSep(data.contractSalary)}</Text>
                </View>
                <View style={styles.detailInfo}>
                    <ListItem icon={images.sim} title={text.prepaidSubscriptionFee} price={thoundsandSep(data.prePaid)} />
                    <ListItem icon={images.sim} title={text.postpaidSSubscriptionFee} price={thoundsandSep(data.postPaid)} />
                    <ListItem icon={images.vas} title={text.kpiVas} price={thoundsandSep(data.vas)} />
                    <ListItem icon={images.sim5g} title={text.ordersServiceFee} price={thoundsandSep(data.postage)} />
                    <ListItem icon={images.phone} title={text.terminalServiceFee} price={thoundsandSep(data.terminalDevice)} />
                    <ListItem icon={images.headphone} title={text.orderFee} price={thoundsandSep(data.otherService)} />
                    <ListItem icon={images.arrears} title={text.arrears} price={thoundsandSep(data.arrears)} />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Contract;