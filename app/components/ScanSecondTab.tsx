import * as React from "react"
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  ToastAndroid,
  View,
  ViewStyle,
} from "react-native"
import { observer } from "mobx-react-lite"
import { colors } from "app/theme"
import { TextField } from "./TextField"
import { Icon } from "./Icon"
import { api } from "app/services/api"
import { ScanModal } from "./ScanModal"
import { TouchableOpacity } from "react-native"

import { useStores } from "app/models"
import { Picker } from "@react-native-picker/picker"

const markAttendance = async (email: string, day: number) => {
  const response = await api.apisauce.post(`api/attendance/verify`, { email: email, day: day })
  return response.data
}

export interface ScanSecondTabProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

const ScanSecondTab = observer(function ScanSecondTab(props: ScanSecondTabProps) {
  const [showModal, setShowModal] = React.useState(false)
  const [scanData, setScanData] = React.useState<any>(null)
  const [loading, setLoading] = React.useState<Boolean>(false)
  const [userEmail, setUserEmail] = React.useState("")
  const [day, setDay] = React.useState<string>("")

  const { AttendeesStore } = useStores()

  const attendees = AttendeesStore.allAttendees

  const handleGetUserDetails = async (email: string) => {
    try {
      setLoading(true)
      const eachUserDetail = attendees.find(
        (item) =>
          item.name.toLowerCase().includes(email.trim().toLowerCase()) ||
          item.email.toLowerCase().includes(email.trim().toLowerCase())||
          item.phone.toLowerCase().includes(email.trim().toLowerCase()),
      )
      setScanData(eachUserDetail)
      setShowModal(true)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  function showToast(message: string) {
    ToastAndroid.show(message, ToastAndroid.SHORT)
  }

  const handleMarkAttendance = async (email: any, day: number) => {
    try {
      setLoading(true)
      const response = await markAttendance(email, Number(day))
      setLoading(false)
      setShowModal(false)
      showToast(
        response === null
          ? "CheckIn Successful"
          : response.message === "failed to verify"
          ? "User Already checked In"
          : response.message,
      )
    } catch (error) {
      setLoading(false)
    }
  }

  const handleInputChange = (newText: any) => {
    setUserEmail(newText)
  }

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.palette.secondary} />
      </View>
    )
  }

  return (
    <>
      <Picker
        selectedValue={day}
        style={{
          height: 30,
          width: "100%",
          backgroundColor: "#fff",
          borderColor: "#000",
          marginTop: 10,
          borderRadius: 10,
        }}
        onValueChange={(itemValue, itemIndex) => setDay(itemValue)}
      >
        <Picker.Item label="Day 1" value={"0"} />
        <Picker.Item label="Day 2" value={"1"} />
        <Picker.Item label="Day 3" value={"2"} />
      </Picker>
      <View style={styles.textFieldStyle}>
        <TextField
          placeholder="Enter email address"
          style={styles.field}
          inputWrapperStyle={styles.containerStyle}
          containerStyle={{ marginVertical: 10, width: "100%" }}
          value={userEmail}
          onChangeText={(text) => handleInputChange(text)}
        />
        <TouchableOpacity
          onPress={() => {
            handleGetUserDetails(userEmail)
          }}
        >
          <Icon
            icon="search"
            containerStyle={styles.iconContainerStyle}
            color={colors.palette.secondary}
          />
        </TouchableOpacity>
      </View>

      <ScanModal
        showModal={showModal}
        setShowModal={setShowModal}
        scanData={scanData}
        handleMarkAttendance={handleMarkAttendance}
        day={day}
      />
    </>
  )
})
export default React.memo(ScanSecondTab)

const styles = StyleSheet.create({
  header: { height: 50, backgroundColor: colors.palette.secondary },
  text: { paddingLeft: 10, fontWeight: "500", color: "#fff" },
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
})
