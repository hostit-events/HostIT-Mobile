import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StyleSheet,  ViewStyle, useWindowDimensions } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import {

  AppCarousel,
  AppHeader,
  AttendanceTab,
  Screen,
} from "app/components"
import { screenContentContainer } from "app/styles/mainStyle"
import { colors, spacing } from "app/theme"
import { TabBar, TabView } from "react-native-tab-view"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface AnalyticsScreenProps extends AppStackScreenProps<"Analytics"> {}

export const AnalyticsScreen: FC<AnalyticsScreenProps> = observer(function AnalyticsScreen() {
  const layout = useWindowDimensions()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: "Day 1", title: "Day 1" },
    { key: "Day 2", title: "Day 2" },
    { key: "Day 3", title: "Day 3" },
  ])

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case "Day 1":
        return <AttendanceTab />
      case "Day 2":
        return <AttendanceTab />
      case "Day 3":
        return <AttendanceTab />
      default:
        return <AttendanceTab />
    }
  }

  const renderTabBar = (props : any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: colors.palette.primary }}
      style={styles.tabBar}
      activeColor={colors.palette.secondary}
      inactiveColor={"#708090"}
      tabStyle={{ width: "auto" }}
    />
  )

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

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "transparent",
    color: colors.palette.secondary,
    gap: 20,
  },
  container: {
    margin: spacing.md,
    backgroundColor: "transparent",
  },
})
