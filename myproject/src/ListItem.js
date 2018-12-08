import React, {Component} from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ListItem extends Component {
  render(){
    return (
      <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ImageScreen',{ item: this.props.item, src:this.props.source });}} style={{ marginTop:this.props.marBot+5, marginBottom:5, marginRight:this.props.index%2==0?10:0, backgroundColor:'rgba(0,0,0,0.1)', alignItems:'center', justifyContent:'center',  borderColor:'black', borderWidth:2, height:this.props.height/this.props.width*(SCREEN_WIDTH/2-10), width:SCREEN_WIDTH/2-10 }}>
      <Image source={this.props.source} style={{ width: SCREEN_WIDTH/2-10, height: this.props.height/this.props.width*(SCREEN_WIDTH/2-10) }} />
      </TouchableOpacity>
    )
  }
}

export default ListItem;
