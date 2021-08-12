import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { SafeAreaView, View } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/core';
import { colors } from '../../../../../utils/Colors';
import { Body, Header } from '../../../../../comps';
import { getFastTrans } from "../../../../../api";
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';

function index(props) {
    const route = useRoute();
    const { title } = route.params;
    const navigation = useNavigation();
    const [notification, setNotification] = useState('');
    const [loading, setLoading] = useState(false);

    const getData = async (branchCode, shopCode, empCode) => {
        console.log(branchCode, shopCode, empCode)
        setLoading(true);
        await getFastTrans(navigation, branchCode, shopCode, empCode).then((data) => {
            setNotification(data.data.notification);
            setLoading(false);

        })
    }

    useEffect(() => {
        getData("", "", "");
    }, [notification])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
            <Header title={title} />
            <Text style={{ color: colors.white, textAlign: "center" }}>{notification}</Text>
            <Body />
            <View style={{ flex: 1, backgroundColor: colors.white }}>
                {loading == true ? <ActivityIndicator size="small" color={colors.primary} /> : null}

            </View>
        </SafeAreaView>
    );
}

export default index;