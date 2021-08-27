import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView, View } from 'react-native';
import { Body, DatePicker, DoubleMonthPicker, Header } from '../../../../../comps';
import { width } from '../../../../../utils/Dimenssion';
import { fontScale } from '../../../../../utils/Fonts';
import { text } from '../../../../../utils/Text';
import { styles } from './style';
import { dataOutcome } from "./db"
import { useRoute, useNavigation } from '@react-navigation/core';
import { ScrollView } from 'react-native';
import { colors } from '../../../../../utils/Colors';
import { getDetailOutcome } from '../../../../../api';
import Toast from 'react-native-toast-message';
import { ActivityIndicator } from 'react-native';

const index = () => {
    const [beginMonth, setBeginMonth] = useState(moment(new Date()).format("01/YYYY"));
    const [endMonth, setEndMonth] = useState(moment(new Date()).subtract(1, 'months').format("MM/YYYY"));
    const [data, setData] = useState(dataOutcome)
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [setMonth,setSetMonth] = useState(true)

    const onChangeBeginMonth = async (value) => {
        if (value > endMonth == true) {
            Toast.show({
                text1: "Cảnh báo",
                text2: "Tháng bắt đầu không được lớn hơn tháng kết thúc",
                type: "error",
                visibilityTime: 1000,
                autoHide: true,
                onHide: () => { setBeginMonth(moment(new Date()).format("01/YYYY"))}
            })
        } else {
            setBeginMonth(value)
            setEndMonth(endMonth)
            await getData(value, endMonth);
        }
    }

    const onChangeEndMonth = async (value) => {
        if (beginMonth > value == true) {
            setEndMonth(endMonth)
        } else {
            setEndMonth(value)
            await getData(beginMonth, value);
        }
    }

    const getData = async (beginMonth, endMonth) => {
        setLoading(true)
        await getDetailOutcome(navigation, beginMonth, endMonth).then((res) => {
            console.log(res.status)
            if (res.status == "success") {
                setData(res.data);
                setLoading(res.isLoading);
                setMessage(res.message)
            }
            if (res.status == "failed") {
                setLoading(res.isLoading);
                Toast.show({
                    text1: "Cảnh báo",
                    text2: res.message,
                    type: "error",
                    visibilityTime: 1000,
                    autoHide: true,
                    onHide: () => { }
                })
            }
            if (res.status == "v_error") {
                setLoading(res.isLoading);
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

    useEffect(() => {
        getData(beginMonth, endMonth);
    }, [navigation])

    const errorNotif = (message)=>{
        Toast.show({
            text1: "Lưu ý",
            text2: message,
            type: "error",
            visibilityTime: 2000,
            autoHide: true
        })
    }

    const fstTitleLeft = ["", "Tổng chi nguồn lương", "Cố định", "Khoán sp", "TBTS", "Hoa hồng", "PPGLĐ", "Duy trì", "TBTT", "EZ", "Thẻ cào", "D.vụ sau BH", "Thu cước", "Bán máy", "Tổng chi hỗ trợ", "Chi CHT", "Chi hỗ trợ khác"]
    const sndTitleLeft = ["", "Tổng chi nguồn khác", "CFKK", "Vas Affi", "Khác"]
    const tstTitleLeft = ["", "Truy thu & Chế tài", "Truy thu", "Chế tài"]
    return (
        <SafeAreaView style={styles.container}>
            <Header title={text.outcomeDetail} />
            <View style={styles.dateContainer}>
                <DoubleMonthPicker beginMonth={beginMonth} endMonth={endMonth} 
                onChangeMonth={(value)=>console.log(value)}
                onError={(message)=>errorNotif(message)}
                />
            </View>
            {data.notification ? <Text style={styles.notification}>{data.notification}</Text> : null}
            <Body />
            <View style={styles.subContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.empAmount}>
                        <Text style={styles.empAmountTitle}>{text.empAmount}: </Text>
                        <Text style={styles.empAmountContent}>{data.empAmount}</Text>
                    </View>
                    {loading == true ? <ActivityIndicator size="small" color={colors.primary} style={{ marginTop: fontScale(20) }} /> : null}
                    {message ? <Text style={{ fontSize: fontScale(15), color: colors.primary, textAlign: "center", marginTop: fontScale(20), width: width }}>{message}</Text> : null}
                    <View style={{
                        flexDirection: "row", backgroundColor: "#fff", shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84,
                        elevation: 5, marginHorizontal: fontScale(5), borderRadius: fontScale(20), marginTop: fontScale(15)
                    }}>
                        <View style={{ width: 1.5 / 6 * width }}>
                            {
                                fstTitleLeft.map((item, index) => <View key={index.toString()} style={{ marginVertical: fontScale(10) }}>
                                    <Text style={{
                                        fontSize: fontScale(13),
                                        fontWeight: "bold",
                                        color: index == 1 || index == 4 || index == 8 || index == 14 ? "#000" : "#707070",
                                        marginLeft: index == 4 || index == 8 ? fontScale(13) : index == 5 || index == 6 || index == 7 || index == 9 || index == 10 || index == 11 || index == 12 || index == 13 ? fontScale(25) : fontScale(5)
                                    }}>{item}</Text></View>)
                            }
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={{ minWidth: 1 / 6 * width }}>
                                {
                                    [text.businessCoop, data.outcomeBusiness, data.permanentBusiness, data.contractBusiness,
                                    data.prepaidSubBusiness, data.commissionBusiness, data.ppgldBusiness,
                                    data.maintainBusiness, data.postpaidSubBusiness, data.ezBusiness,
                                    data.cardBusiness, data.servicesBusiness, data.chargeableBusiness,
                                    data.machineBusiness, data.totalOutcomeSupportBusiness, data.outcomeBusinessMaster,
                                    data.otherOutcomeBusinessMaster].map((item, index) => <View key={index.toString()} style={{ marginVertical: fontScale(10) }}>
                                        <Text style={{ fontSize: fontScale(13), color: index == 0 ? '#D19E01' : index == 1 ? colors.red : colors.lightBlue, textAlign: "center", fontWeight: index == 0 ? "bold" : "normal" }}>{item}</Text>
                                    </View>)
                                }
                            </View>
                            <View style={{ minWidth: 0.8 / 6 * width }}>
                                {
                                    [text.teller, data.outcomeEmp, data.permanentEmp, data.contractEmp,
                                    data.prepaidSubEmp, data.commissionEmp, data.ppgldEmp,
                                    data.maintainEmp, data.postpaidSubEmp, data.ezEmp,
                                    data.cardEmp, data.servicesEmp, data.chargeableEmp,
                                    data.machineEmp, data.totalOutcomeSupportEmp, data.outcomeEmpMaster,
                                    data.otherOutcomeEmpMaster].map((item, index) => <View key={index.toString()} style={{ marginVertical: fontScale(10) }}>
                                        <Text style={{ fontSize: fontScale(13), color: index == 0 ? '#D19E01' : index == 1 ? colors.red : colors.lightBlue, textAlign: "center", fontWeight: index == 0 ? "bold" : "normal" }}>{item}</Text>
                                    </View>)
                                }
                            </View>
                            <View style={{ minWidth: 0.8 / 3.8 * width }}>
                                {
                                    [text.different, data.outcomeDiff, data.permanentDiff, data.contractDiff,
                                    data.prepaidSubDiff, data.commissionDiff, data.ppgldDiff,
                                    data.maintainDiff, data.postpaidSubDiff, data.ezDiff,
                                    data.cardDiff, data.servicesDiff, data.chargeableDiff,
                                    data.machineDiff, data.totalOutcomeSupportDiff, data.outcomeDiffMaster,
                                    data.otherOutcomeBusinessDiff].map((item, index) => <View key={index.toString()} style={{ marginVertical: fontScale(10) }}>
                                        <Text style={{ fontSize: fontScale(13), color: index == 0 ? '#D19E01' : index == 1 ? colors.red : colors.lightBlue, textAlign: "center", fontWeight: index == 0 ? "bold" : "normal" }}>{item}</Text>
                                    </View>)
                                }
                            </View>
                            <View style={{ width: 1.3 / 6 * width }}>
                                {
                                    [text.businessCoopPerMonth, data.outcomeBusinessMonth, data.permanentBusinessMonth, data.contractBusinessMonth,
                                    data.prepaidSubBusinessMonth, data.commissionBusinessMonth, data.ppgldBusinessMonth,
                                    data.maintainBusinessMonth, data.postpaidSubBusinessMonth, data.ezBusinessMonth,
                                    data.cardBusinessMonth, data.servicesBusinessMonth, data.chargeableBusinessMonth,
                                    data.machineBusinessMonth, data.totalOutcomeSupportBusinessMonth, data.outcomeBusinessMonthMaster,
                                    data.otherOutcomeBussinessMonthMaster].map((item, index) => <View key={index.toString()} style={{ marginVertical: fontScale(10) }}>
                                        <Text style={{ fontSize: fontScale(13), color: index == 0 ? '#D19E01' : index == 1 ? colors.red : colors.lightBlue, textAlign: "center", fontWeight: index == 0 ? "bold" : "normal" }}>{item}</Text>
                                    </View>)
                                }
                            </View>
                            <View style={{ width: 1.3 / 6 * width }}>
                                {
                                    [text.empPerMonth, data.outcomeEmpMonth, data.permanentEmpMonth, data.contractEmpMonth,
                                    data.prepaidSubEmpMonth, data.commissionEmpMonth, data.ppgldEmpMonth,
                                    data.maintainEmpMonth, data.postpaidSubEmpMonth, data.ezEmpMonth,
                                    data.cardEmpMonth, data.servicesEmpMonth, data.chargeableEmpMonth,
                                    data.machineEmpMonth, data.totalOutcomeSupportEmp, data.outcomeBusinessEmpMaster,
                                    data.otherOutcomeBusinessEmpMaster].map((item, index) => <View key={index.toString()} style={{ marginVertical: fontScale(10) }}>
                                        <Text style={{ fontSize: fontScale(13), color: index == 0 ? '#D19E01' : index == 1 ? colors.red : colors.lightBlue, textAlign: "center", fontWeight: index == 0 ? "bold" : "normal" }}>{item}</Text>
                                    </View>)
                                }
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{
                        flexDirection: "row", backgroundColor: "#fff", shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84,
                        elevation: 5, marginHorizontal: fontScale(5), borderRadius: fontScale(20), marginTop: fontScale(20), marginBottom: fontScale(5)
                    }}>
                        <View style={{ width: 2.1 / 6 * width }}>
                            {
                                sndTitleLeft.map((item, index) => <View key={index.toString()} style={{ marginVertical: fontScale(10) }}>
                                    <Text style={{
                                        fontSize: fontScale(13),
                                        fontWeight: "bold",
                                        color: index == 1 ? "#000" : "#707070",
                                        marginLeft: index == 1 ? fontScale(5) : fontScale(15)
                                    }}>{item}</Text>
                                </View>)
                            }
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={{ width: 1 / 7 * width }}>
                                {
                                    [text.teller, data.otherTotalOutcomeEmp, data.incentiveOutcomeBusinessEmp, data.vasAffiEmp, data.otherEmp].map((item, index) => <View key={index.toString()} style={{ marginVertical: fontScale(10) }}>
                                        <Text style={{ fontSize: fontScale(13), color: index == 0 ? '#D19E01' : colors.lightBlue, textAlign: "center", fontWeight: index == 0 ? "bold" : "normal" }}>{item}</Text>
                                    </View>)
                                }
                            </View>
                            <View style={{ width: 1 / 5 * width }}>
                                {
                                    [text.avgPerMonth, data.otherTotalOutcomeBusinessMonth, data.incentiveOutcomeBusinessMonth, data.vasAffiBusinessMonth, data.otherAvgMonth].map((item, index) => <View key={index.toString()} style={{ marginVertical: fontScale(10) }}>
                                        <Text style={{ fontSize: fontScale(13), color: index == 0 ? '#D19E01' : colors.lightBlue, textAlign: "center", fontWeight: index == 0 ? "bold" : "normal" }}>{item}</Text>
                                    </View>)
                                }
                            </View>
                            <View style={{ width: 1 / 4 * width }}>
                                {
                                    [text.avgEmpPerMonth, data.otherTotalOutcomeBusinessEmp, data.incentiveOutcomeBusinessEmp, data.vasAffiBusinessEmp, data.otherAvgMonthEmp].map((item, index) => <View key={index.toString()} style={{ marginVertical: fontScale(10) }}>
                                        <Text style={{ fontSize: fontScale(13), color: index == 0 ? '#D19E01' : colors.lightBlue, textAlign: "center", fontWeight: index == 0 ? "bold" : "normal" }}>{item}</Text>
                                    </View>)
                                }
                            </View>
                        </ScrollView>
                    </View>

                    <View style={{
                        flexDirection: "row", backgroundColor: "#fff", shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84,
                        elevation: 5, marginHorizontal: fontScale(5), borderRadius: fontScale(20), marginTop: fontScale(15), marginBottom: fontScale(15)
                    }}>
                        <View style={{ width: 2 / 6 * width }}>
                            {
                                tstTitleLeft.map((item, index) => <View key={index.toString()} style={{ marginVertical: fontScale(10) }}>
                                    <Text style={{
                                        fontSize: fontScale(13),
                                        fontWeight: "bold",
                                        color: index == 1 ? "#000" : "#707070",
                                        marginLeft: index == 1 ? fontScale(5) : fontScale(15)
                                    }}>{item}</Text>
                                </View>)
                            }
                        </View>
                        <View style={{ width: 1 / 6 * width }}>
                            {
                                [text.money, data.moneyFollow, data.moneyArrears, data.moneyPunishment].map((item, index) => <View key={index.toString()} style={{ marginVertical: fontScale(10) }}>
                                    <Text style={{ fontSize: fontScale(13), color: index == 0 ? '#D19E01' : colors.lightBlue, textAlign: "center", fontWeight: index == 0 ? "bold" : "normal" }}>{item}</Text>
                                </View>)
                            }
                        </View>
                        <View style={{ width: 1 / 5 * width }}>
                            {
                                [text.avgPerMonth, data.avgMonthFollow, data.avgMonthArrears, data.avgMonthPunishment].map((item, index) => <View key={index.toString()} style={{ marginVertical: fontScale(10) }}>
                                    <Text style={{ fontSize: fontScale(13), color: index == 0 ? '#D19E01' : colors.lightBlue, textAlign: "center", fontWeight: index == 0 ? "bold" : "normal" }}>{item}</Text>
                                </View>)
                            }
                        </View>
                        <View style={{ width: 1 / 4 * width }}>
                            {
                                [text.avgEmpPerMonth, data.avgMonthEmpFollow, data.avgMonthEmpArrears, data.avgMonthEmpPunishment].map((item, index) => <View key={index.toString()} style={{ marginVertical: fontScale(10) }}>
                                    <Text style={{ fontSize: fontScale(13), color: index == 0 ? '#D19E01' : colors.lightBlue, textAlign: "center", fontWeight: index == 0 ? "bold" : "normal" }}>{item}</Text>
                                </View>)
                            }
                        </View>
                    </View>
                </ScrollView>
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />

        </SafeAreaView>
    );
}

export default index;