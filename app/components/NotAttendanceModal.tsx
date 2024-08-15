import * as React from "react"
import { Image, StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "./Text"
import { Button } from "./Button"
import { colors } from "app/theme"

const failedQR = require("../../assets/images/failedQR.png")
const failedUser = require("../../assets/images/failedUser.png")

export interface NotAttendanceModalProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  setShowModal:  React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Describe your component here
 */
export const NotAttendanceModal = observer(function NotAttendanceModal(
  props: NotAttendanceModalProps,
) {
  const { style, setShowModal } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <View style={styles.modalContainer}>
        <Text text="User not found!" size="xl" weight="semiBold" style={styles.text}/>
        <View style={styles.imageContainer}>
          <Image source={failedQR} />
          <Image source={failedUser} style={styles.image}/>
        </View>
        <Button
            pressedStyle={{
              backgroundColor: colors.palette.secondary,
              borderColor: colors.palette.secondary,
            }}
            text="Retry"
            textStyle={styles.buttonText}
            style={styles.nextButton}
            onPress={()=>{setShowModal(false)}}
          />
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const styles = StyleSheet.create({
  modalContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.palette.secondary,
  },
  nextButton: {
    alignItems: "center",
    backgroundColor: colors.palette.primary,
    borderRadius: 30,
    borderColor: colors.palette.primary,
    color: colors.palette.secondary,
    width: "100%",
    display: "flex",
    height: 55,
    justifyContent: "center",
    paddingHorizontal: 30,
    fontSize: 18,
    fontWeight: 600,
  },
  image:{
    marginTop: -170
  },
  imageContainer:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  text:{
    color: "red"
  }
})
