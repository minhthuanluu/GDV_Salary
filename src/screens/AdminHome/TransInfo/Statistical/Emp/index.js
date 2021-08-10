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
    console.log(route.params?.item)
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
                    contentStyle2={{flex:1,textAlign:"right", fontSize: fontScale(14)}} contentStyle4={{flex:1,textAlign:"right", fontSize: fontScale(14)}} contentStyle6={{flex:1,textAlign:"right", fontSize: fontScale(14)}} contentStyle8={{flex:1,textAlign:"right",fontSize: fontScale(14)}} contentStyle10={{flex:1,textAlign:"right", fontSize: fontScale(14)}} contentStyle12={{flex:1,textAlign:"right", fontSize: fontScale(14)}}
                    contentStyle3={{flex:0.41,textAlign:"right", fontSize: fontScale(14)}}  contentStyle5={{flex:0.41,textAlign:"right", fontSize: fontScale(14)}}  contentStyle7={{flex:0.41,textAlign:"right", fontSize: fontScale(14)}} contentStyle9={{flex:0.41,textAlign:"right", fontSize: fontScale(14)}}  contentStyle11={{flex:0.41,textAlign:"right", fontSize: fontScale(14)}}  contentStyle13={{flex:0.41,textAlign:"right", fontSize: fontScale(14)}}
                    backgroundColor={colors.white}
                    textColor={colors.black}
                    titleStyle2={{color:colors.black, marginLeft: 15, fontSize: fontScale(15)}} titleStyle3={{marginLeft: fontScale(16), fontSize: fontScale(14)}}
                    twelveColumnCompany
                    title={item.shopName}
                    titleArray={["Tổng", "Top/ngày", "Lượng KH", " ", "Lượt giao dịch", "","+  Chặn 2c TBTS","","+  ĐKTT","","+  Fone -> Card","","     +   Ko nạp tiền","","Vi phạm kho số"]}
                    item={["","",item.cusAmount,item.cusTopDay,item.transAmount,item.transTopDay,item.blocking2CAmount,"",item.subRegisterAmount,item.subRegisterTopDay,item.foneCardAmount,item.foneCardTopDay,item.noRechargeAmount,item.noRechargeTopDay,item.violateAmount]}
                  
                  onPress={() => navigation.navigate("AdminShopTransInfo", {
                    item: {
                      "branchCode": item.shopCode,
                      "month": month
                    }
                  })} />
                { index == data.length - 1 ?
                  <GeneralListItem
                    style={{ marginBottom: fontScale(100), marginTop: -fontScale(15) }}
                    contentStyle2={{flex:1,textAlign:"right", fontSize: fontScale(14)}} contentStyle4={{flex:1,textAlign:"right", fontSize: fontScale(14)}} contentStyle6={{flex:1,textAlign:"right", fontSize: fontScale(14)}} contentStyle8={{flex:1,textAlign:"right",fontSize: fontScale(14)}} contentStyle10={{flex:1,textAlign:"right", fontSize: fontScale(14)}} contentStyle12={{flex:1,textAlign:"right", fontSize: fontScale(14)}}
                    contentStyle3={{flex:0.41,textAlign:"right", fontSize: fontScale(14)}}  contentStyle5={{flex:0.41,textAlign:"right", fontSize: fontScale(14)}}  contentStyle7={{flex:0.41,textAlign:"right", fontSize: fontScale(14)}} contentStyle9={{flex:0.41,textAlign:"right", fontSize: fontScale(14)}}  contentStyle11={{flex:0.41,textAlign:"right", fontSize: fontScale(14)}}  contentStyle13={{flex:0.41,textAlign:"right", fontSize: fontScale(14)}}
                    titleStyle2={{color:colors.black, marginLeft: 15, fontSize: fontScale(15)}} titleStyle3={{marginLeft: fontScale(16), fontSize: fontScale(14)}}
                    twelveColumnCompany
                    title={generalData.shopName}
                    titleArray={["Tổng", "Top/ngày", "Lượng KH", " ", "Lượt giao dịch", "","+  Chặn 2c TBTS","","+  ĐKTT","","+  Fone -> Card","","     +   Ko nạp tiền","","Vi phạm kho số"]}
                    item={["","",generalData.cusAmount,generalData.cusTopDay,generalData.transAmount,generalData.transTopDay,generalData.blocking2CAmount,"",generalData.subRegisterAmount,generalData.subRegisterTopDay,generalData.foneCardAmount,generalData.foneCardTopDay,generalData.noRechargeAmount,generalData.noRechargeTopDay,generalData.violateAmount]}
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
