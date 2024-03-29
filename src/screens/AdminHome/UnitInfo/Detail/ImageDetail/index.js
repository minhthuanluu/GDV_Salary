import { useRoute, useNavigation } from '@react-navigation/core';
import React from 'react';
import { TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView, Image } from 'react-native';
import { imgUrl } from '../../../../../adminapi/untils';
import { colors } from '../../../../../utils/Colors';
import { fontScale } from '../../../../../utils/Fonts';
import { images } from '../../../../../utils/Images';
import { styles } from './style';

const index = (props) => {
    const route = useRoute();
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ flex: 1, paddingTop: fontScale(50), backgroundColor: colors.black }}>
            <StatusBar backgroundColor={colors.black} />
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={images.back} style={styles.icon} />
            </TouchableOpacity>
            <Image source={{ uri: imgUrl + route.params?.avatar }} style={styles.avatar} />
        </SafeAreaView>
    );
}

export default index;