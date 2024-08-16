import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, StyleSheet, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { AppCarousel, AppHeader, Screen, Text } from "app/components"
import { screenContentContainer } from "app/styles/mainStyle"
import { Row, Table } from "react-native-table-component"
import { useStores } from "app/models"
import { colors, spacing } from "app/theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface AttendanceScreenProps extends AppStackScreenProps<"Attendance"> {}

export const AttendanceScreen: FC<AttendanceScreenProps> = observer(function AttendanceScreen() {

  // Pull in one of our MST stores
  const { AttendeesStore } = useStores()

  const tableData = AttendeesStore.allAttendees

  const getAllAttendees = () => {
    try {
        const attendees = tableData.map((obj: { name: any; email: any; role: any }) => [
          obj.name, 
          obj.email, 
          obj.role
        ]);
  
        return attendees; 
    } catch (error) {
      console.error('Error:', error);
      return []; // Return an empty array in case of an error
    }
  }

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll" contentContainerStyle={screenContentContainer}>
      <AppHeader pageTitle={false} />
      <AppCarousel />
      <View style={styles.container}>
      <Text text="Attendance" size="lg" weight="semiBold" />
        {/* <ScrollView horizontal={true}>
          <View >
            <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}  >
              <Row
                data={["Name", "Email", "Role"]}
                widthArr={[160, 180, 140]}
                style={styles.header}
                textStyle={styles.text}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
                {getAllAttendees().map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={[160, 180, 140]}
                    style={[styles.row, index % 2 && { backgroundColor: "#F7F6E7" }]}
                    textStyle={styles.rowText}
                  />
                ))}
              </Table>
            </ScrollView>
          </View>
        </ScrollView> */}
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}


const styles = StyleSheet.create({
  header: { height: 50, backgroundColor: colors.palette.secondary },
  text: { paddingLeft: 10, fontWeight: "500", color: "#fff" },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: "#E7E6E1" },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: spacing.md
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
    zIndex: 10
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
  textFieldStyle:{
    display: "flex",
    alignItems: "center",
    flexDirection: "row"
  },
  scrollStyle:{
    height: 450
  }
})