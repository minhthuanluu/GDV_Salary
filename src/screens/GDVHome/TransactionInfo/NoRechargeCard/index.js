import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, View, ActivityIndicator, BackHandler } from 'react-native';
import { Body, DatePicker, Header, ListItem, Search, Table, TableHeader } from '../../../../comps';
import { Transactioninfo, UserObj } from '../../../../models/Data';
import { colors } from '../../../../utils/Colors';
import { width } from '../../../../utils/Dimenssion';
import { fontScale } from '../../../../utils/Fonts';
import { images } from '../../../../utils/Images';
import { thoundsandSep, ToastNotif } from '../../../../utils/Logistics';
import { text } from '../../../../utils/Text';
import { styles } from './style';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { FlatList } from 'react-native';
import { Text } from 'react-native';
import { getNoRechargeCard } from '../../../../api';

const NoRechargeCard = (props) => {
    const route = useRoute();
    const [month, setMonth] = useState(route.params?.month || moment(new Date()).subtract(1, "months").format("MM/YYYY"));
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("")
    const navigation = useNavigation();
    const [searchData, setSearchData] = useState([])
    const _setMonth = async(value) => {
        setMonth(value);
        await getData(value);
    }

    const getData = async (month) => {
        setLoading(true);
        setSearchData([]);
        setData([])
        setMessage("")
        await getNoRechargeCard(navigation, month).then((res) => {
            
            if (res.status == "success") {
                if(res.data.data.length>0){
                    setData(res.data.data);
                    setSearchData(res.data.data);
                    setLoading(false);
                }else{
                    setMessage(text.dataIsNull)
                    setLoading(false)
                }
            }
            if (res.status == "failed") {
                ToastNotif('Cảnh báo', res.message, 'error', true);
                setLoading(false);
            }
            if (res.status == "v_error") {
                Toast.show({
                    text1: "Cảnh báo",
                    text2: res.message,
                    type: "error",
                    visibilityTime: 100,
                    autoHide: true,
                    onHide: () => navigation.navigate("Home")
                })
            }
        })
    }


    useFocusEffect(
        React.useCallback(() => {
            console.log('Transaction Info was focused');
            getData(month);
            return () => {
                console.log('Transaction Info was unfocused');
            };
        }, [])
    );

    useEffect(() => {
        const backAction = () => {
            navigation.goBack();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => {
            backHandler.remove();
        };

    }, []);

    const searchSub = (text = "") => {
        let newData = searchData.filter((item) => {
            const itemData = `${item.phoneNumber.toString()}`;
            return itemData.indexOf(text.toString()) > -1;
        });
        if (text.length > 0) {
            setLoading(true);
            if (newData.length == 0) {
                setLoading(false);
                setMessage("Không tìm thấy số thuê bao");
                setSearchData([]);
            } else {
                setLoading(false);
                setMessage("");
                setSearchData(newData);
            }
        } else {
            setData(data);
            setLoading(false);
            setSearchData(data)
            setMessage("");
        }
    }


    return (
        <SafeAreaView style={{ backgroundColor: colors.primary, flex: 1 }}>
            <StatusBar translucent backgroundColor={colors.primary} />
            <Header title={text.foneCardNoMoney1} />
            <DatePicker month={month} width={width - fontScale(120)} style={{ alignSelf: "center" }} onChangeDate={(date) => _setMonth(date)} />
            <Search
                style={styles.search}
                leftIcon={images.simlist}
                data={searchData}
                rightIcon={images.searchlist}
                dataNotFoundText="Không tìm thấy dữ liệu"
                onChangeText={(value) => searchSub(value)}
                placeHolder={text.searchSub}
                keyboardType="number-pad"
                style={{ marginTop: fontScale(15) }}
                width={width - fontScale(65)}
            />
            <Body style={styles.bodyScr} />
            <View style={styles.detailInfo}>
                <View style={{ flexDirection: "row", marginTop: fontScale(2) }}>
                    <TableHeader style={{ width: width / 4 }} styleTitle={{ textAlign: "center" }} title={text.activeDate} />
                    <TableHeader style={{ width: width / 4 }} title={text.phoneNum} />
                    <TableHeader style={{ width: width / 4 }} title={text.sumMoney} />
                    <TableHeader style={{ width: width / 4 }} title={text.rechargeDate} />
                </View>
                {message ? <Text style={{ fontSize: fontScale(15), color: colors.primary, textAlign: "center", marginTop: fontScale(20), width: width }}>{message}</Text> : null}
                {loading == true ? <ActivityIndicator size="small" color={colors.primary} style={{ marginTop: fontScale(20) }} /> : null}
                <FlatList
                    style={{ marginTop: fontScale(10) }}
                    keyExtractor={(item, index) => index.toString()}
                    data={searchData}
                    renderItem={({ item, index }) => {
                        return <View>
                            {
                                <View style={{ flexDirection: "row", backgroundColor: index % 2 ? colors.lightGrey : colors.white, paddingVertical: fontScale(8) }}>
                                    <Text style={{ width: width / 4, textAlign: "center", fontSize: fontScale(14), marginLeft: fontScale(5) }}>{item.executeDate}</Text>
                                    <Text style={{ width: width / 4, textAlign: "center", fontSize: fontScale(14) }}>{item.phoneNumber}</Text>
                                    <Text style={{ width: width / 4, textAlign: "center", fontSize: fontScale(14) }}>{item.totalMoney}</Text>
                                    <Text style={{ width: width / 4, textAlign: "center", fontSize: fontScale(14) }}>{item.rechargeDate}</Text>
                                </View>


                            }

                        </View>
                    }}
                />
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaView>
    );
}

export default NoRechargeCard;