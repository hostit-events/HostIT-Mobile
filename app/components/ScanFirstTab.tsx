import * as React from "react"
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  ToastAndroid,
} from "react-native"
import { observer } from "mobx-react-lite"
import { CameraView, CameraType, useCameraPermissions } from "expo-camera"
import { Text } from "./Text"
import { Icon } from "./Icon"
import { ScanModal } from "./ScanModal"
import { colors } from "app/theme"
import { Button } from "./Button"
import { api } from "app/services/api"
import { useStores } from "app/models"
import { Picker } from "@react-native-picker/picker"

const markAttendance = async (email: string, day: number) => {
  const response = await api.apisauce.post(`api/attendance/verify`, { email: email, day: day })
  return response.data
}

export interface ScanFirstTabProps {
  /**
   * An optional style override useful for padding & margin.
   */

  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
const ScanFirstTab = observer(function ScanFirstTab(props: ScanFirstTabProps) {
  const [showModal, setShowModal] = React.useState(false)
  const [scanData, setScanData] = React.useState<any>(null)
  const [facing, setFacing] = React.useState<CameraType>("back")
  const [loading, setLoading] = React.useState<Boolean>(false)
  const [day, setDay] = React.useState<string>("")

  const { AttendeesStore } = useStores()

  const attendees = AttendeesStore.allAttendees

  // function to handle bar code scanning
  const handleBarCodeScanned = async ({ type, data }: any) => {
    try {
      setLoading(true)
      const parsedData = JSON.parse(data)
      const eachUserDetail = attendees.find((item) => item.email === parsedData.email)
      setScanData(eachUserDetail)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
    setShowModal(true)
   
  }

  // function to show toast
  function showToast(message: string) {
    ToastAndroid.show(message, ToastAndroid.SHORT)
  }


  const handleMarkAttendance = async (email: any, day: number) => {
    try {
      setLoading(true)
      const response = await markAttendance(email, Number(day))
      setLoading(false)
      setShowModal(false)
      showToast(response === null ? "CheckIn Successful" : (response.message === "failed to verify" ? "User Already checked In": response.message))
    } catch (error) {
      setLoading(false)
    }
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"))
  }

  const [permission, requestPermission] = useCameraPermissions()
  if (!permission) {
    // Camera permissions are still loading.
    return <View />
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message} text="We need your permission to show the camera" />
        <Button
          style={styles.btn}
          textStyle={styles.btnText}
          onPress={requestPermission}
          text="Grant permission"
        />
      </View>
    )
  }

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color={colors.palette.secondary} />
      </View>
    )
  }

  return (
    <>
      <View style={styles.ScanContainer}>
        <Picker
          selectedValue={day}
          style={{
            height: 30,
            width: "100%",
            backgroundColor: "#fff",
            borderColor: "#000",
            marginTop: 20,
            borderRadius: 10,
          }}
          onValueChange={(itemValue, itemIndex) => setDay(itemValue)}
        >
          <Picker.Item label="Day 1" value={"0"} />
          <Picker.Item label="Day 2" value={"1"} />
          <Picker.Item label="Day 3" value={"2"} />
        </Picker>
        <CameraView
          style={styles.camera}
          facing={facing}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={handleBarCodeScanned}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text} text="Flip Camera" />
            </TouchableOpacity>
          </View>
        </CameraView>
        <View style={styles.ScanBuuttons}>
          <Icon icon="imageBtn" size={40} />
          <Icon icon="retryBtn" size={40} />
          <Icon icon="flashBtn" size={40} />
        </View>
      </View>
      <ScanModal
      day={day}
        showModal={showModal}
        setShowModal={setShowModal}
        scanData={scanData}
        handleMarkAttendance={handleMarkAttendance}
      />
    </>
  )
})

export default React.memo(ScanFirstTab)

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: 20,
    // justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    color: colors.palette.secondary,
  },
  camera: {
    height: 350,
    width: 350,
    marginVertical: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  btn: {
    alignItems: "center",
    backgroundColor: "#000000",
    borderRadius: 10,
    display: "flex",
    height: 45,
    justifyContent: "center",
    marginTop: 20,
    width: "100%",
  },
  btnText: {
    color: colors.palette.neutral100,
    fontSize: 20,
  },
  modal: {
    color: colors.palette.secondary,
  },
  ScanContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ScanBuuttons: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    color: colors.palette.secondary,
  },
  modalButton: {
    borderRadius: 10,
    color: colors.palette.secondary,
  },
  loaderContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
})
