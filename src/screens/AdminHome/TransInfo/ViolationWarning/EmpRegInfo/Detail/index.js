import { useRoute, useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native';
import Toast from 'react-native-toast-message';
import { getDetailTransInfoWarningByType } from '../../../../../../api';
import { Body, DatePicker, Header, Search, TableHeader } from '../../../../../../comps';
import { colors } from '../../../../../../utils/Colors';
import { width } from '../../../../../../utils/Dimenssion';
import { fontScale } from '../../../../../../utils/Fonts';
import { images } from '../../../../../../utils/Images';
import { text } from '../../../../../../utils/Text';
import { FlatList } from 'react-native';

const index = () => {
    const route = useRoute();
    const [month, setMonth] = useState(route.params?.month);
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [tempData, setTempData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [empName, setEmpName] = useState("");
    const [message, setMessage] = useState("")
    const { key, empCode, title, store } = route.params;

    const getData = async (month, empCode, type) => {
        setLoading(true)
        setMessage("")
        setData([]);
        setTempData([]);
        await getDetailTransInfoWarningByType(navigation, month, empCode, type).then((res) => {
            if (res.status == "success") {
                if (res.length > 0) {
                    setData(res.data.data);
                    setTempData(res.data.data);
                    setEmpName(res.data.empName)
                    setLoading(res.isLoading);

                } else {
                    setData([]),
                        setMessage(res.message),
                        setLoading(res.isLoading)
                }
            }
            if (res.status == "failed") {
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
        const { key, empCode } = route.params;
        getData(month, empCode, key);
        console.log(key)
    }, [month]);

    const _onChangeMonth = async (value) => {
        setMonth(value);
        await getData(value, empCode, key);

    }

    const searchSub = (text = "") => {
        setMessage("")
        tempData.concat(tempData)
        const newData = tempData.filter((item) => {
            const itemData = item.phoneNumber;
            return itemData.indexOf(text) > -1;
        });
        if (text.length > 0) {
            if (newData.length == 0) {
                setLoading(false);
                setMessage("Không tìm thấy số thuê bao");
                setTempData([]);
            } else {
                setLoading(false);
                setMessage("");
                setTempData(newData);
            }
        } else {
            setTempData(data);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
            <Header title={title} />
            <DatePicker month={month} width={width - fontScale(120)} style={{ alignSelf: "center" }} onChangeDate={(date) => _onChangeMonth(date)} />
            <Search
                style={{ alignSelf: "center", marginTop: fontScale(10) }}
                leftIcon={images.simlist}
                data={tempData}
                rightIcon={images.searchlist}
                dataNotFoundText="Không tìm thấy dữ liệu"
                onChangeText={(value) => searchSub(value)}
                placeholder={text.searchSub}
                keyboardType="number-pad"
                width={width - fontScale(120)}
                placeHolder="Nhập số thuê bao"
            />
            <Body />
            <View style={{ flex: 1, backgroundColor: colors.white }}>
                {
                    loading == true
                        ?
                        <ActivityIndicator size="small" color={colors.primary} />
                        :
                        <View>
                            <View style={{ justifyContent: "center", flexDirection: "row" }}>
                                <Text style={{ color: colors.black, fontSize: fontScale(15) }}>GDV: </Text>
                                <Text style={{ color: colors.darkYellow, fontSize: fontScale(15) }}>{empName}</Text>
                            </View>
                            <View style={{ marginBottom: fontScale(20), marginTop: fontScale(10) }}>
                                {key == "noRecharge" ?
                                    <View style={{ flexDirection: "row", marginTop: fontScale(20) }}>
                                        <TableHeader style={{ flex: 1, textAlign: "center" }} title={'Ngày TH'} />
                                        <TableHeader style={{ flex: 1, marginLeft: fontScale(20) }} title={'Số ĐT'} />
                                        <TableHeader style={{ flex: 1, marginLeft: fontScale(10) }} title={'Tổng tiền'} />
                                        <TableHeader style={{ flex: 1 }} title={'Ngày nạp'} />
                                    </View>
                                    :
                                    <View style={{ flexDirection: "row", marginTop: fontScale(20) }}>
                                        <TableHeader style={{ width: width / 2 }} title={'Ngày TH'} />
                                        <TableHeader style={{ width: width / 2 }} title={'Số ĐT'} />
                                    </View>
                                }
                                {message ? <Text style={{ fontSize: fontScale(15), color: colors.primary, textAlign: "center", marginTop: fontScale(20), width: width }}>{message}</Text> : null}
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    style={{ marginTop: fontScale(20) }}
                                    keyExtractor={(item, index) => index.toString()}
                                    data={tempData}
                                    renderItem={({ item, index }) => {
                                        return key == "noRecharge" ?
                                            <View style={{ flexDirection: "row", backgroundColor: index % 2 ? colors.lightGrey : colors.white, paddingVertical: fontScale(8) }}>
                                                <Text style={{ flex: 1, textAlign: "center", fontSize: fontScale(14) }}>{item.date}</Text>
                                                <Text style={{ flex: 1, textAlign: "center", paddingLeft: fontScale(15), fontSize: fontScale(14) }}>{item.phoneNumber}</Text>
                                                <Text style={{ flex: 1, textAlign: "center", fontSize: fontScale(14) }}>{item.totalMoney}</Text>
                                                <Text style={{ flex: 1, textAlign: "center", fontSize: fontScale(14) }}>{item.rechargeDate}</Text>
                                            </View>
                                            :
                                            <View style={{ marginBottom: index == data.length - 1 ? fontScale(100) : 0, flexDirection: "row", backgroundColor: index % 2 ? colors.lightGrey : colors.white, paddingVertical: fontScale(8) }}>
                                                <Text style={{ flex: 1, textAlign: "center", fontSize: fontScale(14) }}>{item.date}</Text>
                                                <Text style={{ flex: 1, textAlign: "center", fontSize: fontScale(14) }}>{item.phoneNumber}</Text>
                                            </View>
                                    }}
                                />
                            </View>
                        </View>}

            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />

        </SafeAreaView>
    );
}

export default index;