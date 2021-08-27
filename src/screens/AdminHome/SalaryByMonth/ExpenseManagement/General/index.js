import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, ScrollView } from "react-native";
import { Body, DatePicker, GeneralListItem, Header } from "../../../../../comps";
import { styles } from "./style";
import { images } from "../../../../../utils/Images";
import moment from "moment";
import { getKPIByMonth, getMonthSalary, getSummarySubQuality, getTransactionStatistics } from "../../../../../adminapi";
import { width } from "../../../../../utils/Dimenssion";
import { fontScale } from "../../../../../utils/Fonts";
import { StatusBar } from "react-native";
import { text } from "../../../../../utils/Text";
import { colors } from "../../../../../utils/Colors";
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
    // getData("", "");
    return ()=>{}
  }, [])

  // const _onChangeMonth = (value) => {
  //   setMonth(value);
  //   getData(value, "", "");
  // };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={colors.primary} />
      <Header title={text.costAccumulation} />
      <Body
        showInfo={false}
        style={{ marginTop: fontScale(12), zIndex: -10 }}
      />
      <View style={{ flex: 1, backgroundColor: colors.white, marginTop: -fontScale(5) }}>
        {/* {loading == true ? <ActivityIndicator size="small" color={colors.primary} style={{ marginTop: -fontScale(25) }} /> : null} */}
        <Text style={{ color: colors.primary, textAlign: "center" }}>{message && message}</Text>
        {/* <View>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => ( */}
              <ScrollView showsVerticalScrollIndicator={false}>
                  <GeneralListItem
                    style={{ marginBottom: fontScale(80), marginTop: -fontScale(30) }}
                    backgroundColor={"#FFFFFF"}
                    textTitle={{fontSize: fontScale(18), textAlign: "center", fontWeight: "bold", color: props.textColor || "#151515"}}
                    contentStyle={{ fontSize: fontScale(12),textAlign:"right", marginVertical: fontScale(8) }}
                    contentStyle1={{ fontSize: fontScale(12),textAlign:"right", marginVertical: fontScale(8) }}
                    contentStyle2={{ fontSize: fontScale(12),textAlign:"right", marginVertical: fontScale(8) }}
                    titleStyle={{fontSize: fontScale(14), marginVertical: fontScale(8) }}
                    titleArrOneStyle={{textAlign: "center", fontSize: fontScale(14), fontWeight: "bold", color: "#CC9B02", marginLeft: fontScale(105)}}
                    titleArrTwoStyle={{textAlign: "center", fontSize: fontScale(14), fontWeight: "bold", color: "#CC9B02", marginLeft: fontScale(31)}}
                    titleArrThreeStyle={{textAlign: "center", fontSize: fontScale(14), fontWeight: "bold", color: "#CC9B02", marginLeft: fontScale(31)}}
                    titleArrFourStyle={{textAlign: "center", fontSize: fontScale(14), fontWeight: "bold", color: "#CC9B02", marginLeft: fontScale(16)}}
                    viewContentStyle={{justifyContent: "space-between", marginLeft: -fontScale(310),textAlign:"right"}}
                    viewOneContentStyle={{justifyContent: "space-between", marginLeft: -fontScale(175),textAlign:"right"}}
                    viewTwoContentStyle={{justifyContent: "space-between", marginLeft: -fontScale(135),textAlign:"right"}}
                    viewThreeContentStyle={{justifyContent: "space-between", marginLeft: -fontScale(135),textAlign:"right"}}
                    twentyFourColumnCompany
                    // title={generalData.shopName}
                    title={"Tổng chi phí lương"}
                    titleArr={["HTKD",text.teller,"Chênh lệch","BQ 1 tháng"]}
                    titleArray={["Tổng chi", "Cố định", "Khoán sp","Chi khác"]}
                    titleArrayOne={["Nguồn chi:","Còn lại:","CF cần đến 31/12:","=> Thiếu:","Số tiền dùng chi hỗ trợ:"]}
                    // itemAmountOne={[generalData.rallyCancelAmount,generalData.rallyFCardAmount,generalData.rallyBlocking2CAmount,generalData.rallyFastAmount,generalData.rallyMDTAmount,generalData.rallyDebitContactAmount]}
                    // itemAmountTwo={[generalData.rallyCancelAmount,generalData.rallyFCardAmount,generalData.rallyBlocking2CAmount,generalData.rallyFastAmount,generalData.rallyMDTAmount,generalData.rallyDebitContactAmount]}
                    // itemPercent={[generalData.rallyCancelAmount,generalData.rallyFCardAmount,generalData.rallyBlocking2CAmount,generalData.rallyFastAmount,generalData.rallyMDTAmount,generalData.rallyDebitContactAmount]}
                    // itemAmountFour={[generalData.rallyCancelAmount,generalData.rallyFCardAmount,generalData.rallyBlocking2CAmount,generalData.rallyFastAmount,generalData.rallyMDTAmount,generalData.rallyDebitContactAmount]}
                    // item={["42 tỷ","17 tỷ","83,5 tỷ","66,5 tỷ","4 tỷ"]}
                    // icon={images.branch}
                    onPress={() => navigation.navigate("AdminTotalSalaryCostGeneral")} /> 
                
                <GeneralListItem
                    style={{ marginBottom: fontScale(80), marginTop: -fontScale(55) }}
                    backgroundColor={"#FFFFFF"}
                    textTitle={{fontSize: fontScale(18), textAlign: "center", fontWeight: "bold", color: props.textColor || "#151515"}}
                    contentStyle={{ fontSize: fontScale(12),textAlign:"right", marginVertical: fontScale(8) }}
                    contentStyle1={{ fontSize: fontScale(12),textAlign:"right", marginVertical: fontScale(8) }}
                    contentStyle2={{ fontSize: fontScale(12),textAlign:"right", marginVertical: fontScale(8) }}
                    // titleStyle={{fontSize: fontScale(12),marginBottom:fontScale(4),marginTop:fontScale(10) }}
                    titleStyle={{fontSize: fontScale(14),marginVertical: 8 }}
                    titleArrOneStyle={{textAlign: "center", fontSize: fontScale(14), fontWeight: "bold", color: "#CC9B02", marginLeft: fontScale(155)}}
                    titleArrTwoStyle={{textAlign: "center", fontSize: fontScale(14), fontWeight: "bold", color: "#CC9B02", marginLeft: fontScale(51)}}
                    viewContentStyle={{justifyContent: "space-between", marginLeft: -fontScale(250),textAlign:"right"}}
                    viewOneContentStyle={{justifyContent: "space-between", marginLeft: -fontScale(105),textAlign:"right"}}
                    twentyFourColumnCompany
                    // title={generalData.shopName}
                    title={text.totalSupportOutcome}
                    titleArr={[text.totalOutcome,"BQ 1 tháng"]}
                    titleArray={["CF hỗ trợ CHT ", "CF hỗ trợ khác", "Thu"]}
                    titleArrayOne={["Nguồn chi:","Còn lại:","Số tiền cần hỗ trợ đến 31/12:"]}
                    // itemAmountOne={[generalData.rallyCancelAmount,generalData.rallyFCardAmount,generalData.rallyBlocking2CAmount]}
                    // itemAmountTwo={[generalData.cancelPercent,generalData.fcardPercent,generalData.blocking2CPercent]}
                    // itemPercent={[]}
                    // item={["4 tỷ","1 tỷ","10 tỷ"]}
                    onPress={() => navigation.navigate("AdminSupportSalaryCostGeneral")}
                     // icon={images.company}  /> 
                   
                /> 
              {/* </View> */}
            {/* )}
          /> */}


        </ScrollView>

      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};

export default index;
