import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/core';
import { colors } from '../../../../../utils/Colors';
import { Header } from '../../../../../comps';

function index(props) {
    const route = useRoute();
    const {title } = route.params;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
            <Header title={title} />
        </SafeAreaView>
    );
}

export default index;