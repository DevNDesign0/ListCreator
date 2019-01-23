import React, { Component } from 'react';

import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert, TextInput, FlatList} from 'react-native';
 

 
export default class MainActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      data: [],
      index: 0,
      count: 0,
      id: 1,
    };
  }

  updateList(){
    if(this.state.text == ''|| this.state.text == ' '){
      Alert.alert('Enter Text');
    }else{

      this.setState({data: this.state.data.concat({title:this.state.text,index:this.state.index,key:this.state.id.toString()})});
      this.setState({id: this.state.id + 1});
      this.setState({count: this.state.count + 1})
      this.setState({index: this.state.index + 1})
      this.setState({text:''});
      this.clearText();
    }
  }

  AlertRemove(title, id){
    Alert.alert(
      'Remove',
      "item: " + title,
      [
        {text: 'OK',  onPress: () => this.RemoveItem(id)},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      { cancelable: true }
    )
  }

  RemoveItem(id) {
    let dataWithIds = this.state.data.filter(item => item.key !== id);
  
    this.setState({
      data: dataWithIds,
    });
    this.setState({count: this.state.count - 1})
  }

  
  clearText() {
    this._textInput.setNativeProps({text: ''});
  }

  checkIndexIsEven (i) {
    return i % 2 == 0;
  }

 render() {
   return (
    <TouchableWithoutFeedback onPress={Keyboard.dimiss} accessible={true}>
      <View style={styles.MainView}>
        <View style={styles.InputView}>
          <TextInput ref={component => this._textInput = component} style={styles.TextInput}
            placeholder="Enter List Item"
            placeholderTextColor='#F00'
            onChangeText={(text) => this.setState({text})}value = {this.state.text}
            underlineColorAndroid='transparent'
          />
          <TouchableOpacity onPress = {()=>(this.updateList())} activeOpacity={0.7} style={styles.ButtonInput}>
            <View >
              <Text style={styles.buttonText}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.HelpView}>
        {
        this.state.count > 0 ?  <Text>Click on items to remove them</Text> : null
        }
          
        </View>
          <View style={[styles.ListView]}>
            <FlatList
              data={this.state.data}
              renderItem = {({item}) => 
              <Text style={this.checkIndexIsEven(item.index) ? styles.itemOdd : styles.itemEven} onPress = {() => this.AlertRemove(item.title, item.key)} >{item.title}</Text>}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
   );
 }
}
 
const styles = StyleSheet.create({
 
  MainView :{
    flex: 1,
    flexDirection: 'column',
    margin: 5,
    marginTop: 25,
  },
    HelpView :{
      alignItems: 'stretch',
      marginTop: 5,
      opacity: 0.6,
      borderTopStartRadius: 15,
      borderTopEndRadius: 15,
      alignItems: 'center',
      backgroundColor: '#ccc',
    },
    InputView :{
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'row',
    },
      TextInput :{
        flex: 4,
        fontSize: 22,
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 15,
        textAlign: 'center',
      },
      ButtonInput :{
        flex: 2,
        justifyContent: 'center',
        backgroundColor: 'lightblue',
        borderRadius: 15,
      },
        buttonText :{
          textAlign: 'center',
          fontSize: 22,
        },
    ListView :{
      flex: 9,
      height: 400,
      paddingTop: 22,
      opacity: 0.6,
      backgroundColor: '#ccc'
    },
      itemOdd: {
        padding: 10,
        fontSize: 22,
        borderRadius: 50,
        backgroundColor: 'white',
      },
      itemEven: {
        padding: 10,
        fontSize: 22,
        borderRadius: 50,
        backgroundColor: '#bbb',
      },
 
});
