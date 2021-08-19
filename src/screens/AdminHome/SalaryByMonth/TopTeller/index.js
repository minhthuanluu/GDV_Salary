import { useNavigation } from '@react-navigation/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView, View,Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { getAllBranch, getMonthSalaryTopTeller } from '../../../../api';
import { Body, DatePicker, GeneralListItem, Header, Search, Table, TableHeader } from '../../../../comps';
import { colors } from '../../../../utils/Colors';
import { width } from '../../../../utils/Dimenssion';
import { fontScale } from '../../../../utils/Fonts';
import { images } from '../../../../utils/Images';
import { checkSearchHistory, getRole } from '../../../../utils/Logistics';
import { _retrieveData, _storeData } from '../../../../utils/Storage';
import { text } from '../../../../utils/Text';
import { styles } from './style'
import { ROLE } from "../../../../utils/Roles"
import { FlatList } from 'react-native';

const index = (props) => {
    const [month, setMonth] = useState(moment(new Date()).subtract(1, "months").format("MM/YYYY"));
    const [loading, setLoading] = useState(false);
    const [branchList, setBranchList] = useState([]);
    const [branchCode, setBranchCode] = useState('')
    const [shopList, setShopList] = useState([]);
    const [sort, setSort] = useState(1);
    const [message, setMessage] = useState('');
    const [data, setData] = useState([]);
    const [empList, setEmpList] = useState([]);
    const navigation = useNavigation();
    const [placeHolder, setPlaceHolder] = useState('');
    const [role, setRole] = useState();
    const [defaultShopCode, setDefaultShopCode] = useState('');
    const [defaultShopName, setDefaultShopName] = useState('');
    const [defaultBranchCode, setDefaultBranchCode] = useState('');

    const getBranchList = async () => {
        setLoading(true)
        await getAllBranch(navigation).then((res) => {
            if (res.status == "success") {
                setLoading(false);
                if (res.length > 0) {
                    setBranchList(res.data);
                }
            }
            if (res.status == "failed") {
                setLoading(false);
            }
            if (res.status == "v_error") {
                Toast.show({
                    text1: "Cảnh báo",
                    text2: res.message,
                    type: "error",
                    visibilityTime: 1000,
                    autoHide: true,
                    onHide: () => navigation.navigate("AdminHome")
                })
            }
        })
    }

    const getData = async (month, _branchCode, _shopCode, _shopName, empCode, sort) => {
        setLoading(true);
        setData([]);
        setMessage("");
        setSort(sort);
        console.log(month, _branchCode, _shopCode, _shopName, empCode, sort)
        setPlaceHolder(_shopName);
        await getMonthSalaryTopTeller(navigation, month, _branchCode, _shopCode, empCode, sort).then(async (res) => {
            const { data, error, status, isLoading, length, message } = res;
            // console.log(res.data)
            if (status == "success") {
                setLoading(false);
                if (length == 0) {
                    setMessage('Không có dữ liệu');
                } else {
                    setData(res.data);
                }
            }
            if (status == "failed") {
                setLoading(isLoading);
                Toast.show({
                    text1: "Cảnh báo",
                    text2: res.message,
                    type: "error",
                    visibilityTime: 5000,
                    autoHide: true,
                    onHide: () => navigation.goBack()
                })
            }
            if (res.status == "v_error") {
                Toast.show({
                    text1: "Cảnh báo",
                    text2: res.message,
                    type: "error",
                    visibilityTime: 1000,
                    autoHide: true,
                    onHide: () => navigation.goBack()
                })
            }
            await checkSearchHistory("salaryByMonth", "AdminSalaryByMonthTopTeller", { "shopCode": _branchCode || branchCode, "shopName": defaultShopName, "month": month, "sort": sort })
        })

    }

    const onChangeBranch = async (value) => {
        setBranchCode(value.shopCode);
        setDefaultBranchCode(value.shopCode);
        setDefaultShopName(value.shopName);
        setDefaultShopCode('');
        setPlaceHolder(value.shopName);
    }

    const checkRole = async () => {
        await getRole().then(async (data) => {
            getBranchList();
            setRole(data.role);
            if (data.role == ROLE.VMS_CTY || data.role == ROLE.ADMIN) {
                await getData(month, '', '', '', '', sort);
                setPlaceHolder(text.chooseBranch)
            } else if (data.role == ROLE.MBF_CHINHANH) {
                console.log(data)
                setDefaultShopName(data.label);
                setSort(1);
                setPlaceHolder(data.label);
                setDefaultBranchCode(data.branchCode);
                setDefaultShopCode(data.shopCode);
                await getData(month, data.shopCode, "", data.label, '', sort)
            } else if (data.role == ROLE.MBF_CUAHANG) {
                console.log(data)
                setDefaultShopName(data.label);
                setPlaceHolder(data.branchName);
                setSort(1);
                setDefaultBranchCode(data.branchCode);
                setDefaultShopCode(data.shopCode);
                await getData(month, data.branchCode,"", data.branchName, '', sort);
            }
        });
    }

    useEffect(() => {
        checkRole();
        getBranchList();
    }, [""])

    const _setMonth = async (value) => {
        setMonth(value)
        if (role == ROLE.VMS_CTY || role == ROLE.ADMIN) {
            setRole(data.role)
            getBranchList();
            await getData(value, defaultBranchCode, defaultShopCode, defaultShopName, '', sort);
            setPlaceHolder(text.chooseBranch)
        } else if (role == ROLE.MBF_CHINHANH) {
            await getRole().then(async (data) => {
                setDefaultShopName(data.label);
                setPlaceHolder(data.label);
                setDefaultBranchCode(data.branchCode);
                setDefaultShopCode(data.shopCode);
                await getData(value, data.shopCode, '', data.label, '', sort)
            });
        } else if (role == ROLE.MBF_CUAHANG) {
            await getRole().then(async (data) => {
                setDefaultShopName(data.branchName);
                setPlaceHolder(data.branchName);
                setDefaultBranchCode(data.branchCode);
                setDefaultShopCode(data.shopCode);
                await getData(value, data.branchCode, "", data.label, '', sort)
            })
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header title={text.topSeller} />
            <DatePicker month={month} width={width - fontScale(120)} style={{ alignSelf: "center" }} onChangeDate={(date) => _setMonth(date)} />
            <Search
                modalTitle={text.select}
                dialogTitle="Chọn dữ liệu"
                data={[{ label: text.highestTop, value: 1 }, { label: text.lowestTop, value: 0 }]}
                placeholder={placeHolder}
                rightIcon={images.searchlist}
                searchSelectModal
                initialRadio={sort==1?0:1}
                width={width - fontScale(60)}
                style={{ marginTop: fontScale(20), marginHorizontal: fontScale(30) }}
                leftIcon={images.teamwork}
                dataOne={branchList}
                index={branchList.map((item, index) => index)}
                fieldOne={branchList.map((item) => item.shopName)}
                fieldTwo={shopList.map((item) => item.shopName)}
                fieldThree={empList.map((item, index) => item.maGDV)}
                onChangePickerOne={(value, index) => onChangeBranch(value)}
                showPicker={[true, false, false]}
                onPressOK={(value) =>
                    role == ROLE.VMS_CTY || data.role == ROLE.ADMIN ? getData(month, value.shopCode, '', value.shopName, '', value.radio)
                        :
                        role == ROLE.MBF_CHINHANH ? getData(month, defaultShopCode, '', placeHolder, '', value.radio)
                        :getData(month, defaultBranchCode, '', placeHolder, '', value.radio)
                }
                
                fixed={role == "VMS_CTY" || role == "ADMIN" ? false : true}
                fixedData={placeHolder}
            />
            <Body />
            <View style={{ flex: 1, backgroundColor: colors.white }}>
                <View style={{ flexDirection: "row", marginTop: fontScale(2) }}>
                    <TableHeader style={{ width: (width * 3.2) / 10 }} title={text.teller} />
                    <TableHeader style={{ width: (width * 2.3) / 10, marginLeft: fontScale(15) }} title={text.sumSalary} />
                    <TableHeader style={{ width: (width * 2.8) / 10 }} title={text.contractSalary} />
                    <TableHeader style={{ width: (width * 1) / 10, marginLeft: -fontScale(5) }} title={text.kpi} />
                </View>
                {loading == true ? (
                    <ActivityIndicator
                        size="small"
                        color={colors.primary}
                        style={{ marginTop: fontScale(20) }}
                    />
                ) : null}

                {message ? <Text style={styles.message}>{message}</Text> : null}

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={data}
                    style={{ marginTop: fontScale(10) }}
                    keyExtractor={(item, index) => index.toString()}
                    key={({ item }) => item.empName.toString()}
                    renderItem={({ item, index }) => (
                        <GeneralListItem
                            item={item}
                            index={index}
                            fields={[
                                `${item.empName}\n(${item.shopName})`,
                                item.totalSalary,
                                item.incentiveSalary,
                                item.kpi
                            ]}
                            style={[
                                [{ width: (width * 3.4) / 10, marginLeft: fontScale(5),fontSize:fontScale(14)}],
                                [{ width: (width * 2.3) / 10, textAlign: "center",fontSize:fontScale(13) }],
                                [{ width: (width * 2.7) / 10, textAlign: "center",fontSize:fontScale(13) }],
                                [{ width: (width * 3) / 10, marginLeft: fontScale(5),fontSize:fontScale(13) }]
                            ]}

                        />
                    )}
                />
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaView>
    );
}

export default index;