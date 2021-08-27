import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Image } from "react-native";
import { BackHandler } from "react-native";
import { View } from "react-native";
import { StatusBar } from "react-native";
import { ActivityIndicator } from "react-native";
import { SafeAreaView, Text } from "react-native";
import Toast from "react-native-toast-message";
import { getProfile, getSubscriberProductivity } from "../../../../api";
import { Body, DateView, Header, ListMenu } from "../../../../comps";
import { styles } from "../../../../comps/listmenu/styles";
import { UserObj } from "../../../../models";
import { colors } from "../../../../utils/Colors";
import { fontScale } from "../../../../utils/Fonts";
import { images } from "../../../../utils/Images";
import { ToastNotif } from "../../../../utils/Logistics";
import { text } from "../../../../utils/Text";

const ProductivitySub = (props) => {
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUserData] = useState(UserObj);
  const navigation = useNavigation();

  const getData = async () => {
    setMessage("");
    setLoading(true);
    await getSubscriberProductivity(navigation).then((res) => {
      if (res.status == "success") {
        if (res.data.length > 0 || res.data.data.length > 0) {
          setDateRange(res.data.dateRange);
          setData(res.data.data);
          setLoading(false);
        } else {
          setMessage("Ko có dữ liệu");
          setLoading(false)
        }
      }

      if (res.status == "failed") {
        ToastNotif("Cảnh báo", res.message, "error", true);
        setLoading(false)

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
    getData();
    return () => {
      backHandler.remove();
    };
  }, [""]);
  const icons = [images.company, images.branch, images.store, images.splashshape];
  const labels = ["TBTS:", "TBTT:", "Lượt KH:", "Lượt GD:"];
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
      <StatusBar translucent backgroundColor={colors.primary} />
      <Header title={text.kpiByMonth} />
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <DateView dateLabel={dateRange} style={styles.dateView} />

      <Body style={styles.bodyScr} displayName={user.displayName} maGDV={user.gdvId.maGDV} />
      <View style={{ backgroundColor: colors.white, flex: 1 }}>
        <Text style={styles.text}>Năng suất bình quân</Text>
        {
          loading == true ? <ActivityIndicator size="small" color={colors.primary} style={{ marginTop: fontScale(20) }} /> : null
        }
        <FlatList
          style={styles.list}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return <View style={styles.bg} key={index.toString()}>
              <Text style={styles.fieldData}>{item.shopName}</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: fontScale(40) }}>
                {
                  labels.map((label, index) => {
                    return <View style={{ flexDirection: "row", flex: 1 }}>
                      <Text key={label} style={styles.labelDataOne} >{label}</Text>
                      <Text style={styles.fieldDataTwo} key={index.toString()}>{index == 0 ? item.postSub : index == 1 ? item.preSub : index == 2 ? item.cusAmount : item.transAmount}</Text>
                    </View>
                  })
                }
              </View>
              <Image source={icons[index]} style={styles.icon} />
            </View>
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductivitySub;