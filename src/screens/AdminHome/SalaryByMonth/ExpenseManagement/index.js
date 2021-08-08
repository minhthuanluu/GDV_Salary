import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Body, DatePicker, Header, ListItem, Table } from '../../../../comps';
import { text } from '../../../../utils/Text';
import { width } from '../../../../utils/Dimenssion';
import moment from 'moment';
import { styles } from './style'
import { fontScale } from '../../../../utils/Fonts';
import { colors } from '../../../../utils/Colors';
import { images } from '../../../../utils/Images';
import { Text } from 'react-native';
import { ScrollView } from 'react-native';
import { getExpenseManagement } from '../../../../api';
import { useEffect } from 'react';
import { expenseManagement } from '../../../../models/Admin';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Toast from 'react-native-toast-message';
import { ToastNotif } from '../../../../utils/Logistics';

const index = (props) => {
    const [month, setMonth] = useState(moment(new Date()).subtract(1, "months").format("MM/YYYY"));
    const [loading, setLoading] = useState(false);
    const [data,setData] = useState(expenseManagement);
    const navigation = useNavigation();

    const getData = async(month) => {
        setLoading(true)
        await getExpenseManagement(month).then((res)=>{
            if (res.status == "success") {
                if (res.data.data.length > 0) {
                    setData(res.data);
                    setLoading(false)
                } else {
                    setData([]);
                    setMessage(text.dataIsNull);
                    setLoading(false)
                }
                
            }
            if (res.status == "failed") {
                setLoading(false);
                ToastNotif('Cảnh báo', res.message, 'error', true);
            }

            if (res.status == "v_error") {
                setLoading(false)
                Toast.show({
                    text1: "Cảnh báo",
                    text2: res.message,
                    type: "error",
                    visibilityTime: 1000,
                    autoHide: true,
                    onHide: () => navigation.goBack()
                })
            }
        });
    }

    const _setMonth = (value) => {
        setMonth(value)
    }

    const fields = [text.totalOutcome, text.fixed, text.incentive, text.supportOutcome, text.otherExpenses]

    useEffect(()=>{
        getData(month)
    },[navigation])

    return (
        <SafeAreaView style={styles.container}>
            <Header title={text.expenseManagement} />
            <DatePicker month={month} width={width - fontScale(120)} style={{ alignSelf: "center" }} onChangeDate={(date) => _setMonth(date)} />
            <Body />
            <View style={{ flex: 1, backgroundColor: colors.white }}>
                {loading==true ? <ActivityIndicator size="small" color={colors.primary} style={{marginBottom:fontScale(15)}}/>:null}
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.sumKpiContainer}>
                        <Text style={styles.sumKpiTitle}>{text.openingRemaining}: </Text>
                        <Text style={styles.sumKpiMonth}>{data.general.openingRemaining}</Text>
                    </View>
                    <View style={styles.top}>
                        <ListItem icon={images.money} title={text.bussinessSupport} price={data.general.businessSupport} />
                        <ListItem icon={images.money} title={text.empOutcome} price={data.general.empOutcome} />
                        <ListItem icon={images.money} title={text.totalSupportOutcome} price={data.general.totalSupportOutcome} />
                        <ListItem icon={images.money} title={text.totalIncome} price={data.general.totalIncome} />
                        <ListItem icon={images.growth} title={text.fixedDifferent} price={data.general.fixedDifferent} />
                        <ListItem icon={images.arrears} title={text.remainDiff} price={data.general.remainDiff} />
                        <View style={[styles.sumKpiContainer, { marginTop: fontScale(20) }]}>
                            <Text style={styles.sumKpiTitle}>{text.endRemaining}: </Text>
                            <Text style={styles.sumKpiMonth}>{data.general.endRemain}</Text>
                        </View>
                    </View>
                    <View style={[styles.top,{marginBottom:fontScale(20)}]}>
                        <Table
                            data={data.data}
                            table
                            numColumn={4}
                            headers={["", "GDV", "HTKD", "Chênh lệch"]}
                            headersTextColor={"#D19E01"}
                            headerStyle={{ icon: { size: 15 }, text: { size: fontScale(14) } }}
                            widthArray={[fontScale(100), fontScale(100), fontScale(100), fontScale(100)]}
                            fields={
                                data.data.map((item, index) => [
                                    fields[index],
                                    item.employee,
                                    item.bussinessSupport,
                                    item.different
                                ])
                            }
                            hideFirstColHeader
                            boldFirstColumn="bold"
                            fontWeight={["normal"]}
                            textColor={data.data.map((item, index) => colors.primary)}
                            rowBg={"#fff"}
                        />
                    </View>
                </ScrollView>
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaView>
    );
}

export default index;