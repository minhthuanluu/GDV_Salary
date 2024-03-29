import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, View, Text, Image, ActivityIndicator } from 'react-native';
import { _removeData, _retrieveData } from '../../../utils/Storage';
import { useIsFocused, useNavigation } from '@react-navigation/core';
import { colors } from '../../../utils/Colors';
import { images } from '../../../utils/Images';
import { styles } from './style';
import { text } from '../../../utils/Text';
import { checkLogin, checkUserRole } from '../../../utils/Logistics';

const Splash = () => {
    const navigation = useNavigation();
    const isFocus = useIsFocused();

    useEffect(() => {
        setTimeout(async() => {
            if (isFocus) {
                checkLogin(navigation)
                // navigation.navigate("AdminHome")
            } else {

            }
        }, 3000);
    },[navigation])
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={colors.primary} />
            <Image source={images.logo} style={styles.logo} />
            <View style={{ flex: 3.5, justifyContent: "center" }}>
                <Image source={images.splashshape} style={styles.shape} />
            </View>
            <View style={{ flex: 2 }}>
                <Text style={styles.appName}>{text.appName}</Text>
                <ActivityIndicator size="small" color={colors.white} style={styles.loadingIcon} />
            </View>
        </SafeAreaView>
    );
}

export default Splash;