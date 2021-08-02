import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Image, View, Text } from 'react-native';
import { colors } from '../../utils/Colors';
import { fontScale } from '../../utils/Fonts';
import { styles } from './styles';

const GeneralListItem = (props) => {
  return (
    props.company ? 
      <View style={styles.compContainer}>
          <Text style={{fontSize:fontScale(18),marginLeft:fontScale(10),fontWeight:"bold",color:"#D19E01"}}>{props.title}</Text>
          <Image source={props.icon} style={{width:fontScale(47),height:fontScale(47),position:"absolute",right:fontScale(20),top:-fontScale(23)}} resizeMode="contain"/>
          <View style={{flexDirection:"row",justifyContent:"space-between",marginHorizontal:fontScale(5),marginVertical:fontScale(10)}}>
          <Item title={props.titleArray[0]} content={props.item[0]} />
          <Item title={props.titleArray[1]} content={props.item[1]} />
          <Item title={props.titleArray[2]} content={props.item[2]} />
          <Item title={props.titleArray[3]} content={props.item[3]} />
          </View>
          <View style={{flexDirection:"row",justifyContent:"space-between",marginHorizontal:fontScale(5),marginTop:fontScale(20)}}>
          <Item title={props.titleArray[4]} content={props.item[4]} />
          <Item title={props.titleArray[5]} content={props.item[5]} />
          <Item title={props.titleArray[6]} content={props.item[6]} />
          <Item title={props.titleArray[7]} content={props.item[7]} />
          </View>
          
      </View>
    :
    props.columns ? props.onPress ?
      <TouchableOpacity style={[styles.container, props.style]}>
        {
          props.rightIcon ? <Image source={props.rightIcon} resizeMode="contain" style={{ width: fontScale(40), height: fontScale(40), position: "absolute", right: fontScale(20), top: -fontScale(20) }} /> : null
        }
        <Text key={props.index} style={{ fontSize: fontScale(18), color: "#2e2e31", fontWeight: "bold", marginLeft: fontScale(22), marginRight: fontScale(11), marginBottom: fontScale(5) }}>{props.title}</Text>
        <View style={{ flexDirection: "row" }}>
          {
            props.titleArray.map((item, index) => <View style={{ flex: 1 }} >
              <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: fontScale(12), color: colors.grey }}>{item}</Text>
              <Text style={{ textAlign: "center", fontWeight: "bold", color: colors.primary, fontSize: fontScale(14),marginTop:fontScale(10) }}>{props.item[index]}</Text>
            </View>)
          }
        </View>

      </TouchableOpacity>
      :

      <View style={[styles.container, props.style]}>
        {
          props.rightIcon ? <Image source={props.rightIcon} resizeMode="contain" style={{ width: fontScale(40), height: fontScale(40), position: "absolute", right: fontScale(20), top: -fontScale(20) }} /> : null
        }
        <Text style={{ fontSize: fontScale(18), color: "#2e2e31", fontWeight: "bold", marginLeft: fontScale(22), marginRight: fontScale(11), marginVertical: fontScale(11) }}>{props.title}</Text>
        <View style={{ flexDirection: "row" }}>
          {
            props.titleArray.map((item, index) => <View style={{ flex: 1 }} >
              <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: fontScale(12), color: colors.grey }}>{item}</Text>
              <Text style={{ textAlign: "center", fontWeight: "bold", color: colors.primary, fontSize: fontScale(14) }}>{props.item[index]}</Text>
            </View>)
          }
        </View>

      </View>
      : <View
        style={{ backgroundColor: props.index % 2 ? colors.lightGrey : colors.white, paddingVertical: 8 }}    >
        <View style={{ flexDirection: "row" }} key={props.index}>
          {
            props.fields.map((item, index) => {
              return props.lastIcon && index == props.fields.length - 1
                ? <View style={props.lastIconViewStyle} key={index}><Image resizeMode="contain" style={props.lastIconStyle} source={props.lastIcon} /></View>
                : <Text style={props.style[index]} key={index}>{item}</Text>
            })
          }
        </View>
      </View>
  );
}

const Item=(props)=>{
  return(
    <View style={{justifyContent:"center"}}>
    <Text style={{textAlign:"center",fontSize:fontScale(13),fontWeight:"bold",color:colors.grey}}>{props.title}</Text>
    <Text style={{textAlign:"center",fontSize:fontScale(13),fontWeight:"bold",color:'#1AC4D1',marginTop:fontScale(10)}}>{props.content}</Text>
  </View>
  )
}
export default GeneralListItem;