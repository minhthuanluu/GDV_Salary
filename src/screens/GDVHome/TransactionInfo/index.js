import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, View, ActivityIndicator, BackHandler } from 'react-native';
import { getProfile, getTransactionInfo } from '../../../api';
import { Body, DatePicker, Header, ListItem } from '../../../comps';
import { Transactioninfo, UserObj } from '../../../models/Data';
import { colors } from '../../../utils/Colors';
import { width } from '../../../utils/Dimenssion';
import { fontScale } from '../../../utils/Fonts';
import { images } from '../../../utils/Images';
import { thoundsandSep } from '../../../utils/Logistics';
import { text } from '../../../utils/Text';
import { styles } from './styles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const TransactionInfo = (props) => {
    const [month, setMonth] = useState(moment(new Date()).format("MM/YYYY"));
    const [data, setData] = useState(Transactioninfo);
    const [loading, setLoading] = useState(false);
    const [user, setUserData] = useState(UserObj)
    const navigation = useNavigation();

    const _setMonth = (value) => {
        setMonth(value)
        getData(value)
    }

    const getData = async (month) => {
        setLoading(true)
        await getTransactionInfo(month, navigation).then((res) => {
            if (res.status == "success") {
                setData(res.data);
                setLoading(false);
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

    const _getProfile = async () => {
        await getProfile(navigation).then((res) => {
            if (res.status == "success") {
                setLoading(false)
                setUserData(res.data)
            }
            if (res.status == "failed") {
                setLoading(false)
            }
        })
    }

    useFocusEffect(
        React.useCallback(() => {
            console.log('Transaction Info was focused');
            getData(month);
            _getProfile();
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

    return (
        <SafeAreaView style={{ backgroundColor: colors.primary, flex: 1 }}>
            <StatusBar translucent backgroundColor={colors.primary} />
            <Header title={text.transactionsInfo} />
            <DatePicker month={month} width={width - fontScale(120)} style={{ alignSelf: "center" }} onChangeDate={(date) => _setMonth(date)} />
            <Body style={styles.bodyScr} displayName={user.displayName} maGDV={user.gdvId.maGDV} />
            <View style={styles.body}>
                {
                    loading == false ?
                        <View style={styles.detailInfo}>
                            <ListItem icon={images.customer} title={text.customersCount} price={thoundsandSep(data.customerAmount)} />
                            <ListItem icon={images.transactionInformation} title={text.transactions} price={thoundsandSep(data.dealingsCount)} />
                            <ListItem icon={images.transAmount} title={text.transInfoAmount} price={thoundsandSep(data.transcInfoAmount)} />
                            <ListItem icon={images.nonesim} title={text.trans2CAmount} price={thoundsandSep(data.denyTwoC)} />
                            <ListItem icon={images.sim} title={text.transAmount} price={thoundsandSep(data.preToPostPaid)} />
                            <ListItem onPress={()=>navigation.navigate('NoRechargeCard',{"month":month})} style={styles.foneCardNoMoney} icon={images.foneCardNoMoney} iconStyle={{ marginTop: fontScale(19), marginLeft: 25 }} title={text.foneCardNoMoney} price={thoundsandSep(data.foneCardNoMoney)} />


                        </View> :
                        <ActivityIndicator size="small" color={colors.primary} />
                }
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaView>
    );
}

export default TransactionInfo;