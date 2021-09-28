import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, ScrollView } from "react-native";
import { Body, DatePicker, GeneralListItem, Header } from "../../../../../../comps";
import { styles } from "./style";
import { images } from "../../../../../../utils/Images";
import moment from "moment";
import { getKPIByMonth, getMonthSalary, getSummarySubQuality, getTotalSalaryCost, getTotalSalarySupport, getTransactionStatistics } from "../../../../../../adminapi";
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
  // const [generalData, setGeneralData] = useState({});
  const [notification, setNotification] = useState('')
  const navigation = useNavigation();



  const getData = async () => {
    setLoading(true);
    setMessage("")
    
    await getTotalSalaryCost(navigation).then((data) => {
      // console.log(data.data.general)
      if (data.status == "success") {
        setLoading(false);
        if (data.length == 0) {
          setData([])
          setMessage(data.message);
        } else {
          setNotification(data.data.notification)
          setData(data.data.data);
          // setGeneralData(data.data.general);
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
      <Text style={styles.text}>{notification}</Text>
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
        {/* <ScrollView horizontal> */}
        <View>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
                
              <View>
                <GeneralListItem
                    style={{ marginBottom: fontScale(100), marginTop: index == 0 ? -fontScale(36) : -fontScale(55) }}
                    backgroundColor={"#FFFFFF"}
                    textTitle={{fontSize: fontScale(18), fontWeight: "bold", color: props.textColor || "#151515"}}
                    contentStyle={{ fontSize: fontScale(12),textAlign:"right", marginVertical: fontScale(8) }}
                    contentStyle1={{ fontSize: fontScale(12),textAlign:"right", marginVertical: fontScale(8) }}
                    contentStyle2={{ fontSize: fontScale(12),textAlign:"right", marginVertical: fontScale(8) }}
                    titleStyle={{fontSize: fontScale(12), marginVertical: fontScale(8) }}
                    titleArrOneStyle={{textAlign: "center", fontSize: fontScale(14), fontWeight: "bold", color: "#CC9B02", marginLeft: fontScale(105)}}
                    titleArrTwoStyle={{textAlign: "center", fontSize: fontScale(14), fontWeight: "bold", color: "#CC9B02", marginLeft: fontScale(31)}}
                    titleArrThreeStyle={{textAlign: "center", fontSize: fontScale(14), fontWeight: "bold", color: "#CC9B02", marginLeft: fontScale(31)}}
                    titleArrFourStyle={{textAlign: "center", fontSize: fontScale(14), fontWeight: "bold", color: "#CC9B02", marginLeft: fontScale(31)}}
                    viewContentStyle={{justifyContent: "space-between", marginLeft: -fontScale(329),textAlign:"right"}}
                    viewOneContentStyle={{justifyContent: "space-between", marginLeft: -fontScale(159),textAlign:"right"}}
                    viewTwoContentStyle={{justifyContent: "space-between", marginLeft: -fontScale(139),textAlign:"right"}}
                    viewThreeContentStyle={{justifyContent: "space-between", marginLeft: -fontScale(135),textAlign:"right"}}
                    twentyFourColumnCompany
                    // title={generalData.shopName}
                    
                    titleArr={["HTKD","GDV","Chênh lệch","BQ 1 tháng"]}
                    titleArray={["Tổng chi", "Cố định", "Khoán sp","Chi khác"]}
                    titleArrayOne={[]}
                    itemAmountOne={[item.outcomeBusiness,item.permanentBusiness,item.contractBusiness,item.othersBusiness]}
                    itemAmountTwo={[item.outcomeEmp,item.permanentEmp,item.contractEmp,item.othersEmp]}
                    itemPercent={[item.outcomeDiff,item.permanentDiff,item.contractDiff,item.othersDiff]}
                    itemAmountFour={[item.outcomeAvg,item.permanentAvg,item.contractAvg,item.othersAvg]}
                    item={[]}
                  title={item. branchCode}
                  icon={images.branch}
                   />
                {/* { index == data.length - 1 ?
                  <GeneralListItem
                    style={{ marginBottom: fontScale(100), marginTop: -fontScale(15) }}
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
                    itemAmountTwo={[generalData.rallyCancelAmount,generalData.rallyFCardAmount,generalData.rallyBlocking2CAmount,generalData.rallyFastAmount,generalData.rallyMDTAmount,generalData.rallyDebitContactAmount]}
                    itemPercent={[generalData.cancelPercent,generalData.fcardPercent,generalData.blocking2CPercent,generalData.fastPercent,generalData.mdtpercent,generalData.debitContactPercent]}
                    item={[generalData.debitPercent,generalData.debit90Amount,generalData.revenue90Amount,generalData.postpaidAmount]}
                    icon={images.company} /> : null
                } */}
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
