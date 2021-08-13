import { useRoute, useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native';
import Toast from 'react-native-toast-message';
import { getTransInfoWarningByType } from '../../../../../api';
import { Body, DatePicker, Header, Search, Table } from '../../../../../comps';
import { colors } from '../../../../../utils/Colors';
import { width } from '../../../../../utils/Dimenssion';
import { fontScale } from '../../../../../utils/Fonts';
import { images } from '../../../../../utils/Images';
import { text } from '../../../../../utils/Text';
import { getAllBranch, getAllEmp,getAllShop } from '../../../../../api';

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
    const [message, setMessage] = useState('')
    const { key, title } = route.params;

    // navigation.goBack()
    const getData = async (month, branchCode, shopCode, empCode, type) => {
        setLoading(true);
        setData([]);
        setMessage("")
        await getTransInfoWarningByType(navigation, month, branchCode, shopCode, empCode, type).then((res) => {
            if (res.status == "success") {
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
                    text2: data.message,
                    type: "error",
                    visibilityTime: 1000,
                    autoHide: true,
                    onHide: () => navigation.goBack()
                })
            }

        })
    }

    const _onChangeMonth = async (month) => {
        await getData(month, "", "", "", key);
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
        await getAllShop(navigation,branchCode).then((res) => {
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

    const _onSearch = async (value) => {
        setBranchCode(value.branchCode);
        setShopCode(value.shopCode);
        setEmpCode(value.empId);
        await getData(month, value.branchCode, value.shopCode, value.empId, key);

    }

    useEffect(() => {
        console.log('Home > Thong tin giao dich > Canh bao vi pham > GDV DKTT')
        getData(month, "", "", "", key);
        getBranchList()
    }, [month])


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
            <Header title={title} />
            <DatePicker month={month} width={width - fontScale(120)} style={{ alignSelf: "center" }} onChangeDate={(date) => _onChangeMonth(date)} />
            <Search
                loadingBranch={loadingBranch}
                loadingShop={loadingShop}
                searchSelectModalFourCondition
                leftIcon={images.teamwork}
                rightIcon={images.arrowdown}
                placeholder={text.search}
                modalTitle={"Vui lòng chọn"}
                dataOne={branchList}
                dataTwo={shopList}
                dataThree={empList}
                message={text.dataIsNull}
                searchIndex={1}
                onChangeText={(text) => console.log(text)}
                dataFour={empList}
                onPressDataOne={(item) => _onChangeBranch(item.shopCode)}
                onPressDataTwo={(item) => _onChangeShop(item.shop_code)}
                onPressDataThree={(item) => _onChangeEmp(item.id)}
                onPress={(value) => _onSearch(value)}
            />
            <Body />
            <View style={{ flex: 1, backgroundColor: colors.white, }}>
                {loading == true ? <ActivityIndicator size="small" color={colors.primary} /> : null}
                <View style={{ marginTop: -fontScale(30) }}>
                    <Table
                        data={data}
                        table
                        numColumn={4}
                        message={message && message}
                        headers={[
                            "GDVPTM",
                            "Tên CH",
                            "SLTB/tháng",
                            "Top/ngày"
                        ]}
                        headersTextColor={"#00BECC"}
                        headerStyle={{ icon: { size: 15 }, text: { size: fontScale(14) } }}
                        headerMarginLeft={-fontScale(5)}
                        widthArray={[
                            width / 3,
                            width / 4.5,
                            width / 1 / 5,
                            width / 1 / 6
                        ]}
                        fields={data.map((item) => [
                            item.empName,
                            item.store,
                            item.subAmount,
                            item.topPerDay
                        ])}
                        loading={loading}
                        lastIcon={images.check}
                        fontWeight={["normal"]}
                        style={{ marginTop: fontScale(30) }}
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
                        lastIcon={data.map((item, index) => item.detail == "true" ? images.eye : null)}
                        lastIconStyle={{ tintColor: colors.grey }}
                        onPress={(item) => item.detail == "true" ? navigation.navigate("AdminEmpRegInfoDetail", { "key": key, "empCode": item.empCode, "title": title,"store": item.store, "month": month }) : null}
                    />
                </View>
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />

        </SafeAreaView>
    );
}

export default index;