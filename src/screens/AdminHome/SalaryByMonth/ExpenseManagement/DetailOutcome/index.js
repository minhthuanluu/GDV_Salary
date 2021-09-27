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

    const getData = async (beginMonth, endMonth) => {
        setLoading(true)
        await getDetailOutcome(navigation, beginMonth, endMonth).then((res) => {
            console.log(res.data)
            if (res.status == "success") {
                setData(res.data.data);
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
    }, [""])

    const errorNotif = (message) => {
        Toast.show({
            text1: "Lưu ý",
            text2: message,
            type: "error",
            visibilityTime: 2000,
            autoHide: true
        })
    }

    const _onChangeMonth = async (value) => {
        await getData(value.beginMonth, value.endMonth);
    }

    const fstTitleLeft = [" ", "Tổng chi nguồn lương", "Cố định", "Khoán sp", "TBTS", "Hoa hồng", "PPGLĐ", "Duy trì", "TBTT", "Vas", "EZ", "Thẻ cào", "D.vụ sau BH", "Thu cước", "Bán máy","Phí KK Quý 1","Khác", "Tổng chi hỗ trợ", "Chi CHT", "Chi hỗ trợ khác"]
    const sndTitleLeft = [" ", "Tổng chi nguồn khác", "CFKK", "Vas Affi", "Khác"]
    const tstTitleLeft = [" ", "Truy thu & Chế tài", "Truy thu", "Chế tài"]
    return (
        <SafeAreaView style={styles.container}>
            <Header title={text.outcomeDetail} />
            <View style={styles.dateContainer}>
                <DoubleMonthPicker beginMonth={beginMonth} endMonth={endMonth}
                    onChangeMonth={(value) => _onChangeMonth(value)}
                    onError={(message) => errorNotif(message)}
                />
            </View>
            <Body />
            <View style={styles.subContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ marginTop: fontScale(10) }}>
                        {loading == true ? <ActivityIndicator size="small" color={colors.primary} style={{ marginTop: fontScale(20), marginBottom: fontScale(10) }} /> : null}
                        <View style={{
                            backgroundColor: "#fff", shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84,
                            elevation: 5, marginHorizontal: fontScale(7), borderRadius: fontScale(20)
                        }}>
                            <View style={[styles.empAmount, { marginTop: fontScale(20) }]}>
                                <Text style={styles.empAmountTitle}>{text.empAmount}: </Text>
                                <Text style={styles.empAmountContent}>{data.empAmount}</Text>
                            </View>
                            <Text style={{ fontSize: fontScale(11), textAlign: "center", fontWeight: "bold", color: "#686565", opacity: 0.59, marginBottom: fontScale(10), marginTop: fontScale(5) }}>{"(Đơn vị tính: triệu đồng)"}</Text>
                            <View style={{
                                flexDirection: "row", marginHorizontal: fontScale(7), marginTop: fontScale(15)
                            }}>
                                <View style={{ width: 1.5 / 4 * width }}>
                                    {
                                        fstTitleLeft.map((item, index) => <View key={index.toString()} style={{ marginVertical: fontScale(10) }}>
                                            <Text style={{
                                                fontSize: fontScale(13),
                                                fontWeight: "bold",
                                                color: index == 1 || index == 4 || index >= 8 && index <= 17 ? "#000" : "#707070",
                                                marginLeft: index == 4 || index >= 8 && index < 17 ? fontScale(13) : index == 5 || index == 6 || index == 7 || index == 9 || index == 10 || index == 11 || index == 12 || index == 13 || index == 14 ? fontScale(25) : fontScale(5)
                                            }}>{item}</Text></View>)
                                    }
                                </View>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <View style={{ minWidth: 1 / 6 * width }}>
                                        {
                                            [text.businessCoop,
                                            data.outcomeBusiness, //Tổng chi nguồn lương HTKD
                                            data.permanentBusiness, //cố định HTKD
                                            data.contractBusiness,// khoán sp HTKD
                                            data.postpaidSubBusiness, // TBTS HTKD
                                            data.commissionBusiness, // hoa hồng HTKD
                                            data.ppgldBusiness, // PPGLĐ HTKD
                                            data.maintainBusiness, // Duy trì HTKD
                                            data.prepaidSubBusiness, //TBTT HTKD
                                            data.vasBusiness,// Vas HTKD
                                            data.ezBusiness, // ez HTKD
                                            data.cardBusiness, // Thẻ cào HTKD
                                            data.servicesBusiness, //D.vụ sau BH HTKD
                                            data.chargeableBusiness, // Thu cước HTKD
                                            data.machineBusiness, // Bán máy HTKD

                                            data.firstQuarterBusiness,//Phí KK quý 1 HTKD
                                            data.othersBusiness,//phí khác HTKD
                                            
                                            data.totalOSB, // tổng chi hỗ trợ
                                            data.outcomeBusinessMaster, // chi CHT
                                            data.otherOBMaster // chi hỗ trợ khác
                                            ].map((item, index) => <View key={index.toString()} style={{ marginVertical: fontScale(10) }}>
                                                <Text style={{
                                                    fontSize: fontScale(13),
                                                    color: index == 0 ? '#D19E01' : index == 1||index==17 ? colors.red :
                                                        index == 4 || index >= 8 && index<=17 ? "#289AF3"
                                                            : index >= 5 && index <= 7 ? "#643335" : colors.lightBlue,
                                                    textAlign: "center",
                                                    fontWeight: "bold"
                                                }}>{item}</Text>
                                            </View>)
                                        }
                                    </View>
                                    <View style={{ minWidth: 0.8 / 6 * width, marginLeft: fontScale(5) }}>
                                        {
                                            [text.teller,
                                            data.outcomeEmp, //tổng chi nguồn lương GDV
                                            data.permanentEmp, //cố đinh GDV
                                            data.contractEmp, // khoán sp GDV
                                            data.postpaidSubEmp, // TBTS GDV
                                            data.commissionEmp, // hoa hồng GDV
                                            data.ppgldEmp, // PPGLD GDV
                                            data.maintainEmp, // duy trì GDV
                                            data.prepaidSubEmp, // TBTT GDV
                                            data.vasEmp, // vas GDV
                                            data.ezEmp, // ez GDV
                                            data.cardEmp, // thẻ cào GDV
                                            data.servicesEmp, // D.vụ sau BH GDV
                                            data.chargeableEmp, // thu cước GDV
                                            data.machineEmp, // bán máy GDV

                                            data.firstQuarterEmp,//Phí KK quý 1 GDV
                                            data.othersEmp,//Phí khác GDV
                                            
                                            data.totalOSE, // tổng chi hỗ trợ GDV
                                            data.outcomeEmpMaster, // chi CHT  GDV
                                            data.otherOBEmpMaster // chi hỗ trợ khác GDv
                                            ].map((item, index) => <View key={index.toString()} style={{ marginVertical: fontScale(10) }}>
                                            <Text style={{
                                                fontSize: fontScale(13),
                                                color: index == 0 ? '#D19E01' : index == 1||index==17 ? colors.red :
                                                    index == 4 || index >= 8 && index<=17 ? "#289AF3"
                                                        : index >= 5 && index <= 7 ? "#643335" : colors.lightBlue,
                                                textAlign: "center",
                                                fontWeight: "bold"
                                            }}>{item}</Text>
                                        </View>)
                                        }
                                    </View>
                                    <View style={{ minWidth: 0.8 / 3.8 * width, marginLeft: fontScale(5) }}>
                                        {
                                            [text.different,
                                            data.outcomeDiff, // tổng chi nguồn lương chênh lệch
                                            data.permanentDiff, // cố định chênh lệch
                                            data.contractDiff, // khoán sp chênh lệch
                                            data.postpaidSubDiff, // TBTS chênh lệch
                                            data.commissionDiff, // hoa hồng chênh lệch
                                            data.ppgldDiff, // PPGLĐ chênh lệch
                                            data.maintainDiff, // duy trì chênh lệch
                                            data.prepaidSubDiff, // TBTT chênh lệch
                                            data.vasDiff, // Vas chênh lệch
                                            data.ezDiff, // ez chênh lệch
                                            data.cardDiff, // thẻ cào chênh lệch
                                            data.servicesDiff, // D.vụ sau BH chênh lệch
                                            data.chargeableDiff, // thu cước chênh lệch
                                            data.machineDiff, // bán máy chênh lệch
                                            
                                            data.firstQuarterDiff,//Phí KK quý 1 Chênh lệch
                                            data.othersDiff,//Phí khác Chênh lệch

                                            data.totalOutcomeSupportDiff, // tổng chi hỗ trợ chênh lệch
                                            data.outcomeDiffMaster, // chi CHT chênh lệch
                                            data.otherOBDiff // chi hỗ trợ khác
                                            ].map((item, index) => <View key={index.toString()} style={{ marginVertical: fontScale(10) }}>
                                            <Text style={{
                                                fontSize: fontScale(13),
                                                color: index == 0 ? '#D19E01' : index == 1||index==17 ? colors.red :
                                                    index == 4 || index >= 8 && index<=17 ? "#289AF3"
                                                        : index >= 5 && index <= 7 ? "#643335" : colors.lightBlue,
                                                textAlign: "center",
                                                fontWeight: "bold"
                                            }}>{item}</Text>
                                        </View>)
                                        }
                                    </View>
                                    <View style={{ minWidth: 1.3 / 6 * width, marginLeft: fontScale(5) }}>
                                        {
                                            [text.businessCoopPerMonth,
                                            data.outcomeBusinessMonth, // tổng chi nguồn lương HTKD 1 tháng
                                            data.permanentBusinessMonth, // cố định HTKD 1 tháng
                                            data.contractBusinessMonth, // khoán sp HTKD 1 tháng
                                            data.postpaidSubBusinessMonth, // TBTS HTKD 1 tháng
                                            data.commissionBusinessMonth, // hoa hồng HTKD 1 tháng
                                            data.ppgldBusinessMonth, // PPGLĐ HTKD 1 tháng
                                            data.maintainBusinessMonth, // duy trì HTKD 1 tháng
                                            data.prepaidSubBusinessMonth, // TBTT HTKD 1 tháng
                                            data.vasBusinessMonth, // vas HTKD 1 tháng
                                            data.ezBusinessMonth, // ez HTKD 1 tháng
                                            data.cardBusinessMonth, // thẻ cào 1 tháng
                                            data.servicesBusinessMonth, // D.vụ sau BH 1 tháng
                                            data.chargeableBusinessMonth, // Thu cước 1 tháng
                                            data.machineBusinessMonth, // bán máy 1 tháng
                                            
                                            data.firstQuarterBM,//Phí KK quý 1 HTKD 1 tháng
                                            data.othersBM,//Phí khác HTKD 1 tháng
                                            
                                            data.totalOSBMonth, // tổng chi hỗ trợ 1 tháng
                                            data.outcomeBusinessMonthMaster, // chi CHT 1 tháng
                                            data.otherOBMonthMaster // chi hỗ trợ khác
                                        ].map((item, index) => <View key={index.toString()} style={{ marginVertical: fontScale(10) }}>
                                        <Text style={{
                                            fontSize: fontScale(13),
                                            color: index == 0 ? '#D19E01' : index == 1||index==17 ? colors.red :
                                                index == 4 || index >= 8 && index<=17 ? "#289AF3"
                                                    : index >= 5 && index <= 7 ? "#643335" : colors.lightBlue,
                                            textAlign: "center",
                                            fontWeight: "bold"
                                        }}>{item}</Text>
                                    </View>)
                                        }
                                    </View>
                                    <View style={{ minWidth: 1.3 / 5 * width, marginLeft: fontScale(5) }}>
                                        {
                                            [text.empPerMonth,
                                            data.outcomeEmpMonth, //tổng chi nguồn lương 1 GDV/tháng
                                            data.permanentEmpMonth, // cố định 1 GDV/tháng
                                            data.contractEmpMonth, // khoán sp 1 GDV/tháng
                                            data.postpaidSubEmpMonth, // TBTS 1 GDV/tháng
                                            data.commissionEmpMonth, // hoa hồng 1 GDV/tháng
                                            data.ppgldEmpMonth, // PPGLĐ 1 GDV/tháng
                                            data.maintainEmpMonth, // duy trì 1 GDV/tháng
                                            data.prepaidSubEmpMonth, // TBTT 1 GDV/tháng
                                            data.vasEmpMonth, // Vas 1 GDV/tháng
                                            data.ezEmpMonth, // ez 1 GDV/tháng
                                            data.cardEmpMonth, // card 1 GDV/tháng
                                            data.servicesEmpMonth, // D.vụ sau BH 1 GDV/tháng
                                            data.chargeableEmpMonth, // thu cước 1 GDV/tháng
                                            data.machineEmpMonth, // bán máy 1 GDV/tháng

                                            data.firstQuarterEM,//Phí KK quý 1 1 GDV/tháng
                                            data.othersEM,//Phí khác 1 GDV/tháng
                                            
                                            data.totalOSEMonth, // tổng chi hỗ trợ 1 GDV/tháng
                                            data.otherOutcomeEmpMaster, // chi CHT 1 GDV/tháng
                                            data.otherOBEmpMaster // chi hỗ trợ khác 1 GDV/tháng
                                        ].map((item, index) => <View key={index.toString()} style={{ marginVertical: fontScale(10) }}>
                                        <Text style={{
                                            fontSize: fontScale(13),
                                            color: index == 0 ? '#D19E01' : index == 1||index==17 ? colors.red :
                                                index == 4 || index >= 8 && index<=17 ? "#289AF3"
                                                    : index >= 5 && index <= 7 ? "#643335" : colors.lightBlue,
                                            textAlign: "center",
                                            fontWeight: "bold"
                                        }}>{item}</Text>
                                    </View>)
                                        }
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: "row", backgroundColor: "#fff", shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84,
                            elevation: 5, marginHorizontal: fontScale(7), borderRadius: fontScale(20), marginTop: fontScale(20), marginBottom: fontScale(5)
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
                                <View style={{ width: 1 / 6 * width }}>
                                    {
                                        [text.teller, data.otherTotalOE, data.incentiveOE, data.vasAffiEmp, data.otherEmp].map((item, index) => <View key={index.toString()} style={{ marginVertical: fontScale(10) }}>
                                            <Text style={{ fontSize: fontScale(13), color: index == 0 ? '#D19E01':index==1?colors.red : colors.lightBlue, textAlign: "center", fontWeight: "bold" }}>{item}</Text>
                                        </View>)
                                    }
                                </View>
                                <View style={{ width: 1 / 5 * width }}>
                                    {
                                        [text.avgPerMonth, data.otherTotalOBMonth, data.incentiveOBMonth, data.vasAffiBusinessMonth, data.otherAvgMonth].map((item, index) => <View key={index.toString()} style={{ marginVertical: fontScale(10) }}>
                                           <Text style={{ fontSize: fontScale(13), color: index == 0 ? '#D19E01':index==1?colors.red : colors.lightBlue, textAlign: "center", fontWeight: "bold" }}>{item}</Text>
                                        </View>)
                                    }
                                </View>
                                <View style={{ width: 1 / 4 * width }}>
                                    {
                                        [text.avgEmpPerMonth, data.otherTotalOBE, data.incentiveOBEmp, data.vasAffiBusinessEmp, data.otherAvgMonthEmp].map((item, index) => <View key={index.toString()} style={{ marginVertical: fontScale(10) }}>
                                            <Text style={{ fontSize: fontScale(13), color: index == 0 ? '#D19E01':index==1?colors.red : colors.lightBlue, textAlign: "center", fontWeight: "bold" }}>{item}</Text>
                                        </View>)
                                    }
                                </View>
                            </ScrollView>
                        </View>

                        <View style={{
                            flexDirection: "row", backgroundColor: "#fff", shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84,
                            elevation: 5, marginHorizontal: fontScale(7), borderRadius: fontScale(20), marginTop: fontScale(15), marginBottom: fontScale(15)
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
                                        <Text style={{ fontSize: fontScale(13), color: index == 0 ? '#D19E01':index==1?colors.red : colors.lightBlue, textAlign: "center", fontWeight: "bold" }}>{item}</Text>
                                    </View>)
                                }
                            </View>
                            <View style={{ width: 1 / 5 * width }}>
                                {
                                    [text.avgPerMonth, data.avgMonthFollow, data.avgMonthArrears, data.avgMonthPunishment].map((item, index) => <View key={index.toString()} style={{ marginVertical: fontScale(10) }}>
                                        <Text style={{ fontSize: fontScale(13), color: index == 0 ? '#D19E01':index==1?colors.red : colors.lightBlue, textAlign: "center", fontWeight: "bold" }}>{item}</Text>
                                    </View>)
                                }
                            </View>
                            <View style={{ width: 1 / 4 * width }}>
                                {
                                    [text.avgEmpPerMonth, data.avgMonthEmpFollow, data.avgMonthEmpArrears, data.avgMonthEmpPunishment].map((item, index) => <View key={index.toString()} style={{ marginVertical: fontScale(10) }}>
                                        <Text style={{ fontSize: fontScale(13), color: index == 0 ? '#D19E01':index==1?colors.red : colors.lightBlue, textAlign: "center", fontWeight: "bold" }}>{item}</Text>
                                    </View>)
                                }
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaView>
    );
}

export default index;