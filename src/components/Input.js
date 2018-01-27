import React from 'react';
import {
    TextInput
} from 'react-native';

// NOT FINISHED OR INTEGRATED ANYWHERE... need to figure out ref part
export default function Input({ref, placeholder, keyboardType}) {
    return( 
        <TextInput 
            style={[style.input, {
                color: '#FFF',
                textAlign: 'center',
                alignItems: 'center',
                fontSize: 30,
                height: 70,
                justifyContent: 'center',
                backgroundColor: '#fff',
                borderRadius: 10,
                shadowColor: '#ccc',
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 3,
                shadowOpacity: 0.7
            }]}
            returnKeyLabel='Done' 
            returnKeyType='done'
            placeholderTextColor={"#888"}
            tintColor={"#FFF"}
            keyboardType={keyboardType || "default"}
            ref={'message'} 
            placeholder="Message"
            value = {this.state.message}
            onChangeText={(val) => this.setState({message: val})}
        />);
}