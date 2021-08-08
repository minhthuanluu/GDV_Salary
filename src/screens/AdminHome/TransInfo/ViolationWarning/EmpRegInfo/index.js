import { useRoute, useNavigation } from '@react-navigation/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native';
import { set } from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import { getTransInfoWarningByType } from '../../../../../api';
import { Body, DatePicker, Header, Table } from '../../../../../comps';
import { colors } from '../../../../../utils/Colors';
import { width } from '../../../../../utils/Dimenssion';
import { fontScale } from '../../../../../utils/Fonts';
import { images } from '../../../../../utils/Images';

const index = (props) => {
    const route = useRoute();
    const [month, setMonth] = useState(route.params?.month);
    const [type, setType] = useState(); // type = 1 => menu1 - menu 4
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [branchCode, setBranchCode] = useState("");
    const [shopCode, setShopCode] = useState("");
    const [empCode, setEmpCode] = useState("");

    const { key, title } = route.params;

    // navigation.goBack()
    const getData = async (month, branchCode, shopCode, empCode, type) => {
        setLoading(true);
        await getTransInfoWarningByType(navigation, month, branchCode, shopCode, empCode, type).then((res) => {
            if (res.status == "success") {
                setData(res.data);
                setLoading(res.loading);
            }
            if (res.status == "failed") {
                setLoading(res.loading);
            }
            if (res.status == "v_error") {
                setLoading(res.loading);

            }

        })
    }

    const _onChangeMonth = async(month)=>{
        await getData(month, "", "", "", key);
    }

    useEffect(() => {
        getData(month, "", "", "", key);
    },[month])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
            <Header title={title} />
            <DatePicker month={month} width={width - fontScale(120)} style={{ alignSelf: "center" }} onChangeDate={(date) => _onChangeMonth(date)} />
            <ActivityIndicator size="small" color={colors.primary} />
            <Body />
            <View style={{ flex: 1, backgroundColor: colors.white, }}>
               {loading==true ? <ActivityIndicator size="small" color={colors.primary}/> : null}
                <View style={{ marginTop: -fontScale(30) }}>
                    <Table
                        // style={styles.table}
                        data={data}
                        table
                        numColumn={4}
                        headers={[
                            "GDVPTM",
                            "Tên CH",
                            "SLTB/tháng",
                            "Top/ngày"
                        ]}
                        headersTextColor={"#00BECC"}
                        headerStyle={{ icon: { size: 15 }, text: { size: fontScale(14) } }}
                        headerMarginLeft={fontScale(11)}
                        // headerIcons={[images.branch, images.company, images.workingShop, images.close]}
                        // lastIconHeader={images.day}
                        widthArray={[
                            width/5,
                            width/4,
                            width/4,
                            width/5
                        ]}
                        fields={data.map((item) => [
                            item.empName,
                            item.store,
                            item.subAmount,
                            item.topPerDay
                        ])}
                        loading={loading}
                        firstRowBg={colors.lightGrey}
                        lastIcon={images.check}
                        fontWeight={["normal"]}
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
                           index%2==0 ? colors.white : colors.lightGrey
                        )}
                        onPress={(item)=>navigation.navigate("AdminEmpRegInfoDetail",{"shopCode":item.shopCode,"title":title,"month":month})}
                    />
                </View>
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />

        </SafeAreaView>
    );
}

export default index;