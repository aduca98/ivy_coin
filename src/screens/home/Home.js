import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import MapView from "react-native-maps";

import variables from "../../assets/native-base-theme/variables/commonColor";
import Loading from '../../components/Loading';
import {connect} from 'react-redux';
import forceAuth from '../../utils/ForceAuth';

import dinningHalls from '../../assets/dinning-halls/dinning-halls';
import {H1, Button, Left, Header} from "native-base";
import { LinearGradient } from 'expo';
import {BaseContainer, Circle, Styles, Images, WindowDimensions} from "../../components";
import {MaterialCommunityIcons, Ionicons, FontAwesome, EvilIcons} from '@expo/vector-icons';
import ShoppingCart from '../../components/ShoppingCart';




const Imagesd = [
  { uri: "https://i.imgur.com/sNam9iJ.jpg" },
  { uri: "https://i.imgur.com/N7rlQYt.jpg" },
  { uri: "https://i.imgur.com/UDrH0wm.jpg" },
  { uri: "https://i.imgur.com/Ka8kNST.jpg" },
]

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4.5;
const CARD_WIDTH = CARD_HEIGHT - 30;

export default class screens extends Component {
  state = {
    markers: [
      {
        coordinate: {
          latitude: 41.830583,
          longitude: -71.402411,
        },
        title: "Andrews",
        description: "This popular dinning hall contains classics such as pizzas and sandwiches as well as more exotic options such as pho and curry. ",
        image: Imagesd[0],
      },
      {
        coordinate: {
          latitude: 41.825218,
          longitude: -71.401232,
        },
        title: "Ratty",
        description: "Choose from a variety of quality entrees and sides crafted from scratch-made recipes, locally grown produce, quality meats from our in-house Butcher Shop, and Pinterest-worthy desserts from our in-house Bakeshop.",
        image: Imagesd[1],
      },
      {
        coordinate: {
          latitude: 41.826754,
          longitude: -71.403197,
        },
        title: "Blue Room",
        description: "Conveniently located in the Stephen Robert Campus Center, the Blue Room Café features sustainable fair-trade coffee, delicious breakfast sandwiches and a fantastic array of freshly baked goodies and artisan pastries. The Blue Room also boasts an extensive, customizable deli with local artisan bread, high-quality meats, and plenty of vegetarian options. Locally prepared soups, sushi, and a wide selection of fresh snacks and beverages are available for folks on the go. The Blue Room also partners with local restaurants serving authentic ethnic cuisine.",
        image: Imagesd[2],
      },
      {
        coordinate: {
          latitude: 41.829802,
          longitude: -71.401696,
        },
        title: "VDub",
        description: "Located on the Pembroke campus, Verney-Woolley (better known as the “V-Dub”) is the smaller of Brown’s two all-you-care-to-eat dining halls. Its intimacy and unique character carry over to its work environment where our culinary team prepares grilled items in full view of the line. Dine with friends at our round tables or booth seating, in the sunny windows of the dining room, or outside in the inner courtyard. Looking to grab a quiet bite? The V-Dub has counter seating perfect for solo diners.",
        image: Imagesd[3],
      },
      {
        coordinate: {
          latitude: 41.823639,
          longitude: -71.399550,
        },
        title: "Jo's",
        description: "Customize your meal with our make your own chopped salads and quesadillas; or choose from our popular grilled selection of burgers, chicken sandwiches, french fries, and onion rings",
        image: Imagesd[4],
      },
    ],
    region: {
      latitude: 41.830583,
      longitude: -71.402411,
      latitudeDelta: 0.00864195044303443,
      longitudeDelta: 0.000142817690068,
    },
  };

    async navOrder() {
        return this.props.navigation.navigate("Food_Display", { dinningHall: this.state.selectedIndex });
    }
    async navDeliver() {
        return this.props.navigation.navigate("Deliveries_Display", { dinningHall: this.state.selectedIndex });
    }

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }
  componentDidMount() {
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  }

  render() {
    const {navigation} = this.props;
    const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });

    return (

      <View style={styles.container}>
      <View style={{
                height: 90,
                top: 0,
                backgroundColor: '#56A0ED',
                left:0,
                paddingTop: 10,
                width: WindowDimensions.width }}>

                <View style={{
                        flex: .25,
                        flexDirection: 'row'
                    }}>
                    <Left style={{
                            left: 0,
                            flex: .3,
                            top: 45,
                            justifyContent: 'flex-start'
                        }}>
                        <Button onPress={() => navigation.navigate("DrawerOpen")} transparent>
                            <MaterialCommunityIcons style={{
                                width: 35,
                                height: 35,
                                left: 15,
                                fontSize: 35,
                                color: "#fff"
                            }} name="menu" />
                        </Button>
                    </Left>

                    <Text
                        style={{
                            backgroundColor: 'transparent',
                            fontSize: 25,
                            color: '#fff',
                            fontWeight: 'bold',
                            flex: .4,
                            height: 50,
                            textAlign: 'center',
                            top: 35,
                            justifyContent: 'flex-start',
                            fontFamily: 'Avenir-Book'
                        }}>
                        Home
                    </Text>
                    <View style={{
                        right: 0,
                        flex: .3,
                        top: 50,
                        alignItems: 'right',
                        justifyContent: 'flex-end'}}>
                        <ShoppingCart navigation={this.props.navigation} />
                    </View>

                </View>
              </View>
        <MapView
          ref={map => this.map = map}
          initialRegion={this.state.region}
          style={styles.container}
        >
          {this.state.markers.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity,
            };
            return (
              <MapView.Marker key={index} coordinate={marker.coordinate}>
                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <Animated.View style={[styles.ring, scaleStyle]} />
                  <View style={styles.marker} />
                </Animated.View>
              </MapView.Marker>
            );
          })}
        </MapView>
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {this.state.markers.map((marker, index) => (
            <View style={styles.card} key={index}>
              <View style={{
                            alignItems: 'center',
                            flex: .5,
                        }}>
                        <TouchableOpacity
                            onPress={() => this.navOrder()}
                            style={{
                                width: 155,
                                paddingTop: 10,
                                paddingBottom: 10,
                                flexDirection: 'row',
                                borderRadius: 35,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <MaterialCommunityIcons
                                style={{
                                    fontSize: 25,
                                    color: 'white',
                                    marginRight: 10
                                }}
                                name="food" />
                            <Text
                                style={{
                                backgroundColor: 'transparent',
                                fontSize: 17,
                                color: '#FFF',
                                fontWeight: 'bold',
                                fontFamily: 'Avenir-Book'
                                }}>
                                Order
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                            alignItems: 'center',
                            flex: .5
                        }}>
                        <TouchableOpacity
                            onPress={() => this.navDeliver()}
                            style={{
                                width: 155,
                                color: "#000",
                                paddingTop: 10,
                                paddingBottom: 10,
                                borderRadius: 35,
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row',
                            }}>
                            <MaterialCommunityIcons
                                style={{
                                    fontSize: 25,
                                    color: 'white',
                                    marginRight: 10
                                }}
                                name="truck" />

                            <Text
                                style={{
                                    backgroundColor: 'transparent',
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    color: '#FFF',
                                    fontFamily: 'Avenir-Book'
                                }}>
                                Deliver
                            </Text>
                        </TouchableOpacity>
                    </View>
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {marker.description}
                </Text>


              </View>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#56A0ED",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 20,
    alignSelf: "center",
    marginTop: 5,
    fontWeight: "bold",
    color: "#FFF",
  },
  cardDescription: {
    fontSize: 12,
    color: "#FFF",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
});

AppRegistry.registerComponent("mapfocus", () => screens);