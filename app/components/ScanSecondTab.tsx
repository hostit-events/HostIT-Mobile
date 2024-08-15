import * as React from "react"
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors } from "app/theme"
import { TextField } from "./TextField"
import { Icon } from "./Icon"
import { Row, Table } from "react-native-table-component"

export interface ScanSecondTabProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
const ScanSecondTab = observer(function ScanSecondTab(props: ScanSecondTabProps) {
  const [tableHead] = React.useState(["Name", "Email", "Role"])
  const [widthArr] = React.useState([150, 140, 100])

  const tableData = [
    ["Banwo Olorunsogo", "sogobanwo@gmail.com", "Attendee"],["Banwo Olorunsogo", "sogobanwo@gmail.com", "Attendee"],["Banwo Olorunsogo", "sogobanwo@gmail.com", "Attendee"],["Banwo Olorunsogo", "sogobanwo@gmail.com", "Attendee"],["Banwo Olorunsogo", "sogobanwo@gmail.com", "Attendee"],["Banwo Olorunsogo", "sogobanwo@gmail.com", "Attendee"],["Banwo Olorunsogo", "sogobanwo@gmail.com", "Attendee"],["Banwo Olorunsogo", "sogobanwo@gmail.com", "Attendee"],["Banwo Olorunsogo", "sogobanwo@gmail.com", "Attendee"],["Banwo Olorunsogo", "sogobanwo@gmail.com", "Attendee"],["Banwo Olorunsogo", "sogobanwo@gmail.com", "Attendee"],
  ]

  return (
    <>
      <TextField placeholder="Enter email address" RightAccessory={(props) => <Icon icon="search" containerStyle={styles.iconContainerStyle} color={colors.palette.secondary} />} style={styles.field} inputWrapperStyle={styles.containerStyle} containerStyle={{marginVertical: 10}}/>

      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
              <Row
                data={tableHead}
                widthArr={widthArr}
                style={styles.header}
                textStyle={styles.text}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
                {tableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={widthArr}
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
export default React.memo(ScanSecondTab)

const styles = StyleSheet.create({
  header: { height: 50, backgroundColor: colors.palette.secondary },
  text: {paddingLeft: 10, fontWeight: "500", color: "#fff" },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: "#E7E6E1" },
  container: {
    flex: 1,
    justifyContent: "center",
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
  iconContainerStyle:{
    backgroundColor: colors.palette.primary,
    padding: 4,
    paddingHorizontal: 10,
    marginRight: 3,
    borderRadius: 10
  },
  containerStyle:{
    backgroundColor: colors.palette.neutral100,
  }
})
