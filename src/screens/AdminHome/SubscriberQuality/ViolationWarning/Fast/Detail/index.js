import React, { useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Body, Header, Search, TableHeader } from '../../../../../../comps';
import { colors } from '../../../../../../utils/Colors';
import { useRoute, useNavigation } from '@react-navigation/core';
import { getDetailFastTrans } from '../../../../../../api';
import { Text } from 'react-native';
import { fontScale } from '../../../../../../utils/Fonts';
import { images } from '../../../../../../utils/Images';
import { text } from '../../../../../../utils/Text';
import { width } from '../../../../../../utils/Dimenssion';

const index = (props) => {
    const route = useRoute();
    const navigation = useNavigation()
    const { empCode, title } = route.params;
    const [empName, setEmpName] = useState("");
    const [notification, setNotification] = useState('');
    const [loading, setLoading] = useState(false);

    const getData = async (branchCode, shopCode, empCode) => {
        setLoading(true);

        await getDetailFastTrans(navigation, branchCode, shopCode, empCode).then((data) => {
            setNotification(data.data.notification);
            setEmpName(data.data.empName);
            setLoading(false);
            if (data.status == "success") {

            }
        })
    }
    useEffect(() => {
        getData("", "", "");
        // getBranchList();
        console.log("Chat luong thue bao > Canh bao vi pham > Chuyen Fast/MD1/MDT>=1TB")
    }, [navigation]);

    const searchSub = (text = "") => {

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
            <Header title={title} />
            <Text style={{ color: colors.white, fontWeight: "bold", textAlign: "center" }}>{notification}</Text>
            <Search
                style={{ alignSelf: "center", marginTop: fontScale(15) }}
                leftIcon={images.simlist}
                // data={tempData}
                rightIcon={images.searchlist}
                dataNotFoundText="Không tìm thấy dữ liệu"
                onChangeText={(value) => searchSub(value)}
                placeholder={text.searchSub}
                keyboardType="number-pad"
                width={width - fontScale(120)}
                placeHolder="Nhập số thuê bao"
            />
            <Body />
            <View style={{ flex: 1, backgroundColor: colors.white }}>
                <View style={{ justifyContent: "center", flexDirection: "row" }}>
                    <Text style={{color:colors.black,fontSize:fontScale(15)}}>GDV: </Text>
                    <Text style={{color:colors.darkYellow,fontSize:fontScale(15)}}>{empName}</Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: fontScale(20) }}>
                    <TableHeader style={{ flex: 1.8, marginLeft: -fontScale(40) }} title={'Ngày TH'} />
                    <TableHeader style={{ flex: 1.7, marginLeft: fontScale(15) }} title={'Số ĐT'} />
                    <TableHeader style={{ flex: 1.5, marginLeft: fontScale(5) }} title={'Loại cảnh báo'} />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default index;