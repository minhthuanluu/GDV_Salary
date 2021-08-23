import moment from 'moment';
import React, { useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView, View } from 'react-native';
import { Body, Header, YearPicker } from '../../../../../comps';
import { colors } from '../../../../../utils/Colors';
import { width } from '../../../../../utils/Dimenssion';
import { fontScale } from '../../../../../utils/Fonts';
import { text } from '../../../../../utils/Text';
import { dataPlanSupport } from './db';
import { styles } from './style';

const index = (props) => {
    const [year, setYear] = useState(moment(new Date()).format('YYYY'));
    const fstTitleLeft = ["", "Thưởng 5 lễ", "Thưởng tết ÂL", "Mức 1", "Mức 2", "Mức 3", "Hỗ trợ CHT", "GDV top", "CH top", "Nghỉ lúc có thai", "Khác"]

    const onChangeYear = (year) => {
        setYear(year);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header title={text.outcomePlanSupport} />
            <YearPicker defaultYear={year} width={width - fontScale(100)} onPress={(value) => onChangeYear(value)} style={{ alignSelf: "center" }} />
            <Body />
            <View style={styles.subContainer}>
                <Text style={styles.planTwelveText}>{text.planTwelveText}</Text>
                <View style={{
                    flexDirection: "row"
                }}>
                    <View style={{ flex: 3, marginTop: fontScale(10) }}>
                        {
                            fstTitleLeft.map((item, index) => <View key={index.toString()}  style={{ marginVertical: fontScale(10) }}>
                                <Text style={{
                                    fontSize: fontScale(13),
                                    fontWeight: "bold",
                                    color: colors.grey,
                                    marginLeft: index == 3 || index == 4 || index == 5 ? fontScale(20) : fontScale(5)
                                }}>{item}</Text>
                            </View>)
                        }
                    </View>
                    <View style={{ flex: 1.5, marginTop: fontScale(10) }}>
                        {
                            [
                                "Mức chi",
                                dataPlanSupport.holidayBonusOutcome,
                                "",
                                dataPlanSupport.stLunarOutcome,
                                dataPlanSupport.ndLunarOutcome,
                                dataPlanSupport.rdLunarOutcome,
                                dataPlanSupport.supportMasterOutcome,
                                dataPlanSupport.topEmpOutcome,
                                dataPlanSupport.topShopOutcome,
                                dataPlanSupport.pregnantOutcome,
                                dataPlanSupport.othersOutcome
                            ].map((item, index) => <View key={index.toString()}  style={{ marginVertical: fontScale(10) }}>
                                <Text style={{ fontSize: fontScale(13), color: index == 0 ? colors.darkYellow : colors.lightBlue, textAlign: "center", fontWeight: index == 0 ? "bold" : "normal" }}>{item}</Text>
                            </View>)
                        }
                    </View>

                    <View style={{ flex: 1.5, marginTop: fontScale(10) }}>
                        {
                            [
                                "SLNV",
                                dataPlanSupport.holidayBonusEmpAmount,
                                "",
                                dataPlanSupport.stLunarEmpAmount,
                                dataPlanSupport.ndLunarEmpAmount,
                                dataPlanSupport.rdLunarEmpAmount,
                                dataPlanSupport.supportMasterEmpAmount,
                                dataPlanSupport.topEmpAmount,
                                dataPlanSupport.topShopEmpAmount,
                                dataPlanSupport.pregnantEmpAmount,
                                dataPlanSupport.othersEmpAmount
                            ].map((item, index) => <View key={index.toString()}  style={{ marginVertical: fontScale(10) }}>
                                <Text style={{ fontSize: fontScale(13), color: index == 0 ? colors.darkYellow : colors.lightBlue, textAlign: "center", fontWeight: index == 0 ? "bold" : "normal" }}>{item}</Text>
                            </View>)
                        }
                    </View>
                    <View style={{ flex: 1.5, marginTop: fontScale(10) }}>
                        {
                            [
                                "Số lần",
                                dataPlanSupport.holidayBonusEmpAmount,
                                "",
                                dataPlanSupport.stLunarBonusNumber,
                                dataPlanSupport.ndLunarBonusNumber,
                                dataPlanSupport.rdLunarBonusNumber,
                                dataPlanSupport.supportMasterBonusNumber,
                                dataPlanSupport.topEmpBonusNumber,
                                dataPlanSupport.topShopBonusNumber,
                                dataPlanSupport.pregnantBonusNumber,
                                dataPlanSupport.othersBonusNumber
                            ].map((item, index) => <View  key={index.toString()} style={{ marginVertical: fontScale(10) }}>
                                <Text style={{ fontSize: fontScale(13), color: index == 0 ? colors.darkYellow : colors.lightBlue, textAlign: "center", fontWeight: index == 0 ? "bold" : "normal" }}>{item}</Text>
                            </View>)
                        }
                    </View>
                    <View style={{ flex: 1.5, marginTop: fontScale(10) }}>
                        {
                            [
                                "Tổng tiền",
                                dataPlanSupport.holidayBonusTotal,
                                "",
                                dataPlanSupport.stLunarBonusTotal,
                                dataPlanSupport.ndLunarBonusTotal,
                                dataPlanSupport.rdLunarBonusTotal,
                                dataPlanSupport.supportMasterTotal,
                                dataPlanSupport.topEmpBonusTotal,
                                dataPlanSupport.topShopBonusTotal,
                                dataPlanSupport.pregnantBonusTotal,
                                dataPlanSupport.othersBonusTotal
                            ].map((item, index) => <View  key={index.toString()} style={{ marginVertical: fontScale(10) }}>
                                <Text style={{ fontSize: fontScale(13), color: index == 0 ? colors.darkYellow : colors.lightBlue, textAlign: "center", fontWeight: index == 0 ? "bold" : "normal" }}>{item}</Text>
                            </View>)
                        }
                    </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: fontScale(14), marginTop: fontScale(15), marginLeft: fontScale(5), fontWeight: "bold" }}>Tổng chi hỗ trợ dự kiến:</Text>
                    <Text style={{ fontSize: fontScale(14), marginTop: fontScale(15), marginLeft: fontScale(20), fontWeight: "bold", color: colors.red }}>{dataPlanSupport.expectedOutcomeSupport}</Text>
                </View>
                <Text style={{ fontSize: fontScale(14), marginTop: fontScale(15), marginLeft: fontScale(5), fontWeight: "bold" }}>Thông tin thêm nguồn hỗ trợ đến tháng N-1:</Text>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ marginLeft: fontScale(10) }}>
                        <Text style={{ fontSize: fontScale(14), marginTop: fontScale(15), marginLeft: fontScale(15), fontWeight: "bold" }}>Tổng còn lại:</Text>
                        <Text style={{ fontSize: fontScale(14), marginTop: fontScale(15), marginLeft: fontScale(15), fontWeight: "bold" }}>Tổng đã chi:</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: fontScale(14), marginTop: fontScale(15), marginLeft: fontScale(10), fontWeight: "bold", color: colors.lightBlue }}>{dataPlanSupport.outcomeTotal}</Text>
                        <Text style={{ fontSize: fontScale(14), marginTop: fontScale(15), marginLeft: fontScale(10), fontWeight: "bold", color: colors.lightBlue }}>{dataPlanSupport.remainTotal}</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default index;