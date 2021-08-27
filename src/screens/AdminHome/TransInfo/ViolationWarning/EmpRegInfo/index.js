import { useRoute, useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native';
import Toast from 'react-native-toast-message';
import { getTransInfoWarningByType } from '../../../../../api';
import { Body, Header, SearchWithPermission, TableHeader } from '../../../../../comps';
import { colors } from '../../../../../utils/Colors';
import { width } from '../../../../../utils/Dimenssion';
import { fontScale } from '../../../../../utils/Fonts';
import { images } from '../../../../../utils/Images';
import { text } from '../../../../../utils/Text';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { Image } from 'react-native';

const index = () => {
    const route = useRoute();
    const [month, setMonth] = useState(route.params?.month);
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const { key, title } = route.params;

    const getData = async (month, branchCode, shopCode, empCode, type) => {
        setLoading(true);
        setData([]);
        setMessage("");
        await getTransInfoWarningByType(navigation, month, branchCode, shopCode, empCode, type).then((res) => {
            if (res.status == "success") {
                setMessage("");
                if (res.length == 0 || res.data == null) {
                    setLoading(res.isLoading);
                    setMessage(text.dataIsNull)
                } else {
                    setData(res.data);
                    setLoading(res.isLoading);
                }
            }
            if (res.status == "") {
                setLoading(false);
                setMessage(text.dataIsNull)
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

    const _onSearch = async (value) => {
        setMonth(value.month)
        await getData(value.month, value.branchCode, value.shopCode, value.empCode, key);
    }


    useEffect(() => {
        console.log('Home > Thong tin giao dich > Canh bao vi pham > GDV DKTT')
        getData(month, "", "", "", key);
    }, [month])


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
            <Header title={title} />
            <SearchWithPermission
                full
                leftIcon={images.teamwork}
                rightIcon={images.searchlist}
                width={width - fontScale(50)}
                style={{ marginTop: fontScale(10) }}
                month={month}
                placeholder="Tìm kiếm"
                modalTitle={text.select}
                select1LeftContainer={text.chooseBranch}
                select2LeftContainer={text.chooseShop}
                select3LeftContainer={text.chooseEmp}
                select1Width={width - fontScale(30)}
                onDone={(value) => _onSearch(value)}
            />
            <Body style={{ marginTop: -fontScale(10) }} />
            <View style={{ flex: 1, backgroundColor: colors.white, }}>
                <View style={{ marginTop: -fontScale(30) }}>
                    <View style={{ flexDirection: "row", marginTop: fontScale(20) }}>
                        <TableHeader style={{ flex: 2.1, marginLeft: -fontScale(5) }} title={'GDVPTM'} />
                        <TableHeader style={{ flex: 1.3, marginLeft: fontScale(20) }} title={'Tên CH'} />
                        <TableHeader style={{ flex: 1.5, marginLeft: fontScale(10) }} title={'SLTB/tháng'} />
                        <TableHeader style={{ flex: 1.5 }} title={'Top/ngày'} />
                    </View>
                    {message ? <Text style={{ fontSize: fontScale(15), color: colors.primary, textAlign: "center", marginTop: fontScale(20), width: width }}>{message}</Text> : null}
                    {loading == true ? <ActivityIndicator size="small" color={colors.primary} style={{ marginTop: fontScale(20) }} /> : null}
                    <FlatList
                        style={{ marginTop: fontScale(20), marginBottom: fontScale(35) }}
                        keyExtractor={(item, index) => item.empCode.toString()}
                        showsVerticalScrollIndicator={false}
                        data={data}
                        renderItem={({ item, index }) => {
                            return <View>
                                {
                                    item.detail == "true" ?
                                        <TouchableOpacity style={{ flexDirection: "row", backgroundColor: index % 2 ? colors.lightGrey : colors.white, paddingVertical: fontScale(8) }}
                                            onPress={() => navigation.navigate("AdminEmpRegInfoDetail", { "key": key, "empCode": item.empCode, "title": title, "store": item.store, "month": month })}>
                                            <Text style={{ flex: 1.5, textAlign: "left", fontSize: fontScale(14), marginLeft: fontScale(5) }}>{item.empName}</Text>
                                            <Text style={{ flex: 1, textAlign: "left", paddingLeft: fontScale(15), fontSize: fontScale(14) }}>{item.store}</Text>
                                            <Text style={{ flex: 1, textAlign: "center", fontSize: fontScale(14) }}>{item.subAmount}</Text>
                                            <Text style={{ flex: 1, textAlign: "center", fontSize: fontScale(14) }}>{item.topPerDay}</Text>
                                            <Image key={item.empCode} source={images.eye} style={{ tintColor: colors.grey, width: fontScale(20), height: fontScale(17), position: "absolute", right: fontScale(2), top: fontScale(8) }} resizeMode="cover" />
                                        </TouchableOpacity>
                                        :
                                        <View style={{ flexDirection: "row", backgroundColor: index % 2 ? colors.lightGrey : colors.white, paddingVertical: fontScale(8) }}>
                                            <Text style={{ flex: 1.5, textAlign: "left", fontSize: fontScale(14), marginLeft: fontScale(5) }}>{item.empName}</Text>
                                            <Text style={{ flex: 1, textAlign: "left", paddingLeft: fontScale(15), fontSize: fontScale(14) }}>{item.store}</Text>
                                            <Text style={{ flex: 1, textAlign: "center", fontSize: fontScale(14) }}>{item.subAmount}</Text>
                                            <Text style={{ flex: 1, textAlign: "center", fontSize: fontScale(14) }}>{item.topPerDay}</Text>
                                        </View>
                                }
                            </View>
                        }}
                    />
                </View>
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaView>
    );
}

export default index;