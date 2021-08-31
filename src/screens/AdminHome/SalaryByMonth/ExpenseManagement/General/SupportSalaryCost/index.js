import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, ScrollView } from "react-native";
import { Body, DatePicker, GeneralListItem, Header } from "../../../../../../comps";
import { styles } from "./style";
import { images } from "../../../../../../utils/Images";
import moment from "moment";
import { getKPIByMonth, getMonthSalary, getSummarySubQuality, getTotalSalarySupport, getTransactionStatistics } from "../../../../../../adminapi";
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

    await getTotalSalarySupport(navigation).then((data) => {
      if (data.status == "success") {
        setLoading(false);
        if (data.length == 0) {
          setData([])
          setMessage(data.message);
        } else {
          setNotification(data.data.notification)
          setData(data.data.data);
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
      <Body
        showInfo={false}
        style={{ marginTop: fontScale(15), zIndex: -10 }}
      />
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        {loading == true ? <ActivityIndicator size="small" color={colors.primary} style={{ marginTop: fontScale(20) }} /> : null}
        <Text style={{ color: colors.primary, textAlign: "center" }}>{message && message}</Text>
        <ScrollView horizontal>
          <View style={{ width: width }}>
            <FlatList
              data={data}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={{ marginTop: index == 0 ? fontScale(20) : fontScale(40), marginBottom: index == data.length - 1 ? fontScale(40) : 0 }}>
                  {/* <GeneralListItem
                    style={{ marginBottom: fontScale(100), marginTop: index == 0 ? -fontScale(36) : -fontScale(55) }}
                    backgroundColor={"#FFFFFF"}
                    textTitle={{fontSize: fontScale(18),  fontWeight: "bold", color: props.textColor || "#151515"}}
                    contentStyle={{ fontSize: 12,textAlign:"right", marginVertical: fontScale(8) }}
                    contentStyle1={{ fontSize: 12,textAlign:"right", marginVertical: fontScale(8) }}
                    contentStyle2={{ fontSize: 12,textAlign:"right", marginVertical: fontScale(8) }}
                    titleStyle={{fontSize: 12, marginVertical: fontScale(8) }}
                    titleArrOneStyle={{textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: "#CC9B02", marginLeft: fontScale(155),marginVertical: fontScale(11)}}
                    titleArrTwoStyle={{textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: "#CC9B02", marginLeft: fontScale(51),marginVertical: fontScale(11)}}
                    viewContentStyle={{justifyContent: "space-between", marginLeft: -fontScale(275),textAlign:"right"}}
                    viewOneContentStyle={{justifyContent: "space-between", marginLeft: -fontScale(55),textAlign:"right"}}
                    twentyFourColumnCompany
                    title={item.branchCode}
                    icon={images.branch}
                    titleArr={["Tổng chi","BQ 1 tháng"]}
                    titleArray={["CF hỗ trợ CHT ", "CF hỗ trợ khác", "Thu"]}
                    itemAmountOne={[item.outcomeMaster,item.otherOutcomeMaster,item.incomeTotalOutcome]}
                    itemAmountTwo={[item.avgMaster,item.otherAvgMaster,item.incomeAvgOutcome]}/>  */}
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
                  <Image source={images.branch} resizeMode="cover" style={{ width: fontScale(40), height: fontScale(40), position: "absolute", right: fontScale(20), zIndex: 40, top: -fontScale(15) }} />
                    <Text style={{ color: colors.black, fontSize: fontScale(18), marginTop: fontScale(15), fontWeight: "bold" }}>{item.branchCode}</Text>

                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 0.8, marginTop: fontScale(20) }}>
                        {["","CF hỗ trợ CHT ", "CF hỗ trợ khác", "Thu"].map((item, index) => <Item item={item} index={index} />)}
                      </View>
                      <View style={{ flex: 1, marginTop: fontScale(20) }}>
                        {["Tổng chi", item.outcomeMaster,item.otherOutcomeMaster,item.incomeTotalOutcome].map((item, index) => <ItemContent item={item} index={index} />)}
                      </View>
                      <View style={{ flex: 1, marginTop: fontScale(20) }}>
                        {["BQ 1 tháng", item.avgMaster,item.otherAvgMaster,item.incomeAvgOutcome].map((item, index) => <ItemContent item={item} index={index} />)}
                      </View>
                      <View style={{ flex: 0.5, marginTop: fontScale(20) }}/>
                    </View>
                  </View>

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

const Item = ({ item, index }) => {
  return (
    <View key={index.toString()} style={{ marginVertical: fontScale(10) }}>
      <Text style={{ fontSize: fontScale(13), color: colors.grey, fontWeight: "bold" }}>{item}</Text>
    </View>
  )
}

const ItemContent = ({ item, index }) => {
  return (
    <View style={{ marginVertical: fontScale(10) }}>
      <Text key={index.toString()} style={{ fontSize: fontScale(13), color: index == 0 ? '#D19E01' : index == 1 ? colors.red : colors.lightBlue, textAlign: "right", fontWeight: "bold" }}>{item}</Text>
    </View>
  )
}

export default index;