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
import { checkUserRole } from '../../utils/Logistics';
import { _retrieveData } from '../../utils/Storage';

const Search = (props) => {
    const { withDropdown, data, dataNotFoundText, keyboardType, style, main } = props;
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [searchData, setSearchData] = useState(data);
    const [searchValue, setSearchValue] = useState('');
    const [searchAlert, setSearchAlert] = useState(false);
    const [selectModal, setSelectModal] = useState(false);
    const [valueOne, setValueOne] = useState('');
    const [radioValue, setRadioValue] = useState(1);
    const [multiChoice, setMultiChoice] = useState(false);

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
            });
            // await _retrieveData("searchData").then((item)=>setRadioValue(item.data.sort))
        }

        getUserRole();
    })

    

    const onChangePickerOne = (value) => {
        props.onChangePickerOne(value);
        setValueOne(value);
    }

    const _onPressOK = () => {
        let radio = radioValue;
        let shopName = valueOne.shopName;
        let shopCode = valueOne.shopCode;
        props.onPressOK({"radio":radioValue,"shopCode":shopCode,"shopName":shopName})
        setSelectModal(!selectModal);
    }

    const onRadioPress = (value) => {
        setRadioValue(value)
    }

    return (
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
                                    radio_props={props.data}
                                    initial={radioValue}
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
                                        showAll={props.showAll}
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
                                <Button wIcon style={{ marginRight: fontScale(30) }} label={text.cancle} color="red" width={fontScale(100)} icon={images.cancle} onPress={() => setSelectModal(!selectModal)} />
                                <Button wIcon style={{ marginLeft: fontScale(30) }} label={text.yes} color="green" width={fontScale(100)} icon={images.check} onPress={() => _onPressOK()} />
                            </View>
                        </View>
                    </Modal>
                </View> : null
    );
}



export default Search;