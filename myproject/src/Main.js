import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, FlatList, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Unsplash from 'unsplash-js/native';

import ListItem from './ListItem';

const SCREEN_WIDTH= Dimensions.get('window').width;
const SCREEN_HEIGHT= Dimensions.get('window').height;

const unsplash = new Unsplash({
  applicationId: '74c0f1538da36cce5c1337aad5f3b4acea0125d3cc461eb8c0171bfe46133e45',
  secret: 'cb440f5d428fd4e44f7e908358430df0d98fb02083566f47a1c5ea2ff4672c1d',
  callbackUrl: 'urn:ietf:wg:oauth:2.0:oob',
});

const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public",
  "read_user",
  "write_user",
  "read_photos",
  "write_photos"
]);


export default class Main extends Component {
  static navigationOptions = (props) => {

 const { navigation } = props;
 const { params } = navigation.state;
 const { navigate } = navigation;
 return {
   title:'Unsplash Collection',
   headerTitle:'Unsplash Collection',
   headerStyle:{
     height:40,
   }
   //header:null,
 };
}
  state = {marBot:[], page: 1, photoData: null, firstPart:null, secondPart:null, lArray:[], rArray:[], featured:true};
  componentWillMount() {
    this.setState({page : 1});
    unsplash.photos.listCuratedPhotos(this.state.page,30,"latest").then(data=>{
      console.log(JSON.parse(data._bodyText)[0]);
      this.setState({photoData:JSON.parse(data._bodyText)});
      var index = 0;
      console.log(JSON.parse(data._bodyText)[1]);
      this.state.photoData.forEach((e)=>{
        var h = e.height/e.width*(SCREEN_WIDTH/2-10);
        if(index%2==0){
          var Arr = this.state.lArray;
          Arr[index/2] = h;
          this.setState({lArray: Arr});
        }
        else if(index%2==1){
          var Arr = this.state.rArray;
          Arr[(index-1)/2] = h;
          this.setState({rArray: Arr});
        }
        index+=1;
      });

    })
  }
  handleEndd = async () => {
    console.log(this.state.stage);
    this.setState(state => ({ page: state.page+1}), () => {
      unsplash.photos.listCuratedPhotos(this.state.page,30,"latest").then(data=>{
        var pData = JSON.parse(data._bodyText);
        var aData = this.state.photoData;
        var index = 0;
        pData.forEach((e)=>{
          var h = e.height/e.width*(SCREEN_WIDTH/2-10);
          if(index%2==0){
            var Arr = this.state.lArray;
            Arr[index/2+((this.state.page-1)*30/2)] = h;
          //  console.log('index: ',index/2+(this.state.page*30/2));
            this.setState({lArray: Arr});
          }
          else if(index%2==1){
            var Arr = this.state.rArray;
            Arr[(index-1)/2+((this.state.page-1)*30/2)] = h;
      //      console.log('index: ',index/2+(this.state.page*30/2));
            this.setState({rArray: Arr});
          }
          index+=1;
        });
      var cData = aData.concat(pData);
      this.setState({photoData: cData});
    //  console.log(this.state.lArray);
    //  console.log(this.state.rArray);
    }
    );
    });
  }
  handleEnd = async () => {
    console.log('asdasd');
    this.setState({ page: this.state.page+1 });
    unsplash.photos.listCuratedPhotos(this.state.page,30,"latest").then(data=>{
      var pData = JSON.parse(data._bodyText);
      var aData = this.state.photoData;
      var index = 0;
      pData.forEach((e)=>{
        var h = e.height/e.width*(SCREEN_WIDTH/2-10);
        if(index%2==0){
          var Arr = this.state.lArray;
          Arr[index/2+(this.state.page*30/2)] = h;
          console.log('index: ',index,'h: ',h);
          this.setState({lArray: Arr});
        }
        else if(index%2==1){
          var Arr = this.state.rArray;
          Arr[(index-1)/2+(this.state.page*30/2)] = h;
          console.log('index: ',index,'h: ',h);
          this.setState({rArray: Arr});
        }
        index+=1;
      });
    var cData = aData.concat(pData);
    this.setState({photoData: cData});
    console.log(this.state.lArray);
    console.log(this.state.rArray);
  }
  );
  console.log(this.getMarBot(22));
  }
  onClick() {
    console.log('clicked!');
  }
  renderPhotoType(signal) {
  let type = [];
  if(this.state.photoData){
    var length = this.state.photoData.length;
    var firstPart = this.state.photoData.slice(0,Math.floor(length/2));

    var secondPart = this.state.photoData.slice(Math.floor(length/2)+1,20);

    var data = [firstPart, secondPart];
    data[signal].map( ( item )=> {
    type.push(
      <View>
        <TouchableOpacity>
              <Image style={{width: SCREEN_WIDTH/2, height: item.height/item.width*(SCREEN_WIDTH/2) }} source={{uri: item.urls.full}}  />
        </TouchableOpacity>
      </View>
    );
  } );
  }
  return type;
  }
  getSum(arr){
    var a = 0;
    if(arr){
      arr.forEach((e)=>{
        a = a+e;
      });
      return a;
    }
    return 0;
  }

  getMarBot(index) {
    if(index%2==0){
      var larr = this.state.lArray.slice(0,index/2);
      var rarr = this.state.rArray.slice(0,index/2);
      var suml = this.getSum(larr);
      var sumr = this.getSum(rarr);
      if(suml<sumr){
        return suml-sumr;
      }
    }
    else if(index%2==1){
      var larr = this.state.lArray.slice(0,(index-1)/2);
      var rarr = this.state.rArray.slice(0,(index-1)/2);
      var suml = this.getSum(larr);
      var sumr = this.getSum(rarr);
      if(sumr<suml){
        return sumr-suml;
      }
    }
    return 0;
  }

  renderData() {
    if(this.state.featured){
      return   <FlatList ref="flatlist"
                style={{ backgroundColor: '#fff', marginTop:0, marginBottom: 0 }}
                 keyExtractor={(x, i) => i}
                 onEndReached={()=>this.handleEndd()}
                 onEndReachThreshold={0}
                 numColumns={2}
                 renderItem={({ item, index })=>
                  <ListItem navigation={this.props.navigation} marBot={this.getMarBot(index)} index={index} width={item.width} height={item.height} source={{uri: item.urls.full}} item={item} />
                  }
                 data={this.state.photoData}
            />;
    }
    return <View style={{ flex: 1 }} />;
  }
  render() {

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent:'center' }}>
      {this.renderData()}
          <View style={{ width: SCREEN_WIDTH, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height:40, marginTop:10 }}>
              <TouchableOpacity style={this.state.featured? Styles.style2 : Styles.style1} onPress={()=> {  this.setState({featured: true});}}>
              <Text style={{ color: 'white' }}>Featured</Text>
              </TouchableOpacity>
              <TouchableOpacity style={this.state.featured? Styles.style1 : Styles.style2} onPress={()=> { this.setState({featured: false});}}>
              <Text style={{ color: 'white' }}>Favorites</Text>
              </TouchableOpacity>
          </View>

      </View>
    );
  }
}
const Styles= {
  style1: {
     backgroundColor: '#d1d1d1',
     borderWidth: 0.5,
     borderColor: '#000',
     height: 40,
     width: SCREEN_WIDTH/2,
     justifyContent: 'center',
     alignItems: 'center'
  },
 style2: {
   backgroundColor: 'black',
   borderWidth: 0.5,
   borderColor: '#000',
   height: 40,
   width: SCREEN_WIDTH/2,
   justifyContent: 'center',
   alignItems: 'center'
 }
}
