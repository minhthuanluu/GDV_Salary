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
import { Image } from "react-native";


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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={colors.primary} />
      <Header title={text.costAccumulation} />
      <Text style={styles.text}>{notification}</Text>
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
              <View style={{ marginTop: index == 0 ? fontScale(20) : fontScale(40), marginBottom: index == data.length - 1 ? fontScale(40) : 0 }}>
                {/* <GeneralListItem
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
                   /> */}
                <View style={{
                  flex: 1,
                  margin: fontScale(5),
                  paddingHorizontal: fontScale(10),
                  paddingBottom: fontScale(15),
                  borderRadius: fontScale(17),
                  shadowColor: "#000",
                  backgroundColor: colors.white,
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5
                }}>
                  <Text style={{color:colors.black,fontSize:fontScale(18),marginTop:fontScale(15),fontWeight:"bold"}}>{item.branchCode}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 0.8, marginTop: fontScale(20) }}>
                      {["", "Tổng chi ", "Cố định", "Khoán sp", "Chi khác"].map((item, index) => <Item item={item} index={index} />)}
                    </View>
                    <View style={{ flex: 0.8, marginTop: fontScale(20) }}>
                      {["HTKD", item.outcomeBusiness, item.permanentBusiness, item.contractBusiness, item.othersBusiness].map((item, index) => <ItemContent item={item} index={index} />)}
                    </View>
                    <View style={{ flex: 0.8, marginTop: fontScale(20) }}>
                      {["GDV", item.outcomeEmp, item.permanentEmp, item.contractEmp, item.othersEmp].map((item, index) => <ItemContent item={item} index={index} />)}
                    </View>
                    <View style={{ flex: 1, marginTop: fontScale(20) }}>
                      {["Chênh lệch", item.outcomeDiff, item.permanentDiff, item.contractDiff, item.othersDiff].map((item, index) => <ItemContent item={item} index={index} />)}
                    </View>
                    <View style={{ flex: 1, marginTop: fontScale(20) }}>
                      {["BQ 1 tháng", item.outcomeAvg, item.permanentAvg, item.contractAvg, item.othersAvg].map((item, index) => <ItemContent item={item} index={index} />)}
                    </View>
                    
                    <Image source={images.branch} resizeMode="cover" style={{ width: fontScale(40), height: fontScale(40), position: "absolute", right: fontScale(10), top: -fontScale(55) }} />
                  </View>
                </View>
              </View>

            )}
          />
        </View>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};

const Item = ({ item, index }) => {
  return (
    <View style={{ marginVertical: fontScale(10) }}>
      <Text key={index.toString()} style={{ fontSize: fontScale(13), color: colors.grey, fontWeight: "bold" }}>{item}</Text>
    </View>
  )
}

const ItemContent = ({ item, index }) => {
  return (
    <View style={{ marginVertical: fontScale(10) }}>
      <Text key={index.toString()} style={{ fontSize: fontScale(13), color: index == 0 ? '#D19E01' : index == 1 ? colors.red : "#1AC4D1", textAlign: "right", fontWeight: "bold" }}>{item}</Text>
    </View>
  )
}

export default index;