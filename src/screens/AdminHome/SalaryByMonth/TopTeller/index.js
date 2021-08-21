import { useNavigation } from '@react-navigation/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView, View, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { getAllBranch, getMonthSalaryTopTeller } from '../../../../api';
import { Body, DatePicker, GeneralListItem, Header, Search, SearchWithPermission, Table, TableHeader } from '../../../../comps';
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

    const getData = async (branchCode, month, radio) => {
        setLoading(true);
        setData([]);
        setMessage("");

        await getMonthSalaryTopTeller(navigation, month, branchCode, "", "", radio).then(async (res) => {
            if (res.status == "success") {
                setLoading(false);
                if (res.length == 0) {
                    setMessage('Không có dữ liệu');
                } else {
                    setData(res.data);
                }
            }
            if (res.status == "failed") {
                setLoading(res.isLoading);
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
        })

    }

    const checkRole = async () => {
        await getRole().then(async (data) => {
            getBranchList();
            setRole(data.role);
            if (data.role == ROLE.VMS_CTY || data.role == ROLE.ADMIN) {
                await getData('', month, sort);
            } else if (data.role == ROLE.MBF_CHINHANH) {
                setSort(1);
                await getData(data.shopCode, month, sort)
            } else if (data.role == ROLE.MBF_CUAHANG) {
                setSort(1);
                await getData(data.branchCode, month, sort);
            }
        });
    }

    useEffect(() => {
        checkRole();
        getBranchList();
    }, [""])

    return (
        <SafeAreaView style={styles.container}>
            <Header title={text.topSeller} />
            <SearchWithPermission
                oneSelect
                leftIcon={images.teamwork}
                rightIcon={images.searchlist}
                month={month}
                width={width - fontScale(50)}
                placeholder="Tìm kiếm"
                modalTitle="Vui lòng chọn"
                onDone={(value) => getData(value.branchCode, value.month, value.radio)} />
            <Body />
            <View style={{ flex: 1, backgroundColor: colors.white }}>
                <View style={{ flexDirection: "row", marginTop: fontScale(2) }}>
                    <TableHeader style={{ width: (width * 2.8) / 10 }} title={text.teller} />
                    <TableHeader style={{ width: (width * 2.7) / 10, marginLeft: fontScale(15) }} title={text.sumSalary} />
                    <TableHeader style={{ width: (width * 2.6) / 10 }} title={text.contractSalary} />
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
                                [{ width: (width * 3.5) / 10, marginLeft: fontScale(5), fontSize: fontScale(14) }],
                                [{ width: (width * 2) / 10, textAlign: "center", fontSize: fontScale(13) }],
                                [{ width: (width * 2.9) / 10, textAlign: "center", fontSize: fontScale(13) }],
                                [{ width: (width * 3) / 10, marginLeft: fontScale(5), fontSize: fontScale(13) }]
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