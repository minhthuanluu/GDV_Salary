import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView, View } from 'react-native';
import { Body, DatePicker, Header, MenuItem } from '../../../comps';
import { styles } from './style';
import { colors } from '../../../utils/Colors';
import { width } from '../../../utils/Dimenssion';
import { fontScale } from '../../../utils/Fonts';
import { images } from '../../../utils/Images';
import { text } from '../../../utils/Text';
import { getTransInfoDashboard } from "../../../api";
import moment from 'moment';
import { useNavigation } from '@react-navigation/core';
import Toast from 'react-native-toast-message';
import { ActivityIndicator } from 'react-native';

function index(props) {
    const [month, setMonth] = useState(moment(new Date()).format("MM/YYYY"));
    const [data, setData] = useState({"isValue": true,"emAmount": null});
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);


    const getData = async (month) => {
        setLoading(true)
        await getTransInfoDashboard(navigation, month).then((res) => {
            if (res.status == "success") {
                setLoading(false);
                setData(res.data);
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

    const _onChangeMonth = async(value) => {
        await getData(value);
    }

    useEffect(() => {
        getData(month);
    }, [navigation])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
            <StatusBar translucent backgroundColor={colors.primary} />
            <Header title={text.transactionsInfo} />
            <DatePicker month={month} width={width - fontScale(120)} style={{ alignSelf: "center" }} onChangeDate={(date) => _onChangeMonth(date)} />
            <Body style={{ marginTop: fontScale(27) }} showInfo={false} />
            <View style={styles.body}>
                {loading==true ? <ActivityIndicator size="small" color={colors.primary}/> : null}
                <MenuItem style={{ marginTop: fontScale(30) }} title={text.violateWarning} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.warning} width={width - fontScale(60)} value={data.emAmount} onPress={() => navigation.navigate("AdminViolateWarningDashboard",{"month":month})} />
                <MenuItem style={{ marginTop: fontScale(60) }} title={text.statistical} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.growthday} iconStyle={{ width: fontScale(60), height: fontScale(80), marginTop: -15 }} width={width - fontScale(60)} onPress={() => navigation.navigate("AdminTopTellers")} />
            </View>
        </SafeAreaView>
    );
}

export default index;