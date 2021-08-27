import moment from 'moment';
import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { SafeAreaView, View } from 'react-native';
import { Body, Header, YearPicker } from '../../../../../comps';
import { colors } from '../../../../../utils/Colors';
import { width } from '../../../../../utils/Dimenssion';
import { fontScale } from '../../../../../utils/Fonts';
import { text } from '../../../../../utils/Text';
import { dataPlanSupport as data } from './db';
import { styles } from './style';

const index = (props) => {
    const [year, setYear] = useState(moment(new Date()).format('YYYY'));
    const fstTitleLeft = ["", "Thưởng 5 lễ", "Thưởng tết ÂL", "Mức 1", "Mức 2", "Mức 3", "Hỗ trợ CHT", "GDV top", "CH top", "Nghỉ lúc có thai", "Khác"]

    const onChangeYear = (year) => {
        setYear(year);
    }

    const column1 = ["Mức chi", data.holidayBonusOutcome, "", data.stLunarOutcome, data.ndLunarOutcome, data.rdLunarOutcome, data.supportMasterOutcome, data.topEmpOutcome, data.topShopOutcome, data.pregnantOutcome, data.othersOutcome]
    const column2 = ["SLNV", data.holidayBonusEmpAmount, "", data.stLunarEmpAmount, data.ndLunarEmpAmount, data.rdLunarEmpAmount, data.supportMasterEmpAmount, data.topEmpAmount, data.topShopEmpAmount, data.pregnantEmpAmount, data.othersEmpAmount]
    const column3 = ["Số lần", data.holidayBonusNumber, "", data.stLunarBonusNumber, data.ndLunarBonusNumber, data.rdLunarBonusNumber, data.supportMasterBonusNumber, data.topEmpBonusNumber, data.topShopBonusNumber, data.pregnantBonusNumber, data.othersBonusNumber]
    const column4 = ["Tổng tiền", data.holidayBonusTotal, "", data.stLunarBonusTotal, data.ndLunarBonusTotal, data.rdLunarBonusTotal, data.supportMasterTotal, data.topEmpBonusTotal, data.topShopBonusTotal, data.pregnantBonusTotal, data.othersBonusTotal]
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
                    <View style={{ marginTop: fontScale(10), width: 1 / 3.8 * width }}>
                        {
                            fstTitleLeft.map((item, index) => <LeftColumn item={item} index={index} />)
                        }
                    </View>
                    <ScrollView horizontal>
                        <View style={{ flexDirection: "row", width: 2 / 3 * width }}>
                            <View style={{ flex: 1.5, marginTop: fontScale(10) }}>
                                {column1.map((item, index) => <Column item={item} index={index} />)}
                            </View>
                            <View style={{ flex: 1.5, marginTop: fontScale(10) }}>
                                {column2.map((item, index) => <Column item={item} index={index} />)}
                            </View>
                            <View style={{ flex: 1.5, marginTop: fontScale(10) }}>
                                {column3.map((item, index) => <Column item={item} index={index} />)}
                            </View>
                            <View style={{ flex: 1.5, marginTop: fontScale(10) }}>
                                {column4.map((item, index) => <Column item={item} index={index} />)}
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.subTitle}>{text.expectedOutcomeSupport}:</Text>
                    <Text style={styles.expectOutcome}>{data.expectedOutcomeSupport}</Text>
                </View>
                <Text style={styles.subTitle}>{text.extendedInfo}:</Text>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ marginLeft: fontScale(10) }}>
                        <Text style={styles.subTitleLeft}>{text.totalRemain}:</Text>
                        <Text style={styles.subTitleLeft}>{text.totalOutcomed}:</Text>
                    </View>
                    <View>
                        <Text style={styles.subContentLeft}>{data.outcomeTotal}</Text>
                        <Text style={styles.subContentLeft}>{data.remainTotal}</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const LeftColumn = ({ item, index }) => {
    return (
        <View style={{ marginVertical: fontScale(10) }}>
            <Text
                key={index + ''}
                style={{
                    fontSize: fontScale(13),
                    fontWeight: "bold",
                    color: colors.grey,
                    marginLeft: index == 3 || index == 4 || index == 5 ? fontScale(20) : fontScale(5)
                }}>{item}</Text>
        </View>
    )
}

const Column = ({ item, index }) => {
    return (
        <View style={{ marginVertical: fontScale(10) }}>
            <Text key={index.toString()} style={{ fontSize: fontScale(13), color: index == 0 ? colors.darkYellow : colors.lightBlue, textAlign: "center", fontWeight: index == 0 ? "bold" : "normal" }}>{item}</Text>
        </View>
    )
}
export default index;