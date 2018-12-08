import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, FlatList, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Unsplash from 'unsplash-js/native';

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


// unsplash.photos.listPhotos(2,15,"latest").then(data=>{
// //  console.log(data._bodyInit[0]);
// //  console.log(data._bodyText[0]);
// }).catch(err=>{
//   console.log(err);
// })

// unsplash.search.photos('dogs',1,1).then(data=>{
//   //console.log(JSON.parse(data._bodyInit).results[0].urls.full);
// })

export default class Main extends Component {
  state = {photoData: null, firstPart:null, secondPart:null};
  componentWillMount() {
    unsplash.photos.listCuratedPhotos(1,20,"latest").then(data=>{
      console.log(JSON.parse(data._bodyText)[0]);
      this.setState({photoData:JSON.parse(data._bodyText)});
    })
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
  render() {

    return (
      <ScrollView contentContainerStyle={{ flexDirection: 'row', width: SCREEN_WIDTH, justifyContent:'flex-start', alignItems:'flex-start' }}>
      <View style={{ width: SCREEN_WIDTH/2 }}>
      {this.renderPhotoType(0)}
      </View>
      <View style={{ width: SCREEN_WIDTH/2 }}>
      {this.renderPhotoType(1)}
      </View>
      <ListItem
        img={{ uri: item.urls.full }}
        width={item.width}
        height={item.height}
        item={item}
      />
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    marginTop: 100,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  activeTitle: {
    color: 'red',
  }
});
