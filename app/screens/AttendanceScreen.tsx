import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { StyleSheet, ViewStyle, useWindowDimensions } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { AppCarousel, AppHeader, Screen } from "app/components"
import { screenContentContainer } from "app/styles/mainStyle"
import { colors } from "app/theme"
import { useStores } from "app/models"
import { TabBar, TabView } from "react-native-tab-view"
import CheckInTab from "app/components/CheckInTab"

interface AttendanceScreenProps extends AppStackScreenProps<"Attendance"> {}

export const AttendanceScreen: FC<AttendanceScreenProps> = observer(function AttendanceScreen() {
  
  const { AttendeesStore } = useStores()

  // Fetch data once when the component mounts
  useEffect(() => {
    AttendeesStore.fetchTableData()
  }, [AttendeesStore])
  
  const attendeesDay1 = AttendeesStore.attendeeDayOneData
  const attendeesDay2 = AttendeesStore.attendeeDayTwoData
  const attendeesDay3 = AttendeesStore.attendeeDayThreeData 
  console.log(attendeesDay1)
  
  const layout = useWindowDimensions()

  const [index, setIndex] = useState(0)
  
  const [routes] = useState([
    { key: "Day 1", title: "Day 1" },
    { key: "Day 2", title: "Day 2" },
    { key: "Day 3", title: "Day 3" },
  ])

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case "Day 1":
        return attendeesDay1 ? <CheckInTab attendees={attendeesDay1} /> : null
      case "Day 2":
        return attendeesDay2 ? <CheckInTab attendees={attendeesDay2} /> : null
      case "Day 3":
        return attendeesDay3 ? <CheckInTab attendees={attendeesDay3} /> : null
      default:
        return null
    } 
  }

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: colors.palette.primary }}
      style={styles.tabBar}
      activeColor={colors.palette.secondary}
      inactiveColor={"#708090"}
      tabStyle={{ width: "auto" }}
    />
  )

  return (
    <Screen style={$root} preset="scroll" contentContainerStyle={screenContentContainer}>
      <AppHeader pageTitle={false} />
      <AppCarousel />
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={{height: 600}}
      />
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
})
