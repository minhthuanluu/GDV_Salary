import moment from 'moment';
import React, { useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView, View } from 'react-native';
import { Body, DatePicker, Header } from '../../../../../comps';
import { width } from '../../../../../utils/Dimenssion';
import { fontScale } from '../../../../../utils/Fonts';
import { text } from '../../../../../utils/Text';
import { styles } from './style';
import { dataOutcome } from "./db"
import { ScrollView } from 'react-native';
import { colors } from '../../../../../utils/Colors';

const index = (props) => {
    const [beginMonth, setBeginMonth] = useState('01' + '/' + moment(new Date()).format("YYYY"));
    const [endMonth, setEndMonth] = useState(moment(new Date()).subtract(1, 'months').format("MM/YYYY"));
    const [data, setData] = useState(dataOutcome)
    const onChangeBMonth = (month) => {
        setBeginMonth(month);
        console.log(month + ' - ' + endMonth);
    }

    const onChangeEMonth = (month) => {
        setEndMonth(month);
        console.log(beginMonth + ' - ' + month);
    }
    const fstTitleLeft = ["", "Tổng chi", "Cố định", "Khoán sp", "TBTS", "Hoa hồng", "PPGLĐ", "Duy trì", "TBTT", "EZ", "Thẻ cào", "D.vụ sau BH", "Thu cước", "Bán máy", "Tổng chi hỗ trợ", "Chi CHT", "Chi hỗ trợ khác"]
    const sndTitleLeft = ["", "Tổng chi nguồn khác", "CFKK", "Vas Affi", "Khác"]
    const tstTitleLeft = ["", "Theo dõi thêm", "Truy thu", "Chế tài"]
    return (
        <SafeAreaView style={styles.container}>
            <Header title={text.outcomeDetail} />
            <View style={styles.dateContainer}>
                <DatePicker month={beginMonth} width={width / 2 - fontScale(20)} style={{ marginLeft: fontScale(10) }} onChangeDate={(date) => onChangeBMonth(date)} />
                <DatePicker month={endMonth} width={width / 2 - fontScale(20)} style={{ marginLeft: fontScale(20) }} onChangeDate={(date) => onChangeEMonth(date)} />
            </View>
            <Text style={styles.notification}>{'Số liệu hiển thị từ...'}</Text>
            <Body />
            <View style={styles.subContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.empAmount}>
                        <Text style={styles.empAmountTitle}>{text.empAmount}: </Text>
                        <Text style={styles.empAmountContent}>{data.empAmount}</Text>
                    </View>
                    <View style={{
                        flexDirection: "row", backgroundColor: "#fff", shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84,
                        elevation: 5, marginHorizontal: fontScale(5), borderRadius: fontScale(20), marginTop: fontScale(15)
                    }}>
                        <View style={{ flex: 3 }}>
                            {
                                fstTitleLeft.map((item, index) => <View style={{ marginVertical: fontScale(10) }}>
                                    <Text style={{
                                        fontSize: fontScale(13),
                                        fontWeight: index == 1 || index == 4 || index == 8 || index == 14 ? "bold" : "normal",
                                        marginLeft: index == 4 || index == 8 ? fontScale(13) : index == 5 || index == 6 || index == 7 || index == 9 || index == 10 || index == 11 || index == 12 || index == 13 ? fontScale(25) : fontScale(5)
                                    }}>{item}</Text></View>)
                            }
                        </View>
                        <View style={{ flex: 1.5 }}>
                            {
                                ["HTKD", dataOutcome.outcomeBusiness, dataOutcome.permanentBusiness, dataOutcome.contractBusiness,
                                    dataOutcome.prepaidSubBusiness, dataOutcome.commissionBusiness, dataOutcome.ppgldBusiness,
                                    dataOutcome.maintainBusiness, dataOutcome.postpaidSubBusiness, dataOutcome.ezBusiness,
                                    dataOutcome.cardBusiness, dataOutcome.servicesBusiness, dataOutcome.chargeableBusiness,
                                    dataOutcome.machineBusiness, dataOutcome.totalOutcomeSupportBusiness, dataOutcome.outcomeBusinessMaster,
                                    dataOutcome.otherOutcomeBusinessMaster].map((item, index) => <View style={{ marginVertical: fontScale(10) }}>
                                        <Text style={{ fontSize: fontScale(13), color: index == 0 ? colors.darkYellow : index == 1 ? colors.red : colors.lightBlue, textAlign: "center", fontWeight: index == 0 ? "bold" : "normal" }}>{item}</Text>
                                    </View>)
                            }
                        </View>
                        <View style={{ flex: 1.7 }}>
                            {
                                ["GDV", dataOutcome.outcomeEmp, dataOutcome.permanentEmp, dataOutcome.contractEmp,
                                    dataOutcome.prepaidSubEmp, dataOutcome.commissionEmp, dataOutcome.ppgldEmp,
                                    dataOutcome.maintainEmp, dataOutcome.postpaidSubEmp, dataOutcome.ezEmp,
                                    dataOutcome.cardEmp, dataOutcome.servicesEmp, dataOutcome.chargeableEmp,
                                    dataOutcome.machineEmp, dataOutcome.totalOutcomeSupportEmp, dataOutcome.outcomeEmpMaster,
                                    dataOutcome.otherOutcomeEmpMaster].map((item, index) => <View style={{ marginVertical: fontScale(10) }}>
                                        <Text style={{ fontSize: fontScale(13), color: index == 0 ? colors.darkYellow : index == 1 ? colors.red : colors.lightBlue, textAlign: "center", fontWeight: index == 0 ? "bold" : "normal" }}>{item}</Text>
                                    </View>)
                            }
                        </View>
                        <View style={{ flex: 2.8 }}>
                            {
                                ["HTKD 1 tháng", dataOutcome.outcomeBusinessMonth, dataOutcome.permanentBusinessMonth, dataOutcome.contractBusinessMonth,
                                    dataOutcome.prepaidSubBusinessMonth, dataOutcome.commissionBusinessMonth, dataOutcome.ppgldBusinessMonth,
                                    dataOutcome.maintainBusinessMonth, dataOutcome.postpaidSubBusinessMonth, dataOutcome.ezBusinessMonth,
                                    dataOutcome.cardBusinessMonth, dataOutcome.servicesBusinessMonth, dataOutcome.chargeableBusinessMonth,
                                    dataOutcome.machineBusinessMonth, dataOutcome.totalOutcomeSupportBusinessMonth, dataOutcome.outcomeBusinessMonthMaster,
                                    dataOutcome.otherOutcomeEmpMaster].map((item, index) => <View style={{ marginVertical: fontScale(10) }}>
                                        <Text style={{ fontSize: fontScale(13), color: index == 0 ? colors.darkYellow : index == 1 ? colors.red : colors.lightBlue, textAlign: "center", fontWeight: index == 0 ? "bold" : "normal" }}>{item}</Text>
                                    </View>)
                            }
                        </View>
                        <View style={{ flex: 3 }}>
                            {
                                ["1 GDV/tháng", dataOutcome.outcomeBusinessMonth, dataOutcome.permanentBusinessMonth, dataOutcome.contractBusinessMonth,
                                    dataOutcome.prepaidSubBusinessMonth, dataOutcome.commissionBusinessMonth, dataOutcome.ppgldBusinessMonth,
                                    dataOutcome.maintainBusinessMonth, dataOutcome.postpaidSubBusinessMonth, dataOutcome.ezBusinessMonth,
                                    dataOutcome.cardBusinessMonth, dataOutcome.servicesBusinessMonth, dataOutcome.chargeableBusinessMonth,
                                    dataOutcome.machineBusinessMonth, dataOutcome.totalOutcomeSupportBusinessMonth, dataOutcome.outcomeBusinessMonthMaster,
                                    dataOutcome.otherOutcomeEmpMaster].map((item, index) => <View style={{ marginVertical: fontScale(10) }}>
                                        <Text style={{ fontSize: fontScale(13), color: index == 0 ? colors.darkYellow : index == 1 ? colors.red : colors.lightBlue, textAlign: "center", fontWeight: index == 0 ? "bold" : "normal" }}>{item}</Text>
                                    </View>)
                            }
                        </View>
                    </View>

                    <View style={{
                        flexDirection: "row", backgroundColor: "#fff", shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84,
                        elevation: 5, marginHorizontal: fontScale(5), borderRadius: fontScale(20), marginTop: fontScale(20), marginBottom: fontScale(5)
                    }}>
                        <View style={{ flex: 3 }}>
                            {
                                sndTitleLeft.map((item, index) => <View style={{ marginVertical: fontScale(10) }}>
                                    <Text style={{
                                        fontSize: fontScale(13),
                                        fontWeight: index == 1 ? "bold" : "normal",
                                        marginLeft: index == 1 ? fontScale(5) : fontScale(15)
                                    }}>{item}</Text>
                                </View>)
                            }
                        </View>
                        <View style={{ flex: 1 }}>
                            {
                                ["GDV", dataOutcome.otherTotalOutcomeEmp, dataOutcome.incentiveOutcomeBusinessEmp, dataOutcome.vasAffiEmp, dataOutcome.otherEmp].map((item, index) => <View style={{ marginVertical: fontScale(10) }}>
                                    <Text style={{ fontSize: fontScale(13), color: index == 0 ? colors.darkYellow : colors.lightBlue, textAlign: "center", fontWeight: index == 0 ? "bold" : "normal" }}>{item}</Text>
                                </View>)
                            }
                        </View>
                        <View style={{ flex: 1.8 }}>
                            {
                                ["BQ 1 tháng", dataOutcome.otherTotalOutcomeBusinessMonth, dataOutcome.incentiveOutcomeBusinessMonth, dataOutcome.vasAffiBusinessMonth, dataOutcome.otherAvgMonth].map((item, index) => <View style={{ marginVertical: fontScale(10) }}>
                                    <Text style={{ fontSize: fontScale(13), color: index == 0 ? colors.darkYellow : colors.lightBlue, textAlign: "center", fontWeight: index == 0 ? "bold" : "normal" }}>{item}</Text>
                                </View>)
                            }
                        </View>
                        <View style={{ flex: 2.2 }}>
                            {
                                ["BQ 1 GDV/tháng", dataOutcome.otherTotalOutcomeBusinessEmp, dataOutcome.incentiveOutcomeBusinessEmp, dataOutcome.vasAffiBusinessEmp, dataOutcome.otherAvgMonthEmp].map((item, index) => <View style={{ marginVertical: fontScale(10) }}>
                                    <Text style={{ fontSize: fontScale(13), color: index == 0 ? colors.darkYellow : colors.lightBlue, textAlign: "center", fontWeight: index == 0 ? "bold" : "normal" }}>{item}</Text>
                                </View>)
                            }
                        </View>
                    </View>

                    <View style={{
                        flexDirection: "row", backgroundColor: "#fff", shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84,
                        elevation: 5, marginHorizontal: fontScale(5), borderRadius: fontScale(20), marginTop: fontScale(15), marginBottom: fontScale(15)
                    }}>
                        <View style={{ flex: 3 }}>
                            {
                                tstTitleLeft.map((item, index) => <View style={{ marginVertical: fontScale(10) }}>
                                    <Text style={{
                                        fontSize: fontScale(13),
                                        fontWeight: index == 1 ? "bold" : "normal",
                                        marginLeft: index == 1 ? fontScale(5) : fontScale(15)
                                    }}>{item}</Text>
                                </View>)
                            }
                        </View>
                        <View style={{ flex: 1 }}>
                            {
                                ["Số tiền", dataOutcome.moneyFollow, dataOutcome.moneyArrears, dataOutcome.moneyPunishment].map((item, index) => <View style={{ marginVertical: fontScale(10) }}>
                                    <Text style={{ fontSize: fontScale(13), color: index == 0 ? colors.darkYellow : colors.lightBlue, textAlign: "center", fontWeight: index == 0 ? "bold" : "normal" }}>{item}</Text>
                                </View>)
                            }
                        </View>
                        <View style={{ flex: 1.8 }}>
                            {
                                ["BQ 1 tháng", dataOutcome.avgMonthFollow, dataOutcome.avgMonthArrears, dataOutcome.avgMonthPunishment].map((item, index) => <View style={{ marginVertical: fontScale(10) }}>
                                    <Text style={{ fontSize: fontScale(13), color: index == 0 ? colors.darkYellow : colors.lightBlue, textAlign: "center", fontWeight: index == 0 ? "bold" : "normal" }}>{item}</Text>
                                </View>)
                            }
                        </View>
                        <View style={{ flex: 2.2 }}>
                            {
                                ["BQ 1 GDV/tháng", dataOutcome.avgMonthEmpFollow, dataOutcome.avgMonthEmpArrears, dataOutcome.avgMonthEmpPunishment].map((item, index) => <View style={{ marginVertical: fontScale(10) }}>
                                    <Text style={{ fontSize: fontScale(13), color: index == 0 ? colors.darkYellow : colors.lightBlue, textAlign: "center", fontWeight: index == 0 ? "bold" : "normal" }}>{item}</Text>
                                </View>)
                            }
                        </View>
                    </View>
                </ScrollView>
            </View>

        </SafeAreaView>
    );
}

export default index;