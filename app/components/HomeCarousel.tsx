import * as React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { observer } from "mobx-react-lite"
const homeImage1 = require("../../assets/images/web3lagos1.png")
const homeImage2 = require("../../assets/images/web3lagos2.png")
const homeImage3 = require("../../assets/images/web3lagos3.png")


/**
 * Describe your component here
 */
export const HomeCarousel = observer(function HomeCarousel(props) {
  const data = [homeImage1, homeImage2, homeImage3]

  const width = Dimensions.get('window').width;
  return (
          <Carousel
          style={{marginTop: -33}}
              loop
              width={width}
              height={320}
              autoPlay={true}
              data={data}
              scrollAnimationDuration={4000}
              mode='parallax'
              renderItem={({ index }) => (
                  <View style={styles.image}>
                      <Image source={data[index]}  style={styles.image}/>
                  </View>
              )}
          />
  );
})



const styles = StyleSheet.create({
  image: {
    width: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    resizeMode: "cover",

  }
})