import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { Image } from 'react-native';
import { FlatList } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { Modal } from 'react-native';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView, View } from 'react-native';
import Button from '../button'
import DatePicker from '../datepicker'
import { getAllBranch, getAllEmp, getAllShop } from '../../api';
import { colors } from '../../utils/Colors';
import { width } from '../../utils/Dimenssion';
import { fontScale } from '../../utils/Fonts';
import { images } from '../../utils/Images';
import { text } from '../../utils/Text';
import RadioForm from 'react-native-simple-radio-button';
import { getRole } from '../../utils/Logistics';

const index = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [showSubModal, setShowSubModal] = useState(false);
    const [showShopModal, setShowShopModal] = useState(false);
    const [showEmpModal, setShowEmpModal] = useState(false);
    const [branchList, setBranchList] = useState([]);
    const [shopList, setShopList] = useState([]);
    const [empList, setEmpList] = useState([]);
    const [empListTemp, setEmpListTemp] = useState([])
    const [branchName, setBranchName] = useState('Chọn chi nhánh');
    const [branchLabel, setBranchLabel] = useState('Tất cả');
    const [shopName, setShopName] = useState('Chọn cửa hàng');
    const [shopLabel, setShopLabel] = useState('Tất cả');
    const [empLabel, setEmpLabel] = useState('Tất cả');
    const [empName, setEmpName] = useState('Chọn giao dịch viên');

    const [loading, setLoading] = useState(false);
    const [branchCode, setBranchCode] = useState('')
    const [shopCode, setShopCode] = useState('')
    const [empCode, setEmpCode] = useState('')

    const [defaultBranchCode, setDefaultBranchCode] = useState('')
    const [defaultShopCode, setDefaultShopCode] = useState('')
    const [defaultEmpCode, setDefaultEmpCode] = useState('')

    const [message, setMessage] = useState('')
    const navigation = useNavigation();
    const [month, setMonth] = useState(props.month);

    const [radioValue, setRadioValue] = useState(1);
    const [fixed, setFixed] = useState(false);
    const [selected,setSelected] = useState(false)

    const getBranchList = async () => {
        await getAllBranch().then((data) => {
            if (data.status == "success") {
                setBranchList(data.data)
            }
        })
    }

    const getShopList = async (branchCode) => {
        if (branchCode == null) {
            await getAllShop(navigation, "").then((data) => {
                if (data.status == "success") {
                    setShopList(data.data)
                }
            })
        } else {
            await getAllShop(navigation, branchCode).then((data) => {
                if (data.status == "success") {
                    setShopList(data.data)
                }
            })
        }
    }

    const getEmpList = (branchCode, shopCode) => {
        if (branchCode == null && shopCode == null) {
            getAllEmp(navigation, "", "").then((data) => {
                if (data.status == "success") {
                    setEmpList(data.data);
                    setEmpListTemp(data.data)
                }
            })
        } else {
            getAllEmp(navigation, branchCode, shopCode).then((data) => {
                if (data.status == "success") {
                    setEmpList(data.data)
                    setEmpListTemp(data.data)
                }
            })
        }
    }


    const onChangeBranch = async (item) => {
        setSelected(true)
        if (item.shopCode == null) {
            setBranchLabel("Tất cả")
            setBranchName("Chọn chi nhánh")
            setShopName("Chọn cửa hàng")
            setBranchCode("");
            setShopCode("");
            setEmpCode("");
            setDefaultBranchCode("")
            setDefaultShopCode("")
            setDefaultEmpCode("")
            setShowSubModal(!showSubModal)
            await getShopList("")
        } else {
            setBranchName(item.shopName);
            setBranchCode(item.shopCode);
            setBranchLabel("");
            setShowSubModal(!showSubModal);
            await getShopList(item.shopCode);
        }
        setShopLabel("Tất cả")
        setShopName("Chọn cửa hàng")
        setEmpName("Chọn giao dịch viên")
        setEmpLabel("Tất cả")
    }

    const onChangeShop = async (item) => {
        if (item.shopCode == null) {
            setShopName("Chọn cửa hàng")
            setShopCode("")
            setShopLabel("Tất cả")
            setDefaultShopCode("")
            setShowShopModal(!showShopModal);
            getEmpList("", "");

        } else {
            setShopName(item.shopName)
            setShopLabel("");
            setShopCode(item.shopCode)
            setShowShopModal(!showShopModal);
            getEmpList(branchCode, item.shopCode);
            setShowShopModal(!showShopModal)
        }
        setEmpName("Chọn giao dịch viên")
        setEmpLabel("Tất cả")
    }

    const onChangeEmp = async (item) => {
        if (item.id == null) {
            setEmpName("Chọn giao dịch viên")
            setEmpCode("");
            setEmpLabel("Tất cả")
            setDefaultEmpCode("")
            setShowEmpModal(!showEmpModal)

        } else {
            setEmpName(item.fullName);
            setEmpLabel("")
            setEmpCode(item.id);
            setDefaultEmpCode(item.maGDV)
            setShowEmpModal(!showEmpModal)
        }
    }
    const onChangeEmpSearch = (value) => {
        let newData = empListTemp.filter((item) => {
            const itemData = `${item.fullName.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`;
            return itemData.indexOf(value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) > -1;
        });
        setMessage("")
        if (value.length > 0) {
            setLoading(true);
            if (newData.length == 0) {
                setLoading(false);
                setMessage(text.dataIsNull);
                setEmpListTemp([]);
            } else {
                setLoading(false);
                setEmpListTemp(newData);
            }
        } else {
            setEmpListTemp(empList);
            setLoading(false);
        }
    }

    const onChangeMonth = (month) => {
        setMonth(month);
        console.log({ "month": month, "branchCode": defaultBranchCode, "branchName": branchName, "shopCode": defaultShopCode, "shopName": shopName, "empCode": defaultEmpCode, "empName": empName })
        props.onDone({ "month": month, "branchCode": defaultBranchCode, "branchName": branchName, "shopCode": defaultShopCode, "shopName": shopName, "empCode": defaultEmpCode, "empName": empName })
    }

    const onDone = () => {
        setDefaultBranchCode(branchCode);
        setDefaultShopCode(shopCode);
        setDefaultEmpCode(empCode)
        setShowModal(!showModal)
        props.onDone({ "month": month, "branchCode": branchCode, "branchName": branchName, "shopCode": shopCode, "shopName": shopName, "empCode": empCode, "empName": empName });
    }
    useEffect(() => {
        getBranchList();
        getShopList("");
        getEmpList("", "");
        getRole().then((data) => {
            if (data.role == "VMS_CTY") {

            } else if (data.role == "MBF_CHINHANH") {
                setBranchName(data.shopName);
                setBranchCode(data.shopCode)
                setFixed(true)
            }else if (data.role == "MBF_CUAHANG") {
                setBranchName(data.branchName);
                setBranchCode(data.branchCode)
                setFixed(true)
            }
        })
    }, ['']);

    var radio_props = [
        { label: 'Top cao nhất', value: 1 },
        { label: 'Top thấp nhất', value: 0 }
    ];

    const onRadioPress = (value) => {
        setRadioValue(value)
    }

    const onChangeMonth2 = (month) => {
        setMonth(month);
        props.onDone ? props.onDone({"month": month,'radio':radioValue,'branchCode':branchCode}) : console.log('on Press');

    }

    const onDone2 = () => {
        props.onDone ? props.onDone({"month": month,'radio':radioValue,'branchCode':branchCode}) : console.log('on Press');
        setRadioValue(radioValue);
        setShowModal(!showModal)
    }

    return (
        <SafeAreaView>
            {
                props.full ? <View style={[styles.level1Container, props.style, { width: props.width, alignSelf: "center" }]}>
                    {props.hideMonthFilter ? null : <DatePicker month={month} width={width - fontScale(120)} style={{ alignSelf: "center", marginBottom: fontScale(10), marginTop: -fontScale(20) }} onChangeDate={(value) => onChangeMonth(value)} />}
                    <TouchableOpacity style={styles.level1SubContain} onPress={() => { setShowModal(!showModal), getBranchList(), getShopList(""), getEmpList("", "") }}>
                        <Image source={props.leftIcon} resizeMode="contain" style={styles.level1LeftIcon} />
                        <Text style={styles.level1Placeholder}>{props.placeholder}</Text>
                        <Image source={props.rightIcon} resizeMode="contain" style={styles.level1LeftIcon} />
                    </TouchableOpacity>
                    <Modal
                        statusBarTranslucent={true}
                        animationType={'slide'}
                        transparent={true}
                        visible={showModal}
                        onRequestClose={() => setShowModal(!showModal)}>
                        <TouchableOpacity style={{ flex: 3 / 2.2 }} onPress={() => setShowModal(!showModal)}>

                        </TouchableOpacity>
                        <View style={styles.level1ModalContainer}>
                            <Text style={styles.level1ModalTitle}>{props.modalTitle}</Text>
                            <TouchableOpacity style={[styles.select1Container, { width: props.select1Width }]} onPress={() => setShowSubModal(!showSubModal)}>
                                <Text style={styles.leftText}>{branchName ? branchName : props.select1LeftContainer}</Text>
                                <Text style={styles.rightText}>{branchLabel != "" ? branchLabel : props.select1RightContainer}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.select1Container, { width: props.select1Width, marginTop: fontScale(20) }]} onPress={() => setShowShopModal(!showShopModal)}>
                                <Text style={styles.leftText}>{shopName ? shopName : props.select2LeftContainer}</Text>
                                <Text style={styles.rightText}>{shopLabel != "" ? shopLabel : props.select2RightContainer}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.select1Container, { width: props.select1Width, marginTop: fontScale(20) }]} onPress={() => setShowEmpModal(!showEmpModal)}>
                                <Text style={styles.leftText}>{empName ? empName : props.select3LeftContainer}</Text>
                                <Text style={styles.rightText}>{empLabel != "" ? empLabel : props.select3RightContainer}</Text>
                            </TouchableOpacity>

                            {/* ------------ */}
                            <Modal
                                statusBarTranslucent={true}
                                animationType={'slide'}
                                transparent={true}
                                visible={showSubModal}
                                onRequestClose={() => setShowSubModal(!showSubModal)}>
                                <TouchableOpacity style={{ flex: 3 / 2.2 }} onPress={() => setShowSubModal(!showSubModal)}>

                                </TouchableOpacity>
                                <View style={styles.level1ModalContainer}>
                                    <Text style={styles.level1ModalTitle}>{props.modalTitle}</Text>
                                    {loading == true ? <ActivityIndicator size="small" color={colors.primary} /> : null}
                                    <FlatList
                                        data={branchList}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item, index }) => <TouchableOpacity onPress={() => onChangeBranch(item)} style={[styles.item, { backgroundColor: index % 2 ? colors.white : colors.lightGrey }]}>
                                            <Text>{item.shopName}</Text>
                                        </TouchableOpacity>}
                                    />
                                </View>
                            </Modal>
                            {/* ---------------- */}
                            <Modal
                                statusBarTranslucent={true}
                                animationType={'slide'}
                                transparent={true}
                                visible={showShopModal}
                                onRequestClose={() => setShowShopModal(!showShopModal)}>
                                <TouchableOpacity style={{ flex: 3 / 2.2 }} onPress={() => setShowShopModal(!showShopModal)}>

                                </TouchableOpacity>
                                <View style={styles.level1ModalContainer}>
                                    <Text style={styles.level1ModalTitle}>{props.modalTitle}</Text>
                                    {loading == true ? <ActivityIndicator size="small" color={colors.primary} /> : null}
                                    <FlatList
                                        data={shopList}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item, index }) => <TouchableOpacity onPress={() => onChangeShop(item)} style={[styles.item, { backgroundColor: index % 2 ? colors.white : colors.lightGrey }]}>
                                            <Text>{item.shopName}</Text>
                                        </TouchableOpacity>}
                                    />
                                </View>
                            </Modal>
                            {/* ---------------- */}
                            <Modal
                                statusBarTranslucent={true}
                                animationType={'slide'}
                                transparent={true}
                                visible={showEmpModal}
                                onRequestClose={() => setShowEmpModal(!showEmpModal)}>
                                <TouchableOpacity style={{ flex: 3 / 2.2 }} onPress={() => setShowEmpModal(!showEmpModal)}>

                                </TouchableOpacity>
                                <View style={styles.level1ModalContainer}>
                                    <Text style={styles.level1ModalTitle}>{props.modalTitle}</Text>
                                    {loading == true ? <ActivityIndicator size="small" color={colors.primary} /> : null}
                                    <View style={styles.searchInput}>
                                        <TextInput placeholder="Tìm kiếm họ và tên nhân viên" style={styles.input} onChangeText={(text) => onChangeEmpSearch(text)} />
                                        <Image source={props.rightIcon} resizeMode="contain" style={styles.inputRightIcon} />

                                    </View>
                                    {message ? <Text style={{ color: colors.primary, textAlign: "center", marginTop: fontScale(15), width: width }}>{message}</Text> : null}
                                    <FlatList
                                        data={empListTemp}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item, index }) => <TouchableOpacity onPress={() => onChangeEmp(item)} style={[styles.item, { backgroundColor: index % 2 ? colors.white : colors.lightGrey }]}>
                                            <Text>{item.fullName}</Text>
                                        </TouchableOpacity>}
                                    />
                                </View>
                            </Modal>
                        </View>
                        <View style={{ flexDirection: "row", alignSelf: "center", position: "absolute", bottom: fontScale(50) }}>
                            <Button wIcon style={{ marginRight: fontScale(30) }} label={text.cancle} color="red" width={fontScale(100)} icon={images.closeline} onPress={() => setShowModal(!showModal)} />
                            <Button wIcon style={{ marginLeft: fontScale(30) }} label={text.search} color="#32A2FC" width={fontScale(100)} icon={images.sendline} onPress={() => onDone()} />
                        </View>
                    </Modal>
                </View>
                    :
                    props.oneSelect
                        ?
                        <View style={props.style, { width: props.width, alignSelf: "center" }}>
                             {props.hideMonthFilter ? null : <DatePicker month={month} width={width - fontScale(120)} style={{ alignSelf: "center", marginBottom: fontScale(10) }} onChangeDate={(value) => onChangeMonth2(value)} />}
                            <TouchableOpacity style={styles.level1SubContain} onPress={() => { setShowModal(!showModal), getBranchList(), getShopList(""), getEmpList("", "") }}>
                                <Image source={props.leftIcon} resizeMode="contain" style={styles.level1LeftIcon} />
                                <Text style={styles.level1Placeholder}>{props.placeholder}</Text>
                                <Image source={props.rightIcon} resizeMode="contain" style={styles.level1LeftIcon} />
                            </TouchableOpacity>

                            <Modal
                                statusBarTranslucent={true}
                                animationType={'slide'}
                                transparent={true}
                                visible={showModal}
                                onRequestClose={() => setShowModal(!showModal)}>
                                <TouchableOpacity style={{ flex: 2.1 }} onPress={() => setShowModal(!showModal)}>

                                </TouchableOpacity>
                                <View style={styles.level1ModalContainer}>
                                    <Text style={styles.level1ModalTitle}>{props.modalTitle}</Text>
                                    <View style={{ alignSelf: "center" }}>
                                        <RadioForm
                                            radio_props={props.data || radio_props}
                                            initial={radioValue==0?1:0}
                                            formHorizontal
                                            animation={true}
                                            style={styles.radioForm}
                                            labelStyle={{ fontSize: fontScale(14) }}
                                            onPress={(value) => onRadioPress(value)}
                                        />
                                        {fixed == false ? <TouchableOpacity style={[styles.select1Container, { width: props.width }]} onPress={() => setShowSubModal(!showSubModal)}>
                                            <Text style={styles.leftText}>{branchName ? branchName : props.select1LeftContainer}</Text>
                                            <Text>{branchCode!="" ? "" : "Tất cả"}</Text>
                                        </TouchableOpacity>
                                            :
                                            <View style={[styles.select1Container, { width: props.width }]} onPress={() => setShowSubModal(!showSubModal)}>
                                                <Text style={styles.leftText}>{branchName ? branchName : props.select1LeftContainer}</Text>
                                            </View>
                                        }
                                        <Modal
                                            statusBarTranslucent={true}
                                            animationType={'slide'}
                                            transparent={true}
                                            visible={showSubModal}
                                            onRequestClose={() => setShowSubModal(!showSubModal)}>
                                            <TouchableOpacity style={{ flex: 3 / 2.2 }} onPress={() => setShowSubModal(!showSubModal)}>

                                            </TouchableOpacity>
                                            <View style={styles.level1ModalContainer}>
                                                <Text style={styles.level1ModalTitle}>{props.modalTitle}</Text>
                                                {loading == true ? <ActivityIndicator size="small" color={colors.primary} /> : null}
                                                <FlatList
                                                    data={branchList}
                                                    keyExtractor={(item, index) => index.toString()}
                                                    renderItem={({ item, index }) => <TouchableOpacity onPress={() => onChangeBranch(item)} style={[styles.item, { backgroundColor: index % 2 ? colors.white : colors.lightGrey }]}>
                                                        <Text>{item.shopName}</Text>
                                                    </TouchableOpacity>}
                                                />
                                            </View>
                                        </Modal>
                                    </View>
                                    <View style={{ flexDirection: "row", alignSelf: "center", position: "absolute", bottom: fontScale(50) }}>
                                        <Button wIcon style={{ marginRight: fontScale(30) }} label={text.cancle} color="red" width={fontScale(100)} icon={images.closeline} onPress={() => setShowModal(!showModal)} />
                                        <Button wIcon style={{ marginLeft: fontScale(30) }} label={text.search} color="#32A2FC" width={fontScale(100)} icon={images.sendline} onPress={() => onDone2()} />
                                    </View>
                                </View>
                            </Modal>
                        </View>
                        :
                        null
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    level1Container: {
        padding: fontScale(10),
        borderRadius: fontScale(20)
    },
    item: {
        padding: fontScale(10)
    },
    level1Select: {
        backgroundColor: colors.white,
        flex: 1,
        padding: fontScale(15)
    },
    level1SubContain: {
        backgroundColor: colors.white,
        borderRadius: fontScale(20),
        padding: fontScale(10),
        flexDirection: "row",
        alignItems: "center"
    },
    level1LeftIcon: {
        width: fontScale(20),
        height: fontScale(20)
    },
    level1Placeholder: {
        color: colors.black,
        flex: 1,
        paddingLeft: fontScale(15),
        textAlign: "center"
    },
    level1ModalContainer: {
        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: fontScale(30),
        borderTopRightRadius: fontScale(30),
        borderColor: colors.lightGrey,
        borderWidth: 1
    },
    level1ModalTitle: {
        textAlign: "center",
        paddingVertical: fontScale(20),
        fontSize: fontScale(17),
        fontWeight: "bold"
    },
    select1Container: {
        padding: fontScale(15),
        marginTop: fontScale(15),
        flexDirection: "row",
        alignSelf: "center",
        backgroundColor: '#f5f5f5',
        borderRadius: fontScale(15),
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 6
    },
    input: {
        padding: fontScale(13),

    },
    searchInput: {
        flexDirection: "row",
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: fontScale(10),
        backgroundColor: colors.white,
        marginHorizontal: fontScale(5),
        borderRadius: fontScale(20)
    },
    inputRightIcon: {
        width: fontScale(20),
        height: fontScale(20),
        position: "absolute",
        top: fontScale(11),
        right: fontScale(15)
    },
    rightText: {
        opacity: 0.43,
        fontSize: fontScale(15),
        fontWeight: "bold"
    },
    leftText: {
        fontWeight: "bold"
    },
    radioForm: { width: width - fontScale(65), justifyContent: "space-between" }
})

export default index;