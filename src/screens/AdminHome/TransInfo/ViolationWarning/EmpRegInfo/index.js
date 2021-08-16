import { useRoute, useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native';
import Toast from 'react-native-toast-message';
import { getTransInfoWarningByType } from '../../../../../api';
import { Body, DatePicker, Header, Search, TableHeader } from '../../../../../comps';
import { colors } from '../../../../../utils/Colors';
import { width } from '../../../../../utils/Dimenssion';
import { fontScale } from '../../../../../utils/Fonts';
import { images } from '../../../../../utils/Images';
import { text } from '../../../../../utils/Text';
import { getAllBranch, getAllEmp, getAllShop } from '../../../../../api';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { Image } from 'react-native';

const index = (props) => {
    const route = useRoute();
    const [month, setMonth] = useState(route.params?.month);
    const [type, setType] = useState(); // type = 1 => menu1 - menu 4
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [branchCode, setBranchCode] = useState("");
    const [shopCode, setShopCode] = useState("");
    const [empCode, setEmpCode] = useState("");
    const [branchList, setBranchList] = useState([]);
    const [shopList, setShopList] = useState([])
    const [empList, setEmpList] = useState([])
    const [loadingBranch, setLoadingBranch] = useState(false)
    const [loadingShop, setLoadingShop] = useState(false)
    const [message, setMessage] = useState("");
    const [defaultBranchName,setDefaultBranchName] = useState("Chọn chi nhánh")
    const [defaultShopName,setDefaultShopName] = useState("Chọn cửa hàng")
    const { key, title } = route.params;

    // navigation.goBack()
    const getData = async (month, branchCode, shopCode, empCode, type) => {
        setLoading(true);
        setData([]);
        setMessage("");
        console.log(month, branchCode, shopCode, empCode, type)
        await getTransInfoWarningByType(navigation, month, branchCode, shopCode, empCode, type).then((res) => {
            if (res.status == "success") {
                setMessage("");
                if (res.length == 0) {
                    setLoading(res.isLoading);
                    setMessage(text.dataIsNull)
                } else {
                    setData(res.data);
                    setLoading(res.isLoading);
                }
            }
            if (res.status == "failed") {
                setLoading(res.isLoading);
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

    const _onChangeMonth = async (month) => {
        setMonth(month)
        await _onSearch(month, branchCode, shopCode, empCode,"");
    }

    const getBranchList = async () => {
        setLoadingBranch(true)
        await getAllBranch(navigation).then((res) => {
            if (res.status == "success") {
                setBranchList(res.data);
                setLoadingBranch(false)
            }
            if (res.status == 'failed') {
                setLoadingBranch(false)
            }

        })
    }

    const _onChangeBranch = async (branchCode) => {
        setBranchCode(branchCode);
        setShopList([]);
        setLoadingShop(true)
        await getAllShop(navigation, branchCode).then((res) => {
            if (res.status == "success") {
                setShopList(res.data);
                setLoadingShop(false)
            }
            if (res.status == 'failed') {
                setLoadingShop(false)
            }
        });
    }

    const _onChangeShop = async (shopCode) => {
        setShopCode(shopCode)
        await getAllEmp(navigation, branchCode, shopCode).then((res) => {
            if (res.status == "success") {
                setEmpList(res.data);
            }
            if (res.status == 'failed') {
            }

        })
    }

    const _onChangeEmp = (empId) => {
        setEmpCode(empId)
    }

    const _onSearch = async (month, branchCode, shopCode, empCode,value) => {
        console.log(value)

        setBranchCode(branchCode);
        setDefaultBranchName(value.branchName)
        setShopCode(shopCode);
        setDefaultShopName(value.shopName)
        setEmpCode(empCode);
        setMonth(month)
        await getData(month, branchCode, shopCode, empCode, key);

    }

    useEffect(() => {
        console.log('Home > Thong tin giao dich > Canh bao vi pham > GDV DKTT')
        getData(month, "", "", "", key);
        getBranchList();
        if (branchList.length == 0 && shopList.length == 0) {
            getAllEmp(navigation, "","")
        }
    }, [month])


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
            <Header title={title} />
            <DatePicker month={month} width={width - fontScale(120)} style={{ alignSelf: "center" }} onChangeDate={(date) => _onChangeMonth(date)} />
            <Search
                loadingBranch={loadingBranch}
                keyboardType="number-pad"
                loadingShop={loadingShop}
                searchSelectModalFourCondition
                leftIcon={images.teamwork}
                rightIcon={images.arrowdown}
                placeholder={text.search}
                modalTitle={"Vui lòng chọn"}
                dataOne={branchList}
                dataTwo={shopList}
                dataThree={empList}
                defaultLabelOne={defaultBranchName}
                defaultLabelTwo={defaultShopName}
                message={text.dataIsNull}
                searchIndex={1}
                onChangeText={(text) => console.log(text)}
                dataFour={empList}
                onPressDataOne={(item) => _onChangeBranch(item.shopCode)}
                onPressDataTwo={(item) => _onChangeShop(item.shopCode)}
                onPressDataThree={(item) => _onChangeEmp(item.id)}
                onPress={(value) => _onSearch(month, value.branchCode, value.shopCode, value.empCode,value)}
            />
            <Body />
            <View style={{ flex: 1, backgroundColor: colors.white, }}>
                <View style={{ marginTop: -fontScale(30) }}>
                    <View style={{ flexDirection: "row", marginTop: fontScale(20) }}>
                        <TableHeader style={{ flex: 2.1, marginLeft: -fontScale(5) }} title={'GDVPTM'} />
                        <TableHeader style={{ flex: 1.3,marginLeft:fontScale(20)}} title={'Tên CH'} />
                        <TableHeader style={{ flex: 1.5,marginLeft:fontScale(10) }} title={'SLTB/tháng'} />
                        <TableHeader style={{ flex: 1.5 }} title={'Top/ngày'} />
                    </View>
                    {message ? <Text style={{ color: colors.primary, textAlign: "center", marginTop: fontScale(20), width: width }}>{message}</Text> : null}
                    {loading == true ? <ActivityIndicator size="small" color={colors.primary} style={{ marginTop: fontScale(20) }} /> : null}
                    <FlatList
                        style={{ marginTop: fontScale(20) }}
                        keyExtractor={(item, index) => item.empCode.toString()}
                        data={data}
                        renderItem={({ item, index }) => {
                            return <View>
                                {
                                    item.detail == "true" ?
                                        <TouchableOpacity style={{ flexDirection: "row", backgroundColor: index % 2 ? colors.lightGrey : colors.white, paddingVertical: fontScale(8) }}
                                            onPress={() =>
                                                navigation.navigate("AdminEmpRegInfoDetail", { "key": key, "empCode": item.empCode, "title": title, "store": item.store, "month": month })
                                            }>
                                            <Text style={{ flex: 1.5, textAlign: "left", fontSize: fontScale(14), marginLeft: fontScale(5) }}>{item.empName}</Text>
                                            <Text style={{ flex: 1, textAlign: "left", paddingLeft: fontScale(15), fontSize: fontScale(14) }}>{item.store}</Text>
                                            <Text style={{ flex: 1, textAlign: "center", fontSize: fontScale(14) }}>{item.subAmount}</Text>
                                            <Text style={{ flex: 1, textAlign: "center", fontSize: fontScale(14) }}>{item.topPerDay}</Text>
                                            <Image key={item.empCode} source={images.eye} style={{ tintColor: colors.grey, width: fontScale(20), height: fontScale(17), position: "absolute", right: fontScale(2), top: fontScale(8) }} resizeMode="cover" />
                                        </TouchableOpacity>
                                        :
                                        <View style={{ flexDirection: "row" }}>

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