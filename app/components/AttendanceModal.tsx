import * as React from "react"
import { Image, StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors } from "app/theme"
import { Text } from "app/components/Text"
import { Button } from "./Button"
import { Icon } from "./Icon"

const web3lagos = require("../../assets/images/Web3LagosPicture.png")

export interface AttendanceModalProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  userDetails: any
  handleMarkAttendance: any
  day: any}

/**
 * Describe your component here
 */
export const AttendanceModal = observer(function AttendanceModal(props: AttendanceModalProps) {
  const { style, userDetails, handleMarkAttendance, day  } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <View style={styles.modalContainer}>
        <Image source={web3lagos} style={styles.image} />
        <View style={styles.modal}>
          <View style={styles.detailsContainer}>
            <View style={styles.eachDetails}>
              <Icon icon="userName" size={24} />
              <Text text={userDetails.name} style={styles.detailText} />
            </View>
            <View style={styles.eachDetails}>
              <Icon icon="userEmail" size={24} />
              <Text text={userDetails.email} style={styles.detailText}/>
            </View>
            <View style={styles.eachDetails}>
              <Icon icon="userPhone" size={24} />
              <Text text={userDetails.phone} style={styles.detailText}/>
            </View>
            <View style={styles.eachDetails}>
              <Icon icon="userOccupation" size={24} />
              <Text text={userDetails.role} style={styles.detailText}/>
            </View>
            <View style={styles.eachDetails}>
              <Icon icon="userCountry" size={24} />
              <Text text={userDetails.country} style={styles.detailText}/>
            </View>
            <View style={styles.eachDetails}>
              <Icon icon="userX" size={24} />
              <Text text={userDetails.xhandle} style={styles.detailText}/>
            </View>
          </View>
          <Button
            pressedStyle={{
              backgroundColor: colors.palette.secondary,
              borderColor: colors.palette.secondary,
            }}
            pressedTextStyle={{
              color: colors.palette.primary
            }}
            text="Checkin"
            textStyle={styles.buttonText}
            style={styles.nextButton}
            onPress={()=>handleMarkAttendance(userDetails.email, day)}
          />
        </View>
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const styles = StyleSheet.create({
  eachDetails: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 5,
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
  detailsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  modal: {
    backgroundColor: "#0D0042CC",
    borderRadius: 10,
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: 20
  },
  modalContainer:{
    display: "flex",
    flexDirection: "column",
    gap: 10
  },
  image:{
    width: "100%",
    borderRadius: 10
  },
  detailText: {
    color: colors.palette.neutral100
  }
})
