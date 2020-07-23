import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

export default class App extends React.Component {
    state = {
      image: null,
      file: null
    };

  _pickDocument = async () => {
	    let result = await DocumentPicker.getDocumentAsync({});
		  alert(result.uri);
      console.log(result);

      if (!result.cancelled) {
        this.setState({file: result})
      }
	}

   _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [3, 4],
    });

    alert(result.uri);
    console.log(result)

    if (!result.cancelled) {
      this.setState({ image: result });
    }
  };

  renderElement() {
    if (this.state.file !== null){
      return <Text>Hello, the file you have selected is: {this.state.file.name}</Text>
    }
    else if (this.state.image !== null) {
      return <Image source={{uri: this.state.image.uri}} style={{ width: 200, height: 200 }} />}
  }
  

  render() {
    let { image } = this.state;
    let { file } = this.state;

    return (
      <View style={styles.container}>
        <Button
          title="Select Document"
          onPress={this._pickDocument}
        />

  

      <View style={{ 'marginTop': 20}}>
        <Button
          title="Select Image"
          onPress={this._pickImage}
        />
        {(image || file) && (this.renderElement())} 
        
        {/* /* {image &&
          <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />} */} 
      
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
