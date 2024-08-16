import * as React from "react"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing} from "app/theme"
import { Text } from "app/components/Text"
import { Icon } from "./Icon"
import { useStores } from "app/models"

export interface AnalyticsCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const AnalyticsCard = observer(function AnalyticsCard(props: AnalyticsCardProps) {
  
  const { AttendeesStore } = useStores()

  const attendees = AttendeesStore.totalAttendees

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.outerCardContainer}>
        <View style={styles.cardContainer}>
          <View style={styles.innerContainer}>
          <Icon icon="sponsor" size={40} />
          <View style={styles.textContainer}>
            <Text text="20" weight="bold" size="xxl" />
            <Text text="Sponsors" weight="semiBold" style={styles.textStyle}/>
          </View>
          </View>
        </View>
        <View style={styles.cardContainer}>
        <View style={styles.innerContainer}>

          <Icon icon="speakers" size={40} />
          <View style={styles.textContainer}>
            <Text text="64" weight="bold" size="xxl" />
            <Text text="Speakers" weight="semiBold"  style={styles.textStyle}/>
          </View>
          </View>
        </View>
      </View>
      <View style={styles.outerCardContainer}>
        <View style={styles.cardContainer}>
        <View style={styles.innerContainer}>

          <Icon icon="participants" size={40} />
          <View style={styles.textContainer}>
            <Text text={`${attendees}`} weight="bold" size="xxl" />
            <Text text="Participants" weight="semiBold"  style={styles.textStyle}/>
          </View>
          </View>
        </View>
        <View style={styles.cardContainer}>
        <View style={styles.innerContainer}>

          <Icon icon="available" size={40} />
          <View style={styles.textContainer}>
            <Text text={`${1500 - attendees}`} weight="bold" size="xxl" />
            <Text text="Available" weight="semiBold"  style={styles.textStyle}/>
          </View>
          </View>
        </View>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  cardContainer: {
    backgroundColor: colors.palette.neutral100,
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    paddingVertical: 10,
    borderRadius: 10
  },
  outerCardContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  sectionContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: spacing.xs
  },
  textStyle:{
    marginTop: -10,
    color: "#708090"
  }
})
