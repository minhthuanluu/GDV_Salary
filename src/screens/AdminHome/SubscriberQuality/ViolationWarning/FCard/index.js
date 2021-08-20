import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { SafeAreaView, View, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/core';
import { colors } from '../../../../../utils/Colors';
import { Body, Header, Search, SearchWithPermission, TableHeader } from '../../../../../comps';
import { styles } from './style';
import { ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { images } from '../../../../../utils/Images';
import { text } from '../../../../../utils/Text';
import { fontScale } from '../../../../../utils/Fonts';
import { FlatList } from 'react-native';
import { getFCardTrans } from '../../../../../api';
import { getAllBranch, getAllEmp, getAllShop } from '../../../../../adminapi';
import Toast from 'react-native-toast-message';
import { TouchableOpacity } from 'react-native';
import { width } from '../../../../../utils/Dimenssion';

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

    const _onChangeBranch = async (branchCode,value) => {
        console.log(value)
        setBranchCode(branchCode);
        setShopList([]);
        setLoadingShop(true);
        setDefaultBranchName(value.branchName)
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
        setData([])
        await getFCardTrans(navigation, branchCode, shopCode, empCode).then((res) => {              
            setLoading(false)
            if(res.length==0){
                setMessage(text.dataIsNull)
            }
            if (res.status == "success") {
                setMessage("");
                if (res.length == 0) {
                    setLoading(res.isLoading);
                    setMessage(text.dataIsNull)
                    setNotification(res.notification)
                } else {
                    setNotification(res.data.notification)
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

    const _onSearch = async (value) => {
        console.log(value)
        // setDefaultBranchName(value.branchName);
        // setDefaultShopName(value.shopName)
        await getData(value.branchCode, value.shopCode, value.empCode);
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
        getBranchList();
        _getAllShop();
        _getAllEmp();
        getData("", "", "");
        console.log("Chat luong thue bao > Canh bao vi pham > Chuyen FCard>3TB")
    }, [notification])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
            <Header title={title} />
            <Text style={{ color: colors.white,fontWeight:"bold",fontSize:fontScale(14),marginBottom:fontScale(5),marginTop:-fontScale(5), textAlign: "center" }}>{notification}</Text>
            <SearchWithPermission
                full
                hideMonthFilter
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
            <View style={{ flex: 1, backgroundColor: colors.white }}>
                <View style={{ flexDirection: "row" }}>
                    <TableHeader style={{ flex: 1.8, marginLeft: -fontScale(15) }} title={'GDVPTM'} />
                    <TableHeader style={{ flex: 1.7, marginLeft: fontScale(15) }} title={'Tên CH'} />
                    <TableHeader style={{ flex: 1.5, marginLeft: fontScale(5) }} title={'TB/tháng'} />
                    <TableHeader style={{ flex: 1.5 }} title={'TB/tập'} />
                </View>
                {loading == true ? <ActivityIndicator size="small" color={colors.primary} style={{ marginTop: fontScale(15) }} /> : null}
                {message ? <Text style={{color:colors.primary,textAlign:"center",marginTop:fontScale(20)}}>{message}</Text> : null}
                
                <FlatList
                    style={{ marginTop: fontScale(10) }}
                    keyExtractor={(item, index) => item.empCode.toString()}
                    data={data}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return <View>
                            {
                                item.detail == "true" ?
                                    <TouchableOpacity style={{ flexDirection: "row", backgroundColor: index % 2 ? colors.lightGrey : colors.white,alignItems:"center", paddingVertical: fontScale(8) }}
                                        onPress={() =>
                                            navigation.navigate("AdminViolateSubscriberFCardDetail", { "branchCode":branchCode,"shopCode":shopCode,"empCode": item.empCode, "title": title })
                                        }>
                                        <Text style={{ flex: 1.3, textAlign: "left",textAlignVertical:"center", fontSize: fontScale(14), marginLeft: fontScale(5) }}>{item.empName}</Text>
                                        <Text style={{ flex: 1, textAlign: "left",textAlignVertical:"center", paddingLeft: fontScale(15), fontSize: fontScale(14) }}>{item.shopName}</Text>
                                        <Text style={{ flex: 1, textAlign: "center",textAlignVertical:"center", fontSize: fontScale(14) }}>{item.subAmount}</Text>
                                        <Text style={{ flex: 1, textAlign: "center",textAlignVertical:"center", fontSize: fontScale(14) }}>{item.subCollect}</Text>
                                        <Image key={item.empCode} source={images.eye} style={{ tintColor: colors.grey, width: fontScale(20), height: fontScale(17), position: "absolute", right: fontScale(2), top: fontScale(8) }} resizeMode="cover" />
                                    </TouchableOpacity>
                                    :
                                    <View style={{ flexDirection: "row", backgroundColor: index % 2 ? colors.lightGrey : colors.white, alignItems:"center",paddingVertical: fontScale(8) }}>
                                        <Text style={{ flex: 1.3, textAlign: "left",textAlignVertical:"center", fontSize: fontScale(14), marginLeft: fontScale(5) }}>{item.empName}</Text>
                                        <Text style={{ flex: 1, textAlign: "left", paddingLeft: fontScale(15), fontSize: fontScale(14) }}>{item.shopName}</Text>
                                        <Text style={{ flex: 1, textAlign: "center",textAlignVertical:"center", fontSize: fontScale(14) }}>{item.subAmount}</Text>
                                        <Text style={{ flex: 1, textAlign: "center",textAlignVertical:"center", fontSize: fontScale(14) }}>{item.subCollect}</Text>
                                    </View>
                            }

                        </View>
                    }}
                />
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaView>
    );
}

export default index;