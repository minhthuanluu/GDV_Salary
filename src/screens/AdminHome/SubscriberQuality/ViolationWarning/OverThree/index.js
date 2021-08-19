import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { SafeAreaView,View } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/core';
import { colors } from '../../../../../utils/Colors';
import { Body, Header, Search, TableHeader } from '../../../../../comps';
import { getAllBranch,getAllEmp, getAllShop, getViolationEmployee } from '../../../../../api';
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
    const [notification, setNotification] = useState('');
    const [loadingShop, setLoadingShop] = useState(false)
    const [branchList, setBranchList] = useState([]);
    const [shopList, setShopList] = useState([]);
    const [empList, setEmpList] = useState([]);
    const [branchCode, setBranchCode] = useState("");
    const [shopCode, setShopCode] = useState("");
    const [empCode, setEmpCode] = useState("")
    const [defaultBranchName, setDefaultBranchName] = useState("Chọn chi nhánh")
    const [defaultShopName, setDefaultShopName] = useState("Chọn cửa hàng")
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();
    const [message, setMessage] = useState("");

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
        setShopCode(shopCode);
        setEmpList([]);
        console.log(branchCode + ' - ' + shopCode)
        await getAllEmp(navigation, branchCode, shopCode).then((res) => {
            if (res.status == "success") {
                setEmpList(res.data);
                console.log(res.data)
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
        setMessage("")
        await getViolationEmployee(navigation, branchCode, shopCode, empCode).then((res) => {
            setNotification(res.data.notification);
            setLoading(false)
            if(res.message){
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
        await getData(branchCode, shopCode, empCode);
    }

    useEffect(() => {
        getData("", "", "");
        getBranchList();
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
                <View style={{ flexDirection: "row", marginTop: fontScale(20) }}>
                    <TableHeader style={{ flex: 1.8, marginLeft: -fontScale(15) }} title={'GDVPTM'} />
                    <TableHeader style={{ flex: 1.7, marginLeft: fontScale(15) }} title={'Tên CH'} />
                    <TableHeader style={{ flex: 1.5, marginLeft: fontScale(5) }} title={'TB/tháng'} />
                    <TableHeader style={{ flex: 1.5 }} title={'TB/tập'} />
                </View>
                {loading == true ? <ActivityIndicator size="small" color={colors.primary} style={{ marginTop: fontScale(15) }} /> : null}
                {message ? <Text style={{color:colors.primary,textAlign:"center",marginTop:fontScale(20)}}>{message}</Text> : null}
                
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
                                            navigation.navigate("AdminViolateFastSubDetail", { "empCode": item.empCode, "title": title })
                                        }>
                                        <Text style={{ flex: 1.3, textAlign: "left", fontSize: fontScale(14), marginLeft: fontScale(5) }}>{item.empName}</Text>
                                        <Text style={{ flex: 1, textAlign: "left", paddingLeft: fontScale(15), fontSize: fontScale(14) }}>{item.shopName}</Text>
                                        <Text style={{ flex: 1, textAlign: "center", fontSize: fontScale(14) }}>{item.subAmount}</Text>
                                        <Text style={{ flex: 1, textAlign: "center", fontSize: fontScale(14) }}>{item.subCollect}</Text>
                                        <Image key={item.empCode} source={images.eye} style={{ tintColor: colors.grey, width: fontScale(20), height: fontScale(17), position: "absolute", right: fontScale(2), top: fontScale(8) }} resizeMode="cover" />
                                    </TouchableOpacity>
                                    :
                                    <View style={{ flexDirection: "row", backgroundColor: index % 2 ? colors.lightGrey : colors.white, paddingVertical: fontScale(8) }}>
                                        <Text style={{ flex: 1.3, textAlign: "left", fontSize: fontScale(14), marginLeft: fontScale(5) }}>{item.empName}</Text>
                                        <Text style={{ flex: 1, textAlign: "left", paddingLeft: fontScale(15), fontSize: fontScale(14) }}>{item.shopName}</Text>
                                        <Text style={{ flex: 1, textAlign: "center", fontSize: fontScale(14) }}>{item.subAmount}</Text>
                                        <Text style={{ flex: 1, textAlign: "center", fontSize: fontScale(14) }}>{item.subCollect}</Text>
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