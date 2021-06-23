import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StatusBar, ActivityIndicator } from 'react-native';
import { DateView, Header, Body, MenuItem, ListItem, DatePicker } from '../../../../comps';
import { styles } from './styles';
import { colors } from '../../../../utils/Colors';
import { text } from '../../../../utils/Text';
import { images } from '../../../../utils/Images';
import { thoundsandSep } from '../../../../utils/Logistics';
import { width } from '../../../../utils/Dimenssion';
import { fontScale } from '../../../../utils/Fonts';
import moment from 'moment';
import { getTempSalary } from '../../../../api';


const ExpectedSalary = (props) => {
    const [data, setData] = useState({
        contractSalary: 1000000,
        prePaid: 100000,
        postPaid: 100000,
        vas: 100000,
        otherService: 600000,
        terminalDevice: 100000,
        permanentSalary: 8000000
    });

    const [month, setMonth] = useState(moment(new Date()).format("MM/YYYY"))
    const [showDate, setShowDate] = useState(false);
    const [loading, setLoading] = useState(true)


    const getData = async () => {
        await getTempSalary().then((res) => {
            if (res.status == "success") {
                setData(res.data)
                setLoading(false);

            }
            if (res.status == "failed") {
                setLoading(false);

            }
        })

    }

    useEffect(() => {

        getData()

    }, [""]);






    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent backgroundColor={colors.primary} />
            <Header title={text.expectedSalary} />
            <DateView dateLabel={data.dateRange} />
            <Body userInfo={"Võ Ngọc Kim Trang ( GDV - 1.009 )"} style={styles.bodyScr} />
            <View style={{ flex: 1, backgroundColor: colors.white }}>
                {
                    loading == true ? <ActivityIndicator size="small" color={colors.primary} /> :
                        <>
                            <View style={styles.sumKpiContainer}>
                                <Text style={styles.sumKpiTitle}>{text.expectedSalary}: </Text>
                                <Text style={styles.sumKpi}>{thoundsandSep(data.expectedSalary)}</Text>
                            </View>
                            <View>
                                <MenuItem style={{ marginTop: 50 }} title={text.fixedSalary} icon={images.salaryByMonth} width={width - fontScale(40)} value={thoundsandSep(data.permanentSalary)} />
                            </View>
                            <View style={styles.detailInfo}>
                                <ListItem main icon={images.sim} title={text.upSalaryProduct} price={thoundsandSep(data.contractSalary)} />
                                <ListItem icon={images.sim} title={text.prepaidSubscriptionFee} price={thoundsandSep(data.prePaid)} />
                                <ListItem icon={images.sim} title={text.postpaidSSubscriptionFee} price={thoundsandSep(data.postPaid)} />
                                <ListItem icon={images.vas} title={text.vasFee} price={thoundsandSep(data.vas)} />
                                <ListItem icon={images.sim5g} title={text.ordersServiceFee} price={thoundsandSep(data.otherService)} />
                                <ListItem icon={images.phone} title={text.terminalServiceFee} price={thoundsandSep(data.terminalDevice)} />
                            </View>
                        </>
                }
            </View>
        </SafeAreaView>
    );
}

export default ExpectedSalary;