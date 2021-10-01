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
import { images } from "../../../../utils/Images";

import { BackHandler } from "react-native";
import { getMonthSalaryGroup } from "../../../../adminapi";
import { ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";

const index = () => {
  const [month, setMonth] = useState(moment(new Date()).subtract(1, "months").format("MM/YYYY"));
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const getData = async (month) => {
    setMessage("");
    setLoading(true);
    await getMonthSalaryGroup(navigation, month).then((res) => {
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
      <Header title={text.grocontractSalary} />
      <DatePicker
        month={month}
        width={width - fontScale(120)}
        style={{ alignSelf: "center" }}
        onChangeDate={(date) => _onChangeMonth(date)}
      />
      <Body />
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        {loading == true ? <ActivityIndicator size="small" color={colors.primary} /> : null}
        <View style={{ marginTop: -fontScale(40) }}>
          <Table
            data={data}
            table
            numColumn={6}
            headers={["", ">=20tr", ">=17tr", ">=12tr", "<12tr", "Tổng GDV"]}
            headersTextColor={"#289AF3"}
            headerStyle={{ icon: { size: 15 }, text: { size: fontScale(14) } }}
            headerMarginLeft={0.5 / 10 * width}
            widthArray={[
              2.5 / 10 * width,
              1.5 / 10 * width,
              1.5 / 10 * width,
              1.5 / 10 * width,
              1.5 / 10 * width,
              1.5 / 10 * width,
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
            fontWeight={data.map((item, index) =>
              index == 0 || item.shopType == "BRANCH" ? "bold" : "normal"
            )}
            style={{ marginTop: fontScale(30) }}
            textAlign="center"
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
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};

export default index;
