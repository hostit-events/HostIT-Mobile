import * as React from "react"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors } from "app/theme"
import { Text } from "app/components/Text"
import { Icon } from "./Icon"
import Carousel from "react-native-reanimated-carousel"

export interface AppCarouselProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

const carouselItem = [
  {icon: "speaker", text: "Web3Lagos Conference 3.0"},
  {icon: "star", text: "HostIT | Revolutionizing Events"},
  {icon: "star", text: "We are Powered by the Lisk L2"},  
]

const renderItem = ({item}: {item: number})=>{
  return(
    <View>
      <View style={styles.carouselItem}>
        <Icon icon={carouselItem[item].icon} />
        <Text text={carouselItem[item].text} style={styles.text} size="lg" weight="bold" />
      </View>
    </View>
  )
}

const data: number[] = [...new Array(3).keys()];


export const AppCarousel = observer(function AppCarousel(props: AppCarouselProps) {

  return (
    <Carousel
    loop // Enables infinite looping of the carousel
    width={280} // Width of each item in the carousel
    height={200} // Height of the carousel
    data={data} // Data to be rendered in the carousel
    autoPlay // Automatically starts playing the carousel
    style={{
      width: '100%',
      height: 50,
      backgroundColor: colors.palette.secondary,
    }}
    scrollAnimationDuration={5000} // Duration of the scrolling animation
    renderItem={renderItem} // Function to render each item in the carousel
  />

  )

})


const styles = StyleSheet.create({
  text: {
    color: colors.palette.neutral100
  },
  carouselItem: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15
  }
 
})