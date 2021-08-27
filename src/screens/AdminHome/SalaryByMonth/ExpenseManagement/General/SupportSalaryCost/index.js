import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, ScrollView } from "react-native";
import { Body, DatePicker, GeneralListItem, Header } from "../../../../../../comps";
import { styles } from "./style";
import { images } from "../../../../../../utils/Images";
import moment from "moment";
import { getKPIByMonth, getMonthSalary, getSummarySubQuality, getTransactionStatistics } from "../../../../../../adminapi";
import { width } from "../../../../../../utils/Dimenssion";
import { fontScale } from "../../../../../../utils/Fonts";
import { StatusBar } from "react-native";
import { text } from "../../../../../../utils/Text";
import { colors } from "../../../../../../utils/Colors";
import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";


const index = (props) => {
  const [data, setData] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [generalData, setGeneralData] = useState({});
  const [notification, setNotification] = useState('')
  const navigation = useNavigation();



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
    getData("", "");
  }, [])

  // const _onChangeMonth = (value) => {
  //   setMonth(value);
  //   getData(value, "", "");
  // };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={colors.primary} />
      <Header title={text.costAccumulation} />
      {/* <Text style={styles.text}>Lũy kế chi phí tháng 07/2021</Text> */}
      {/* <DatePicker
        month={month}
        width={width - fontScale(120)}
        style={{ alignSelf: "center" }}
        onChangeDate={(date) => _onChangeMonth(date)}
      /> */}
      <Body
        showInfo={false}
        style={{ marginTop: fontScale(15), zIndex: -10 }}
      />
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        {loading == true ? <ActivityIndicator size="small" color={colors.primary} style={{ marginTop: fontScale(20) }} /> : null}
        <Text style={{ color: colors.primary, textAlign: "center" }}>{message && message}</Text>
        <ScrollView horizontal>
        <View style={{width:width}}>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View>
                {/* <GeneralListItem
                    style={{ marginBottom: fontScale(100), marginTop: index == 0 ? -fontScale(36) : -fontScale(55) }}
                    backgroundColor={"#FFFFFF"}
                    contentStyle={{ fontSize: 12,textAlign:"right", marginVertical: fontScale(8) }}
                    contentStyle1={{ fontSize: 12,textAlign:"right", marginVertical: fontScale(8) }}
                    contentStyle2={{ fontSize: 12,textAlign:"right", marginVertical: fontScale(8) }}
                    titleStyle={{fontSize: 12, marginVertical: fontScale(8) }}
                    titleArrOneStyle={{textAlign: "center", fontSize: fontScale(14), fontWeight: "bold", color: colors.black, marginLeft: fontScale(105)}}
                    titleArrTwoStyle={{textAlign: "center", fontSize: fontScale(14), fontWeight: "bold", color: colors.black, marginLeft: fontScale(31)}}
                    titleArrThreeStyle={{textAlign: "center", fontSize: fontScale(14), fontWeight: "bold", color: colors.black, marginLeft: fontScale(31)}}
                    titleArrFourStyle={{textAlign: "center", fontSize: fontScale(14), fontWeight: "bold", color: colors.black, marginLeft: fontScale(31)}}
                    viewContentStyle={{justifyContent: "space-between", marginLeft: -fontScale(310),textAlign:"right"}}
                    viewOneContentStyle={{justifyContent: "space-between", marginLeft: -fontScale(175),textAlign:"right"}}
                    viewTwoContentStyle={{justifyContent: "space-between", marginLeft: -fontScale(135),textAlign:"right"}}
                    viewThreeContentStyle={{justifyContent: "space-between", marginLeft: -fontScale(135),textAlign:"right"}}
                    twentyFourColumnCompany
                    // title={generalData.shopName}
                    
                    titleArr={["HTKD","GDV","Chênh lệch","BQ 1 tháng"]}
                    titleArray={["Tổng chi", "Cố định", "Khoán sp","Chi khác"]}
                    // titleArrayOne={[]}
                    itemAmountOne={[item.rallyCancelAmount,item.rallyFCardAmount,item.rallyBlocking2CAmount,item.rallyFastAmount,item.rallyMDTAmount,item.rallyDebitContactAmount]}
                    itemAmountTwo={[item.rallyCancelAmount,item.rallyFCardAmount,item.rallyBlocking2CAmount,item.rallyFastAmount,item.rallyMDTAmount,item.rallyDebitContactAmount]}
                    itemPercent={[item.rallyCancelAmount,item.rallyFCardAmount,item.rallyBlocking2CAmount,item.rallyFastAmount,item.rallyMDTAmount,item.rallyDebitContactAmount]}
                    itemFour={[item.rallyCancelAmount,item.rallyFCardAmount,item.rallyBlocking2CAmount,item.rallyFastAmount,item.rallyMDTAmount,item.rallyDebitContactAmount]}
                    item={[]}
                  title={item.shopName}
                  icon={images.branch}
                  onPress={() => navigation.navigate("AdminShopSubcriberQuality", {
                    item: {
                      "branchCode": item.shopCode,
                      // "month": month
                    }
                  })} />
                { index == data.length - 1 ? */}
                  <GeneralListItem
                    style={{ marginBottom: fontScale(100), marginTop: index == 0 ? fontScale(10) : -fontScale(55) }}
                    backgroundColor={"#FFFFFF"}
                    textTitle={{fontSize: fontScale(18),  fontWeight: "bold", color: props.textColor || "#151515"}}
                    contentStyle={{ fontSize: fontScale(12),textAlign:"right", marginVertical: fontScale(8) }}
                    contentStyle1={{ fontSize: fontScale(12),textAlign:"right", marginVertical: fontScale(8) }}
                    contentStyle2={{ fontSize: fontScale(12),textAlign:"right", marginVertical: fontScale(8) }}
                    titleStyle={{fontSize: fontScale(12), marginVertical: fontScale(8) }}
                    titleArrOneStyle={{textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: "#CC9B02", marginLeft: fontScale(155),marginVertical: fontScale(11)}}
                    titleArrTwoStyle={{textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: "#CC9B02", marginLeft: fontScale(51),marginVertical: fontScale(11)}}
                    viewContentStyle={{justifyContent: "space-between", marginLeft: -fontScale(250),textAlign:"right"}}
                    viewOneContentStyle={{justifyContent: "space-between", marginLeft: -fontScale(105),textAlign:"right"}}
                    twentyFourColumnCompany
                    // title={generalData.shopName}
                    title={item.shopName}
                    icon={images.branch}
                    titleArr={["Tổng chi","BQ 1 tháng"]}
                    titleArray={["CF hỗ trợ CHT ", "CF hỗ trợ khác", "Thu"]}
                    // titleArrayOne={["Nguồn chi:","Còn lại:","Số tiền cần hỗ trợ đến 31/12:"]}
                    // itemAmountOne={[item.rallyCancelAmount,item.rallyFCardAmount,item.rallyBlocking2CAmount]}
                    // itemAmountTwo={[item.cancelPercent,item.fcardPercent,item.blocking2CPercent]}
                    
                    // itemPercent={[]}
                   
                     /> 
              </View>
            )}
          />


        </View>
</ScrollView>
      </View>
      
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};

export default index;
