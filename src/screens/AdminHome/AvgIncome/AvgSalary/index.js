import React, { useState,useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import { getAllAvgIncome } from '../../../../api';
import { Body, GeneralListItem, Header } from '../../../../comps';
import { useNavigation } from '@react-navigation/core';
import { text } from '../../../../utils/Text';
import { styles } from './style';
import { ToastNotif } from '../../../../utils/Logistics';
import Toast from 'react-native-toast-message';
import { FlatList } from 'react-native';
import { images } from '../../../../utils/Images';
import { AvgSalary } from '../../../../models/Admin';
import { fontScale } from '../../../../utils/Fonts';
import moment from 'moment';
import { ActivityIndicator } from 'react-native';
import { colors } from '../../../../utils/Colors';

const index=(props)=> {
    const [data,setData] = useState(AvgSalary);
    const [generalData, setGeneralData] = useState(AvgSalary.general);
    const [notification,setNotification] = useState('')
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);

    const getData=async()=>{
        setLoading(true)
        await getAllAvgIncome(navigation,'','').then((res)=>{
            if (res.status == "success") {
                if (res.data.data.length > 0) {
                    setData(res.data.data);
                    setGeneralData(res.data.general)
                    setNotification(res.data.notification)
                    setLoading(false)
                } else {
                    setData([]);
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

    useEffect(()=>{
        getData();
    },[navigation])

    return (
        <SafeAreaView style={styles.container}>
             <Header title={text.averageIncome}/>
             <Text style={styles.notif}>{notification}</Text>
             <Body/>
             <View style={styles.body}>
                 {loading==true ? <ActivityIndicator size="small" color={colors.primary}/> : null}
           
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    data={data}
                    keyExtractor={(item,key)=>item.shopCode.toString()}
                    renderItem={({item,index})=>
                    <View style={{marginTop:fontScale(40),paddingBottom:index==data.length-1 ? fontScale(70): 0}}>
                        <GeneralListItem style={{marginTop:-fontScale(10)}} onPress={()=>navigation.navigate("AdminAvgIncomeShop",{branchItem:item})} key={index} columns title={item.shopName} titleArray={["Lương BQ/GDV","Khoán sp/GDV","SL GDV"]} item={[item.avgIncome,item.contractSalary,item.empAmount]} rightIcon={images.shop}/>
                        {
                            index==data.length-1 
                                ? 
                                <GeneralListItem styleCol2={{marginLeft:-fontScale(10)}} styleCol4={{marginLeft:-fontScale(10)}} style={{marginTop:-fontScale(20),marginHorizontal:fontScale(10),paddingHorizontal:fontScale(10)}} fourColumnCompany title={generalData.shopName} titleArray={["BQ lương 1 tháng/GDV","BQ lương cố định","BQ lương khoán SP","BQ lương KK","BQ chi hỗ trợ"]} item={[generalData.avgIncome,generalData.permanentSalary,generalData.contractSalary,generalData.incentiveSalary,generalData.spenSupport]} icon={images.company}/> : null
                        }
                    </View>
                    }/>
                
             </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaView>
    );
}

export default index;