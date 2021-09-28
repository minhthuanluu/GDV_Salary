import React, { useState, useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import { Body, DatePicker, GeneralListItem, Header } from "../../../../../comps";
import { styles } from "./style";
import { images } from "../../../../../utils/Images";
import moment from "moment";
import { getKPIByMonth, getMonthSalary, getTransactionStatistics } from "../../../../../adminapi";
import { width } from "../../../../../utils/Dimenssion";
import { fontScale } from "../../../../../utils/Fonts";
import { StatusBar } from "react-native";
import { text } from "../../../../../utils/Text";
import { colors } from "../../../../../utils/Colors";
import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native";
import { View } from "react-native";
import { useNavigation, useRoute  } from "@react-navigation/native";
import Toast from "react-native-toast-message";


const index = (props) => {
  const [data, setData] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [generalData, setGeneralData] = useState({});
  const [month, setMonth] = useState(moment(new Date()).subtract(1, "months").format("MM/YYYY"));
  const navigation = useNavigation();
  const route = useRoute();

  const getData = async (month, branchcode, shopCode) => {
    setLoading(true);
    setMessage("")
    await getTransactionStatistics(month, branchcode, shopCode).then((data) => {
      if (data.status == "success") {
        setLoading(false);
        if (data.length == 0) {
          setData([])
          setMessage(data.message);
        } else {
          
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
    const{month, branchCode, shopCode} = route.params?.item;
    setMonth(month);
    getData(month,branchCode,shopCode)
  }, [""])

  const _onChangeMonth = (value) => {
    setMonth(value);
    const {branchCode,shopCode} = route.params?.item
    getData(value,branchCode, shopCode);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={colors.primary} />
      <Header title={text.transactionsInfo} />
      <DatePicker
        month={month}
        width={width - fontScale(120)}
        style={{ alignSelf: "center" }}
        onChangeDate={(date) => _onChangeMonth(date)}
      />
      <Body
        showInfo={false}
        style={{ marginTop: fontScale(15), zIndex: -10 }}
      />
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        {loading == true ? <ActivityIndicator size="small" color={colors.primary} style={{ marginTop: fontScale(20) }} /> : null}
        <Text style={{ color: colors.primary, textAlign: "center" }}>{message && message}</Text>
        <View>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View>
                 <GeneralListItem
                    style={{ marginBottom: fontScale(70), marginTop: -fontScale(15) }}
                    contentStyle={{ fontSize: 12,textAlign:"right", marginVertical: fontScale(8) }}
                    contentStyle1={{ fontSize: 12,textAlign:"right", marginVertical: fontScale(8) }}
                    titleStyle={{fontSize: 12, marginVertical: fontScale(8)}}
                    titleStyle1={{fontSize: 12, marginVertical: fontScale(8), color: "#000000"}}
                    textColor={colors.black}
                    backgroundColor={colors.white}
                    twelveColumnCompany
                    title={item.shopCode}
                    titleArr={["Tổng","Top/ngày"]}
                    titleArray={["Lượng KH:", "Lượt giao dịch:", "+  Chặn 2c TBTS:  ","+  ĐKTT:","+  Fone -> Card:","     +   Ko nạp tiền: "]}
                    titleArrayOne={["Vi phạm kho số:"]}
                    itemAmountOne={[item.cusAmount,item.transAmount,item.blocking2CAmount,item.subRegisterAmount,item.foneCardAmount,item.noRechargeAmount]}
                    itemAmountTwo={[item.cusTopDay,item.transTopDay,item.blocking2CTopDay,item.subRegisterTopDay,item.foneCardTopDay,item.noRechargeTopDay]}
                    item={[item.violateAmount]}
                  
                  onPress={() => navigation.navigate("AdminShopTransInfo", {
                    item: {
                      "branchCode": item.shopCode,
                      "month": month
                    }
                  })} />
                { index == data.length - 1 ?
                  <GeneralListItem
                    style={{ marginBottom: fontScale(100), marginTop: -fontScale(15) }}
                    contentStyle={{ fontSize: 12,textAlign:"right", marginVertical: fontScale(8) }}
                    contentStyle1={{ fontSize: 12,textAlign:"right", marginVertical: fontScale(8) }}
                    titleStyle={{fontSize: 12, marginVertical: fontScale(8)}}
                    titleStyle1={{fontSize: 12, marginVertical: fontScale(8), color: "#000000"}}
                    twelveColumnCompany
                    title={generalData.shopName}
                    titleArr={["Tổng","Top/ngày"]}
                    titleArray={["Lượng KH:", "Lượt giao dịch:", "+  Chặn 2c TBTS:  ","+  ĐKTT:","+  Fone -> Card:","     +   Ko nạp tiền: "]}
                    titleArrayOne={["Vi phạm kho số:"]}
                    itemAmountOne={[generalData.cusAmount,generalData.transAmount,generalData.blocking2CAmount,generalData.subRegisterAmount,generalData.foneCardAmount,generalData.noRechargeAmount]}
                    itemAmountTwo={[generalData.cusTopDay,generalData.transTopDay,generalData.blocking2CTopDay,generalData.subRegisterTopDay,generalData.foneCardTopDay,generalData.noRechargeTopDay]}
                    item={[generalData.violateAmount]}
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
