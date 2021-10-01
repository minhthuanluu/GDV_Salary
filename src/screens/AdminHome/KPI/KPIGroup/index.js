import moment from "moment";
import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StatusBar } from "react-native";
import { Body, DatePicker, Header } from "../../../../comps";
import { colors } from "../../../../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import { width } from "../../../../utils/Dimenssion";
import { fontScale } from "../../../../utils/Fonts";
import { text } from "../../../../utils/Text";
import { styles } from "./style";
import Table from "../../../../comps/table";  
import { BackHandler } from "react-native";
import { getKPIGroup } from "../../../../adminapi";
import { ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";

const index = () => {
  const [month, setMonth] = useState(
    moment(new Date()).format("MM/YYYY")
  );
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const getData = async (month) => {
    setMessage("");
    setLoading(true);
    await getKPIGroup(navigation, month).then((res) => {
      setLoading(false);
      if (res.status == "success") {
        if (res.data.length > 0 || res.data.data.length > 0) {
          setData(res.data.data);
          setLoading(false);
        }
      }
      if (res.status == "failed") {
        setMessage("Không có dữ liệu");
        setLoading(false);
      }
      if (res.status == "v_error") {
        Toast.show({
          text1: "Cảnh báo",
          text2: res.message,
          type: "error",
          visibilityTime: 1000,
          autoHide: true,
          onHide: () => navigation.goBack()
        })
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
    getData(month); // gọi data thật
    return () => {
      backHandler.remove();
    };
  }, [""]);

  const _onChangeMonth = async (value) => {
    setMonth(value);
    await getData(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={colors.primary} />
      <Header title={text.kpiGroup} />
      <DatePicker
        month={month}
        width={width - fontScale(120)}
        style={{ alignSelf: "center" }}
        onChangeDate={(date) => _onChangeMonth(date)}
      />
      <Body />
      <View style={{ flex: 1, backgroundColor: colors.white, }}>
        {loading==true ? <ActivityIndicator style={{marginVertical:fontScale(5)}} color={colors.primary} size="small"/>:null}
      <View style={{marginTop: -30}}>
        <Table
          style={styles.table}
          data={data}
          table
          numColumn={6}
          headers={[
            "",
            ">=100%",
            ">=90%",
            ">=70%",
            "<70%",
            "Tổng GDV"
          ]}
          headersTextColor={"#289AF3"}
          headerStyle={{ icon: { size: 15 }, text: { size: fontScale(14) } }}
          headerMarginLeft = {fontScale(14)}
          // headerIcons={[images.branch, images.company, images.workingShop, images.close]}
          // lastIconHeader={images.day}
          widthArray={[
            2.7/10*width,
            1.4/10*width,
            1.4/10*width,
            1.4/10*width,
            1.4/10*width,
            1.45/10*width,
          ]}
          headerMarginLeft={fontScale(30)}
          fields={data.map((item) => [
            item.shopName,
            item.target100,
            item.target90,
            item.target70,
            item.targetLesser70,
            item.totalEmp,
          ])}
          loading={loading}
          hideFirstColHeader
          firstRowBg={"#FBFDC3"}
          fontWeight={data.map((item, index) =>
            index == 0 || item.shopType == "BRANCH" ? "bold" : "normal"
          )}
          style={{ marginTop: fontScale(30) }}
          textAlign = "center"
          textColor={data.map((item, index) =>
            item.shopType=="BRANCH" || index==0? "#000" : "#D19E01"
          )}
          rowBg={data.map((item, index) =>
            item.shopType == "BRANCH" ? "#EBFDFD" : "#fff"
          )}
          textAlign="center"
        />
      </View>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};

export default index;
