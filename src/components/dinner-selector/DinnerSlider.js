import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import {Entypo} from '@expo/vector-icons';
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {H1, Button, Left, Header} from "native-base";
import Slide from './Slide';

export default class DinnerSlider extends Component {
    
    constructor() {
        super();
    }
    
    render() {
        const {buttons, style, arrowColor, textStyle, dinninghalls} = this.props;
        return(
            <Swiper 
                onIndexChanged={(index) => this.props.activeIndex(index)}
                showsButtons={true}
                showsPagination={false}
                prevButton={<Entypo style={{fontSize: 45, color: arrowColor}} name="chevron-thin-left"/>}
                nextButton={<Entypo style={{fontSize: 45, color: arrowColor}} name="chevron-thin-right"/>}>

                {dinninghalls && dinninghalls.map((b, i) => {  
                    return (<Slide key={i} textStyle={textStyle} arrowColor={arrowColor} buttons={buttons} style={style} dinninghall={b} />);
                })}

            </Swiper>
        )
    }
}

DinnerSlider.propTypes = {
    dinninghalls: PropTypes.array.isRequired,
    backgroundColor: PropTypes.string,
}