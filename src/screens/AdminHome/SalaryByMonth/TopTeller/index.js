import { useNavigation } from '@react-navigation/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { getAllBranch, getMonthSalaryTopTeller } from '../../../../api';
import { Body, DatePicker, Header, Search, Table } from '../../../../comps';
import { colors } from '../../../../utils/Colors';
import { width } from '../../../../utils/Dimenssion';
import { fontScale } from '../../../../utils/Fonts';
import { images } from '../../../../utils/Images';
import { checkSearchHistory, getLoginInfo, getRole } from '../../../../utils/Logistics';
import { _retrieveData, _storeData } from '../../../../utils/Storage';
import { text } from '../../../../utils/Text';
import { styles } from './style'

const index = (props) => {
    const [month, setMonth] = useState(moment(new Date()).subtract(1, "months").format("MM/YYYY"));
    const [loading, setLoading] = useState(false);
    const [branchList, setBranchList] = useState([]);
    const [branchCode, setBranchCode] = useState('')
    const [shopList, setShopList] = useState([]);
    const [shopCode, setShopCode] = useState('');
    const [empCode, setEmpCode] = useState('');
    const [sort, setSort] = useState(1);
    const [message, setMessage] = useState('')
    const [data, setData] = useState([]);
    const [empList, setEmpList] = useState([])
    const navigation = useNavigation();
    const [placeHolder, setPlaceHolder] = useState('')
    const [role, setRole] = useState();
    const [defaultShopCode, setDefaultShopCode] = useState('')
    const [defaultShopName, setDefaultShopName] = useState('');
    const [defaultBranchCode, setDefaultBranchCode] = useState('')
    const [defaultBranchName, setDefaultBranchName] = useState('');
    const [shopName, setShopName] = useState('')

    const getBranchList = async () => {
        setLoading(true)
        await getAllBranch(navigation).then((res) => {
            if (res.status == "success") {
                setLoading(false);
                if (res.length > 0) {
                    setBranchList(res.data)
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
        setPlaceHolder(_shopName);
        await getMonthSalaryTopTeller(navigation, month, _branchCode, _shopCode, empCode, sort).then(async (res) => {
            const { data, error, status, isLoading, length, message } = res;
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
        getBranchList();
        await getRole().then(async (data) => {
            setRole(data.role);
            if (data.role == "VMS_CTY") {
                getBranchList();
                await getData(month, '', '', '', '', '');
                setPlaceHolder("Chọn chi nhánh")
            } else if (data.role == "MBF_CHINHANH") {
                setDefaultShopName(data.label);
                setPlaceHolder(data.label);
                setDefaultBranchCode(data.branchCode);
                setDefaultShopCode(data.shopCode);
                await getData(month, data.shopCode, '', data.label, '', sort)
            } else if (data.role == "MBF_CUAHANG") {
                setDefaultShopName(data.label);
                setPlaceHolder(data.label);
                setDefaultBranchCode(data.branchCode);
                setDefaultShopCode(data.shopCode);

                await getData(month, data.branchCode, "", data.label, '', sort);
            }

        });
    }

    useEffect(() => {
        checkRole();
    }, [navigation])

    const _setMonth = async (value) => {
        setMonth(value)
        if (role == "VMS_CTY") {
            getBranchList();
            await getData(value, defaultBranchCode, defaultShopCode, defaultShopName, '', sort);
            setPlaceHolder("Chọn chi nhánh")
        } else if (role == "MBF_CHINHANH") {
            await getRole().then(async (data) => {
                setDefaultShopName(data.label);
                setPlaceHolder(data.label);
                setDefaultBranchCode(data.branchCode);
                setDefaultShopCode(data.shopCode);
                await getData(value, data.shopCode, '', data.label, '', sort)
            });
        } else if (role == "MBF_CUAHANG") {
            await getRole().then(async (data) => {
                setDefaultShopName(data.label);
                setPlaceHolder(data.label);
                setDefaultBranchCode(data.branchCode);
                setDefaultShopCode(data.shopCode);
                await getData(value, data.branchCode, data.shopCode, data.label, '', sort)
            })
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header title={text.topSeller} />
            <DatePicker month={month} width={width - fontScale(120)} style={{ alignSelf: "center" }} onChangeDate={(date) => _setMonth(date)} />
            <Search
                modalTitle="Vui lòng chọn"
                data={[
                    { label: 'Top cao nhất', value: 1 },
                    { label: 'Top thấp nhất', value: 0 }
                ]}
                placeholder={placeHolder}
                rightIcon={images.searchlist}
                searchSelectModal
                initialRadio={sort == 1 ? 0 : 1}
                onPress={(value) => console.log("radio button value: " + value)} width={width - fontScale(60)} style={{ marginTop: fontScale(20) }} leftIcon={images.teamwork}
                dataOne={branchList}
                index={branchList.map((item, index) => index)}
                fieldOne={branchList.map((item) => item.shopName)}
                fieldTwo={shopList.map((item) => item.shopName)}
                fieldThree={empList.map((item, index) => item.maGDV)}
                onChangePickerOne={(value, index) => onChangeBranch(value)}
                showPicker={[true, false, false]}
                onPressOK={(value) =>
                    role == "VMS_CTY" ? getData(month, value.shopCode, '', value.shopName, '', value.radio)
                        :
                        role == "MBF_CHINHANH" ? getData(month, defaultShopCode, '', defaultShopName, '', value.radio)
                            :
                            getData(month, defaultBranchCode, defaultShopCode, defaultShopName, '', value.radio)
                }
                fixed={role != "VMS_CTY" ? true : false}
                fixedData={defaultShopName}
            />
            <Body />
            <View style={{ flex: 1, backgroundColor: colors.white }}>
                {loading == true ? <ActivityIndicator style={{ marginVertical: fontScale(5) }} color={colors.primary} size="small" /> : null}
                <Table
                    data={data}
                    table
                    message={message && message}
                    numColumn={4}
                    headers={["GDV", "Tổng lương", "Lương khoán sp", "KPI"]}
                    headersTextColor={"#D19E01"}
                    headerStyle={{ icon: { size: 15 }, text: { size: fontScale(14) } }}
                    widthArray={[fontScale(160), fontScale(100), fontScale(80), fontScale(70)]}
                    fields={
                        data.map((item, index) => [
                            `${item.empName}\n(${item.shopName})`,
                            item.totalSalary,
                            item.incentiveSalary,
                            item.kpi
                        ])
                    }
                    fontWeight={"normal"}
                    textColor={'#000'}
                    firstRowBg={colors.lightGrey}
                    textAlign="center"
                    rowBg={data.map((item, index) => index % 2 == 0 ? colors.lightGrey : colors.white)}
                />
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaView>
    );
}

export default index;