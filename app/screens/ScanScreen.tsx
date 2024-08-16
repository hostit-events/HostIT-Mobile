import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, StyleSheet, useWindowDimensions } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import {
  AppCarousel,
  AppHeader,
  Screen,
  Text,
} from "app/components"
import { screenContentContainer } from "app/styles/mainStyle"
import { colors, spacing } from "app/theme"
import { TabView, TabBar } from "react-native-tab-view"
import ScanFirstTab from "app/components/ScanFirstTab"
import ScanSecondTab from "app/components/ScanSecondTab"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ScanScreenProps extends AppStackScreenProps<"Scan"> {}


export const ScanScreen: FC<ScanScreenProps> = observer(function ScanScreen() {
  // Pull in one of our MST stores

  const layout = useWindowDimensions()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: "Scan QRCode", title: "Scan QRCode" },
    { key: "Verify Email", title: "Verify Email" },
  ])

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'Scan QRCode':
        return <ScanFirstTab />;
      case 'Verify Email':
        return <ScanSecondTab />;
      default:
        return <ScanFirstTab />;
    }
  };

  const renderTabBar = (props : any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: colors.palette.primary }}
      style={styles.tabBar}
      activeColor={colors.palette.secondary}
      inactiveColor={"#708090"}
      tabStyle={{width: 'auto',}}
    />
  );
  // Pull in navigation via hook
  // const navigation = useNavigation()

  return (
    <Screen style={$root} preset="scroll" contentContainerStyle={screenContentContainer}>
      <AppHeader pageTitle={false} />
      <AppCarousel />
      <View style={styles.container}>
      <Text text="Ticket Confirmation" size="lg" weight="semiBold" />
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
      </View>
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
    gap: 20
  },
  container: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    backgroundColor: "transparent",
    height: 570
  }
})
