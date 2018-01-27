<View style={style.slide}>

                            <View style={style.card}>
                                {/*<Icon style={{
                                    flexDirection: "flex-end", 
                                    top: 50, 
                                    left: 20, 
                                    zIndex: 10
                                    }} name="ios-search" size={20} color="#000"/>*/}
                                <TextInput 
                                    multiline={true}
                                    autoCapitalize={true}
                                    style={[style.input, {
                                        color: '#000',
                                        textAlign: 'left',
                                        alignItems: 'left',
                                        fontSize: 18,
                                        paddingLeft: 20,
                                        paddingTop: 20,
                                        height: 130,
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
                                    tintColor={"#000"}
                                    ref={'message'} 
                                    placeholder="Message"
                                    value = {this.state.message}
                                    onChangeText={(val) => this.setState({message: val})}
                                />
                            </View>
                            
                        </View>