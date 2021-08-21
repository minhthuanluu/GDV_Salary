
import { useRoute, useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { Text } from 'react-native';
import { SafeAreaView, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { getTransInfoDashboard, getTransInfoWarning, getViolate } from '../../../../api';
import { Body, DatePicker, GeneralListItem, Header, MenuItem } from '../../../../comps';
import { styles } from './style';
import { Violate, ViolateWarning } from '../../../../models/Admin';
import { colors } from '../../../../utils/Colors';
import { width } from '../../../../utils/Dimenssion';
import { fontScale } from '../../../../utils/Fonts';
import { text } from '../../../../utils/Text';

function index(props) {
    const route = useRoute();
    const [month, setMonth] = useState(route.params?.month);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(Violate);
    const [notification, setNotification] = useState('');
    const [message,setMessage] = useState("")

    const getData = async () => {
        setLoading(true);
        await getViolate(navigation).then((res) => {
            if (res.status == "success") {
                setLoading(false);
                if (res.length > 0) {
                    setData(res.data[0])
                    setNotification(res.data[0].notification)
                }
                if(res.length==0){
                    setMessage(text.dataIsNull)
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

    useEffect(() => {
        getData()
    }, [navigation])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
            <Header title={text.violateWarning} />
            {/* <Text style={styles.text}>{notification}</Text> */}
            <Text style={{ color: colors.white,fontWeight:"bold",fontSize:fontScale(14),marginBottom:fontScale(10), textAlign: "center" }}>{notification}</Text>

            <Body />
            <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>
                {loading == true ? <ActivityIndicator size="small" color={colors.primary} style={{ marginTop: fontScale(20) }} /> : null}
                <MenuItem width={width - fontScale(20)} titleMenuStyle={{fontSize:fontScale(15)}} style={{ marginBottom: fontScale(30),paddingVertical:fontScale(10) }} title="Chuyển Fast/MD1/MDT>=1TB" value={data.fast} onPress={() => navigation.navigate("AdminViolateSubscriberFast",{title:"Chuyển Fast/MD1/MDT>=1TB"})} />
                <MenuItem width={width - fontScale(20)} titleMenuStyle={{fontSize:fontScale(15)}} style={{ marginBottom: fontScale(30),paddingVertical:fontScale(10) }} title="Chuyển FCard>=3TB" value={data.fcard} onPress={() => navigation.navigate("AdminViolateSubscriberFCard", {title: "Chuyển FCard>=3TB" })} />
                <MenuItem width={width - fontScale(20)} titleMenuStyle={{fontSize:fontScale(15)}} style={{ marginBottom: fontScale(30),paddingVertical:fontScale(10) }} title="GDV vi phạm cả 2 nhóm trên" value={data.overThreeTime} onPress={() => navigation.navigate("AdminViolateSubscriberOverThree", {title: "GDV vi phạm cả 2 nhóm trên" })}/>
            </ScrollView>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaView>
    );
}

export default index;