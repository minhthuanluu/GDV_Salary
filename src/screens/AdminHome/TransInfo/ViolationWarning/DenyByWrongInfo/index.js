import { useRoute, useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native';
import Toast from 'react-native-toast-message';
import { getDenyByWrongInfo } from '../../../../../api';
import { Body, DatePicker, GeneralListItem, Header, Search, TableHeader } from '../../../../../comps';
import { colors } from '../../../../../utils/Colors';
import { width } from '../../../../../utils/Dimenssion';
import { fontScale } from '../../../../../utils/Fonts';
import { images } from '../../../../../utils/Images';
import { text } from '../../../../../utils/Text';
import { getAllBranch, getAllEmp } from '../../../../../api';
import { getShopList } from '../../../../Test/api';
import { FlatList } from 'react-native';

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
    
    const [branchList, setBranchList] = useState([]);
    const [shopList, setShopList] = useState([])
    const [empList, setEmpList] = useState([])
    const [message,setMessage] = useState('')
    const { key, title } = route.params;

    // navigation.goBack()
    const getData = async (month, branchCode, shopCode, empCode) => {
        console.log(month, branchCode, shopCode, empCode)
        
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
                setMessage(res.message)

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
        await getShopList(branchCode).then((res) => {
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
        setBranchCode(value.branchCode);
        
        setShopCode(value.shopCode);
        setEmpCode(value.empId);
        await getData(month, value.branchCode, value.shopCode, value.empId, key);
    }

    useEffect(() => {
        getData(month, "", "", "");
        getBranchList()
    }, [month])


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
            <Header title={title} />
            <DatePicker month={month} width={width - fontScale(120)} style={{ alignSelf: "center" }} onChangeDate={(date) => _onChangeMonth(date)} />
            <Search
                searchSelectModalFourCondition
                leftIcon={images.teamwork}
                rightIcon={images.arrowdown}
                placeholder={text.search}
                modalTitle={"Vui lòng chọn"}
                dataOne={branchList}
                dataTwo={shopList}
                dataThree={empList}
                defaultLabelOne={branchCode}
                message={text.dataIsNull}
                searchIndex={1}
                onChangeText={(text) => console.log(text)}
                dataFour={empList}
                onPressDataOne={(item) => _onChangeBranch(item.shopCode)}
                onPressDataTwo={(item) => _onChangeShop(item.shop_code)}
                onPressDataThree={(item) => _onChangeEmp(item.id)}
                onPress={(value) => _onSearch(value)}
            />
            <ActivityIndicator size="small" color={colors.primary} />
            <Body />
            <View style={{ flex: 1, backgroundColor: colors.white, }}>
                {loading == true ? <ActivityIndicator size="small" color={colors.primary} style/> : null}
                <View style={{ marginTop: -fontScale(20) }}>
                    <View style={{ flexDirection: "row", marginTop: fontScale(2) }}>
                        <TableHeader style={{ width: (width * 3.9) / 10 }} title={'GDVPTM'} />
                        <TableHeader style={{ width: (width * 2.6) / 10 }} title={'Tên CH'} />
                        <TableHeader style={{ width: (width * 3.2) / 10 }} title={'Số lần chặn'} />
                    </View>
                <Text style={{ color: colors.primary, textAlign: "center", marginTop: fontScale(20),width:width }}>{message}</Text>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data}
                        style={{ marginTop: -fontScale(30) }}
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
                                    [{ textAlign: "left",marginLeft:fontScale(5), fontSize: fontScale(14), textAlignVertical: "center" }, { width: (width * 3.9) / 10 }],
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