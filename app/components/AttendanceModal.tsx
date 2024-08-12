import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text } from "app/components/Text"

export interface AttendanceModalProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Describe your component here
 */
export const AttendanceModal = observer(function AttendanceModal(props: AttendanceModalProps) {
  const { style,  showModal,
    setShowModal, address,  } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <Text style={$text}>Hello</Text>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary,
}
