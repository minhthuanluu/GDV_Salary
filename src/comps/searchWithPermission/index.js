import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { Image } from 'react-native';
import { FlatList } from 'react-native';
import { Modal } from 'react-native';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView, View } from 'react-native';
import { getAllBranch } from '../../api';
import { colors } from '../../utils/Colors';
import { fontScale } from '../../utils/Fonts';

const index = (props) => {
    const [showModal, setShowModal] = useState(false)
    const [showSubModal, setShowSubModal] = useState(false)
    const [showSelect1Modal, setShowSelect1Modal] = useState(false);
    const [branchList,setBranchList] = useState([])

    const getBranchList=async()=>{
        await getAllBranch().then((data)=>{
            console.log(data)
            setBranchList(data)
          })
    
    }
   
    useEffect(()=>{
        getBranchList();
    },[branchList])
    return (
        <SafeAreaView>
            {
                props.full ? <View style={[styles.level1Container, { width: props.width, alignSelf: "center" }]}>
                    <TouchableOpacity style={styles.level1SubContain} onPress={() => setShowModal(!showModal)}>
                        <Image source={props.leftIcon} resizeMode="contain" style={styles.level1LeftIcon} />
                        <Text style={styles.level1Placeholder}>{props.placeholder}</Text>
                        <Image source={props.rightIcon} resizeMode="contain" style={styles.level1LeftIcon} />
                    </TouchableOpacity>
                    <Modal
                        statusBarTranslucent={true}
                        animationType={'slide'}
                        transparent={true}
                        visible={showModal}
                        onRequestClose={() => setShowModal(!showModal)}>
                        <TouchableOpacity style={{ flex: 3 / 2.2 }} onPress={() => setShowModal(!showModal)}>

                        </TouchableOpacity>
                        <View style={styles.level1ModalContainer}>
                            <Text style={styles.level1ModalTitle}>{props.modalTitle}</Text>
                            <TouchableOpacity style={[styles.select1Container, { width: props.select1Width }]} onPress={() => setShowSubModal(!showSubModal)}>
                                <Text>{props.select1LeftContainer}</Text>
                                <Text>{props.select1RightContainer}</Text>
                            </TouchableOpacity>
                            <Modal
                                statusBarTranslucent={true}
                                animationType={'slide'}
                                transparent={true}
                                visible={showSubModal}
                                onRequestClose={() => setShowSubModal(!showSubModal)}>
                                <TouchableOpacity style={{ flex: 3 / 2.2 }} onPress={() => setShowSubModal(!showSubModal)}>

                                </TouchableOpacity>
                                <View style={styles.level1ModalContainer}>
                                    <Text style={styles.level1ModalTitle}>{props.modalTitle}</Text>
                                    <FlatList
                                        data={props.data1&&props.data1}
                                        keyExtractor={(item,index)=>index.toString()}
                                        renderItem={({item})=><TouchableOpacity>
                                            <Text>{JSON.stringify(item)}</Text>
                                        </TouchableOpacity>}
                                    />
                                </View>
                            </Modal>
                        </View>
                    </Modal>
                </View> : null
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    level1Container: {
        padding: fontScale(10),
        backgroundColor: colors.white,
        borderRadius: fontScale(20)
    },
    level1Select: {
        backgroundColor: colors.white,
        flex: 1,
        padding: fontScale(15)
    },
    level1SubContain: {
        flexDirection: "row",
        alignItems: "center"
    },
    level1LeftIcon: {
        width: fontScale(20),
        height: fontScale(20)
    },
    level1Placeholder: {
        color: colors.black,
        flex: 1,
        paddingLeft: fontScale(15),
        textAlign: "center"
    },
    level1ModalContainer: {
        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: fontScale(30),
        borderTopRightRadius: fontScale(30),
        borderColor: colors.lightGrey,
        borderWidth: 1
    },
    level1ModalTitle: {
        textAlign: "center",
        paddingVertical: fontScale(20),
        fontSize: fontScale(17),
        fontWeight: "bold"
    },
    select1Container: {
        padding: fontScale(15),
        flexDirection: "row",
        alignSelf: "center",
        backgroundColor: colors.white,
        borderRadius: fontScale(20),
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }
})

export default index;