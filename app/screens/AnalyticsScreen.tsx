import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import {

  AppCarousel,
  AppHeader,
  AttendanceTab,
  Screen,
} from "app/components"
import { screenContentContainer } from "app/styles/mainStyle"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface AnalyticsScreenProps extends AppStackScreenProps<"Analytics"> {}

export const AnalyticsScreen: FC<AnalyticsScreenProps> = observer(function AnalyticsScreen() {
  
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll" contentContainerStyle={screenContentContainer}>
      <AppHeader pageTitle={false} />
      <AppCarousel />
      <AttendanceTab />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}


