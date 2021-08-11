import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Modal, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView, FlatList } from 'react-native';
import { Search, Table } from '../../comps';
import YearMonthPicker from '../../comps/datepicker';
import { colors } from '../../utils/Colors';
import { fontScale } from '../../utils/Fonts';
import AreaPicker from './AreaPicker';
import { Button } from './Button';
import NormalHeader from './NormalHeader';
import OneItemAdmin from './OneItemAdmin';
import SearchableDropDown from './SearchableDropdown';
import SearchBar from './SearchBar';
import moment from "moment";
import { View } from 'react-native';
import BodyScreenAdmin from './BodyScreenAdmin';
import { statusbarHeight, width, height } from '../../utils/Dimenssion';
import { images } from './Images';
import { getBranchList, getEmpList, getFixedWageSalary, getShopList } from './api';
import { ActivityIndicator } from 'react-native';
import SearchDemo from '../../comps/search/demo';
import TableDemo from '../../comps/table/demo';

const Test = (props) => {
    
    const data = [
        {
            "name": "Nguyen Thi A",
            "address": "TP.HCM",
            "company": "Mobifone",
            "position": "Engineer"
        },
        {
            "name": "Do Van B",
            "address": "TP.HCM",
            "company": "Mobifone",
            "position": "Engineer"
        },
        {
            "name": "Nguyen Thi Hoang C",
            "address": "TP.HCM",
            "company": "Mobifone",
            "position": "Engineer"
        },
        {
            "name": "Nguyen Thi A",
            "address": "TP.HCM",
            "company": "Mobifone",
            "position": "Engineer"
        },
        {
            "name": "Nguyen Thi Giang",
            "address": "TP.HCM",
            "company": "Mobifone",
            "position": "Engineer"
        },
        {
            "name": "Nguyen Thi A",
            "address": "TP.HCM",
            "company": "Mobifone",
            "position": "Engineer"
        },
        {
            "name": "Nguyen Thi A",
            "address": "TP.HCM",
            "company": "Mobifone",
            "position": "Engineer"
        },
    ]
    return (
        <SafeAreaView style={{ flex: 1,backgroundColor:colors.white }}>
            {/* <Search withDropdown data={data} dataNotFoundText="Data not found"/> */}
            <SearchDemo />
            <TableDemo/>
            {/* <Table
                data={data}
                table
                numColumn={4}   
                headers={["Họ tên", "Địa Chỉ", "Công ty", "Vị trí"]}
                headerStyle={{ icon: { size: 15 }, text: { size: 12 } }}
                headerIcons={[images.top10highest, images.top10lowest, images.workingShop, images.close]}
                widthArray={[150,150,150,150]}
                fields={
                    data.map((item) => [
                        item.name,
                        item.address,
                        item.company,
                        item.position
                    ])
                }
                loading={loading}
                lastIcon={images.check}
            /> */}
        </SafeAreaView>
    );
}


const TestTwo = (props) => {
    const [month, setMonth] = useState(moment(new Date()).format("MM/YYYY"));
    const [message, setMessage] = useState('');
    const [showAreaPicker, setAreaShowPicker] = useState(false);
    const [branchList, setBranchList] = useState([]);
    const [shopList, setShopList] = useState([]);
    const [areaList, setAreaList] = useState([]);
    const [empList, setEmpList] = useState([]);
    const [detailEmployeeList, setDetailEmployeeList] = useState([]);
    const [branchCodeLabel, setBranchCodeLabel] = useState('Tất cả');
    const [shopCodeLabel, setShopCodeLabel] = useState('Tất cả');
    const [empCodeLabel, setEmpCodeLabel] = useState('Tất cả');
    const [isLoading, setIsLoading] = useState(false);
    const [openBranch, setOpenBranch] = useState(true);
    const [openDistrict, setOpenDistrict] = useState(true);
    const [buttonColorHighest, setButtonColorHighest] = useState(colors.lightGrey)
    const [buttonColorLowest, setButtonColorLowest] = useState('#fff')

    const [empSearch, setEmpSearch] = useState('')
    const [empListSelect, setEmpListSelect] = useState([]);

    const [branchCode, setBranchCode] = useState('');
    const [shopCode, setShopCode] = useState('');
    const [empCode, setEmpCode] = useState('');


    const [topHighest, setTopHighest] = useState(true)
    const [topLowest, setTopLowest] = useState(false);
    const [sort, setSort] = useState(0)

    const _showAreaPicker = () => {
        setAreaShowPicker(true);
    }
    const _setDate = async (value) => {
        setMonth(value);
        await _onFilter(value, sort, branchCode, shopCode, empCode);
    }
    const onClickHighest = () => {
        setTopHighest(true); setTopLowest(false);
        setButtonColorHighest(colors.lightGrey);
        setButtonColorLowest(colors.white)
        setSort(0)

    }
    const onClickLowest = () => {
        setTopLowest(true); setTopHighest(false);
        setButtonColorHighest(colors.white)
        setButtonColorLowest(colors.lightGrey);
        setSort(1)
    }

    const getBranch = async () => {
        await getBranchList().then((data) => {
            if (data.status == "success") {
                console.log(data.data)
                setBranchList(data.data)
            }
            if (data.status == 'failed') {

            }
        })
    }

    const _onChangeBranch = async (branchCode) => {
        await getShopList(branchCode).then((data) => {
            if (data.status == "success") {
                setShopList(data.data);
                setBranchCode(branchCode);
                setBranchCodeLabel(branchCode)
            }
            if (data.status == 'failed') {

            }
        })
    }

    const _onChangeShop = async (shopCode) => {
        setShopCode(shopCode)
        await getEmpList(branchCode, shopCode).then((data) => {
            if (data.status == "success") {
                setEmpList(data.data);
                setShopCode(shopCode);
                setShopCodeLabel(shopCode)
            }
            if (data.status == 'failed') {

            }
        })
    }

    const _onChangeEmp = (empCode) => {
        setEmpCode(empCode)
    }

    const onShowSelectPicker = () => {
        setAreaShowPicker(false)
        setBranchCode('')
        setShopCode('');
        setEmpCode('');
    }
    useEffect(() => {
        getBranch();
        _onFilter(month, 0, '', '', '')
    }, []);

    const _onFilter = async (month, sort, branchCode, shopCode, empCode) => {
        console.log(month, sort, branchCode, shopCode, empCode)
        setAreaShowPicker(false)
        await getFixedWageSalary(month, sort, branchCode, shopCode, empCode).then((data) => {
            if (data.status == "success") {
                setDetailEmployeeList(data.data)
            }
            if (data.status == "failed") {
                console.log(data.message)
            }
        })
    }

    return (
        <SafeAreaView style={{ backgroundColor: colors.primary }}>
            <NormalHeader extStyle={{ marginTop: statusbarHeight }} screenName={"Luong co dinh"} selectOption={() => navigation.navigate("LogoutModal")} />
            <YearMonthPicker width={width - fontScale(164)} style={{ alignSelf: 'center', marginTop: -fontScale(10) }} onChangeDate={(date) => _setDate(date)} date={month} />
            <View>
                <SearchBar
                    style={styles.searchBar}
                    leftIcon={images.subscription}
                    selectPicker
                    placeholder={"Tìm kiếm nhân viên"}
                    onShowSelect={() => _showAreaPicker()} />
            </View>
            {
                isLoading == true ? <ActivityIndicator size="small" color={colors.white} style={{ alignSelf: 'center' }} /> : <View />
            }
            <BodyScreenAdmin style={{
                marginTop: fontScale(45), borderTopLeftRadius: fontScale(35),
                borderTopRightRadius: fontScale(35)
            }} level={3}
                branchCode={branchCodeLabel}
                districtCode={shopCodeLabel}
                empCode={empCodeLabel} />
            <View style={{
                backgroundColor: colors.white, height: height / 1.73 + fontScale(45), marginTop: -fontScale(30),
                borderTopLeftRadius: fontScale(30),
                borderTopRightRadius: fontScale(30)
            }}>
                {
                    isLoading == true ? <ActivityIndicator size="small" color={colors.primary} />
                        : null
                }
                <Text style={styles.messageStyle}>{message}</Text>
                <FlatList
                    data={detailEmployeeList}
                    showsVerticalScrollIndicator={true}
                    showsHorizontalScrollIndicator={false}
                    initialNumToRender={20}
                    onEndReachedThreshold={0}
                    key={(item, index) => 'item-' + index}
                    keyExtractor={(item, index) => 'item-' + index}
                    renderItem={({ item, index }) => <OneItemAdmin item={item} index={index} title={[item.newSubAmount, item.pckAmount, item.totalMoney, item.vlrRatio]} screen={"AdminFixedWagesSalary"} />} />
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showAreaPicker}
                onRequestClose={() => {
                    onShowSelectPicker();
                }}
            >
                <View style={{ flex: 3 / 10 }}>

                </View>
                <View style={{ flex: 7 / 10 }}>
                    <View style={styles.selectModalUpdate}>
                        <View style={styles.modalTitle}>
                            <Text style={styles.title}>Vui lòng chọn khu vực</Text>
                            <TouchableOpacity onPress={() => onShowSelectPicker()} style={{ marginTop: fontScale(20) }}>
                                <Image source={images.close} resizeMode="cover" style={styles.closeIcon} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', top: fontScale(20), alignSelf: 'center', justifyContent: 'center', marginBottom: fontScale(50) }}>
                            <Button text="Top 10 Highest" icon={images.top10highest} color="white"
                                iconStyle={{ marginTop: fontScale(8) }}
                                styleText={{ color: "#707070", paddingRight: fontScale(5), marginLeft: -fontScale(5), marginTop: fontScale(8) }}
                                color={buttonColorHighest}
                                style={{
                                    marginRight: 18.2, width: fontScale(181),
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 10,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                    elevation: 5,
                                }}
                                onClick={() => onClickHighest()} />
                            <Button text="Top 10 Lowest" icon={images.top10lowest} color="white"
                                iconStyle={{ marginTop: fontScale(8) }}
                                color={buttonColorLowest}
                                styleText={{ color: "#707070", paddingRight: fontScale(5), marginLeft: -fontScale(5), marginTop: fontScale(8) }}
                                style={{
                                    width: fontScale(181),
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 10,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                    elevation: 5,
                                }}
                                onClick={() => onClickLowest()} />
                        </View>
                        <SearchableDropDown
                            items={empListSelect}
                            selectedItems={empSearch}
                            onItemSelect={(item) => {
                                setEmpSearch(item)
                                setAreaShowPicker(false);
                                onClickSelect(item.id)
                            }}
                            textInputProps={
                                {
                                    placeholder: "Tìm kiếm nhân viên",
                                    placeholderTextColor: "#000000",

                                    style: {
                                        padding: 10,
                                        backgroundColor: '#F6F5F5',
                                        marginHorizontal: height * 0.0369458128078818,
                                        flexDirection: 'row',
                                        borderRadius: height * 0.018472906,
                                        paddingHorizontal: height * 0.022167488,
                                        justifyContent: 'space-between'
                                    },
                                    onTextChange: text => { }
                                }
                            }
                            itemStyle={{
                                padding: 10,
                                marginTop: 2,
                                backgroundColor: '#ddd',
                                borderColor: '#bbb',
                                borderWidth: 1,
                                borderRadius: 5,
                            }}
                            itemsContainerStyle={{ maxHeight: 200 }}
                        />
                        <AreaPicker open={openBranch} label={branchCodeLabel} title="Chi nhánh" placeholder="Chi nhánh" style={{ marginTop: fontScale(18) }} data={branchList} code="branch" onChangeText={(item) => _onChangeBranch(item.shop_code, item.shop_name)} />
                        <AreaPicker open={openDistrict} label={shopCodeLabel} title="Khu vực" placeholder="Khu vực" style={{ marginTop: fontScale(18) }} data={shopList} code="district" onChangeText={(item) => _onChangeShop(item.shop_code)} />
                        <AreaPicker open={true} label={empCodeLabel} title="Nhân viên bán hàng" placeholder="Nhân viên bán hàng" style={{ marginTop: fontScale(18) }} data={empList} code="member" onChangeText={(item) => _onChangeEmp(item.member_code)} />
                        <View style={{ flexDirection: 'row', top: fontScale(40), alignSelf: 'center', justifyContent: 'center' }}>
                            <Button text="Hủy" icon={images.cancle} color="#F80022" style={{ marginRight: 13.2 }} onClick={() => onShowSelectPicker()} />
                            <Button text="Tìm kiếm" icon={images.search} color="#2092ED" onClick={() => _onFilter(month, sort, branchCode, shopCode, empCode)} />
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const phoneArray = [
    { "id": 1, "phoneNumber": "Thuan","address":"ABC" },
    { "id": 2, "phoneNumber": '988334377',"address":"DEF" },
    { "id": 3, "phoneNumber": "0989554123","address":"GHI" },
    { "id": 4, "phoneNumber": "0989667453","address":"KLM" },
    { "id": 5, "phoneNumber": "0355196256","address":"XYZ" }
]

const TestThree = () => {
    return (
        <SafeAreaView>
            <Search withDropdown placeholder="Nhập mã nhân viên" dataNotFoundText="Không tìm thấy nhân viên" data={phoneArray}
                fieldSearch={phoneArray.map((item)=>item.phoneNumber)}
                onSelectValue={(value)=>console.log(value)}
                style={{marginTop:50,marginHorizontal:10}}
                width={width-20}
                 />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        flex: 1
    },
    messageStyle: {
        color: colors.primary, alignSelf: 'center', fontSize: fontScale(15), position: "absolute", top: fontScale(30)
    },
    col1Style: {
        width: width / 2, textAlign: "center", color: '#20B8B8', fontSize: fontScale(16), fontWeight: 'bold'
    },
    col2Style: {
        color: '#20B8B8', fontSize: fontScale(16), fontWeight: 'bold', textAlign: "center", width: width / fontScale(10)
        // ...Platform.select({
        //     ios: {
        //         width: fontScale(48)
        //     },
        //     android: {
        //         width: width / fontScale(10)
        //     }
        // })
    },
    col3Style: {
        color: '#20B8B8', fontSize: fontScale(16), fontWeight: 'bold', textAlign: "center", width: width / fontScale(7)
    },
    col4Style: {
        color: '#20B8B8', fontSize: fontScale(16), fontWeight: 'bold', width: width / fontScale(6), textAlign: "center"
    },
    col5Style: {
        color: '#20B8B8', fontSize: fontScale(16), fontWeight: 'bold', width: width / 1.5, textAlign: "center"
    },
    searchBar: {
        marginTop: 0.01586 * height,
        width: height * 0.3694581280788177,
        alignSelf: "center"
    },
    selectModal: { backgroundColor: '#fff', marginTop: height / 2, height: height / 2 + 100, borderRadius: height * 0.0492610837438424 },
    selectModalUpdate: {
        backgroundColor: '#fff', height: height / (1.6), borderRadius: 30,
        position: "absolute", bottom: fontScale(55), width: width
    },
    modalTitle: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 },
    title: { flex: 1, textAlign: 'center', marginTop: 10, alignSelf: 'center', fontSize: height * 0.0221674876847291, fontWeight: 'bold' },
    closeIcon: { width: 20, height: 20, alignSelf: 'flex-end' }
})
export default Test;