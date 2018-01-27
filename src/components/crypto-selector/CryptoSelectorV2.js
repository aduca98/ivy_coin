import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
import CryptoPrice from '../../api/CryptoPrice';

var currencies = ["BTC", "ETH", "LTC"];

class Slide extends Component {

    state = {
        price: 0
    }

    async componentWillMount() {
        const price = await CryptoPrice.getPrice(this.props.item.currency.toUpperCase());
        const usd = parseFloat(price.price_usd).toFixed(2);
        console.log("USD " + usd);
        this.setState({
            price: usd
        });
    }

    render() {
        var img;
        switch(this.props.item.currency) {
            case "BTC":
                img = <Image style={{width: 100, height: 100}} source={require("../../assets/crypto/btc.png")} />
                break;
            case "ETH":
                img = <Image style={{width: 100, height: 100}} source={require("../../assets/crypto/eth.png")} />
                break;
            case "LTC":
                img = <Image style={{width: 100, height: 100}} source={require("../../assets/crypto/ltc.png")} />
                break;
            default:
                img = <Image style={{width: 100, height: 100}} source={require("../../assets/crypto/btc.png")} />
                break;
        }
        
        return(
            <View style={styles.slide}>
                <View style={[styles.slideInnerContainer, {backgroundColor: this.props.backgroundColor}]}>
                    {img}
                    <Text style={{
                        fontSize: 20,
                        top: 10,
                        fontFamily: "Avenir"
                    }}>{parseFloat(this.props.item.amount).toFixed(6)} {this.props.item.currency}</Text>
                    <Text style={{
                        fontSize: 15,
                        top: 10,
                        color: "#aaa",
                        fontFamily: "Avenir"
                    }}>$ {(parseFloat(this.props.item.amount).toFixed(6) * parseFloat(this.state.price)).toFixed(2)}</Text>
                </View>
            </View>);
    }
}

Slide.propTypes = {
    item: PropTypes.object
}

export default class CryptoSelectorV2 extends Component {

    state = {
        currency: "BTC",
        currentIndex: "2",
        balances: [],
    }

    constructor() {
        super();
        this._selectCurrency = this._selectCurrency.bind(this);
    }

    componentWillMount() {
        switch(this.props.currency) {
            case "BTC":
                this.setState({
                    currentIndex: 1,
                    currency: "BTC"
                })
                break;
            case "ETH":
                this.setState({
                    currentIndex: 2,
                    currency: "ETH"
                })
                break;
            case "LTC":
                this.setState({
                    currentIndex: 3,
                    currency: "LTC"
                })
                break;
            default:
                break;
        }
        this.props.selectCurrency(this.props.currency);
    }

    _selectCurrency(index) {
        this.setState({
            currency: currencies[(index + 1) % 3]
        })
        this.props.selectCurrency(currencies[(index + 1) % 3])
    }

    render () {
        return (
            
                <Carousel
                    ref={'carousel'}
                    data={this.props.balances}
                    renderItem={({item, index}) => {
                        return (<Slide backgroundColor={(this.state.currency === item.currency) ? "#E8ECFF" : "#FFF"} 
                                    item={item} />)
                    }}
                    sliderWidth={viewportWidth}
                    itemWidth={itemWidth}
                    enableSnap={true}
                    // containerCustomStyle={styles.slider}
                    // contentContainerCustomStyle={styles.sliderContentContainer}
                    onSnapToItem={(index) => {
                        this._selectCurrency(index);
                    }}
                    firstItem={parseInt(this.state.currentIndex)}
                    inactiveSlideScale={0.9}
                    inactiveSlideOpacity={0.8}
                    activeSlideOffset={10}
                    activeSlideAlignment={"center"}
                    loop={true}
                />
           
        );
    }
}

const horizontalMargin = 5;
const slideWidth = 200;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;

var styles = StyleSheet.create({
    slide: {
        width: itemWidth,
        height: 200,
        paddingHorizontal: horizontalMargin
        // other styles for the item container
    },
    slideInnerContainer: {
        width: slideWidth,
        flex: 1,
        backgroundColor: '#fff',
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        // other styles for the inner container
    }
})

CryptoSelectorV2.propTypes = {
    currency: PropTypes.string,
    selectCurrency: PropTypes.func.isRequired,
    balances: PropTypes.array
}