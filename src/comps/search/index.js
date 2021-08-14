import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Image } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Modal } from 'react-native';
import { View, TextInput, Text } from 'react-native';
import { colors } from '../../utils/Colors';
import { height, width } from '../../utils/Dimenssion';
import { fontScale } from '../../utils/Fonts';
import { images } from '../../utils/Images';
import { text } from '../../utils/Text';
import { styles } from './styles';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import DataPicker from '../datapicker/index';
import Button from '../button';
import { _retrieveData } from '../../utils/Storage';

const Search = (props) => {
    const { withDropdown, data, dataNotFoundText, keyboardType, style, main,loadingBranch,loadingShop } = props;
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [searchData, setSearchData] = useState(data || props.dataFour);
    const [searchValue, setSearchValue] = useState('');
    const [searchAlert, setSearchAlert] = useState(false);
    const [selectModal, setSelectModal] = useState(false);
    const [valueOne, setValueOne] = useState('');
    const [radioValue, setRadioValue] = useState(1);
    const [multiChoice, setMultiChoice] = useState(false);
    const [searchAlert2, setSearchAlert2] = useState(false)
    const [selectModalAdvanced, setSelectModalAdvanced] = useState(false)
    const [itemData4, setItemData4] = useState('')
    const [dataFourTemp, setDataFourTemp] = useState(props.dataThree);
    const [flatListHeight, setFlatlistHeight] = useState(fontScale(100));
    const [onSearch, setOnSearch] = useState('');

    const [dataOne, setDataOne] = useState('')
    const [dataTwo, setDataTwo] = useState('')
    const [dataThree, setDataThree] = useState('')

    const onChangeText = (text = '') => {
        setSearchAlert(true)
        let newData = data.filter((item) => {
            const itemData = `${Object.values(item).toString().toLowerCase()}`;
            return itemData.indexOf(text.toString().toLowerCase()) > -1;
        });
        if (text.length > 0) {
            setLoading(true);
            if (newData.length == 0) {
                setLoading(false);
                setMessage(dataNotFoundText);
                setSearchData([]);
            } else {
                setLoading(false);
                setMessage("");
                setSearchData(newData);
            }
        } else {
            setSearchData(props.data);
            setLoading(false);
            setMessage("");
        }
    }

    useEffect(() => {
        if (withDropdown && !data) console.warn("Search Component\nYou must provide the required array of data")
        if (withDropdown && !dataNotFoundText) console.warn("Search Component\nYou must provide 'data not found' text while data was not founded")
        const getUserRole = async () => {
            await _retrieveData("userInfo").then((item) => {
                if (item != null) {
                    if (item.userId.userGroupId.code == "ADMIN" || item.userId.userGroupId.code == "VMS_CTY") {
                        setMultiChoice(true);
                    } else if (item.userId.userGroupId.code == "MBF_CHINHANH" || item.userId.userGroupId.code == "MBF_CUAHANG") {
                        setMultiChoice(false);
                    }
                }
            })
        }

        getUserRole();
    })

    var radio_props = [
        { label: 'Top cao nhất', value: 1 },
        { label: 'Top thấp nhất', value: 0 }
    ];

    const onChangePickerOne = (value) => {
        props.onChangePickerOne(value);
        setValueOne(value);
    }

    const _onPressOK = () => {
        let radio = radioValue;
        let shopName = valueOne.shopName;
        let shopCode = valueOne.shopCode;
        // props.onPressOK({valueOne, radioValue })
        props.onPressOK({ "radio": radio, "shopCode": shopCode, "shopName": shopName })
        setSelectModal(!selectModal);
    }

    const onRadioPress = (value) => {
        setRadioValue(value)
    }


    const _onPressAdminOK = (dataOne, dataTwo, dataThree) => {
        setSelectModalAdvanced(!selectModalAdvanced)
        console.log("advanced search")
        console.log('dataOne:')
        console.log(dataOne)
        console.log('\ndataTwo:\n')
        console.log(dataTwo)
        console.log('\ndataThree:')
        console.log(dataThree)
        let data = {
            "branchCode": dataOne.shopCode == undefined ? "" : dataOne.shopCode,
            "branchName": dataOne.shopName == undefined ? "" : dataOne.shopName,
            "shopCode": dataTwo.shopCode == undefined ? "" : dataTwo.shopCode,
            "shopName": dataTwo.shopName == undefined ? "" : dataTwo.shopName,
            "empId": dataThree.id == undefined ? "" : dataThree.id,
            "empCode": dataThree.maGDV == undefined ? "" : dataThree.maGDV,
            "empName": dataThree.fullName == undefined ? "" : dataThree.fullName
        }
        props.onPress(data)
    }

    const _onShowModal = () => {
        setSelectModalAdvanced(!selectModalAdvanced);
        setDataOne("");
        setDataTwo("");
        setDataThree("")
    }
    return (
        props.searchSelectModalFourCondition ?
            <View >
                <TouchableOpacity style={{ backgroundColor: colors.white, width: props.width || width - fontScale(120), alignSelf: "center", padding: fontScale(5), borderRadius: fontScale(10), marginVertical: fontScale(15), flexDirection: "row" }}
                    onPress={() => _onShowModal()}>
                    <Image source={props.leftIcon} resizeMode="cover" style={{ width: fontScale(25), height: fontScale(25) }} />
                    <Text style={{ flex: 1, textAlign: "center", textAlignVertical: "center", paddingTop: fontScale(5) }}>{props.placeholder}</Text>
                    <Image resizeMode="contain" source={props.rightIcon} style={{ width: fontScale(20), height: fontScale(20), top: fontScale(3), right: fontScale(10) }} />
                </TouchableOpacity>
                <Modal
                    statusBarTranslucent={true}
                    animationType={'slide'}
                    transparent={true}
                    visible={selectModalAdvanced}
                    onRequestClose={() => setSelectModalAdvanced(!selectModalAdvanced)}>
                    <TouchableOpacity style={{ flex: 3 / 2.2 }} onPress={() => setSelectModalAdvanced(!selectModalAdvanced)}>

                    </TouchableOpacity>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>{props.modalTitle}</Text>
                        <SelectDataWithRightText loading={loadingBranch} leftText={props.defaultLabelOne||"Chọn chi nhánh"} title="Vui lòng chọn" data={props.dataOne} onPress={(item) => { props.onPressDataOne(item), setDataOne(item) }} />
                        <SelectDataWithRightText loading={loadingShop} leftText={props.defaultLabelTwo||"Chọn cửa hàng"} title="Vui lòng chọn" data={props.dataTwo} onPress={(item) => { props.onPressDataTwo(item), setDataTwo(item) }} />
                        <SelectDataWithRightText showLiveSearch showName leftText={"Chọn giao dịch viên"} title="Vui lòng chọn" data={props.dataThree} onPress={(item) => { props.onPressDataThree(item), setOnSearch(false), setItemData4(onSearch == true ? itemData4 : Object.values(item)[1]), setDataThree(item) }} />
                        <View style={{ flexDirection: "row", alignSelf: "center", position: "absolute", bottom: fontScale(50) }}>
                            <Button wIcon style={{ marginRight: fontScale(30) }} label={text.cancle} color="red" width={fontScale(100)} icon={images.closeline} onPress={() => setSelectModalAdvanced(!selectModalAdvanced)} />
                            <Button wIcon style={{ marginLeft: fontScale(30) }} label={text.search} color="#32A2FC" width={fontScale(100)} icon={images.sendline} onPress={() => _onPressAdminOK(dataOne, dataTwo, dataThree)} />
                        </View>
                    </View>
                </Modal>
            </View>
            :
            withDropdown
                ?
                <View style={[style, { width: props.width, alignSelf: "center" }]}>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: colors.white, borderRadius: fontScale(10) }}>
                        <TextInput keyboardType={keyboardType} defaultValue={searchValue} placeholder={props.placeholder} style={[{ flex: 1, padding: fontScale(10), borderRadius: fontScale(10) }]} onChangeText={props.onChangeText, (text) => onChangeText(text)} placeholderTextColor={colors.grey} />
                        <Image source={images.searchlist} resizeMode="cover" style={{ width: fontScale(20), height: fontScale(20), right: fontScale(10) }} />
                    </View>
                    {message.length > 0 ? <Text style={styles.message}>{message}</Text> : null}
                    {loading == true ? <ActivityIndicator color={colors.primary} size="small" /> : null}
                    {
                        searchAlert == true ?
                            <FlatList
                                style={{ color: colors.black, backgroundColor: colors.white }}
                                data={searchData}
                                keyExtractor={(item, key) => key.toString()}
                                renderItem={({ item, index }) => {
                                    return <TouchableOpacity style={{ width: width, backgroundColor: main == true ? colors.lightGrey : index % 2 == 0 ? colors.lightGrey : colors.white }} onPress={() => [setSearchValue(Object.values(item)[props.searchIndex]), setSearchAlert(!searchAlert), props.onSelectValue(Object.values(item)[props.searchIndex])]}>
                                        <Text style={{ padding: fontScale(10) }}>{item ? Object.values(item)[props.searchIndex] : null}</Text>
                                    </TouchableOpacity>
                                }} />
                            :
                            null
                    }
                </View>
                :
                props.searchSelectModal
                    ?
                    <View>
                        <TouchableOpacity onPress={() => setSelectModal(!selectModal)} style={[{ flexDirection: 'row', width: props.width, paddingVertical: fontScale(2), marginHorizontal: width - (width - props.width / 12), backgroundColor: "white" }, props.style, styles.homeSearch]}>
                            <Image resizeMode="contain" source={props.leftIcon} style={styles.leftIco} />
                            <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
                                <Text style={[styles.placeholder]}>{text.search}</Text>
                            </View>
                            <Image resizeMode="contain" source={props.rightIcon} style={styles.rightIco} />
                        </TouchableOpacity>

                        <Modal
                            statusBarTranslucent={true}
                            animationType={'slide'}
                            transparent={true}
                            visible={selectModal}
                            onRequestClose={() => setSelectModal(!selectModal)}>
                            <TouchableOpacity style={{ flex: 2 }} onPress={() => setSelectModal(!selectModal)}>

                            </TouchableOpacity>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalTitle}>{props.modalTitle}</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: fontScale(30), marginTop: fontScale(20) }}>
                                    <RadioForm
                                        radio_props={props.data || radio_props}
                                        initial={props.initialRadio}
                                        formHorizontal
                                        labelStyle={{ marginRight: fontScale(90) }}
                                        onPress={(value) => onRadioPress(value)}
                                    />
                                </View>
                                <View style={{ marginBottom: fontScale(5) }}>
                                    {
                                        props.loading == true ? <ActivityIndicator color={colors.primary} style={{ position: "absolute", alignSelf: "center", marginTop: -fontScale(5) }} size="small" /> : null
                                    }
                                </View>
                                {
                                    multiChoice == true ? props.showPicker[0] == true && props.dataOne ?
                                        <DataPicker
                                            advancedSearch
                                            placeholder={props.placeholder}
                                            data={props.dataOne && props.dataOne}
                                            fixed={props.fixed}
                                            width={width - fontScale(65)}
                                            fixedData={props.fixedData}
                                            field={props.fieldOne}
                                            fieldKey={props.fieldOne[0]}
                                            onPress={(item, index) => onChangePickerOne(item)}
                                            style={{ marginTop: fontScale(20), marginRight: fontScale(5) }}
                                        /> : null :
                                        <DataPicker
                                            advancedSearch
                                            fixed={props.fixed}
                                            placeholder={props.placeholder}
                                            data={props.dataOne && props.dataOne}
                                            width={width - fontScale(65)}
                                            fixedData={props.fixedData}
                                            field={props.fieldOne}
                                            fieldKey={props.fieldOne[0]}
                                            onPress={(item, index) => onChangePickerOne(item)}
                                            style={{ marginTop: fontScale(20), marginRight: fontScale(5) }}
                                        />
                                }

                                {
                                    props.showPicker[1] == true && props.dataTwo ?
                                        <DataPicker
                                            advancedSearch
                                            data={props.dataTwo && props.dataTwo}
                                            fixed={props.fixed}
                                            width={width - fontScale(65)}
                                            field={props.fieldTwo}
                                            fieldKey={props.fieldTwo}
                                            onPress={props.onChangePickerTwo}
                                            style={{ marginTop: fontScale(20), marginRight: fontScale(5) }}
                                        /> : null
                                }
                                {
                                    props.showPicker[2] == true && props.dataThree ?
                                        <DataPicker
                                            advancedSearch
                                            data={props.dataThree && props.dataThree}
                                            fixed={props.fixed}
                                            width={width - fontScale(65)}
                                            field={props.fieldThree}
                                            fieldKey={props.fieldThree}
                                            onPress={props.onChangePickerThree}
                                            style={{ marginTop: fontScale(20), marginRight: fontScale(5) }}
                                        /> : null
                                }
                                <View style={{ flexDirection: "row", alignSelf: "center", position: "absolute", bottom: fontScale(50) }}>
                                    <Button wIcon style={{ marginRight: fontScale(30) }} label={text.cancle} color="red" width={fontScale(100)} icon={images.closeline} onPress={() => setSelectModal(!selectModal)} />
                                    <Button wIcon style={{ marginLeft: fontScale(30) }} label={text.search} color="#32A2FC" width={fontScale(100)} icon={images.sendline} onPress={() => _onPressOK()} />
                                </View>
                            </View>
                        </Modal>
                    </View> :
                    <View onPress={() => setSelectModal(!selectModal)} style={[{ flexDirection: 'row', width: props.width, paddingVertical: fontScale(2), marginHorizontal: width - (width - props.width / 12), backgroundColor: "white" }, props.style, styles.homeSearch]}>
                        <Image resizeMode="contain" source={props.leftIcon} style={styles.leftIco} />
                        <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
                             <TextInput placeholder={props.placeHolder} textAlign="center" keyboardType={props.keyboardType} onChangeText={props.onChangeText}/>
                        </View>
                        <Image resizeMode="contain" source={props.rightIcon} style={styles.rightIco} />
                    </View>
    );
}

const SelectDataWithRightText = (props) => {
    const [selectedData, setSelectedData] = useState(props.leftText);
    const [selectModalAdvanced, setSelectModalAdvanced] = useState(false)
    const [rightText, setRightText] = useState('Tất cả');
    const [tempData, setTempData] = useState([]);
    const [loading, setLoading] = useState(props.loading);
    const [message, setMessage] = useState('')

    const onChangeSearch = (text = '') => {
        let newData = props.data.filter((item) => {
            const itemData = `${Object.values(item).toString().toLowerCase()}`;
            return itemData.indexOf(text.toString().toLowerCase()) > -1;
        });

        if (text.length > 0) {
            setLoading(true);
            if (newData.length == 0) {
                setLoading(false);
                setMessage("Không tìm thấy dữ liệu");
                setTempData([]);
            } else {
                setLoading(false);
                setMessage("");
                setTempData(newData);
            }
        } else {
            setTempData(props.data);
            setLoading(false);
            setMessage("");
        }
    }

    return (
        <View style={{ backgroundColor: colors.lightGrey, marginHorizontal: fontScale(30), padding: fontScale(5), borderRadius: fontScale(15), marginTop: fontScale(20) }}>
            <TouchableOpacity style={{ flexDirection: "row", paddingVertical: fontScale(5) }} onPress={() => setSelectModalAdvanced(!selectModalAdvanced)}>
                <Text style={{ textAlignVertical: "center", paddingVertical: fontScale(5), marginLeft: fontScale(10) }}>{(selectedData || item) || props.leftText || props.data[0]}</Text>
                <Text style={{ textAlign: "right", position: "absolute", right: 0, margin: fontScale(10) }}>{rightText}</Text>
            </TouchableOpacity>
            <Modal
                statusBarTranslucent={true}
                animationType={'slide'}
                transparent={true}
                visible={selectModalAdvanced}
                onRequestClose={() => setSelectModalAdvanced(!selectModalAdvanced)}>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => setSelectModalAdvanced(!selectModalAdvanced)}>

                </TouchableOpacity>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>{props.title}</Text>
                    {props.showLiveSearch ? <View style={{ flexDirection: "row" }}>
                        <TextInput
                            style={{ marginTop: fontScale(30), marginHorizontal: fontScale(15) }}
                            placeholder="Tìm kiếm mã nhân viên"
                            value={props.data}
                            placeholderTextColor={colors.black}
                            onChangeText={(text) => onChangeSearch(text)}
                        />
                        <Image source={images.searchlist} resizeMode="cover" style={{ width: fontScale(20), height: fontScale(20), position: "absolute", bottom: fontScale(2), right: fontScale(30) }} />
                    </View> : null}
                    {
                        console.log(props.loading)
                    }
                    {
                        props.loading == true ? <ActivityIndicator size="small" color={colors.primary} /> : null
                    }
                    {message.length>0 ? <Text style={{textAlign:"center",color:colors.primary,marginTop:fontScale(10)}}>{message}</Text>: null} 
                    {
                        props.showLiveSearch ?
                            <FlatList
                                style={{ marginTop: fontScale(20) }}
                                data={tempData}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => <TouchableOpacity onPress={() => { props.onPress(item), setRightText(""), setSelectModalAdvanced(!selectModalAdvanced), setSelectedData(Object.values(item)[2] + " - " + Object.values(item)[1] == null ? "" : Object.values(item)[1] || item.fullName) }} style={{ padding: fontScale(15), backgroundColor: index % 2 ? colors.white : colors.lightGrey }}><Text>{props.showName ? Object.values(item)[1] == null ? Object.values(item)[2] : Object.values(item)[1] + ' - ' + Object.values(item)[2] : Object.values(item)[1]}</Text></TouchableOpacity>}
                            /> :
                            <FlatList
                                style={{ marginTop: fontScale(20) }}
                                data={props.data}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => <TouchableOpacity onPress={() => { props.onPress(item), setRightText(""), setSelectModalAdvanced(!selectModalAdvanced), setSelectedData(Object.values(item)[2] + " - " + Object.values(item)[1] == null ? "" : Object.values(item)[1] || item.fullName) }} style={{ padding: fontScale(15), backgroundColor: index % 2 ? colors.white : colors.lightGrey }}><Text>{props.showName ? Object.values(item)[1] == null ? Object.values(item)[2] : Object.values(item)[1] + ' - ' + Object.values(item)[2] : Object.values(item)[1]}</Text></TouchableOpacity>}
                            />
                    }
                </View>
            </Modal>
        </View>
    )
}

export default Search;