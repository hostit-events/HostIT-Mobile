/* eslint-disable react-native/no-color-literals */
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ImageBackground, StyleSheet, View } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"
import { colors } from "app/theme"
import { useStores } from "app/models"

const splashThree = require("../../../assets/images/splashThree.png");


interface SplashThreeScreenProps extends AppStackScreenProps<"SplashThree"> {}

export const SplashThreeScreen: FC<SplashThreeScreenProps> = observer(function SplashThreeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const { walkthroughStore } = useStores()

  const next = () => {
    walkthroughStore.setSeenWalkthrough(true)
  }
  return (
    <Screen preset="fixed" contentContainerStyle={styles.splashContainer}>
      <ImageBackground source={splashThree} style={styles.background}>
      
          <View style={styles.container}>
            <View style={styles.bottomView}>
              <View style={styles.topContainer}>
                <Text text="Experience seamless verification for your events" size="xxl" weight="semiBold" style={styles.textStyle} />
              </View>

              <View style={styles.navigations}>
              <View style={styles.sliderIcon}>
                  <View style={styles.inactiveSlide}></View>
                  <View style={styles.activeSlide}></View>
                </View>
                <Button
                  onPress={next}
                  pressedStyle={{
                    backgroundColor: colors.palette.secondary,
                    borderColor: colors.palette.secondary,
                  }}
                  pressedTextStyle={{
                    color: colors.palette.primary
                  }}
                  text="Get Started"
                  textStyle={styles.buttonText}
                  style={styles.nextButton}    
                />
              </View>
            </View>
          </View>
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
    height: "35%",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.palette.secondary,
    
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
    backgroundColor: colors.palette.neutral100,
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
