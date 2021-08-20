import { useRoute, useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native';
import Toast from 'react-native-toast-message';
import { getDenyByWrongInfo } from '../../../../../api';
import { Body, DatePicker, GeneralListItem, Header, Search, SearchWithPermission, TableHeader } from '../../../../../comps';
import { colors } from '../../../../../utils/Colors';
import { width } from '../../../../../utils/Dimenssion';
import { fontScale } from '../../../../../utils/Fonts';
import { images } from '../../../../../utils/Images';
import { text } from '../../../../../utils/Text';
import { FlatList } from 'react-native';
import { getAllBranch, getAllEmp, getAllShop } from '../../../../../adminapi';

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
    const [branchName, setBranchName] = useState("");
    const [shopName, setShopName] = useState("");
    const [empName, setEmpName] = useState("");
    const [defaultBranchName, setDefaultBranchName] = useState("Chọn chi nhánh")
    const [defaultShopName, setDefaultShopName] = useState("Chọn cửa hàng")
    const [loadingBranch, setLoadingBranch] = useState(false)
    const [loadingShop, setLoadingShop] = useState(false)
    const [branchList, setBranchList] = useState([]);
    const [shopList, setShopList] = useState([])
    const [empList, setEmpList] = useState([])
    const [message, setMessage] = useState('')
    const { key, title } = route.params;

    // navigation.goBack()
    const getData = async (month, branchCode, shopCode, empCode) => {
        console.log(month, branchCode, shopCode, empCode)
        setData([])
        setLoading(true);
        await getDenyByWrongInfo(navigation, month, branchCode, shopCode, empCode).then((res) => {
            setMessage("");
            if (res.status == "success") {
                setData(res.data);
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

    const _onChangeMonth = async (month) => {
        setMonth(month)
        await getData(month, "", "", "", key);
    }

    const getBranchList = async () => {
        await getAllBranch(navigation).then((res) => {
            setBranchList(res.data);
        })
    }

    const _onChangeBranch = async (branchCode) => {
        setBranchCode(branchCode);
        setShopList([])
        await getAllShop(navigation, branchCode).then((res) => {
            if (res.status == "success") {
                setShopList(res.data);
            }
            if (res.status == 'failed') {

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
        console.log(value)
        // setBranchCode(value.branchCode);
        // setDefaultBranchName(value.branchName)
        // setDefaultShopName(value.shopName)
        // setShopCode(value.shopCode);
        // setEmpCode(value.empId);
        await getData(value.month, value.branchCode, value.shopCode, value.empCode, key);
    }

    const _getAllShop=async()=>{
        await getAllShop(navigation, "").then((res) => {
            if (res.status == "success") {
                setShopList(res.data);
                setLoadingShop(false)
            }
            if (res.status == 'failed') {
                setLoadingShop(false)
            }
        });
    }

    const _getAllEmp=async()=>{
        await getAllEmp(navigation, "", "").then((res) => {
            if (res.status == "success") {
                setEmpList(res.data);
            }
            if (res.status == 'failed') {
            }

        })
    }

    useEffect(() => {
        getData(month, "", "", "");
        getBranchList();
        _getAllShop();
        _getAllEmp();
    }, [month])


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
            <Header title={title} />
            {/* <DatePicker month={month} width={width - fontScale(120)} style={{ alignSelf: "center" }} onChangeDate={(date) => _onChangeMonth(date)} /> */}
            {/* <Search
                searchSelectModalFourCondition
                leftIcon={images.teamwork}
                rightIcon={images.arrowdown}
                placeholder={text.search}
                modalTitle={"Vui lòng chọn"}
                loadingBranch={loadingBranch}
                loadingShop={loadingShop}
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
                onPressDataTwo={(item) => _onChangeShop(item.shop_code)}
                onPressDataThree={(item) => _onChangeEmp(item.id)}
                onPress={(value) => _onSearch(value)}
            /> */}
            <SearchWithPermission
                full
                month={month}
                leftIcon={images.teamwork}
                rightIcon={images.searchlist}
                width={width - fontScale(100)}
                placeholder="Tìm kiếm"
                modalTitle="Vui lòng chọn"
                select1LeftContainer="Chọn chi nhánh"
                select2LeftContainer="Chọn cửa hàng"
                select3LeftContainer="Chọn nhân viên"
                select1Width={width - fontScale(30)}
                onDone={(value) => _onSearch(value)}
            />
            <Body style={{marginTop:-fontScale(10)}}/>
            <View style={{ flex: 1, backgroundColor: colors.white, }}>
                <View>
                    <View style={{ flexDirection: "row", marginTop: fontScale(2) }}>
                        <TableHeader style={{ width: (width * 3.9) / 10 }} title={'GDVPTM'} />
                        <TableHeader style={{ width: (width * 2.6) / 10 }} title={'Tên CH'} />
                        <TableHeader style={{ width: (width * 3.2) / 10 }} title={'Số lần chặn'} />
                    </View>
                {loading == true ? <ActivityIndicator size="small" color={colors.primary} style={{marginTop: fontScale(20)}} /> : null}
                    {message ? <Text style={{ color: colors.primary, textAlign: "center", marginTop: fontScale(20), width: width }}>{message}</Text> : null}
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data}
                        style={{ marginTop: message ? 0 : fontScale(10) }}
                        keyExtractor={(item, index) => index.toString()}
                        key={({ item }) => item.empName.toString()}
                        renderItem={({ item, index }) => (
                            <GeneralListItem
                                item={item}
                                index={index}
                                fields={[
                                    item.empName,
                                    item.store,
                                    item.denyAmount
                                ]}
                                style={[
                                    [{ textAlign: "left", marginLeft: fontScale(5), fontSize: fontScale(14), textAlignVertical: "center" }, { width: (width * 3.9) / 10 }],
                                    [{ textAlign: "center", fontSize: fontScale(14), textAlignVertical: "center" }, { width: (width * 2.6) / 10 }],
                                    [{ textAlign: "center", fontSize: fontScale(14), textAlignVertical: "center" }, { width: (width * 3.2) / 10 }],
                                ]}

                            />
                        )}
                    />
                </View>
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />

        </SafeAreaView>
    );
}

export default index;