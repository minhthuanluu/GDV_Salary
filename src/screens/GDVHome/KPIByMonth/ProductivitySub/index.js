import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
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

    await getProfile(navigation).then((res) => {
      if (res.status == "success") {
        setLoading(false)
        setUserData(res.data)
      }
      if (res.status == "failed") {
        setLoading(false)
      }
    })
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
      {/* <ListMenu data={listMenu[1]} icon={images.arrears}/> */}
      <StatusBar translucent backgroundColor={colors.primary} />
      <Header title={text.kpiByMonth} />
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <DateView dateLabel={dateRange} style={styles.dateView} />

      <Body style={styles.bodyScr} displayName={user.displayName} maGDV={user.gdvId.maGDV} />
      <View style={{ backgroundColor: colors.white, flex: 1 }}>
        <Text style={styles.text}>Năng suất bình quân</Text>
        {
          loading == true ? <ActivityIndicator size="small" color={colors.primary} style={{marginTop:fontScale(20)}}/> : null
        }
        <FlatList 
          style={styles.list}
          data={data}
          // data={listMenu}
          keyExtractor={(index, item) => index.toString()}
          renderItem={({ item, index }) => (
            <ListMenu
              data={item}
              // onPress={()=>navigation.navigation("")}
              labelData={["TBTS:"]}
              labelDataTwo={["TBTT:"]}
              labelDataThree={["Lượt KH:"]}
              labelDataFour={["Lượt GD:"]}
              index={index}
              fieldData={[
                item.shopName
              ]}
              fieldDataOne={[
                item.postSub
                
                

              ]}

              fieldDataTwo={[
                item.preSub
              ]}

              fieldDataThree={[
                item.cusAmount
              ]}

              fieldDataFour={[
                item.transAmount
              ]}

              fieldDataFour={[
                item.transAmount
              ]}
              // iconOne
              // icon={images.company}
              icon={[images.company, images.branch, images.store, images.splashshape]}
            />
            // <Text>{JSON.stringify(item)}</Text>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductivitySub;