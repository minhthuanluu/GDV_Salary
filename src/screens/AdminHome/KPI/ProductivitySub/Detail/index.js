import { useNavigation, useRoute } from '@react-navigation/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { StatusBar } from 'react-native';
import { FlatList } from 'react-native';
import { Text } from 'react-native';
import { SafeAreaView, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { getDetailProductivitySubByMonth } from '../../../../../api';
import { Body, DatePicker, GeneralListItem, Header } from '../../../../../comps';
import { colors } from '../../../../../utils/Colors';
import { navigation, width } from '../../../../../utils/Dimenssion';
import { fontScale } from '../../../../../utils/Fonts';
import { images } from '../../../../../utils/Images';
import { text } from '../../../../../utils/Text';
import { styles } from './style';

const ProductivitySubDetail = (props) => {
    const route = useRoute();
    const { shopCode,querymonth } = route.params;
    const navigation = useNavigation();

    const [month, setMonth] = useState(querymonth || moment(new Date()).format("MM/YYYY"));
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const _onChangeMonth = async (value) => {
        setMonth(value);
    }

    const getData = async (month) => {
        setLoading(true)
        await getDetailProductivitySubByMonth(navigation, month, shopCode).then((res) => {
            if (res.status == "success") {
                if (res.data.data.length > 0) {
                    setData(res.data.data);
                    setLoading(false)
                } else {
                    setData([]);
                    setMessage(text.dataIsNull);
                    setLoading(false)
                }
            }
            if (res.status == "failed") {
                ToastNotif('Cảnh báo', res.message, 'error', true);
                setLoading(false)
            }

            if (res.status == "v_error") {
                setLoading(false)
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
    useEffect(() => {
        getData(month);
    }, [month]);
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent backgroundColor={colors.primary} />
            <Header title={text.productivitySub} />
            <DatePicker month={month} width={width - fontScale(120)} style={{ alignSelf: "center" }} onChangeDate={(date) => _onChangeMonth(date)} />
            <Body style={{ marginTop: fontScale(20) }} />
            {/* <GeneralListItem company icon={images.company} titleArray={["TBTS","TBTT","VAS","KHTT","Bán lẻ","% Lên gói","TBTT","TBTS thoại gói >= 99k"]} item={["95% (100/100)","85% (100/100)","75%","190,000 / 200,000","10,234tr","0%","50TB - 45%","50TB - 45%"]} title={"2MFHCM1"} onPress={()=>console.log("abc")}/>
            <GeneralListItem columns rightIcon={images.customer} titleArray={["TBTS","TBTT","Lượt KH","Lượt GD"]} item={["9tr","1tr",15,150]} title={"2MFHCM1"} onPress={()=>console.log("abc")}/> */}

            <View style={{ backgroundColor: colors.white,flex:1 }}>
            <Text style={{ color: colors.primary, textAlign: "center" }}>{message ? message : null}</Text>
                {loading == true ? (
                    <ActivityIndicator
                        size="small"
                        color={colors.primary}
                        style={{ marginVertical: fontScale(10) }}
                    />
                ) : null}
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => <GeneralListItem
                        columns
                        index={index}
                        title={item.empName}
                        titleArray={["TBTS", "TBTT", "Lượt KH", "Lượt GD"]} item={[item.postPaid, item.prePaid, item.cusTurn, item.dealTurn]}
                    />}
                />
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaView>
    );
}

export default ProductivitySubDetail;