/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"
import { colors } from "app/theme"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

const splashOne = require("../../../assets/images/splashOne.png");
const Overlay = require("assets/images/app-icon-android-adaptive-background.png");


interface SplashOneScreenProps extends AppStackScreenProps<"SplashOne"> {}

export const SplashOneScreen: FC<SplashOneScreenProps> = observer(function SplashOneScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  const skip = () => {
    navigation.navigate("Home")
  }
  const next = () => {
    navigation.navigate("SplashTwo")
  }
  return (
    <Screen preset="fixed" contentContainerStyle={styles.splashContainer}>
      <ImageBackground source={splashOne} style={styles.background}>
        <ImageBackground source={Overlay} style={styles.background}>
          <View style={styles.container}>
            <View style={styles.bottomView}>
              <View style={styles.topContainer}>
                <View style={styles.sliderIcon}>
                  <View style={styles.activeSlide}></View>
                  <View style={styles.inactiveSlide}></View>
                  <View style={styles.inactiveSlide}></View>
                </View>
                <Text text="Pick Items" size="xxl" weight="bold" style={styles.textStyle} />
                <Text
                  text="Enjoy convenience at your fingertips with the self checkout app."
                  size="md"
                  weight="normal"
                  style={styles.textStyle}
                />
              </View>

              <View style={styles.navigations}>
                <TouchableOpacity onPress={skip} style={styles.skip}>
                  <Text text="Skip" size="lg" weight="bold" style={styles.skip} />
                </TouchableOpacity>
                <Button
                  onPress={next}
                  pressedStyle={{
                    backgroundColor: colors.background,
                    borderColor: colors.palette.primary100,
                  }}
                  text="Next"
                  preset="primary"
                  textStyle={styles.buttonText}
                  style={styles.nextButton}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </ImageBackground>
    </Screen>
  )
})



const styles = StyleSheet.create({
  activeSlide: {
    backgroundColor: colors.palette.primary100,
    borderRadius: 100,
    height: 10,
    marginRight: 5,
    width: 35,
  },
  background: {
    flex:1,
    resizeMode: "cover",
  },
  bottomView: {
    display: "flex",
    flexDirection: "column",
    height: "40%",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "700",
  },
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  inactiveSlide: {
    backgroundColor: colors.palette.neutral300,
    borderRadius: 100,
    height: 10,
    marginHorizontal: 3,
    width: 10,
  },
  logo: {
    height: 75,
    padding: 10,
    width: 70,
  },
  navigations: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  nextButton: {
    alignItems: "center",
    backgroundColor: colors.palette.primary100,
    borderRadius: 5,
    color: "#000000",
    display: "flex",
    height: 35,
    justifyContent: "center",
    paddingHorizontal: 30
  },
  selectView: {
    marginBottom: 20,
  },
  selectViewIcon: {
    alignItems: "center",
    flexDirection: "row",
  },
  skip: {
    color: colors.palette.neutral100,
    fontSize: 20,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
  sliderIcon: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
  splashContainer: {
    flex: 1,
  },
  splashImg: {
    backgroundColor: colors.background,
    borderColor: colors.palette.neutral400,
    borderRadius: 20,
    borderWidth: 1,
    height: 345,
    justifyContent: "space-between",
    width: "auto",
  },
  splashMsg: {
    alignItems: "center",
    gap: 15,
    textAlign: "center",
  },
  textStyle:{
    color: colors.palette.neutral100,
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 44,
    textAlign: "center",
  },
  topContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: 20,
    marginHorizontal: 20
  },
})
