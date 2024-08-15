import * as React from "react"
import { ComponentType } from "react"
import {
  Image,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from "react-native"

export type IconTypes = keyof typeof iconRegistry

interface IconProps extends TouchableOpacityProps {
  /**
   * The name of the icon
   */
  icon: IconTypes

  /**
   * An optional tint color for the icon
   */
  color?: string

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number

  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>

  /**
   * An optional function to be called when the icon is pressed
   */
  onPress?: TouchableOpacityProps["onPress"]
}

/**
 * A component to render a registered icon.
 * It is wrapped in a <TouchableOpacity /> if `onPress` is provided, otherwise a <View />.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/components/Icon/}
 * @param {IconProps} props - The props for the `Icon` component.
 * @returns {JSX.Element} The rendered `Icon` component.
 */
export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...WrapperProps
  } = props

  const isPressable = !!WrapperProps.onPress
  const Wrapper = (WrapperProps?.onPress ? TouchableOpacity : View) as ComponentType<
    TouchableOpacityProps | ViewProps
  >

  const $imageStyle: StyleProp<ImageStyle> = [
    $imageStyleBase,
    color !== undefined && { tintColor: color },
    size !== undefined && { width: size, height: size },
    $imageStyleOverride,
  ]

  return (
    <Wrapper
      accessibilityRole={isPressable ? "imagebutton" : undefined}
      {...WrapperProps}
      style={$containerStyleOverride}
    >
      <Image style={$imageStyle} source={iconRegistry[icon]} />
    </Wrapper>
  )
}

export const iconRegistry = {
  back: require("../../assets/icons/back.png"),
  hidden: require("../../assets/icons/hidden.png"),
  view: require("../../assets/icons/view.png"),
  x: require("../../assets/icons/x.png"),
  home: require("../../assets/icons/Home.png"),
  attendance: require("../../assets/icons/Attendance.png"),
  analytics: require("../../assets/icons/Analytics.png"),
  scan: require("../../assets/icons/Scan.png"),
  notification: require("../../assets/icons/notification.png"),
  speaker: require("../../assets/icons/speaker.png"),
  star: require("../../assets/icons/star.png"),
  userProfile: require("../../assets/icons/user-profile.png"),
  flashBtn: require("../../assets/icons/flashBtn.png"),
  imageBtn: require("../../assets/icons/imageBtn.png"),
  retryBtn: require("../../assets/icons/retryBtn.png"),
  dot: require("../../assets/icons/dot.png"),
  person1: require("../../assets/icons/person1.png"),
  person2: require("../../assets/icons/person2.png"),
  person3: require("../../assets/icons/person3.png"),
  person4: require("../../assets/icons/person4.png"),
  person5: require("../../assets/icons/person5.png"),
  emptyImage: require("../../assets/icons/emptyImage.png"),
  userName: require("../../assets/icons/userName.png"),
  userEmail: require("../../assets/icons/userEmail.png"),
  userCountry: require("../../assets/icons/userCountry.png"),
  userOccupation: require("../../assets/icons/userOccupation.png"),
  userPhone: require("../../assets/icons/userPhone.png"),
  userX: require("../../assets/icons/userX.png"),
  sponsor: require("../../assets/icons/sponsor.png"),
  speakers: require("../../assets/icons/speakers.png"),
  participants: require("../../assets/icons/participants.png"),
  available: require("../../assets/icons/available.png"),
  search: require("../../assets/icons/search.png"),
}

const $imageStyleBase: ImageStyle = {
  resizeMode: "contain",
}
