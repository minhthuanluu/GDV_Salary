import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { BackHandler } from 'react-native';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native';
import { getProfile } from '../../../../../api';
// import { imgUrl } from '../../../../../untils';
import { Body, Header, MenuItem } from '../../../../../comps';
import { UserObj } from '../../../../../models';
import { colors } from '../../../../../utils/Colors';
import { width } from '../../../../../utils/Dimenssion';
import { fontScale } from '../../../../../utils/Fonts';
import { images } from '../../../../../utils/Images';
import { ToastNotif } from '../../../../../utils/Logistics';
import { text } from '../../../../../utils/Text';
import { styles } from './style';
import Toast from "react-native-toast-message";

const Dashboard = (route) => {
  const navigation = useNavigation();

  const [user, setUserData] = useState(UserObj);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true)
    await getProfile(navigation).then((res) => {
      if (res.status == "success") {
        setLoading(false)
        setUserData(res.data)
      }
      if (res.status == "v_error") {
        ToastNotif('Cảnh báo', res.message, 'error', true);
      }
      if (res.status == "failed") {
        ToastNotif('Cảnh báo', res.message, 'error', true);
        setLoading(false)
      }
    })

  }

  useEffect(() => {
    getData();
    return () => {
    };
  }, [navigation]);

  const showWarning = () => {
    Toast.show({
      text1: "Cảnh báo",
      text2: "Chức năng đang phát triển",
      type: "error",
      visibilityTime: 1000,
      autoHide: true,
      onHide: () => { }
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={colors.primary} />
      {
        <Header title={text.generalExpenses} />
      }
      <Body style={{ marginTop: fontScale(10) }} showInfo={false} />
      <View style={styles.body}>
        <MenuItem
          style={{ marginTop: fontScale(30) }}
          title={text.costAccumulation}
          titleMenuStyle={{ paddingTop: fontScale(17) }}
          icon={images.otherExpenses}
          width={width - fontScale(60)}
          onPress={() => navigation.navigate("AdminExpenseGeneral")} />
        <MenuItem
          style={{ marginTop: fontScale(45) }} 
          title={text.monthlyExpenses} 
          titleMenuStyle={{ paddingTop: fontScale(17) }} 
          icon={images.money} 
          width={width - fontScale(60)} 
          onPress={() => navigation.navigate("AdminMonthlyCostGeneral")} />

      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
}

export default Dashboard;
