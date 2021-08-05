import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, Text, FlatList, View, ActivityIndicator } from "react-native";
import {
  Body,
  DataPicker,
  DatePicker,
  GeneralListItem,
  Header,
  MetricStatus,
  Search,
  TableHeader,
} from "../../../../comps";
import { styles } from "./style";
import { colors } from "../../../../utils/Colors";
import { fontScale } from "../../../../utils/Fonts";
import { images } from "../../../../utils/Images";
import { text } from "../../../../utils/Text";
// import { getAdminKPIMonthTopTeller, getAllBranch, getAllShop } from "../../../../adminapi";
import { useNavigation } from "@react-navigation/native";
import { width } from "../../../../utils/Dimenssion";
import { BackHandler } from "react-native";
import moment from "moment";
import Toast from 'react-native-toast-message';
import { getAdminKPIMonthTopTeller, getAllBranch, getAllShop } from "../../../../adminapi";
import { _retrieveData } from "../../../../utils/Storage";

const AdminTopTeller = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const navigation = useNavigation();
  const [branchCode, setBranchCode] = useState("2MFHCM1");
  const [branchList, setBranchList] = useState([]);
  const [shopList, setShopList] = useState([]);
  const [shopCode, setShopCode] = useState('');
  const [empCode, setEmpCode] = useState('');

  const [empList, setEmpList] = useState([])
    
  const [month, setMonth] = useState(moment(new Date()).format("MM/YYYY"));
  const [sort, setSort] = useState(1);
  const [placeHolder,setPlaceHolder] = useState('')
  const [role,setRole] = useState();
  const [defaultShopCode,setDefaultShopCode] = useState('')
  const [defaultShopName,setDefaultShopName] = useState('')

  const getBranchList = async () => {
    setLoading(true)
    await getAllBranch(navigation).then((res) => {
      if (res.status == "success") {
        setLoading(false);
        setBranchList(res.data);
        setBranchCode(res.data[0].shopCode);

      }
      if (res.status == "failed") {
        setLoading(false);
      }
      if (res.status == "v_error") {
        Toast.show({
          text1: "Cảnh báo",
          text2: res.message,
          type: "error",
          visibilityTime: 1000,
          autoHide: true,
          onHide: () => navigation.navigate("AdminHome")
        })
      }
    })
  }

  const onChangeBranch = async (value) => {
    setLoading(true)
    setBranchCode(value);
    await getAllShop(navigation, branchCode).then((res) => {
      if (res.status == "success") {
        setLoading(false);
        setShopList(res.data);

      }
      if (res.status == "failed") {
        setLoading(false);
      }
      if (res.status == "v_error") {
        Toast.show({
          text1: "Cảnh báo",
          text2: res.message,
          type: "error",
          visibilityTime: 1000,
          autoHide: true,
          onHide: () => navigation.navigate("AdminHome")
        })
      }
    })
  }

  const onChangeShop = async(value)=>{
    getAllEmp()
  }

  const getData = async (branchCode, month, sort) => {
    setMessage("");
    setLoadingData(true);
    await getAdminKPIMonthTopTeller(navigation, branchCode, month, sort).then((res) => {
      setLoadingData(false);
        if (res.status == "success") {
          if (res.data.length > 0 || res.data.data.length > 0) {
            setData(res.data.data);
            setLoadingData(false);
          } else {
            setData([])
            setMessage(res.message)
            setLoadingData(false);
          }
        }
        if (res.status == "failed") {
          setMessage("Không có dữ liệu")
          setLoadingData(false);
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
    getBranchList();
    getData(branchCode, month, sort);
    setPlaceHolder("Chọn chi nhánh");
    checkRole();
    return () => {
      backHandler.remove();
    };
  }, [""]);

  const _onChangeMonth = async (value) => {
    setMonth(value);
    await getData(branchCode, value, sort)
  }

  const checkRole = async () => {
    await _retrieveData("userInfo").then((user) => {
      let role = user?.userId.userGroupId.code;
      setDefaultShopName(user?.userId.shopId.shopName);
      setDefaultShopCode(user?.userId.shopId.shopCode)
      setRole(role) 
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={colors.primary} />
      <Header title={text.topTellers} />
      <DatePicker month={month} width={width - fontScale(120)} style={{ alignSelf: "center" }} onChangeDate={(date) => _onChangeMonth(date)} />
      <Search
        loading={loading}
        modalTitle="Vui lòng chọn" 
        placeholder={placeHolder}
        searchSelectModal 
        width={width - fontScale(60)} 
        style={{ marginTop: fontScale(20) }} 
        leftIcon={images.teamwork}
        dataOne={branchList}
        dataTwo={shopList}
        dataThree={empList}
        index={branchList.map((item, index) => index)}
        fieldOne={branchList.map((item) => item.shopName)}
        fieldTwo={shopList.map((item) => item.shopName)}
        fieldThree={empList.map((item, index) => item.maGDV)}
        onChangePickerOne={(value, index) => onChangeBranch(value.shopCode)}
        showPicker={[true, false, false]}
        onPressOK={(value)=>getData(branchCode||defaultShopCode,month,value.sort)}
        fixed={role!="VMS_CTY" ? true : false}
        fixedData={defaultShopName}
      />

      <Body
        showInfo={false}
        style={{ marginTop: fontScale(15), zIndex: -10 }}
      />

      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <View style={{ flexDirection: "row", marginTop: fontScale(2) }}>
          <TableHeader style={{ width: (width * 3.9) / 10 }} title={text.GDV} />
          <TableHeader style={{ width: (width * 2.5) / 10 }} title={text.sumKPI} />
          <TableHeader style={{ width: (width * 1.21) / 10 }} title={text.TBTS} />
          <TableHeader style={{ width: (width * 2.5) / 10 }} title={text.TBTT} />

        </View>
        {loadingData == true ? (
          <ActivityIndicator
            size="small"
            color={colors.primary}
            style={{ marginTop: fontScale(10) }}
          />
        ) : null}

        {message ? <Text style={styles.message}>{message}</Text> : null}

        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          style={{ marginTop: fontScale(10) }}
          keyExtractor={(item, index) => index.toString()}
          key={({ item }) => item.empName.toString()}
          renderItem={({ item, index }) => (
            <GeneralListItem
              item={item}
              index={index}
              fields={[
                `${item.empName}\n(${item.workPlace})`,
                item.sumKpi,
                item.postPaid,
                item.prePaid,

              ]}
              style={[
                [styles.dateCol, { width: (width * 3.9) / 10 }],
                [styles.dateCol, { width: (width * 2.5) / 10 }],
                [styles.dateCol, { width: (width * 1.5) / 10 }],
                [styles.dateCol, { width: (width * 2.3) / 10 }],
                [styles.dateCol, { width: (width * 1) / 10 }],
              ]}
            //   lastIcon={item.pckSub == 1 ? images.check : images.cancle}
            //   lastIconViewStyle={{ alignItems: "center", flex: 0.5 }}
            //   lastIconStyle={{
            //     flex: 0.5,
            //     width: fontScale(15),
            //     height: fontScale(19),
            //   }}
            />
          )}
        />
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};

export default AdminTopTeller;