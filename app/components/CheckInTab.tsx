import * as React from "react"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { ScrollView } from "react-native-gesture-handler"
import { Row, Table } from "react-native-table-component"
import { colors, spacing } from "app/theme"
import { Text } from "./Text"

export interface CheckInTabProps {
  /**
   * An optional style override useful for padding & margin.
   */

  style?: StyleProp<ViewStyle>
  attendees: any
}

/**
 * Describe your component here
 */
const CheckInTab = observer(function CheckInTab(props: CheckInTabProps) {
  const { attendees } = props

  return (
    <>
    <View style={styles.container}>
      <Text text="Attendance" size="lg" weight="semiBold" />
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
            <Row
              data={["S/N", "Email", "Time In"]}
              widthArr={[40, 220, 100]}
              style={styles.header}
              textStyle={styles.text}
            />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
              {attendees.map((rowData: any, index: number) => (
                <Row
                  key={index}
                  data={rowData}
                  widthArr={[40, 220, 100]}
                  style={[styles.row, index % 2 && { backgroundColor: "#F7F6E7" }]}
                  textStyle={styles.rowText}
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
    </>
  )
})

export default React.memo(CheckInTab)

const styles = StyleSheet.create({
  header: { height: 50, backgroundColor: colors.palette.secondary },
  text: { paddingLeft: 10, fontWeight: "500", color: "#fff" },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: "#E7E6E1" },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: spacing.md,
  },
  rightIcon: {
    backgroundColor: colors.palette.primary,
    padding: 3,
  },
  field: {
    backgroundColor: colors.palette.neutral100,
  },
  rowText: {
    paddingLeft: 10,
    fontWeight: "400",
    color: colors.palette.secondary,
  },
  iconContainerStyle: {
    backgroundColor: colors.palette.primary,
    padding: 4,
    paddingHorizontal: 10,
    marginLeft: -50,
    borderRadius: 10,
    zIndex: 10,
  },
  containerStyle: {
    backgroundColor: colors.palette.neutral100,
  },
  loaderContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textFieldStyle: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  scrollStyle: {
    height: 450,
  },
})
