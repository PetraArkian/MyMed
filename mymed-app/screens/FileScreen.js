import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import BottomTabNavigator from '../navigation/BottomTabNavigator';
import * as FileSystem from 'expo-file-system';


export default class App extends React.Component {
    state = {
        files: [],
    };

    _readFilesFromFileSystem = async () => {
        let result = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
        console.log(result);
        this.setState({files: result}); // setting files to be an array of file names from directory of FileSystem
    }

    _renderElement(){
        this._readFilesFromFileSystem();
        if (this.state.files.length > 0){
        return <Text>{this.state.files.map(file => file + "\n")}</Text>
        }
        else {
            return <Text>No files uploaded</Text>;
        }
    }

    render() {
       let element = this._renderElement();
       return (
       <View>
        {(this.state.files.length > 0) && element}
       </View>
       );
    }
}