import React, {Component} from 'react';
import {View, Text, Image, Dimensions} from 'react-native';

const SCREEN_WIDTH= Dimensions.get('window').width;
const SCREEN_HEIGHT= Dimensions.get('window').height;

class ImageScreen extends Component{
  renderDetail(){
    var monthArr=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return(
      <View style={{ flex: 1, backgroundColor:'#ffb266' }}>
       <View style={{ flex: 0.9 }}>
        <View style={{ width: SCREEN_WIDTH, flexDirection:'row', justifyContent:'center', height:50 }}>
          <Text style={{ fontSize:22, color:'white', paddingLeft:20, height:50, paddingTop:15, width:SCREEN_WIDTH*2/3 }}>{this.props.navigation.state.params.item.user?this.props.navigation.state.params.item.user.name:'No Author'}</Text>
          <Text style={{ fontSize:18, color:'white', height:50, paddingTop:20, width:SCREEN_WIDTH/3, paddingLeft:10 }}>{this.props.navigation.state.params.item.width}*{this.props.navigation.state.params.item.height}</Text>
        </View>
        <View style={{ width: SCREEN_WIDTH, flexDirection:'row', justifyContent:'center', height:30, marginTop:20 }}>
          <Text style={{ fontSize: 18, color:'white', textAlign:'center', width:SCREEN_WIDTH/2, height:35 }}>Likes</Text>
          <Text style={{ fontSize: 18, color:'white', textAlign:'center', width:SCREEN_WIDTH/2, height:35 }}>Location</Text>
        </View>
        <View style={{ width: SCREEN_WIDTH, flexDirection:'row', justifyContent:'center', height:50, marginTop:5 }}>
          <Text style={{ fontSize: 15, color:'white', textAlign:'center', width:SCREEN_WIDTH/2, height:30 }}>{this.props.navigation.state.params.item.likes}</Text>
          <Text style={{ fontSize: 15, color:'white', textAlign:'center', width:SCREEN_WIDTH/2, height:30 }}>{this.props.navigation.state.params.item.user.location?this.props.navigation.state.params.item.user.location:'No location'}</Text>
        </View>
        <View style={{ width: SCREEN_WIDTH, flexDirection:'row', justifyContent:'center', marginTop:35 }}>
          <Text style={{ fontSize: 15, color:'white', marginLeft:20, width:SCREEN_WIDTH }}>{this.props.navigation.state.params.item.description?this.props.navigation.state.params.item.description:'No Description'}</Text>
        </View>
       </View>
       <View style={{ flex:0.1 }}>
        <View style={{ width: SCREEN_WIDTH, flexDirection:'row', justifyContent:'center' }}>
          <Text style={{ fontSize: 15, color:'white', paddingLeft:20, width:SCREEN_WIDTH/2 }}>Created at: {this.props.navigation.state.params.item.created_at? monthArr[new Date(this.props.navigation.state.params.item.created_at).getUTCMonth()]+' '+new Date(this.props.navigation.state.params.item.created_at).getUTCDate()+', '+new Date(this.props.navigation.state.params.item.created_at).getUTCFullYear():'Not specified'}</Text>
          <Text style={{ fontSize: 15, color:'white', paddingLeft:20, width:SCREEN_WIDTH/2 }}>Updated at: {this.props.navigation.state.params.item.updated_at? monthArr[new Date(this.props.navigation.state.params.item.updated_at).getUTCMonth()]+' '+new Date(this.props.navigation.state.params.item.updated_at).getUTCDate()+', '+new Date(this.props.navigation.state.params.item.updated_at).getUTCFullYear():'Not specified'}</Text>
        </View>
       </View>
      </View>
    );
  }
  render(){
    return(
      <View style={{ flex:1 }}>
      <Image source={this.props.navigation.state.params? this.props.navigation.state.params.src:null} style={{ width: SCREEN_WIDTH, height: 300 }} resizeMode='stretch' />
      {this.renderDetail()}
      </View>
    );
  }
}

export default ImageScreen;
