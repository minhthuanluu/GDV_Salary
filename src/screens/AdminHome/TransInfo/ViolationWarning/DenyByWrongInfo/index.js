import { useRoute, useNavigation } from '@react-navigation/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native';
import { set } from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import { getDenyByWrongInfo, getTransInfoWarningByType } from '../../../../../api';
import { Body, DatePicker, Header, Search, Table } from '../../../../../comps';
import { styles } from './style';
import { colors } from '../../../../../utils/Colors';
import { width } from '../../../../../utils/Dimenssion';
import { fontScale } from '../../../../../utils/Fonts';
import { images } from '../../../../../utils/Images';
import { text } from '../../../../../utils/Text';
import { getAllBranch, getAllEmp } from '../../../../../api';
import { getShopList } from '../../../../Test/api';

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
    const [branchList,setBranchList] = useState([]);
    const [shopList,setShopList] = useState([])
    const [empList,setEmpList] = useState([])

    const { key, title } = route.params;

    // navigation.goBack()
    const getData = async (month, branchCode, shopCode, empCode) => {
        setLoading(true);
        await getDenyByWrongInfo(navigation, month, branchCode,shopCode,empCode).then((res) => {
            console.log(res.data)
            if (res.status == "success") {
                console.log(res.data)
                setData(res.data);
                setLoading(res.isLoading);
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

    const getBranchList = async() => {
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

    const _onChangeShop = async(shopCode)=>{
        setShopCode(shopCode)
        await getAllEmp(navigation,branchCode,shopCode).then((res)=>{
            if (res.status == "success") {
                setEmpList(res.data);
                
            }
            if (res.status == 'failed') {
            }
            
        })
    }

    const _onChangeEmp=(empId)=>{
        setEmpCode(empId)
    }

    const _onSearch=async(value)=>{
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
                dataOne = {branchList}
                dataTwo={shopList}
                dataThree={empList}
                message={text.dataIsNull}
                searchIndex={1}
                onChangeText={(text)=>console.log(text)}
                dataFour={empList}
                onPressDataOne={(item)=>_onChangeBranch(item.shopCode)}
                onPressDataTwo={(item)=>_onChangeShop(item.shop_code)}
                onPressDataThree={(item)=>_onChangeEmp(item.id)}
                onPress={(value)=>_onSearch(value)}
                />
            <ActivityIndicator size="small" color={colors.primary} />
            <Body />
            <View style={{ flex: 1, backgroundColor: colors.white, }}>
                {loading == true ? <ActivityIndicator size="small" color={colors.primary} /> : null}
                <View style={{ marginTop: -fontScale(30) }}>
                    <Table
                        // style={styles.table}
                        data={data}
                        table
                        numColumn={3}
                        headers={[
                            "GDVPTM",
                            "Tên CH",
                            "Số lần chặn"
                        ]}
                        headersTextColor={"#00BECC"}
                        headerStyle={{ icon: { size: 15 }, text: { size: fontScale(14) } }}
                        headerMarginLeft={-fontScale(5)}
                        widthArray={[
                            width / 2,
                            width / 6,
                            width / 3
                        ]}
                        fields={data.map((item) => [
                            item.empName,
                            item.store,
                            item.denyAmount
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

                        onPress={(item) => navigation.navigate("AdminEmpRegInfoDetail", { "key":key,"empCode": item.empCode, "title": title, "month": month })}
                    />
                </View>
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />

        </SafeAreaView>
    );
}

export default index;