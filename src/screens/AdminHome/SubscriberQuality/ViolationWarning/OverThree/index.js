import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { SafeAreaView, View } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/core';
import { colors } from '../../../../../utils/Colors';
import { Body, Header, Search, TableHeader } from '../../../../../comps';
import { getAllBranch, getAllEmp, getAllShop, getViolationEmployee } from '../../../../../api';
import { styles } from './style';
import { images } from '../../../../../utils/Images';
import { text } from '../../../../../utils/Text';
import { FlatList } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { fontScale } from '../../../../../utils/Fonts';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';

function index(props) {
    const route = useRoute();
    const { title } = route.params;
    const [loadingBranch, setLoadingBranch] = useState(false);
    const [loadingShop, setLoadingShop] = useState(false)
    const [branchList, setBranchList] = useState([]);
    const [shopList, setShopList] = useState([]);
    const [empList, setEmpList] = useState([]);
    const [branchCode, setBranchCode] = useState("");
    const [shopCode, setShopCode] = useState("");
    const [empCode, setEmpCode] = useState("")
    const [defaultBranchName, setDefaultBranchName] = useState("Chọn chi nhánh")
    const [defaultShopName, setDefaultShopName] = useState("Chọn cửa hàng")
    const [defaultEmpName, setDefaultEmpName] = useState("Chọn giao dịch viên")
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();
    const [message, setMessage] = useState("");
    const [tempData, setTempData] = useState([]);
    const [notification, setNotification] = useState("")

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
        setShopCode(shopCode);
        setEmpList([]);
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


    const getData = async (branchCode, shopCode, empCode) => {
        console.log(branchCode, shopCode, empCode)
        setLoading(true);
        setData([]);
        setTempData([])
        setMessage("")
        await getViolationEmployee(navigation, branchCode, shopCode, empCode).then((res) => {
            setNotification(res.data.notification);
            setLoading(false)
            if (res.message) {
                setMessage(res.message)
            }
            if (res.status == "success") {
                setMessage("");
                if (res.length == 0) {
                    setLoading(res.isLoading);
                    setMessage(text.dataIsNull)
                } else {
                    setData(res.data.data);
                    setLoading(res.isLoading);
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

    const _onSearch = async (branchCode, shopCode, empCode, value) => {
        setDefaultBranchName(value.branchName);
        setDefaultShopName(value.shopName)
        setDefaultEmpName(value.empName)
        await getData(branchCode, shopCode, empCode);
    }

    useEffect(() => {
        getData("", "", "");
        getBranchList();
        _getAllShop();
        _getAllEmp();
        console.log("Home > Chất lượng thuê bao > Cảnh báo vi phạm > GDV vi phạm cả 2 nhóm trên")
    }, [notification])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
            <Header title={title} />
            <Text style={styles.text}>{notification}</Text>
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
                defaultLabelThree={defaultEmpName}
                message={text.dataIsNull}
                searchIndex={1}
                onChangeText={(text) => console.log(text)}
                dataFour={empList}
                onPressDataOne={(item) => _onChangeBranch(item.shopCode)}
                onPressDataTwo={(item) => _onChangeShop(item.shopCode)}
                onPressDataThree={(item) => _onChangeEmp(item.id)}
                onPress={(value) => _onSearch(value.branchCode, value.shopCode, value.empCode, value)}
            />
            <Body />
            <View style={{ flex: 1, backgroundColor: colors.white }}>
                <View style={{ flexDirection: "row", marginTop: -fontScale(10) }}>
                    <TableHeader style={{ flex: 1 }} title={'GDVPTM'} />
                    <TableHeader style={{ flex: 1 }} title={'Tên CH'} />
                </View>
                {loading == true ? <ActivityIndicator size="small" color={colors.primary} style={{ marginTop: fontScale(15) }} /> : null}
                {message ? <Text style={{ color: colors.primary, textAlign: "center", marginTop: fontScale(20) }}>{message}</Text> : null}

                <FlatList
                    style={{ marginTop: fontScale(20) }}
                    keyExtractor={(item, index) => index.toString()}
                    data={tempData}
                    renderItem={({ item, index }) => {
                        return <View>
                            {
                                <View style={{ flexDirection: "row", backgroundColor: index % 2 ? colors.lightGrey : colors.white, paddingVertical: fontScale(8) }}>
                                    <Text style={{ flex: 1, textAlign: "center", fontSize: fontScale(14) }}>{item.empName}</Text>
                                    <Text style={{ flex: 1, textAlign: "center", fontSize: fontScale(14) }}>{item.store}</Text>
                                </View>
                            }

                        </View>
                    }}
                />
            </View>
        </SafeAreaView>
    );
}

export default index;