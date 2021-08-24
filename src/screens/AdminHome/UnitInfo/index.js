import { useNavigation } from '@react-navigation/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { BackHandler } from 'react-native';
import { SafeAreaView, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { Body, DatePicker, Header, Table } from '../../../comps';
import { colors } from '../../../utils/Colors';
import { height, width } from '../../../utils/Dimenssion';
import { fontScale } from '../../../utils/Fonts';
import { images } from '../../../utils/Images';
import { ToastNotif } from '../../../utils/Logistics';
import { text } from '../../../utils/Text';
import { getUnitInfo } from '../../../adminapi';
import { styles } from './style';

const index = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('')
  const navigation = useNavigation();

  const getData = async () => {
    setLoading(true)
    await getUnitInfo(navigation).then((res) => {
      if (res.status == "success") {
        if (res.data.length > 0 || res.data.data.length > 0) {
          setData(res.data.data);
          setLoading(false);
        } else {
          setData([])
          setMessage(res.message)
          setLoading(false);
        }
      }
      if (res.status == "failed") {
        setLoading(false);
        ToastNotif("Thông báo", res.message, "error", true, null)
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
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    getData();
    return () => {
      backHandler.remove();
    };

  }, [""]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title={text.unitInformation} />
      <Body />
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        {loading == true ? <ActivityIndicator size="small" color={colors.primary} style={{ marginBottom: fontScale(10) }} /> : null}
        <Table
          data={data}
          loading={loading}
          table
          numColumn={3}
          headers={["", "SLGDV", "Xếp hạng cửa hàng"]}
          headersTextColor={colors.primary}
          headerStyle={{ icon: { size: 15 }, text: { size: fontScale(14) } }}
          message={message}
          widthArray={[1 / 4 * width, 1 / 4 * width, 2 / 4 * width - fontScale(35)]}
          loadingIconStyle={{ marginLeft: -fontScale(height / 4) }}
          fields={
            data.map((item) => [
              item.shopName,
              item.empAmount,
              item.rate,
            ])
          }
          loading={loading}
          hideFirstColHeader
          headerMarginLeft={-fontScale(22)}
          textAlign="center"
          firstRowBg={"#FBFDC3"}
          lastIcon={data.map((item, index) => item.detail == "true" ? images.eye : null)}
          lastIconStyle={{ tintColor: colors.grey }}
          seeDetail={data.map((item, index) => { return item.detail })}
          onPress={(item) => item.detail == "true" ? navigation.navigate("AdminDetailUnitInfo", { "shopCode": item.shopCode }) : null}
          fontWeight={data.map((item, index) => index == 0 || item.shopType == "BRANCH" ? "bold" : "normal")}
          textColor={data.map((item, index) => index == 0 || item.shopType == "BRANCH" ? "#000" : "#D19E01")}
          rowBg={data.map((item, index) => item.shopType == "BRANCH" ? "#C6FBFB" : "#fff")}
        />
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
}

export default index