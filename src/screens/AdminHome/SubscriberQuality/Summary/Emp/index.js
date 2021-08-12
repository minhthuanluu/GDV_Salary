import React, { useState, useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import { Body, GeneralListItem, Header } from "../../../../../comps";
import { styles } from "./style";
import { images } from "../../../../../utils/Images";
import { getSummarySubQuality } from "../../../../../adminapi";
import { fontScale } from "../../../../../utils/Fonts";
import { StatusBar } from "react-native";
import { text } from "../../../../../utils/Text";
import { colors } from "../../../../../utils/Colors";
import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native";
import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";


const index = (props) => {
  const [data, setData] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [generalData, setGeneralData] = useState({});
  const [notification, setNotification] = useState('')
  const navigation = useNavigation();
  const route = useRoute();

  const getData = async (branchcode, shopCode) => {
    setLoading(true);
    setMessage("")
    
    await getSummarySubQuality(branchcode, shopCode).then((data) => {
      if (data.status == "success") {
        setLoading(false);
        if (data.length == 0) {
          setData([])
          setMessage(data.message);
        } else {
          setNotification(data.data.notification)
          setData(data.data.data);
          setGeneralData(data.data.general);
        }
      }

      if (data.status == "failed") {
        setLoading(false);
        Toast.show({
          text1: "Cảnh báo",
          text2: data.message,
          type: "error",
          visibilityTime: 1000,
          autoHide: true,
          onHide: () => navigation.goBack()
        })
      }
      if (data.status == "v_error") {
        Toast.show({
          text1: "Cảnh báo",
          text2: data.message,
          type: "error",
          visibilityTime: 1000,
          autoHide: true,
          onHide: () => navigation.goBack()
        })
      }
    });
  };

  useEffect(() => {
      const{branchCode,shopCode} = route.params?.item;
      // console.log(route.params?.item)
      getData(branchCode, shopCode);
  }, [navigation])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={colors.primary} />
      <Header title={text.subscriberQuality} />
      <Text style={styles.text}>{notification}</Text>
      <Body
        showInfo={false}
        style={{ marginTop: fontScale(15), zIndex: -10 }}
      />
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        {loading == true ? <ActivityIndicator size="small" color={colors.primary} style={{ marginTop: -fontScale(20) }} /> : null}
        <Text style={{ color: colors.primary, textAlign: "center" }}>{message && message}</Text>
        <View>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View>
                <GeneralListItem
                    style={{ marginBottom: fontScale(40), marginTop: -fontScale(15) }}
                    contentStyle={{ fontSize: 12,textAlign:"right", marginVertical: fontScale(8) }}
                    contentStyle1={{ fontSize: 12,textAlign:"right", marginVertical: fontScale(8) }}
                    contentStyle2={{ fontSize: 12,textAlign:"right", marginVertical: fontScale(8) }}
                    titleStyle={{fontSize: 12, marginVertical: fontScale(8)}}
                    textColor={colors.black}
                    backgroundColor={colors.white}
                    eightteenColumnCompany
                    title={item.shopName}
                    titleArr={["TB/tháng","TB/tập","Tỉ lệ"]}
                    titleArray={["+ Cắt hủy:", "+ F-> Card:", "+ Chặn 2c:","+ Chuyển Fast:","+  Chuyển MDT, MD1:","+  Nợ hợp đồng:"]}
                    titleArrayOne={["Tỉ lệ nợ/ Doanh thu:","Tổng nợ 90:","Tổng DThu 90:","Tổng TBTS PTM:"]}
                    itemAmountOne={[item.cancelAmount,item.fcardAmount,item.blocking2CAmount,item.fastAmount,item.mdtamount,item.debitContactAmount]}
                    itemAmountTwo={[item.cancelAmount,item.fcardAmount,item.blocking2CAmount,item.fastAmount,item.mdtamount,item.debitContactAmount]}
                    itemPercent={[item.cancelPercent,item.fcardPercent,item.blocking2CPercent,item.fastAmount,item.mdtpercent,item.debitContactPercent]}
                    item={[item.debitPercent,item.debit90Amount,item.revenue90Amount]}
                    onPress={() => navigation.navigate("AdminShopTransInfo", {
                    item: {
                      "branchCode": route.params?.item.branchCode,
                      "shopCode": item.shopCode,
                      // "month": month
                    }
                  })} />
                { index == data.length - 1 ?
                  <GeneralListItem
                    style={{ marginBottom: fontScale(90), marginTop: fontScale(10) }}
                    contentStyle={{ fontSize: 12,textAlign:"right", marginVertical: fontScale(8) }}
                    contentStyle1={{ fontSize: 12,textAlign:"right", marginVertical: fontScale(8) }}
                    contentStyle2={{ fontSize: 12,textAlign:"right", marginVertical: fontScale(8) }}
                    titleStyle={{fontSize: 12, marginVertical: fontScale(8)}}
                    eightteenColumnCompany
                    title={generalData.shopName}
                    titleArr={["TB/tháng","TB/tập","Tỉ lệ"]}
                    titleArray={["+ Cắt hủy:", "+ F-> Card:", "+ Chặn 2c:","+ Chuyển Fast:","+  Chuyển MDT, MD1:","+  Nợ hợp đồng:"]}
                    titleArrayOne={["Tỉ lệ nợ/ Doanh thu:","Tổng nợ 90:","Tổng DThu 90:","Tổng TBTS PTM:"]}
                    itemAmountOne={[generalData.cancelAmount,generalData.fcardAmount,generalData.blocking2CAmount,generalData.fastAmount,generalData.mdtamount,generalData.debitContactAmount]}
                    itemAmountTwo={[generalData.cancelAmount,generalData.fcardAmount,generalData.blocking2CAmount,generalData.fastAmount,generalData.mdtamount,generalData.debitContactAmount]}
                    itemPercent={[generalData.cancelPercent,generalData.fcardPercent,generalData.blocking2CPercent,generalData.fastAmount,generalData.mdtpercent,generalData.debitContactPercent]}
                    item={[generalData.debitPercent,generalData.debit90Amount,generalData.revenue90Amount]}
                    icon={images.store} /> : null
                }
              </View>
            )}
          />


        </View>

      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};

export default index;
