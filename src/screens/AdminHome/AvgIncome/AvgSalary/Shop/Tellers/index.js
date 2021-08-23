import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import { getAllAvgIncome } from '../../../../../../api';
import { Body, GeneralListItem, Header } from '../../../../../../comps';
import { useNavigation, useRoute } from '@react-navigation/core';
import { text } from '../../../../../../utils/Text';
import { styles } from './style';
import { ToastNotif } from '../../../../../../utils/Logistics';
import Toast from 'react-native-toast-message';
import { FlatList } from 'react-native';
import { images } from '../../../../../../utils/Images';
import { AvgSalary } from '../../../../../../models/Admin';
import { fontScale } from '../../../../../../utils/Fonts';
import { ActivityIndicator } from 'react-native';
import { colors } from '../../../../../../utils/Colors';

const index = (props) => {
    const [data, setData] = useState(AvgSalary);
    const [generalData, setGeneralData] = useState(AvgSalary.general);
    const [notification, setNotification] = useState('');
    const [message, setMessage] = useState('');
    const navigation = useNavigation();
    const route = useRoute();

    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setMessage('')
        setLoading(true)
        let branchCode = route.params?.branchItem.shopCode;
        let shopCode = route.params?.shopItem.shopCode;
        await getAllAvgIncome(navigation, branchCode, shopCode).then((res) => {
            if (res.status == "success") {
                if (res.data.data.length > 0) {
                    setData(res.data.data);
                    setGeneralData(res.data.general);
                    setNotification(res.data.notification);
                    setLoading(false);
                } else {
                    setData([]);
                    setMessage(res.message)
                    setLoading(false)
                }

            }
            if (res.status == "failed") {
                setLoading(false);
                ToastNotif('Cảnh báo', res.message, 'error', true);
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
        getData();
    }, [navigation])

    return (
        <SafeAreaView style={styles.container}>
            <Header title={text.salAverage} />
            <Text style={styles.notif}>{notification}</Text>
            <Body />
            <View style={styles.body}>
                {message ? <Text style={styles.message}>{message}</Text> : null}
                {loading == true ? <ActivityIndicator size="small" color={colors.primary} /> : null}
                <View style={{flex:1}}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={data}
                    keyExtractor={(item, key) => item.shopCode.toString()}
                    renderItem={({ item, index }) =>
                        <View style={{paddingBottom:index==data.length-1 ? fontScale(70): 0}}> 
                            <GeneralListItem key={index} columns title={item.shopName} titleArray={["Lương BQ", "Khoán sp"]} item={[item.avgIncome, item.contractSalary]} />
                            {
                                index == data.length - 1 ? 
                                    <GeneralListItem 
                                    styleCol1={{ marginLeft: fontScale(10) }}
                                    styleCol3={{ marginLeft: fontScale(10), marginTop: fontScale(10) }}
                                    styleCol2={{ marginLeft: fontScale(10), marginTop: fontScale(10) }} styleCol4={{ marginLeft: -fontScale(10) }}
                                    styleCol5={{ marginTop: fontScale(10), marginLeft: -fontScale(10) }}
                                    style={{ marginTop: -fontScale(10), marginHorizontal: fontScale(10), paddingHorizontal: fontScale(10) }}
                                    twoColumnCompany
                                    title={generalData.shopName}
                                    titleArray={["BQ lương 1 tháng/GDV", "BQ lương cố định:", "BQ lương KK:", "BQ Vas Affiliate:", "BQ lương khoán SP:", "BQ chi hỗ trợ:"]}
                                    item={[generalData.avgIncome, generalData.permanentSalary, generalData.incentiveSalary, generalData.avgVasAffiliate, generalData.contractSalary, generalData.spenSupport]} 
                                        icon={images.store} /> : null
                            }
                        </View>
                    } />
                </View>

            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaView>
    );
}

export default index;