import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Image, View, Text } from 'react-native';
import { colors } from '../../utils/Colors';
import { width } from '../../utils/Dimenssion';
import { fontScale } from '../../utils/Fonts';
import { styles } from './styles';

const GeneralListItem = (props) => {
  return (
    props.eightteenColumnCompany ?
      <View style={[styles.compContainer, props.style, { backgroundColor: props.backgroundColor || "#EFFEFF" }]}>
        <Text style={{ fontSize: fontScale(18), marginLeft: fontScale(10), fontWeight: "bold", color: props.textColor || "#D19E01" }}>{props.title}</Text>
        <View style={{ flexDirection: "row", marginVertical: fontScale(15) }}>
          <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: colors.black, marginLeft: fontScale(18) }}>{props.titleArrayOne[0]}</Text>
          <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: "#1AC4D1", marginLeft: fontScale(21) }}>{props.item[0]}</Text>
        </View>
        <View style={{ flexDirection: "row", marginVertical: fontScale(15) }}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: colors.grey, marginLeft: fontScale(18) }}>{props.titleArrayOne[1]}</Text>
            <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: "#1AC4D1", marginLeft: fontScale(11) }}>{props.item[1]}</Text>
          </View>
          <View style={{ flexDirection: "row", flex: 1, marginLeft: -fontScale(15) }}>
            <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: colors.grey, marginLeft: fontScale(12) }}>{props.titleArrayOne[2]}</Text>
            <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: "#1AC4D1", marginLeft: fontScale(11) }}>{props.item[2]}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginVertical: fontScale(15) }}>
          <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: colors.black, marginLeft: fontScale(18) }}>{props.titleArrayOne[3]}</Text>
          <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: "#1AC4D1", marginLeft: fontScale(21) }}>{props.item[3]}</Text>
        </View>
        <View style={{ marginLeft: fontScale(50), marginRight: fontScale(10) }}>
          <View style={{ flexDirection: "row", marginVertical: fontScale(15) }}>
            <View style={{ flex: 1 }}>

            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: "right", fontSize: fontScale(15), fontWeight: "bold", color: colors.black }}>{props.titleArr[0]}</Text>

            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: "right", fontSize: fontScale(15), fontWeight: "bold", color: colors.black }}>{props.titleArr[1]}</Text>

            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: "right", fontSize: fontScale(15), fontWeight: "bold", color: colors.black }}>{props.titleArr[2]}</Text>

            </View>
          </View>
        </View>
        <Image source={props.icon} style={{ width: fontScale(47), height: fontScale(47), position: "absolute", right: fontScale(20), top: -fontScale(23) }} resizeMode="contain" />

        <View style={{ flexDirection: "row", flex: 1, marginRight: fontScale(10) }}>
          <View style={{ justifyContent: "space-between", flex: 1 }}>
            <HItem title={props.titleArray[0]} titleStyle={props.titleStyle} />
            <HItem title={props.titleArray[1]} titleStyle={props.titleStyle} />
            <HItem title={props.titleArray[2]} titleStyle={props.titleStyle} />
            <HItem title={props.titleArray[3]} titleStyle={props.titleStyle} />
            <HItem title={props.titleArray[4]} titleStyle={props.titleStyle} />
            <HItem title={props.titleArray[5]} titleStyle={props.titleStyle} />
          </View>
          <View style={{ flex: 1, justifyContent: "space-between", marginLeft: -fontScale(225), textAlign: "right" }}>
            <HItem content={props.itemAmountOne[0]} contentStyle={props.contentStyle} />
            <HItem content={props.itemAmountOne[1]} contentStyle={props.contentStyle} />
            <HItem content={props.itemAmountOne[2]} contentStyle={props.contentStyle} />
            <HItem content={props.itemAmountOne[3]} contentStyle={props.contentStyle} />
            <HItem content={props.itemAmountOne[4]} contentStyle={props.contentStyle} />
            <HItem content={props.itemAmountOne[5]} contentStyle={props.contentStyle} />
          </View>
          <View style={{ flex: 1, justifyContent: "space-between", marginLeft: -fontScale(120), textAlign: "right" }}>
            <HItem content={props.itemAmountTwo[0]} contentStyle={props.contentStyle1} />
            <HItem content={props.itemAmountTwo[1]} contentStyle={props.contentStyle1} />
            <HItem content={props.itemAmountTwo[2]} contentStyle={props.contentStyle1} />
            <HItem content={props.itemAmountTwo[3]} contentStyle={props.contentStyle1} />
            <HItem content={props.itemAmountTwo[4]} contentStyle={props.contentStyle1} />
            <HItem content={props.itemAmountTwo[5]} contentStyle={props.contentStyle1} />
          </View>
          <View style={{ justifyContent: "space-between", marginLeft: -fontScale(125), textAlign: "right" }}>
            <HItem content={props.itemPercent[0]} contentStyle={props.contentStyle2} />
            <HItem content={props.itemPercent[1]} contentStyle={props.contentStyle2} />
            <HItem content={props.itemPercent[2]} contentStyle={props.contentStyle2} />
            <HItem content={props.itemPercent[3]} contentStyle={props.contentStyle2} />
            <HItem content={props.itemPercent[4]} contentStyle={props.contentStyle2} />
            <HItem content={props.itemPercent[5]} contentStyle={props.contentStyle2} />
          </View>
        </View>
      </View>
      :
      props.twelveColumnCompany ?
        <View style={[styles.compContainer, props.style, { backgroundColor: props.backgroundColor || "#EFFEFF" }]}>
          <Text style={{ fontSize: fontScale(18), marginLeft: fontScale(10), fontWeight: "bold", color: props.textColor || "#D19E01" }}>{props.title}</Text>
          <View>
            <View style={{ flexDirection: "row", marginVertical: fontScale(15) }}>
              <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: colors.black, marginLeft: fontScale(185) }}>{props.titleArr[0]}</Text>
              <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: colors.black, marginLeft: fontScale(61) }}>{props.titleArr[1]}</Text>
            </View>
          </View>
          <Image source={props.icon} style={{ width: fontScale(47), height: fontScale(47), position: "absolute", right: fontScale(20), top: -fontScale(23) }} resizeMode="contain" />
          <View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ justifyContent: "space-between" }}>
                <HItem title={props.titleArray[0]} titleStyle={props.titleStyle1} />
                <HItem title={props.titleArray[1]} titleStyle={props.titleStyle1} />
                <HItem title={props.titleArray[2]} titleStyle={props.titleStyle} />
                <HItem title={props.titleArray[3]} titleStyle={props.titleStyle} />
                <HItem title={props.titleArray[4]} titleStyle={props.titleStyle} />
                <HItem title={props.titleArray[5]} titleStyle={props.titleStyle} />
              </View>
              <View style={{ justifyContent: "space-between", marginLeft: -fontScale(249), textAlign: "right" }}>
                <HItem content={props.itemAmountOne[0]} contentStyle={props.contentStyle} />
                <HItem content={props.itemAmountOne[1]} contentStyle={props.contentStyle} />
                <HItem content={props.itemAmountOne[2]} contentStyle={props.contentStyle} />
                <HItem content={props.itemAmountOne[3]} contentStyle={props.contentStyle} />
                <HItem content={props.itemAmountOne[4]} contentStyle={props.contentStyle} />
                <HItem content={props.itemAmountOne[5]} contentStyle={props.contentStyle} />
              </View>
              <View style={{ justifyContent: "space-between", marginLeft: -fontScale(120), textAlign: "right" }}>
                <HItem content={props.itemAmountTwo[0]} contentStyle={props.contentStyle1} />
                <HItem content={props.itemAmountTwo[1]} contentStyle={props.contentStyle1} />
                <HItem content={props.itemAmountTwo[2]} contentStyle={props.contentStyle1} />
                <HItem content={props.itemAmountTwo[3]} contentStyle={props.contentStyle1} />
                <HItem content={props.itemAmountTwo[4]} contentStyle={props.contentStyle1} />
                <HItem content={props.itemAmountTwo[5]} contentStyle={props.contentStyle1} />
              </View>

            </View>
            <View style={{ flexDirection: "row", marginVertical: fontScale(15) }}>
              <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: colors.black, marginLeft: fontScale(18) }}>{props.titleArrayOne[0]}</Text>
              <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: "#FC2200", marginLeft: fontScale(21) }}>{props.item[0]}</Text>
            </View>
          </View>
        </View>
        :
        props.sixColumnCompany ?
          <View style={[styles.compContainer, props.style, { backgroundColor: props.backgroundColor || "#FFFFFF" }]}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: fontScale(16), marginLeft: fontScale(5), fontWeight: "bold", color: colors.black }}>{props.title}</Text>
              <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: colors.black, marginLeft: fontScale(25) }}>{props.titleArray[0]}: </Text>
              <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: '#1AC4D1' }}>{props.item[0]}</Text>
              <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: colors.black, marginLeft: fontScale(10) }}>{props.titleArray[1]}: </Text>
              <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: '#1AC4D1' }}>{props.item[1]}</Text>
            </View>
            <View>
              <View style={{ flexDirection: "row", marginVertical: fontScale(15) }}>

              </View>
            </View>
            <Image source={props.icon} style={{ width: fontScale(47), height: fontScale(47), position: "absolute", right: fontScale(20), top: -fontScale(23) }} resizeMode="contain" />
            <View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: fontScale(10), marginHorizontal: fontScale(5) }} key={props.icon}>
                <Item title={props.titleArray[2]} content={props.item[2]} />
                <Item title={props.titleArray[3]} content={props.item[3]} />
                <Item title={props.titleArray[4]} content={props.item[4]} />
                <Item title={props.titleArray[5]} content={props.item[5]} />
                <Item title={props.titleArray[6]} content={props.item[6]} />
              </View>
            </View>
          </View> :
          props.fiveColumnCompany ?
            <View style={[styles.compContainer, props.style, { backgroundColor: props.backgroundColor || "#EFFEFF" }]}>
              <Text style={{ fontSize: fontScale(18), marginLeft: fontScale(10), fontWeight: "bold", color: "#D19E01" }}>{props.title}</Text>
              <View>
                <View style={{ flexDirection: "row", marginVertical: fontScale(15) }}>
                  <Text style={{ textAlign: "center", fontSize: fontScale(13), fontWeight: "bold", color: colors.black }}>{props.titleArray[0]}: </Text>
                  <Text style={{ textAlign: "center", fontSize: fontScale(13), fontWeight: "bold", color: '#1AC4D1' }}>{props.item[0]}</Text>
                </View>
              </View>
              <Image source={props.icon} style={{ width: fontScale(47), height: fontScale(47), position: "absolute", right: fontScale(20), top: -fontScale(23) }} resizeMode="contain" />
              <View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: fontScale(10), marginHorizontal: fontScale(5) }}>
                  <Item title={props.titleArray[1]} content={props.item[1]} style={props.styleCol1} />
                  <Item title={props.titleArray[2]} content={props.item[2]} style={props.styleCol2} />
                  <Item title={props.titleArray[3]} content={props.item[3]} style={props.styleCol3} />
                  <Item title={props.titleArray[4]} content={props.item[4]} style={props.styleCol4} />
                  <Item title={props.titleArray[5]} content={props.item[5]} style={props.styleCol5} />
                </View>
              </View>
            </View> :
            props.fourColumnCompany ?
              <View style={[styles.compContainer, props.style, { backgroundColor: props.backgroundColor || "#EFFEFF" }]}>
                <Text style={{ fontSize: fontScale(18), marginLeft: fontScale(10), fontWeight: "bold", color: "#D19E01" }}>{props.title}</Text>
                <View>
                  <View style={{ flexDirection: "row", marginVertical: fontScale(15) }}>
                    <Text style={{ textAlign: "center", fontSize: fontScale(13), fontWeight: "bold", color: colors.black }}>{props.titleArray[0]}: </Text>
                    <Text style={{ textAlign: "center", fontSize: fontScale(13), fontWeight: "bold", color: '#1AC4D1' }}>{props.item[0]}</Text>
                  </View>
                </View>
                <Image source={props.icon} style={{ width: fontScale(47), height: fontScale(47), position: "absolute", right: fontScale(20), top: -fontScale(23) }} resizeMode="contain" />
                <View>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: fontScale(10), marginLeft: -fontScale(20) }}>
                    <HItem title={props.titleArray[1]} content={props.item[1]} style={props.styleCol1} />
                    <HItem title={props.titleArray[2]} content={props.item[2]} style={props.styleCol2} />
                  </View>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: fontScale(10), marginLeft: -fontScale(20) }}>
                    <HItem title={props.titleArray[3]} content={props.item[3]} style={props.styleCol3} />
                    <HItem title={props.titleArray[4]} content={props.item[4]} style={props.styleCol4} />
                  </View>
                </View>
              </View> :
              props.company ?
                <View style={[styles.compContainer, props.style, { backgroundColor: props.backgroundColor || "#EFFEFF" }]}>
                  {
                    props.rigthTopContent ?
                      <View style={{ flexDirection: "row" }}>
                        <View>
                          <Text style={{ fontSize: fontScale(18), marginLeft: fontScale(10), fontWeight: "bold", color: props.color }}>{props.title}</Text>
                        </View>
                        <Text style={[{ fontSize: fontScale(12), position: "absolute", right: 10, fontWeight: "bold", color: colors.black }, props.titleStyle]}>{props.titleArray[8]} <Text style={{ color: '#1AC4D1' }}>{props.item[8]}</Text></Text>
                      </View>
                      :
                      <View>
                        <Text style={{ fontSize: fontScale(18), marginLeft: fontScale(10), fontWeight: "bold", color: props.color }}>{props.title}</Text>
                      </View>
                  }
                  <Image source={props.icon} style={{ width: fontScale(47), height: fontScale(47), position: "absolute", right: fontScale(20), top: -fontScale(23) }} resizeMode="contain" />
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: fontScale(5), marginTop: fontScale(15) }}>
                    <Item title={props.titleArray[0]} content={props.item[0]} style={props.styleCol1} />
                    <Item title={props.titleArray[1]} content={props.item[1]} style={props.styleCol2} />
                    <Item title={props.titleArray[2]} content={props.item[2]} style={props.styleCol3} />
                    <Item title={props.titleArray[3]} content={props.item[3]} style={props.styleCol4} />
                    <Item title={props.titleArray[4]} content={props.item[4]} style={props.styleCol5} />
                  </View>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: fontScale(5), marginTop: fontScale(20) }}>
                    <Item title={props.titleArray[5]} content={props.item[5]} style={props.styleCol6} />
                    <Item title={props.titleArray[6]} content={props.item[6]} style={props.styleCol7} />
                    <Item title={props.titleArray[7]} content={props.item[7]} style={props.styleCol8} />
                  </View>
                </View>
                :
                props.columns ? props.onPress ?
                  <TouchableOpacity style={[styles.container, props.style]} onPress={props.onPress}>
                    {
                      props.rightIcon ? <Image source={props.rightIcon} resizeMode="cover" style={{ width: props.size ? props.size : fontScale(40), height: props.size ? props.size : fontScale(40), position: "absolute", right: fontScale(20), top: -fontScale(29), borderRadius: props.circleImage ? props.size ? props.size / 2 : 20 : 0 }} /> : null
                    }
                    <Text key={props.index} style={{ fontSize: fontScale(18), color: props.titleColor || "#2e2e31", fontWeight: "bold", marginLeft: fontScale(22), marginRight: fontScale(11), marginBottom: fontScale(5) }}>{props.title}</Text>
                    <View style={{ flexDirection: "row" }}>
                      {
                        props.titleArray.map((item, index) => <View style={{ flex: 1 }} key={index}>
                          <Text key={index} style={{ textAlign: "center", fontWeight: "bold", fontSize: fontScale(12), color: colors.grey }}>{item}</Text>
                          <Text style={{ textAlign: "center", fontWeight: "bold", color: colors.primary, fontSize: fontScale(13), marginTop: fontScale(10) }}>{props.item[index]}</Text>
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
                        props.titleArray.map((item, index) => <View style={{ flex: 1 }} key={index} >
                          <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: fontScale(12), color: colors.grey }}>{item}</Text>
                          <Text key={index} style={{ textAlign: "center", fontWeight: "bold", color: colors.primary, fontSize: fontScale(14) }}>{props.item[index]}</Text>
                        </View>)
                      }
                    </View>

                  </View>
                  : <View
                    style={{ backgroundColor: props.index % 2 ? colors.lightGrey : colors.white, paddingVertical: fontScale(8) }}    >
                    <View style={{ flexDirection: "row" }} key={props.index}>
                      {
                        props.fields.map((item, index) => {
                          return props.lastIcon && index == props.fields.length - 1
                            ? <View style={props.lastIconViewStyle}><Image key={index} resizeMode="contain" style={props.lastIconStyle} source={props.lastIcon} /></View>
                            :
                            <View key={index}>
                              {
                                props.isZeroPlan == "#f00" ?
                                  <View style={{ flexDirection: "row" }}>
                                    <Text style={props.style[index]} key={index}>{item} <Text style={{ color: "#f00" }}>{index == 0 ? "*" : ""}</Text></Text>

                                  </View>
                                  :
                                  <Text style={props.style[index]} key={index}>{item}</Text>
                              }
                              {/* <Text style={[props.style[index],{color:props.isZeroPlan}]} key={index}>{item}</Text> */}
                            </View>
                        })
                      }
                    </View>
                  </View>
  );
}

const Item = (props) => {
  return (
    <View>
      <Text style={{ textAlign: "center", fontSize: fontScale(11), fontWeight: "bold", color: colors.grey }}>{props.title}</Text>
      <Text style={{ textAlign: "center", fontSize: fontScale(11), fontWeight: "bold", color: '#1AC4D1', marginTop: fontScale(10) }}>{props.content}</Text>
    </View>
  )
}

const HItem = (props) => {
  return (
    <View style={[{ width: width / 2, flexDirection: "row", marginLeft: fontScale(20) }, props.style]}>
      <Text style={[{ fontSize: fontScale(12), fontWeight: "bold", color: colors.grey }, props.titleStyle]}>{props.title} </Text>
      <Text style={[{ flex: 1, fontSize: fontScale(12), fontWeight: "bold", color: '#1AC4D1' }, props.contentStyle]}>{props.content}</Text>
    </View>
  )
}

export default GeneralListItem;
