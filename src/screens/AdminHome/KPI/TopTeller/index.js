import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, Text, FlatList, View, ActivityIndicator } from "react-native";
import { Body, GeneralListItem, Header, SearchWithPermission, TableHeader } from "../../../../comps";
import { styles } from "./style";
import { colors } from "../../../../utils/Colors";
import { fontScale } from "../../../../utils/Fonts";
import { images } from "../../../../utils/Images";
import { text } from "../../../../utils/Text";
import { useNavigation } from "@react-navigation/native";
import { width } from "../../../../utils/Dimenssion";
import moment from "moment";
import Toast from 'react-native-toast-message';
import { getAdminKPIMonthTopTeller } from "../../../../adminapi";
import { _retrieveData } from "../../../../utils/Storage";
import { getRole } from "../../../../utils/Logistics";
import { ROLE } from "../../../../utils/Roles";

const AdminTopTeller = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const navigation = useNavigation();
  const [shopCode, setShopCode] = useState('');
  const [defaultShopName, setDefaultShopName] = useState('');
  const [month, setMonth] = useState(moment(new Date()).format("MM/YYYY"));
  const [sort, setSort] = useState(1);
  const [placeHolder, setPlaceHolder] = useState(text.chooseBranch);
  const [role, setRole] = useState();
  const [defaultBranchCode, setDefaultBranchCode] = useState('');
  const [defaultBranchName, setDefaultBranchName] = useState('');

  const getData = async (branchCode, month, sort) => {
    setMessage("");
    setLoadingData(true);
    setData([]);
    await getAdminKPIMonthTopTeller(navigation, branchCode, "", month, sort).then((res) => {
      setLoadingData(false);
      if (res.status == "success") {
        if (res.data.data.length > 0) {
          setData(res.data.data);
          setLoadingData(false);
          setMessage('')
        } else {
          setData([]);
          setMessage(res.message);
          setLoadingData(false);
        }
      }
      if (res.status == "failed") {
        setLoadingData(false);
      }
    });
  };

  const checkRole = async () => {
    await getRole().then(async (data) => {
      setRole(data.role)
      if (data.role == ROLE.VP_CTY || data.role == ROLE.VMS_CTY || data.role == ROLE.ADMIN) {
        setPlaceHolder(text.chooseBranch);
        await getData("", month, 1)
      } else if (data.role == ROLE.MBF_CHINHANH) {
        setDefaultShopName(data.label);
        setPlaceHolder(data.label);
        setDefaultBranchName(data.branchName);
        setDefaultBranchCode(data.shopCode);
        await getData(data.shopCode, month, sort);
      } else if (data.role == ROLE.MBF_CUAHANG) {
        setDefaultShopName(data.branchName);
        setPlaceHolder(data.label);
        setDefaultBranchName(data.shopName);
        setDefaultBranchCode(data.shopCode);
        await getData(data.branchCode, month, sort);
      }
    })
  }

  useEffect(() => {
    checkRole();
    console.log("AdminHome > KPI > Top GDV")
  }, [""]);

  const onSearch = async (value) => {
    await getData(value.branchCode, value.month, value.radio)
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={colors.primary} />
      <Header title={text.topTellers} />
      <SearchWithPermission
        oneSelect
        leftIcon={images.teamwork}
        rightIcon={images.searchlist}
        month={month}
        width={width - fontScale(50)}
        placeholder={text.search}
        modalTitle={text.select}
        onDone={(value) => onSearch(value)} />
      <Body
        showInfo={false}
        style={{ marginTop: fontScale(15), zIndex: -10 }} />
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <View style={{ flexDirection: "row", marginTop: fontScale(2) }}>
          <TableHeader style={{ width: (width * 3.9) / 10 }} title={text.teller} />
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
          maxToRenderPerBatch={20}
          renderItem={({ item, index }) => (
            <GeneralListItem
              item={item}
              index={index}
              isZeroPlan={item.isZeroPlan}
              fields={[
                `${item.empName}\n(${item.workPlace})`,
                item.sumKpi,
                item.postPaid,
                item.prePaid
              ]}
              style={[
                [styles.dateCol, { width: (width * 3.9) / 10 }],
                [styles.dateCol, { width: (width * 2.5) / 10, paddingTop: fontScale(7) }],
                [styles.dateCol, { width: (width * 1.5) / 10, paddingTop: fontScale(7) }],
                [styles.dateCol, { width: (width * 2.3) / 10, paddingTop: fontScale(7) }]
              ]}
            />
          )}
        />
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};

export default AdminTopTeller;