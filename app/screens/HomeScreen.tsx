import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StyleSheet, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { AppCarousel, AppHeader, HomeCarousel, Icon, Screen, Text } from "app/components"
import { screenContentContainer } from "app/styles/mainStyle"
import { spacing } from "app/theme"
import MapView from 'react-native-maps';
import { useStores } from "app/models"

// import { useStores } from "app/models"

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  // Pull in one of our MST stores
  const { AttendeesStore} = useStores()
  const totalAttendees = AttendeesStore.totalAttendees
  // Pull in navigation via hook
  return (
    <Screen style={$root} preset="scroll" contentContainerStyle={screenContentContainer}>
      <AppHeader pageTitle />
      <AppCarousel />
      <HomeCarousel />
      <View style={styles.bottomContainer}>
        <View>
        <View style={styles.dateTime}>
          <Text text="5TH - 9TH September, 2024" size="xs" weight="semiBold" style={styles.text}/>
          <View style={styles.dateTime}>

          <Icon icon="dot" style={{marginBottom: 3}} />
          <Text text="09:00AM" size="xs" weight="semiBold" style={styles.text}/>
          </View>
        </View>
        <Text text="Web3 Lagos Conference" size="xl" weight="bold" style={{marginBottom: 10}} />
        <Text
          text="The Web3 Lagos Conference is the largest Web3 Event in Lagos, Nigeria. This conference will bring together Web3 enthusiasts from all over Nigeria and beyond."
          size="xs"
          style={[styles.text,{marginBottom: 10}]}
        />
   <Text
          text="Here, community meets technology for three days of intensive Networking and Learning experiences. Future of money, you deserve to be in the know!"
          size="xs"
          style={styles.text}
        />
        </View>
        <View style={styles.attendeesContainer}>
          <View style={styles.attendees}>
            <Icon icon="person1" size={30}/>
            <Icon icon="person2" size={30} style={styles.leftShift} />
            <Icon icon="person3" size={30} style={styles.leftShift} />
            <Icon icon="person4" size={30} style={styles.leftShift} />
            <Icon icon="person5" size={30} style={styles.leftShift} />
            <Text text={`+${totalAttendees - 5}`} size="md" weight="semiBold"  style={styles.textBlack}/>
          </View>
          <View style={styles.participants}>
            <Text text="Participants" size="md" weight="bold"  style={styles.textBlack}/>
            <Text text="Across the globe" size="xs" style={styles.text}/>
          </View>
        </View>
        <View style={styles.eventStats}>
          <Text text="61+ Speakers" size="xs" weight="bold"  style={styles.textBlack}/>
          <Icon icon="dot" />
          <Text text="6+ Sponsors" size="xs" weight="bold"  style={styles.textBlack}/>
          <Icon icon="dot" />
          <Text text="21+ Workshops" size="xs" weight="bold"  style={styles.textBlack}/>
        </View>
        {/* <View style={styles.mapContainer}>
        <MapView style={styles.map} />
        </View> */}
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
    alignItems: "center",
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
  },
  leftShift:{
    marginLeft: -12
  },
  text:{
    color:"#708090"
  },
  textBlack:{
    color: "#000107"
  }
})
