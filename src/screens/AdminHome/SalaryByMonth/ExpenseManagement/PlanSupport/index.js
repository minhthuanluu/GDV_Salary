import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { ScrollView, Text } from 'react-native';
import { SafeAreaView, View } from 'react-native';
import { getOutcomeSupport } from '../../../../../api';
import { Body, Header, YearPicker } from '../../../../../comps';
import { colors } from '../../../../../utils/Colors';
import { width } from '../../../../../utils/Dimenssion';
import { fontScale } from '../../../../../utils/Fonts';
import { text } from '../../../../../utils/Text';
import { dataPlanSupport as data, dataPlanSupport } from './db';
import { styles } from './style';
import { useRoute, useNavigation } from '@react-navigation/core';
import Toast from 'react-native-toast-message';

const index = (props) => {
    const [year, setYear] = useState(moment(new Date()).format('YYYY'));
    const fstTitleLeft = ["", "Thưởng 5 lễ", "Thưởng tết ÂL", "Mức 1", "Mức 2", "Mức 3", "Hỗ trợ CHT", "GDV top", "CH top", "Nghỉ lúc có thai", "Khác"]
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigation = useNavigation();
    const [data, setData] = useState(dataPlanSupport)

    const onChangeYear = async (year) => {
        setYear(year);
        await getData(year);
    }

    const getData = async (year) => {
        setLoading(true)
        await getOutcomeSupport(navigation, year).then((res) => {
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
        })
    }

    useEffect(() => {
        getData(year);
    }, [year])

    const column1 = ["Mức chi", data.holidayBonusOutcome, "", data.stLunarOutcome, data.ndLunarOutcome, data.rdLunarOutcome, data.supportMasterOutcome, data.topEmpOutcome, data.topShopOutcome, data.pregnantOutcome, data.othersOutcome]
    const column2 = ["SLNV", data.holidayBonusEmpAmount, "", data.stLunarEmpAmount, data.ndLunarEmpAmount, data.rdLunarEmpAmount, data.supportMasterEmpAmount, data.topEmpAmount, data.topShopEmpAmount, data.pregnantEmpAmount, data.othersEmpAmount]
    const column3 = ["Số lần", data.holidayBonusNumber, "", data.stLunarBonusNumber, data.ndLunarBonusNumber, data.rdLunarBonusNumber, data.supportMasterBonusNumber, data.topEmpBonusNumber, data.topShopBonusNumber, data.pregnantBonusNumber, data.othersBonusNumber]
    const column4 = ["Tổng tiền", data.holidayBonusTotal, "", data.stLunarBonusTotal, data.ndLunarBonusTotal, data.rdLunarBonusTotal, data.supportMasterTotal, data.topEmpBonusTotal, data.topShopBonusTotal, data.pregnantBonusTotal, data.othersBonusTotal]
    return (
        <SafeAreaView style={styles.container}>
            <Header title={text.outcomePlanSupport} />
            <YearPicker defaultYear={year} width={width - fontScale(100)} onPress={(value) => onChangeYear(value)} style={{ alignSelf: "center" }} />
            {/* <Body /> */}
            <View style={styles.subContainer}>
                <ScrollView showsVerticalScrollIndicator={false} style={{paddingTop:fontScale(15),paddingHorizontal:fontScale(5)}}>
                    <View style={{
                        flex:1,
                        paddingHorizontal: fontScale(10),
                        marginHorizontal:fontScale(3),
                        paddingBottom: fontScale(15),
                        marginBottom:fontScale(10),
                        marginTop:fontScale(20),
                        zIndex:100,
                        borderRadius: fontScale(17),
                        shadowColor: "#000",
                        backgroundColor: colors.white,
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5
                    }}>
                        <Text style={styles.planTwelveText}>{text.planTwelveText}</Text>
                        <Text style={{ fontSize: fontScale(12), textAlign: "center", fontWeight: "bold", color: "#686565", opacity: 0.59, marginBottom: fontScale(10), marginTop: fontScale(5) }}>{"(Đơn vị tính: triệu đồng)"}</Text>
                        {loading == true ? <ActivityIndicator size="small" color={colors.primary} style={{ marginVertical: fontScale(10) }} /> : null}
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ marginTop: fontScale(10), width: 1 / 3.8 * width }}>
                                {fstTitleLeft.map((item, index) => <LeftColumn item={item} index={index} />)}
                            </View>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <View style={{ flexDirection: "row", width: 2 / 3 * width }}>
                                    <View style={{ flex: 1.3 }}>
                                        {column1.map((item, index) => <Column item={item} index={index} />)}
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        {column2.map((item, index) => <Column item={item} index={index} />)}
                                    </View>
                                    <View style={{ flex: 0.8 }}>
                                        {column3.map((item, index) => <Column item={item} index={index} />)}
                                    </View>
                                    <View style={{ flex: 1.8 }}>
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
                </ScrollView>
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />
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