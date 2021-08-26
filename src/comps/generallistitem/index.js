import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Image, View, Text } from 'react-native';
import { colors } from '../../utils/Colors';
import { width } from '../../utils/Dimenssion';
import { fontScale } from '../../utils/Fonts';
import { styles } from './styles';

const GeneralListItem = (props) => {
  return (
    props.twentyFourColumnCompany ?
    <TouchableOpacity style={[styles.compContainer, props.style, { backgroundColor: props.backgroundColor || "#EFFEFF" }]} onPress={props.onPress}>
      {/* <Text style={{ fontSize: fontScale(18), textAlign: "center", fontWeight: "bold", color: props.textColor || "#D19E01" }}>{props.title}</Text> */}
      <Text style={[props.textTitle,{fontSize: fontScale(13)}]}>{props.title}</Text>
      {
        props.titleArrayOne 
        ?
        <View style={[{ flexDirection: "row", marginVertical: fontScale(15) }]}>
          <Text style={[{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: colors.black, marginLeft: fontScale(18) },props.titleArrStyle]}>{props.titleArrayOne&&props.titleArrayOne[0]}</Text>
          <Text style={[{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: "#1AC4D1", marginLeft: fontScale(21) },props.itemStyle]}>{props.item&&props.item[0]}</Text>
        </View>
        :
        null }
      <View>
        <View style={{ flexDirection: "row", marginVertical: fontScale(6) }}>
          {/* <Text style={ props.titleArrOneStyle }>{props.titleArr[0]}</Text>
          <Text style={props.titleArrTwoStyle}>{props.titleArr[1]}</Text>
          <Text style={props.titleArrThreeStyle}>{props.titleArr[2]}</Text>
          <Text style={props.titleArrFourStyle}>{props.titleArr[3]}</Text> */}
          {
            props.titleArr.map((item,index)=><Text style={[props.titleArrTwoStyle,{fontSize: fontScale(13), flex:index==0||index==1 ? 1:1.5,marginLeft:index==0?fontScale(80):fontScale(10)}]}>{item}</Text>)
          }
        </View>
      </View>
      <Image source={props.icon} style={{ width: fontScale(47), height: fontScale(47), position: "absolute", right: fontScale(20), top: -fontScale(23) }} resizeMode="contain" />
     
        <View style={{flexDirection: "row"}}>
        {props.titleArray?<View style={[{ marginLeft: -15 },props.titleContent]}>
          <HItem title={props.titleArray[0]} titleStyle={props.titleStyle} />
          <HItem title={props.titleArray[1]} titleStyle={props.titleStyle}/>
          <HItem title={props.titleArray[2]} titleStyle={props.titleStyle}/>
         {props.titleArray[3] ?<HItem title={props.titleArray[3]} titleStyle={props.titleStyle}/>:null}
        </View>: null}
        {/* HTKD */}
        {props.itemAmountOne?<View style={props.viewContentStyle}>
          <HItem content={props.itemAmountOne[0]} contentStyle={props.contentStyle}/>
          <HItem content={props.itemAmountOne[1]} contentStyle={props.contentStyle}/>
          <HItem content={props.itemAmountOne[2]} contentStyle={props.contentStyle}/>
          <HItem content={props.itemAmountOne[3]} contentStyle={props.contentStyle}/>
         
        </View>: null}
        {/* <View style={{ justifyContent: "space-between", marginLeft: -fontScale(140),textAlign:"right"}}> */}
        {/* GDV */}
        {props.itemAmountTwo?<View style={props.viewOneContentStyle}>
          <HItem content={props.itemAmountTwo[0]} contentStyle={props.contentStyle1} />
          <HItem content={props.itemAmountTwo[1]} contentStyle={props.contentStyle1}/>
          <HItem content={props.itemAmountTwo[2]} contentStyle={props.contentStyle1}/>
        <HItem content={props.itemAmountTwo&&props.itemAmountTwo[3]} contentStyle={props.contentStyle1}/>
        </View>: null}
        {/* <View style={{ justifyContent: "space-between", marginLeft: -fontScale(160),textAlign:"right"}}> */}
        {/* Chenh lech */}
        {props.itemPercent?<View style={props.viewTwoContentStyle}>
          <HItem content={props.itemPercent[0]} contentStyle={props.contentStyle2} />
          <HItem content={props.itemPercent[1]} contentStyle={props.contentStyle2}/>
          <HItem content={props.itemPercent[2]} contentStyle={props.contentStyle2}/>
          <HItem content={props.itemPercent&&props.itemPercent[3]} contentStyle={props.contentStyle2}/>
        </View>: null}
        {/* <View style={{ justifyContent: "space-between", marginLeft: -fontScale(160),textAlign:"right"}}> */}
      {/* Binh quan */}
        {props.itemAmountFour?<View style={props.viewThreeContentStyle}>
          <HItem content={props.itemAmountFour[0]} contentStyle={props.contentStyle2} />
          <HItem content={props.itemAmountFour[1]} contentStyle={props.contentStyle2}/>
          <HItem content={props.itemAmountFour[2]} contentStyle={props.contentStyle2}/>
          <HItem content={props.itemAmountFour&&props.itemAmountFour[3]} contentStyle={props.contentStyle2}/>
          
        </View>: null}
</View>
{
  props.titleArrayOne ? 
  <>
  {props.titleArrayOne[1]&&<View style={{ flexDirection: "row", marginVertical: fontScale(10) }}>
      <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: colors.black, marginLeft: fontScale(18) }}>{props.titleArrayOne&&props.titleArrayOne[1]}</Text>
      <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: "#1AC4D1", marginLeft: fontScale(21) }}>{props.item&&props.item[1]}</Text>
  </View>
  }
       {props.titleArrayOne[2]&& <View style={{ flexDirection: "row", marginVertical: fontScale(6) }}>
          <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: colors.grey, marginLeft: fontScale(28) }}>{props.titleArrayOne&&props.titleArrayOne[2]}</Text>
          <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: "#1AC4D1", marginLeft: fontScale(21) }}>{props.item&&props.item[2]}</Text>
        </View>
       }
        
       {props.titleArrayOne[3]&&<View style={{ flexDirection: "row", marginVertical: fontScale(6) }}>
          <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: colors.grey, marginLeft: fontScale(38) }}>{props.titleArrayOne&&props.titleArrayOne[3]}</Text>
          <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: "#1AC4D1", marginLeft: fontScale(21) }}>{props.item&&props.item[3]}</Text>
        </View>
        }
       
        {props.titleArrayOne[4]&&<View style={{ flexDirection: "row", marginVertical: fontScale(6) }}>
          <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: colors.black, marginLeft: fontScale(18) }}>{props.titleArrayOne&&props.titleArrayOne[4]}</Text>
          <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: "#1AC4D1", marginLeft: fontScale(21) }}>{props.item&&props.item[4]}</Text>
        </View>
        }
        </> : null }
    </TouchableOpacity>:
    props.monthSalaryEmpItem ?
      <View style={[styles.compContainer, props.style, { backgroundColor: props.backgroundColor || "#FFFFFF" }]}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: fontScale(16), marginLeft: fontScale(5), fontWeight: "bold", color: props.textColor || "#D19E01" }}>{props.title}</Text>
            <View style={{ right: -fontScale(16), flexDirection: "row" }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ textAlign: "center", fontSize: fontScale(13), fontWeight: "bold", color: colors.black, marginLeft: fontScale(5) }}>{props.titleArray[0]}: </Text>
                <Text style={{ textAlign: "center", fontSize: fontScale(13), fontWeight: "bold", color: colors.lightBlue }}>{props.item[0]}</Text>
              </View>
              <View style={{ right: -fontScale(10), flexDirection: "row" }}>
                <Text style={{ textAlign: "center", fontSize: fontScale(13), fontWeight: "bold", color: colors.black, marginLeft: fontScale(5) }}>{props.titleArray[1]}: </Text>
                <Text style={{ textAlign: "center", fontSize: fontScale(13), fontWeight: "bold", color: colors.lightBlue }}>{props.item[1]}</Text>
              </View>
            </View>
          </View>
        </View>
        <Image source={props.icon} style={{ width: fontScale(47), height: fontScale(47), position: "absolute", right: fontScale(20), top: -fontScale(23) }} resizeMode="contain" />
        <View style={{ marginTop: fontScale(10) }} key={Math.random()}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: fontScale(10), marginHorizontal: fontScale(5) }} key={12}>
            <Item title={props.titleArray[2]} content={props.item[2]} key={0} style={{ flex: 1 }} />
            <Item title={props.titleArray[3]} content={props.item[3]} key={1} style={{ flex: 1 }} />
            <Item title={props.titleArray[4]} content={props.item[4]} key={2} style={{ flex: 1 }} />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: fontScale(10), marginHorizontal: fontScale(5) }} key={15}>
            <Item title={props.titleArray[5]} content={props.item[5]} key={3} style={{ flex: 1 }} />
            <Item title={props.titleArray[6]} content={props.item[6]} key={4} style={{ flex: 1 }} />
            <Item title={props.titleArray[7]} content={props.item[7]} key={5} style={{ flex: 1 }} />
          </View>
        </View>
      </View>
      :
      props.monthSalaryGeneral ?
        <View style={[styles.compContainer, props.style, { backgroundColor: props.backgroundColor || "#FFFFFF" }]}>
          <View style={{ flexDirection: "row" }}>
            <View>
              <Text style={{ fontSize: fontScale(16), marginLeft: fontScale(5), fontWeight: "bold", color: props.textColor || "#D19E01" }}>{props.title}</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ textAlign: "center", marginTop: fontScale(10), fontSize: fontScale(15), fontWeight: "bold", color: colors.black, marginLeft: fontScale(5) }}>{props.titleArray[0]}: </Text>
                <Text style={{ textAlign: "center", marginTop: fontScale(10), fontSize: fontScale(15), fontWeight: "bold", color: '#1AC4D1' }}>{props.item[0]}</Text>
              </View>
            </View>
          </View>
          <Image source={props.icon} style={{ width: fontScale(47), height: fontScale(47), position: "absolute", right: fontScale(20), top: -fontScale(23) }} resizeMode="contain" />
          <View style={{ marginTop: fontScale(10) }} key={Math.random()}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: fontScale(10), marginHorizontal: fontScale(5) }} key={12}>
              <Item title={props.titleArray[1]} content={props.item[1]} key={0} style={{ flex: 1 }} />
              <Item title={props.titleArray[2]} content={props.item[2]} key={1} style={{ flex: 1 }} />
              <Item title={props.titleArray[3]} content={props.item[3]} key={2} style={{ flex: 1 }} />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: fontScale(10), marginHorizontal: fontScale(5) }} key={15}>
              <Item title={props.titleArray[4]} content={props.item[4]} key={3} style={{ flex: 1 }} />
              <Item title={props.titleArray[5]} content={props.item[5]} key={4} style={{ flex: 1 }} />
              <Item title={props.titleArray[6]} content={props.item[6]} key={5} style={{ flex: 1 }} />
            </View>
          </View>
        </View>
        :
        props.eightteenColumnCompany ?
          <View style={[styles.compContainer, props.style, { backgroundColor: props.backgroundColor || "#EFFEFF" }]}>
            <Text style={{ fontSize: fontScale(18), marginLeft: fontScale(10), fontWeight: "bold", color: props.textColor || "#D19E01" }}>{props.title}</Text>
            <View style={{ flexDirection: "row", marginVertical: fontScale(15) }}>
              <Text style={{ textAlign: "center", fontSize: fontScale(14), fontWeight: "bold", color: colors.black, marginLeft: fontScale(18) }}>{props.titleArrayOne[0]}</Text>
              <Text style={{ textAlign: "center", fontSize: fontScale(14), fontWeight: "bold", color: "#1AC4D1", marginLeft: fontScale(21) }}>{props.item[0]}</Text>
            </View>
            <View style={{ flexDirection: "row", marginVertical: fontScale(15) }}>
              <View style={{ flexDirection: "row", flex: 1 }}>
                <Text style={{ textAlign: "center", fontSize: fontScale(14), fontWeight: "bold", color: colors.grey, marginLeft: fontScale(18) }}>{props.titleArrayOne[1]}</Text>
                <Text style={{ textAlign: "center", fontSize: fontScale(14), fontWeight: "bold", color: "#1AC4D1", marginLeft: fontScale(11) }}>{props.item[1]}</Text>
              </View>
              <View style={{ flexDirection: "row", flex: 1, marginLeft: -fontScale(15) }}>
                <Text style={{ textAlign: "center", fontSize: fontScale(14), fontWeight: "bold", color: colors.grey, marginLeft: fontScale(12) }}>{props.titleArrayOne[2]}</Text>
                <Text style={{ textAlign: "center", fontSize: fontScale(14), fontWeight: "bold", color: "#1AC4D1", marginLeft: fontScale(11) }}>{props.item[2]}</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", marginVertical: fontScale(15) }}>
              <Text style={{ textAlign: "center", fontSize: fontScale(14), fontWeight: "bold", color: colors.black, marginLeft: fontScale(18) }}>{props.titleArrayOne[3]}</Text>
              <Text style={{ textAlign: "center", fontSize: fontScale(14), fontWeight: "bold", color: "#1AC4D1", marginLeft: fontScale(21) }}>{props.item[3]}</Text>
            </View>
            <View style={{ marginRight: fontScale(10) }}>
              <View style={{ flexDirection: "row", marginVertical: fontScale(15) }}>
                <View style={{ flex: 2 }}>

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

            <View style={{ flexDirection: "row", flex: 1 }}>
              <View style={{ justifyContent: "space-between", flex: 2 }}>
                {
                  [props.titleArray[0], props.titleArray[1], props.titleArray[2], props.titleArray[3], props.titleArray[4], props.titleArray[5]].map((item) => {
                    return <Text style={[{ fontSize: fontScale(13), fontWeight: "bold", color: colors.grey }, props.titleStyle]}>{item} </Text>
                  })
                }
              </View>
              <View style={{ flex: 1, justifyContent: "space-between", textAlign: "right" }}>
                {
                  [props.itemAmountOne[0], props.itemAmountOne[1], props.itemAmountOne[2], props.itemAmountOne[3], props.itemAmountOne[4], props.itemAmountOne[5]].map((item) => {
                    return <Text style={{ fontWeight: "bold", color: '#1AC4D1', fontSize: fontScale(12), textAlign: "right", marginRight: fontScale(8), marginVertical: fontScale(9) }}>{item}</Text>
                  })
                }
              </View>
              <View style={{ flex: 1, justifyContent: "space-between", textAlign: "right" }}>
                {
                  [props.itemAmountTwo[0], props.itemAmountTwo[1], props.itemAmountTwo[2], props.itemAmountTwo[3], props.itemAmountTwo[4], props.itemAmountTwo[5]].map((item) => {
                    return <Text style={{ fontWeight: "bold", color: '#1AC4D1', fontSize: fontScale(12), textAlign: "right", marginRight: fontScale(8), marginVertical: fontScale(9) }}>{item}</Text>
                  })
                }
              </View>
              <View style={{ flex: 1, justifyContent: "space-between", textAlign: "right" }}>
                {
                  [props.itemPercent[0], props.itemPercent[1], props.itemPercent[2], props.itemPercent[3], props.itemPercent[4], props.itemPercent[5]].map((item) => {
                    return <Text style={{ fontWeight: "bold", color: '#1AC4D1', fontSize: fontScale(12), textAlign: "right", marginRight: fontScale(8), marginVertical: fontScale(9) }}>{item}</Text>
                  })
                }
              </View>
            </View>
          </View>
          :
          props.twelveColumnCompany ?
            <View style={[styles.compContainer, props.style, { backgroundColor: props.backgroundColor || "#EFFEFF" }]}>
              <Text style={{ fontSize: fontScale(18), marginLeft: fontScale(10), fontWeight: "bold", color: props.textColor || "#D19E01" }}>{props.title}</Text>
              <Image source={props.icon} style={{ width: fontScale(47), height: fontScale(47), position: "absolute", right: fontScale(20), top: -fontScale(23) }} resizeMode="contain" />
              <View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: fontScale(10) }}>
                  <View style={{ flex: 1 }}></View>
                  <View style={{ flex: 1, marginBottom: fontScale(10) }}>
                    <Text style={{ textAlign: "right", fontSize: fontScale(15), fontWeight: "bold", color: colors.black }}>{props.titleArr[0]}</Text>
                  </View>
                  <View style={{ flex: 1, marginBottom: fontScale(10) }}>
                    <Text style={{ textAlign: "right", fontSize: fontScale(15), fontWeight: "bold", color: colors.black }}>{props.titleArr[1]}</Text>
                  </View>
                  <View style={{ flex: 1/2 }}></View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <View style={{ flex: 1 }}>
                    <HItem title={props.titleArray[0]} titleStyle={{ marginVertical: fontScale(9),color:colors.black }} />
                    <HItem title={props.titleArray[1]} titleStyle={{ marginVertical: fontScale(9.5),color:colors.black }} />
                    <HItem title={props.titleArray[2]} titleStyle={{ marginVertical: fontScale(9.5),marginLeft:fontScale(10) }} />
                    <HItem title={props.titleArray[3]} titleStyle={{ marginVertical: fontScale(9.5),marginLeft:fontScale(10) }} />
                    <HItem title={props.titleArray[4]} titleStyle={{ marginVertical: fontScale(9.5),marginLeft:fontScale(10) }} />
                    <HItem title={props.titleArray[5]} titleStyle={{ marginVertical: fontScale(9.5),marginLeft:fontScale(15) }} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: "bold", color: '#1AC4D1', fontSize: fontScale(12), textAlign: "right", marginVertical: fontScale(9) }}>{props.itemAmountOne[0]}</Text>
                    <Text style={{ fontWeight: "bold", color: '#1AC4D1', fontSize: fontScale(12), textAlign: "right", marginVertical: fontScale(9.5) }}>{props.itemAmountOne[1]}</Text>
                    <Text style={{ fontWeight: "bold", color: '#1AC4D1', fontSize: fontScale(12), textAlign: "right", marginVertical: fontScale(9.5) }}>{props.itemAmountOne[2]}</Text>
                    <Text style={{ fontWeight: "bold", color: '#1AC4D1', fontSize: fontScale(12), textAlign: "right", marginVertical: fontScale(9.5) }}>{props.itemAmountOne[3]}</Text>
                    <Text style={{ fontWeight: "bold", color: '#1AC4D1', fontSize: fontScale(12), textAlign: "right", marginVertical: fontScale(9.5) }}>{props.itemAmountOne[4]}</Text>
                    <Text style={{ fontWeight: "bold", color: '#1AC4D1', fontSize: fontScale(12), textAlign: "right", marginVertical: fontScale(9.5) }}>{props.itemAmountOne[5]}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: "bold", color: '#1AC4D1', fontSize: fontScale(12), textAlign: "right", marginVertical: fontScale(9) }}>{props.itemAmountTwo[0]}</Text>
                    <Text style={{ fontWeight: "bold", color: '#1AC4D1', fontSize: fontScale(12), textAlign: "right", marginVertical: fontScale(9.5) }}>{props.itemAmountTwo[1]}</Text>
                    <Text style={{ fontWeight: "bold", color: '#1AC4D1', fontSize: fontScale(12), textAlign: "right", marginVertical: fontScale(9.5) }}>{props.itemAmountTwo[2]}</Text>
                    <Text style={{ fontWeight: "bold", color: '#1AC4D1', fontSize: fontScale(12), textAlign: "right", marginVertical: fontScale(9.5) }}>{props.itemAmountTwo[3]}</Text>
                    <Text style={{ fontWeight: "bold", color: '#1AC4D1', fontSize: fontScale(12), textAlign: "right", marginVertical: fontScale(9.5) }}>{props.itemAmountTwo[4]}</Text>
                    <Text style={{ fontWeight: "bold", color: '#1AC4D1', fontSize: fontScale(12), textAlign: "right", marginVertical: fontScale(9.5) }}>{props.itemAmountTwo[5]}</Text>
                  </View>
                  <View style={{ flex: 1/2 }}></View>
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
                <View style={[styles.compContainer, props.style, { backgroundColor: props.backgroundColor || "#FFFFFF" }]}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: fontScale(16), marginLeft: fontScale(5), fontWeight: "bold", color: colors.black }}>{props.title}</Text>
                    {/* <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: colors.black, marginLeft: fontScale(25) }}>{props.titleArray[0]}: </Text>
                <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: '#1AC4D1' }}>{props.item[0]}</Text> */}
                    {/* <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: colors.black, marginLeft: fontScale(10) }}>{props.titleArray[1]}: </Text>
                <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: '#1AC4D1' }}>{props.item[1]}</Text> */}
                  </View>
                  <View>
                    <View style={{ flexDirection: "row", marginVertical: fontScale(15) }}>
                      <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: colors.black, marginLeft: fontScale(25) }}>{props.titleArray[0]}: </Text>
                      <Text style={{ textAlign: "center", fontSize: fontScale(15), fontWeight: "bold", color: '#1AC4D1' }}>{props.item[0]}</Text>
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
                </View>
                :
                props.twoColumnCompany ?
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
                        <View>
                          <HItem title={props.titleArray[1]} content={props.item[1]} style={props.styleCol1} />
                          <HItem title={props.titleArray[2]} content={props.item[2]} style={props.styleCol2} />
                          <HItem title={props.titleArray[3]} content={props.item[3]} style={props.styleCol3} />
                        </View>
                        <View>
                          <HItem title={props.titleArray[4]} content={props.item[4]} style={props.styleCol4} />
                          <HItem title={props.titleArray[5]} content={props.item[5]} style={props.styleCol5} />
                        </View>
                      </View>
                    </View>
                  </View> : props.fourColumnCompany ?
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
                                <View style={{ flexDirection: "row", position: "absolute", width: width, justifyContent: "center" }}>
                                  <Text style={{ fontWeight: "bold", fontSize: fontScale(12), color: colors.grey }}>{props.topCenterData && props.topCenterData[0]}</Text>
                                  <Text style={{ fontWeight: "bold", color: '#1AC4D1', fontSize: fontScale(13) }}>{props.topCenterData && props.topCenterData[1]}</Text>
                                </View>
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
                            <View style={{ flexDirection: "row" }}>
                              <Text key={props.index} style={{ flex: 1, fontSize: fontScale(18), color: props.titleColor || "#2e2e31", fontWeight: "bold", marginLeft: fontScale(22), marginRight: fontScale(11), marginBottom: fontScale(5) }}>{props.title}</Text>
                              <View style={{ flexDirection: "row", position: "absolute", width: width, justifyContent: "center" }}>
                                <Text style={{ fontWeight: "bold", fontSize: fontScale(12), color: colors.grey }}>{props.topCenterData && props.topCenterData[0]} </Text>
                                <Text style={{ fontWeight: "bold", color: colors.primary, fontSize: fontScale(13) }}>{props.topCenterData && props.topCenterData[1]}</Text>
                              </View>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                              {
                                props.titleArray.map((item, index) => <View style={{ flex: 1 }} key={index}>
                                  <Text key={index} style={{ textAlign: "center", fontWeight: "bold", fontSize: fontScale(12), color: colors.grey }}>{item}</Text>
                                  <Text style={{ textAlign: "center", fontWeight: "bold", color: colors.primary, fontSize: fontScale(13), marginTop: fontScale(10) }}>{props.item && props.item[index]}</Text>
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
                                  <Text key={index} style={{ textAlign: "center", fontWeight: "bold", color: colors.primary, fontSize: fontScale(14) }}>{props.item && props.item[index]}</Text>
                                </View>)
                              }
                            </View>

                          </View>
                          : <View
                            style={{ backgroundColor: props.index % 2 ? colors.lightGrey : colors.white, paddingVertical: fontScale(8) }}    >
                            <View style={{ flexDirection: "row", alignItems: "center" }} key={props.index}>
                              {
                                props.fields && props.fields.map((item, index) => {
                                  return props.lastIcon && index == props.fields.length - 1
                                    ? <View style={props.lastIconViewStyle} key={index.toString()}><Image key={index.toString()} resizeMode="contain" style={props.lastIconStyle} source={props.lastIcon} /></View>
                                    :
                                    <View key={index.toString()}>
                                      {
                                        props.isZeroPlan == "#f00" ?
                                          <View style={{ flexDirection: "row" }} key={index.toString()}>
                                            <Text style={props.style[index]}>{item} <Text style={{ color: "#f00", textAlignVertical: "center" }}>{index == 0 ? "*" : ""}</Text></Text>

                                          </View>
                                          :
                                          <Text style={props.style[index]} key={index.toString()}>{item}</Text>
                                      }
                                    </View>
                                })
                              }
                            </View>
                          </View>
  );
}

const Item = (props) => {
  return (
    <View style={props.style}>
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
