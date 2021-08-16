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
import { checkSearchHistory, getRole } from '../../../../utils/Logistics';
import { _retrieveData, _storeData } from '../../../../utils/Storage';
import { text } from '../../../../utils/Text';
import { styles } from './style'
import { ROLE } from "../../../../utils/Roles"

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
            if (data.role == ROLE.VMS_CTY) {
                getBranchList();
                await getData(month, '', '', '', '', '');
                setPlaceHolder(text.chooseBranch)
            } else if (data.role == ROLE.MBF_CHINHANH) {
                setDefaultShopName(data.label);
                setPlaceHolder(data.label);
                setDefaultBranchCode(data.branchCode);
                setDefaultShopCode(data.shopCode);
                await getData(month, data.shopCode, "", data.label, '', sort)
            } else if (data.role == ROLE.MBF_CUAHANG) {
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
        if (role == ROLE.VMS_CTY) {
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
                setDefaultShopName(data.label);
                setPlaceHolder(data.label);
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
                data={[{ label: text.highestTop, value: 1 }, { label: text.lowestTop, value: 0 }]}
                placeholder={placeHolder}
                rightIcon={images.searchlist}
                searchSelectModal
                initialRadio={sort == 1 ? 0 : 1}
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
                    role == ROLE.VMS_CTY ? getData(month, value.shopCode, '', value.shopName, '', value.radio)
                        :
                        getData(month, defaultShopCode, '', defaultShopName, '', value.radio)
                }
                fixed={role != ROLE.VMS_CTY ? true : false}
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
                    headers={[text.teller, text.sumSalary, text.contractSalary, text.kpi]}
                    headersTextColor={"#D19E01"}
                    headerStyle={{ icon: { size: 15 }, text: { size: fontScale(14) } }}
                    widthArray={[2 / 5 * width, 1 / 5 * width, 1 / 5 * width, 1 / 5 * width]}
                    fields={
                        data.map((item, index) => [
                            `${item.empName}\n(${item.shopName})`,
                            item.totalSalary,
                            item.incentiveSalary,
                            item.kpi
                        ])
                    }
                    fontWeight={["normal"]}
                    textColor={[colors.black]}
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