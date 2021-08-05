import moment from "moment";
import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StatusBar, Text } from "react-native";
import { Body, DatePicker, Header } from "../../../../comps";
import { colors } from "../../../../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import { width } from "../../../../utils/Dimenssion";
import { fontScale } from "../../../../utils/Fonts";
import { text } from "../../../../utils/Text";
import { styles } from "./style";

import Table from "../../../../comps/table";
import { images } from "../../../../utils/Images";

import { BackHandler } from "react-native";
import { getAllAvgIncomeGroup, getKPIGroup } from "../../../../adminapi";
import { ActivityIndicator } from "react-native";

const index = () => {
  const [month, setMonth] = useState(
    moment(new Date()).subtract(1, "months").format("MM/YYYY")
  );
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [notification, setNotification] = useState("")

  const getData = async () => {
    setMessage("");
    setLoading(true);
    await getAllAvgIncomeGroup(navigation).then((res) => {
      setLoading(false);
      if (res.status == "success") {
        if (res.data.length > 0 || res.data.data.length > 0) {
          setData(res.data.data);
          setNotification(res.data.notification);
          setLoading(false);
        }
      }
      if (res.status == "failed") {
        setMessage("Không có dữ liệu");
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    getData(); // gọi data thật
    return () => {
      backHandler.remove();
    };
  }, [""]);

  
  // const data = [
  //     {
  //         "id": 0,
  //         "shopName": "CTY 2",
  //         'target100': 30,
  //         "target90": 100,
  //         "target70": 70,
  //         "targetLesser70": 150,
  //         "totalEmp": 90,
  //         "shopType": "company"

  //     },
  //     {
  //         "id": 1,
  //         "shopName": "2MFHCM1",
  //         'target100': 30,
  //         "target90": 100,
  //         "target70": 70,
  //         "targetLesser70": 150,
  //         "totalEmp": 90,
  //         "shopType": "branch"
  //     },
  //     {
  //         "id": 2,
  //         "shopName": "CH ND",
  //         'target100': 30,
  //         "target90": 100,
  //         "target70": 70,
  //         "targetLesser70": 150,
  //         "totalEmp": 90,
  //         "shopType": "shop"
  //     },
  //     {
  //         "id": 4,
  //         "shopName": "CH PDL",
  //         'target100': 30,
  //         "target90": 100,
  //         "target70": 70,
  //         "targetLesser70": 150,
  //         "totalEmp": 90,
  //         "shopType": "shop"
  //     },
  //     {
  //         "id": 3,
  //         "shopName": "2MFHCM2",
  //         'target100': 30,
  //         "target90": 100,
  //         "target70": 70,
  //         "targetLesser70": 150,
  //         "totalEmp": 90,
  //         "shopType": "branch"
  //     },
  //     {
  //         "id": 6,
  //         "shopName": "CH THT",
  //         'target100': 30,
  //         "target90": 100,
  //         "target70": 70,
  //         "targetLesser70": 150,
  //         "totalEmp": 90,
  //         "shopType": "shop"
  //     },
  //     {
  //         "id": 80,
  //         "shopName": "CH Q7",
  //         'target100': 30,
  //         "target90": 100,
  //         "target70": 70,
  //         "targetLesser70": 150,
  //         "totalEmp": 90,
  //         "shopType": "shop"
  //     },
  //     {
  //         "id": 80,
  //         "shopName": "CH Q7",
  //         'target100': 30,
  //         "target90": 100,
  //         "target70": 70,
  //         "targetLesser70": 150,
  //         "totalEmp": 90,
  //         "shopType": "shop"
  //     }, {
  //         "id": 80,
  //         "shopName": "CH Q7",
  //         'target100': 30,
  //         "target90": 100,
  //         "target70": 70,
  //         "targetLesser70": 150,
  //         "totalEmp": 90,
  //         "shopType": "shop"
  //     },
  // ]

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={colors.primary} />
      <Header title={text.groupSalaryAverage} />
      <Text style={styles.notification}>{notification}</Text>
      <Body />
      <View style={{ flex: 1, backgroundColor: colors.white, }}>
          {loading==true ? <ActivityIndicator color={colors.primary} size="small"/> : null}
      <View style={{marginTop: -fontScale(30)}}>
        <Table
          style={styles.table}
          data={data}
          table
          numColumn={6}
          headers={[
            "",
            ">20tr",
            ">=17tr",
            ">=12tr",
            "<12tr",
            "Tổng GDV",
          ]}
          headersTextColor={"#00BECC"}
          headerStyle={{ icon: { size: 15 }, text: { size: fontScale(14) } }}
          headerMarginLeft = {fontScale(14)}
          // headerIcons={[images.branch, images.company, images.workingShop, images.close]}
          // lastIconHeader={images.day}
          widthArray={[
            fontScale(100),
            fontScale(60),
            fontScale(60),
            fontScale(60),
            fontScale(60),
            fontScale(70)
          ]}
          fields={data.map((item) => [
            item.shopName,
            item.target20,
            item.target17,
            item.target12,
            item.targetLesser12,
            item.totalEmp,
          ])}
          loading={loading}
          hideFirstColHeader
          firstRowBg={"#FBFDC3"}
          // lastIcon={images.check}
          fontWeight={data.map((item, index) =>
            index == 0 || item.shopType == "BRANCH" ? "bold" : "normal"
          )}
          style={{ marginTop: fontScale(30) }}
          textAlign = "center"
          textColor={data.map((item, index) =>
            item.shopType == "BRANCH"
              ? "#000"
              : item.shopType == "SHOP"
              ? "#D19E01"
              : "#000"
          )}
          rowBg={data.map((item, index) =>
            item.shopType == "BRANCH" ? "#EBFDFD" : "#fff"
          )}
        />
      </View>
      </View>
    </SafeAreaView>
  );
};

export default index;
