import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StyleSheet, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { AppCarousel, AppHeader, HomeCarousel, Icon, Screen, Text } from "app/components"
import { screenContentContainer } from "app/styles/mainStyle"
import { spacing } from "app/theme"
import MapView from 'react-native-maps';

// import { useStores } from "app/models"

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  return (
    <Screen style={$root} preset="scroll" contentContainerStyle={screenContentContainer}>
      <AppHeader pageTitle />
      <AppCarousel />
      <HomeCarousel />
      <View style={styles.bottomContainer}>
        <View>
        <View style={styles.dateTime}>
          <Text text="5TH - 9TH September, 2024" size="xs" weight="semiBold" />
          <View style={styles.dateTime}>

          <Icon icon="dot" style={{marginBottom: 3}} />
          <Text text="09:00AM" size="xs" weight="semiBold"/>
          </View>
        </View>
        <Text text="Web3 Lagos Conference" size="xl" weight="bold"/>
        <Text
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at arcu varius, suscipit leo ut, gravida tortor. Morbi nec arcu ex."
          size="xs"
        />
        </View>
        <View style={styles.attendeesContainer}>
          <View style={styles.attendees}>
            <Icon icon="person1" size={30}/>
            <Icon icon="person2" size={30}/>
            <Icon icon="person3" size={30}/>
            <Icon icon="person4" size={30}/>
            <Icon icon="person5" size={30}/>
          </View>
          <View style={styles.participants}>
            <Text text="Participants" size="md" weight="bold" />
            <Text text="Across the globe" size="xs" />
          </View>
        </View>
        <View style={styles.eventStats}>
          <Text text="445+ Speakers" size="xs" weight="bold" />
          <Icon icon="dot" />
          <Text text="20+ Sponsors" size="xs" weight="bold" />
          <Icon icon="dot" />
          <Text text="21+ Workshops" size="xs" weight="bold" />
        </View>
        <View style={styles.mapContainer}>
        <MapView style={styles.map} />
        </View>
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  dot: {
    width: 12,
    height: 12,
  },
  dotContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    width: "100%",
    marginVertical: 10
  },
  eventStats:{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  bottomContainer:{
    marginHorizontal: spacing.md,
    display: "flex",
    flexDirection: "column",
    gap: spacing.sm
  },
  attendees:{
    display: "flex",
    flexDirection: "row",
    gap: -20
  },
  participants:{
    display:"flex",
    flexDirection: "column"
  },
  attendeesContainer:{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  mapContainer:{
    width: "100%",
    height: 150, 
    borderRadius: 10
  },
  map: {
    width: "100%",
    height:"100%"
  },
  dateTime:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  }
})
