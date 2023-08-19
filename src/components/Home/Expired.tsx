import React, { useState, useRef, useEffect, useContext } from 'react';
import { FlatList, StyleSheet, Text, Image, TouchableOpacity, View, TextInput, ScrollView } from 'react-native';
import { MotiView } from 'moti';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/Screen';
import Data1 from '../../Context/Data1';

const Expired = ()=> {
  const [gdata,setGdata] = useContext(Data1);
  const [data1,setData] = useState(gdata);

  useEffect(() => {
    let tempdata = [];
    gdata.map((item)=> {  
      console.log(item.expire*86400000 - (Date.now()-item.id));  
      if(item.expire*86400000 - (Date.now()-item.id) < 0){
      tempdata.push(item);
      console.log(item);
    }
    })
    setData(tempdata);
    console.log(data1);
}, [gdata]);
  
   return (
    <View style={{flex:2}}>
    <FlatList 
        showsVerticalScrollIndicator={false}
        data={data1}
        renderItem={({item,index})=> {
          let color1: string ;
          {item.expire <= 2 ? color1='red':color1='orange'}
          let lastMargin;
          {index == data1.length-1 ? lastMargin=60:lastMargin=0}

            return (
              <MotiView 
              from={{opacity:0 , translateX:-40}}
              animate={{opacity:1 , translateX:0}}
              transition={{delay : index*200}}
              style={{paddingTop:8,paddingHorizontal: SCREEN_WIDTH / 14.5,}}
              >
              <TouchableOpacity style={{
                  width:SCREEN_WIDTH/1.16,
                  height:SCREEN_HEIGHT/10,
                  marginLeft:0,
                  marginTop:0,
                  marginBottom:lastMargin,
                  backgroundColor:'white',
                  borderRadius:10,
                  flexDirection:'row',
                  // justifyContent:'space-around',
                  alignItems:'center',
                  padding:20,
                  shadowColor:'grey',
                  elevation:10,
              }}>
                <View style={{backgroundColor:'white',alignItems:'center',justifyContent:'center', width:50,height:50}}>
                  <Image source={item.image} style={{width:50 ,margin:9, height:50 }}/>
                </View>
  
                <View style={{marginLeft:20 , width:100}}>
                  <View>
                    <Text style={{fontSize:20 , marginTop:0,fontFamily:'SF-Pro-Rounded-Bold',color:'grey'}}>{item.title}</Text>
                  </View>
                  <View>
                    <Text style={{fontSize:14 , marginTop:-10,fontFamily:'SF-Pro-Rounded-Medium',color:'grey'}}>{item.type}</Text>
                  </View>
                  <View style={{flexDirection:'row',marginTop:6}}>
                   <View style={{backgroundColor:color1,height:8,width:8,borderRadius:5}}></View>
                   <Text style={{fontSize:14,marginTop:-10 ,marginLeft:4,fontFamily:'SF-Pro-Rounded-Bold',color:'#89889D'}}>{item.expire*-1}</Text>
                   <Text style={{fontSize:10,marginTop:-6 ,marginLeft:3,fontFamily:'SF-Pro-Rounded-Bold',color:'#89889D'}}>{item.expire == 1?'day':'days'} ago</Text>
                  </View>
                </View>
  
                {/* <View style={{marginLeft:50}}> 
                  <AntDesign name="heart" size={34} color="red" />
                </View> */}
  
              </TouchableOpacity>
              </MotiView> 
            )
        }}
    />
</View>

   )
}

export default Expired;