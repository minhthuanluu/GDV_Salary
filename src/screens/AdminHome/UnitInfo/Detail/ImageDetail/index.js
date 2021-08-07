import { useRoute, useNavigation } from '@react-navigation/core';
import React from 'react';
import { Text, TouchableOpacity,StatusBar } from 'react-native';
import { SafeAreaView, View, Image } from 'react-native';
import { imgUrl } from '../../../../../adminapi/untils';
import { colors } from '../../../../../utils/Colors';
import { images } from '../../../../../utils/Images';
import { styles } from './style';

const index = (props) => {
    const route = useRoute();
    const navigation = useNavigation();
    console.log(route.params)
    return (
        <SafeAreaView style={{flex:1,paddingTop:50,backgroundColor:colors.black}}>
        <StatusBar backgroundColor={colors.black} />
            <TouchableOpacity onPress={()=> navigation.goBack()}>
            <Image source={images.back} style={styles.icon} />
            </TouchableOpacity>
            
            <Image source={{uri: imgUrl + route.params?.avatar}} style={styles.avatar}/>
        </SafeAreaView>
    );
}

export default index;