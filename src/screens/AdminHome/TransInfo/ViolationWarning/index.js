
import { useRoute,useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Text } from 'react-native';
import { SafeAreaView,View } from 'react-native';
import Toast from 'react-native-toast-message';
import { getTransInfoDashboard, getTransInfoWarning } from '../../../../api';
import { Body, DatePicker, GeneralListItem, Header, MenuItem } from '../../../../comps';
import { ViolateWarning } from '../../../../models/Admin';
import { colors } from '../../../../utils/Colors';
import { width } from '../../../../utils/Dimenssion';
import { fontScale } from '../../../../utils/Fonts';
import { text } from '../../../../utils/Text';

function index(props) {
    const route = useRoute();
    const [month, setMonth] = useState(route.params?.month);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(ViolateWarning);

    const getData=async()=>{
        
        await getTransInfoWarning(navigation,month).then((res)=>{
            if (res.status == "success") {
                setLoading(false);
                if (res.length > 0) {
                    setData(res.data)
                    console.log(res.data)
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
    const _onChangeMonth=(value)=>{

    }

    useEffect(()=>{
        getData()
    },[navigation])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
            <Header title={text.violateWarning} />
            <DatePicker month={month} width={width - fontScale(120)} style={{ alignSelf: "center" }} onChangeDate={(date) => _onChangeMonth(date)} />
            <Body />
            <ScrollView style={{ flex: 1, backgroundColor: colors.white, }}>
                <MenuItem width={width-fontScale(20)} style={{marginBottom:fontScale(10)}} noneIcon title="GDV DKTT" titleArray={["GDV","Top"]} data={[data.resident.emp,data.resident.top]} onPress={()=>navigation.navigate("AdminEmpRegInfo",{"key":"resident",title:"GDV DKTT","month":month})}/>
                <MenuItem width={width-fontScale(20)} style={{marginBottom:fontScale(10)}} noneIcon title="GDV chặn 2c" titleArray={["GDV","Top"]} data={[data.denyTwoC.emp,data.denyTwoC.top]} onPress={()=>navigation.navigate("AdminEmpRegInfo",{"key":"denyTwoC",title:"GDV chặn 2c","month":month})}/>
                <MenuItem width={width-fontScale(20)} style={{marginBottom:fontScale(10)}} noneIcon title="GDV chuyển F-C" titleArray={["GDV","Top"]} data={[data.transFc.emp,data.transFc.top]} onPress={()=>navigation.navigate("AdminEmpRegInfo",{"key":"transFc",title:"GDV chuyển F-C","month":month})}/>
                <MenuItem width={width-fontScale(20)} style={{marginBottom:fontScale(10)}} noneIcon title="GDV chuyển F-C ko nạp tiền" titleArray={["","       "]} data={["",data.noRecharge]} onPress={()=>navigation.navigate("AdminEmpRegInfo",{"key":"noRecharge",title:"GDV chuyển F-C ko nạp tiền","month":month})}/>
                <MenuItem width={width-fontScale(20)} style={{marginBottom:fontScale(10)}} noneIcon title="GDV bị chặn user do đấu sai kho số" titleArray={["","       "]} data={["",data.wrongNumber]} />
                <MenuItem width={width-fontScale(20)} style={{marginBottom:fontScale(10)}} noneIcon title="GDV xuất hiện >= 3 lần trong 06 tháng" titleArray={["","       "]} data={["",data.overThree]} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default index;