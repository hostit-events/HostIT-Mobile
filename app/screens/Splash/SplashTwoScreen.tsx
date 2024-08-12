/* eslint-disable react-native/no-color-literals */
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ImageBackground, StyleSheet, View } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"
import { colors } from "app/theme"
import { useNavigation } from "@react-navigation/native"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

const splashTwo = require("../../../assets/images/splashTwo.png")
const overlay = require("../../../assets/images/app-icon-android-adaptive-background.png")

interface SplashTwoScreenProps extends AppStackScreenProps<"SplashTwo"> {}

export const SplashTwoScreen: FC<SplashTwoScreenProps> = observer(function SplashTwoScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  const next = () => {
    navigation.navigate("SplashThree")
  }

  return (
    <Screen preset="fixed" contentContainerStyle={styles.splashContainer}>
      <ImageBackground source={splashTwo} style={styles.background}>
        <ImageBackground source={overlay} style={styles.background}>
        <View style={styles.container}>
          <View style={styles.bottomView}>
            <View style={styles.topContainer}>
              <Text
                text="Ready for the largest web3 event in Africa"
                size="xxl"
                weight="bold"
                style={styles.textStyle}
              />
            </View>
            <View style={styles.navigations}>
              <View style={styles.sliderIcon}>
                <View style={styles.activeSlide}></View>
                <View style={styles.inactiveSlide}></View>
              </View>
              <Button
                onPress={next}
                pressedStyle={styles.buttonPressed}
                text="Get Started"
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
    backgroundColor: colors.palette.primary,
    borderRadius: 100,
    height: 10,
    width: 35,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  bottomView: {
    display: "flex",
    flexDirection: "column",
    height: "60%",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.palette.secondary
  },
  buttonPressed: {
      backgroundColor: colors.palette.secondary,
      borderColor: colors.palette.secondary,
      color: colors.palette.primary
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
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  nextButton: {
    alignItems: "center",
    backgroundColor: colors.palette.primary,
    borderRadius: 30,
    borderColor: colors.palette.primary,
    color: colors.palette.secondary,
    width: "100%",
    display: "flex",
    height: 61,
    justifyContent: "center",
    paddingHorizontal: 30,
    fontSize: 18,
    fontWeight: 600
  },
  selectView: {
    marginBottom: 20,
  },
  selectViewIcon: {
    alignItems: "center",
    flexDirection: "row",
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
  textStyle: {
    color: colors.palette.neutral100,
    textAlign: "left",
    fontSize: 40
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
    marginHorizontal: 20,
    width: 300
  },
})
