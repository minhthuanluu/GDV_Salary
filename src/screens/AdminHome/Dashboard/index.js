import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View,Text } from 'react-native';
import { BackHandler } from 'react-native';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native';
import { getProfile } from '../../../api';
import { imgUrl } from '../../../api/untils';
import { Body, Header, MenuItem } from '../../../comps';
import { UserObj } from '../../../models';
import { colors } from '../../../utils/Colors';
import { width } from '../../../utils/Dimenssion';
import { fontScale } from '../../../utils/Fonts';
import { images } from '../../../utils/Images';
import { ToastNotif } from '../../../utils/Logistics';
import { text } from '../../../utils/Text';
import { styles } from './style';
import Toast from "react-native-toast-message";

const Dashboard=(route)=> {
    const navigation = useNavigation();

    const [user, setUserData] = useState(UserObj);
    const [loading, setLoading] = useState(false);
    
    const getData = async () => {
        setLoading(true)
        await getProfile(navigation).then((res) => {
            if(res.status == "success") {
                setLoading(false)
                setUserData(res.data) 
            }
            if(res.status == "v_error") {
                ToastNotif('Cảnh báo', res.message,'error', true);
            }
            if(res.status == "failed") {
                ToastNotif('Cảnh báo', res.message,'error', true);
                setLoading(false)
            }
        })
        
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
          if (!navigation.isFocused()) {
            return false;
          } else {
            BackHandler.exitApp();
            return true;
          }
        });
        BackHandler.addEventListener('hardwareBackPress', () => {
          if (!navigation.isFocused()) {
            return false;
          } else {
            BackHandler.exitApp();
            return true;
          }
        });
        getData();
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', () => {
              if (!navigation.isFocused()) {
                return false; 
              } else {
                BackHandler.exitApp();
                return true;
              }
            });
          };
        }, [navigation]);

        const showWarning = ()=>{
          Toast.show({
            text1: "Cảnh báo",
            text2: "Chức năng đang phát triển",
            type: "error",
            visibilityTime: 1000,
            autoHide: true,
            onHide: () => {}
        })
        }
      
    return (
        <SafeAreaView style={styles.container}>
        <StatusBar translucent backgroundColor={colors.primary} />
        {
          <Header showBack={false} profile avatar={user.avatar != null ? { uri: imgUrl + user.avatar } : images.avatar} fullName={user.displayName} maGDV={user.shopId.shopCode} />
        }
        <Body style={{ marginTop: fontScale(10) }} showInfo={false} />
        <View style={styles.body}>
          <MenuItem style={{ marginTop: fontScale(10) }} title={text.kpi} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.kpiByMonth} width={width - fontScale(60)} onPress={() => navigation.navigate("AdminKPIDashboard")} />
          <MenuItem style={{ marginTop: fontScale(45) }} title={text.salaryByMonth} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.salaryByMonth} width={width - fontScale(60)} onPress={() => navigation.navigate("AdminSalaryByMonthDashboard")} />
          <MenuItem style={{ marginTop: fontScale(45) }} title={text.averageIncome} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.avgIcome} width={width - fontScale(60)} onPress={() => navigation.navigate("AdminAvgIncomeDashboard")} />
          <MenuItem style={{ marginTop: fontScale(45) }} title={text.subscriberQuality} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.subscriberQuality} width={width - fontScale(60)} onPress={() => console.log('a')} />
          <MenuItem style={{ marginTop: fontScale(45) }} title={text.transactionInformation} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.transactionInformation} width={width - fontScale(60)} onPress={()=>navigation.navigate('AdminTransInfoDashdoard')} />
          <MenuItem style={{ marginTop: fontScale(45) }} title={text.unitInformation} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.unitInformation} width={width - fontScale(60)} onPress={() => navigation.navigate('AdminUnitInfo')} />
        </View>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </SafeAreaView>
    );
}

export default Dashboard;
