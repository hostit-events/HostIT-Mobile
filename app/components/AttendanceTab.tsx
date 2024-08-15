import * as React from "react"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { spacing} from "app/theme"
import { Text } from "app/components/Text"
import { AppBarChart } from "./AppBarChart"
import { AnalyticsCard } from "./AnalyticsCard"
import { AttendanceTable } from "./AttendanceTable"

export interface AttendanceTabProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const AttendanceTab = observer(function AttendanceTab(props: AttendanceTabProps) {

  return (
    <>
     <View style={styles.container}>
        <Text text="Attendance" size="lg" weight="semiBold" />
        <AppBarChart />
      </View>
      <View style={styles.container}>
        <Text text="Tickets" size="lg" weight="semiBold" />
        <AnalyticsCard />
      </View>
      <View style={styles.container}>
        <Text text="Live Update" size="lg" weight="semiBold" />
        <AttendanceTable />
      </View></>
  )
})

const styles = StyleSheet.create({
  container: {
    margin: spacing.md,
    borderRadius: 15,
  },
})