import { useRoute, useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native';
import Toast from 'react-native-toast-message';
import { getDetailTransInfoWarningByType } from '../../../../../../api';
import { Body, DatePicker, Header, Search, Table } from '../../../../../../comps';
import { colors } from '../../../../../../utils/Colors';
import { width } from '../../../../../../utils/Dimenssion';
import { fontScale } from '../../../../../../utils/Fonts';
import { images } from '../../../../../../utils/Images';
import { text } from '../../../../../../utils/Text';

const index = (props) => {
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
        await getDetailTransInfoWarningByType(navigation, month, empCode, type).then((res) => {
            if (res.status == "success") {
                if (res.length > 0) {
                    setData(res.data.data);
                    setTempData(res.data.data)
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
            }
            if (res.status == "v_error") {
                setLoading(res.isLoading);

            }

        })
    }

    useEffect(() => {
        const { key, empCode, title, store } = route.params;
        getData(month, empCode, key);
    }, [month]);

    const _onChangeMonth = async (value) => {
        setMonth(value)
        await getData(value, empCode, key);

    }

    const searchSub = (text = "") => {
        setMessage("")
        tempData.concat(tempData)
        const newData = tempData.filter((item) => {
            const itemData = `${item.phoneNumber}`;
            return itemData.indexOf(text) > -1;
        });
        setTempData(newData);
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
            <ActivityIndicator size="small" color={colors.primary} />
            <Body />
            <View style={{ flex: 1, backgroundColor: colors.white }}>
                {
                    loading == true
                        ?
                        <ActivityIndicator size="small" color={colors.primary} />
                        :
                        <View>
                            <View style={{ justifyContent: "center", flexDirection: "row" }}>
                                <Text>GDV: </Text>
                                <Text>{empName}</Text>
                            </View>
                            <View style={{ marginBottom: fontScale(20), marginTop: -fontScale(30) }}>
                                <Table
                                    data={tempData}
                                    message={message}
                                    table
                                    numColumn={2}
                                    headers={[
                                        "Ngày TH",
                                        "Số đt"
                                    ]}
                                    headersTextColor={"#00BECC"}
                                    headerStyle={{ text: { size: fontScale(14) } }}
                                    widthArray={[
                                        width / 2,
                                        width / 2
                                    ]}
                                    firstColCenter
                                    fields={data.map((item) => [
                                        item.date,
                                        item.phoneNumber
                                    ])}
                                    loading={loading}
                                    fontWeight={["normal"]}
                                    style={{ marginTop: fontScale(50),marginBottom:fontScale(30) }}
                                    textAlign="center"

                                    textColor={data.map((item, index) =>
                                        item.shopType == "BRANCH"
                                            ? "#000"
                                            : item.shopType == "SHOP"
                                                ? "#D19E01"
                                                : "#000"
                                    )}
                                    rowBg={data.map((item, index) =>
                                        index % 2 == 0 ? colors.white : colors.lightGrey
                                    )}
                                />
                            </View>
                        </View>}
                {/* {loading == false ? <View style={{ justifyContent: "center", flexDirection: "row" }}>
                    <Text>GDV: </Text>
                    <Text>{empName}</Text>
                </View> : null} */}

            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />

        </SafeAreaView>
    );
}

export default index;