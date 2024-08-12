import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, StyleSheet, TouchableOpacity } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { AppCarousel, AppHeader, BaseModal, Button, Icon, Screen, Text } from "app/components"
import { screenContentContainer } from "app/styles/mainStyle"
import { CameraView, CameraType, useCameraPermissions } from "expo-camera"
import { useState } from "react"
import { colors } from "app/theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ScanScreenProps extends AppStackScreenProps<"Scan"> {}
interface ScanData {
  address: string
  email: string
}

export const ScanScreen: FC<ScanScreenProps> = observer(function ScanScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const [showModal, setShowModal] = useState(false)
  const [scanData, setScanData] = useState<ScanData | null>(null)

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const [facing, setFacing] = useState<CameraType>("back")
  const [permission, requestPermission] = useCameraPermissions()
  if (!permission) {
    // Camera permissions are still loading.
    return <View />
  }

  const handleBarCodeScanned = ({ type, data }: any) => {
    try {
      const parsedData = JSON.parse(data)
      setScanData(parsedData)
    } catch (error) {
      console.error("Failed to parse scanned data:", error)
    }
    setShowModal(true)
    console.log(`type ${type}`)
    console.log(`data ${data}`)
  }

  const handleMarkAttendance = () => {
    setScanData(null)
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

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"))
  }

  return (
    <Screen style={$root} preset="scroll" contentContainerStyle={screenContentContainer}>
      <AppHeader pageTitle={false} />
      <AppCarousel />
      <View style={styles.ScanContainer}>
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
          <Icon icon="imageBtn" />
          <Icon icon="retryBtn" />
          <Icon icon="flashBtn" />
        </View>
      </View>
      <BaseModal
        modalVisible={showModal}
        showCloseIcon={true}
        setModalVisible={() => setShowModal(false)}
        modalBody={
          <>
            <Text text={`Email: ${scanData?.email ?? "No email found"}`} style={styles.modalText} />
            <Text
              text={`Address: ${scanData?.address ?? "No address found"}`}
              style={styles.modalText}
            />
            {scanData?.email && scanData.address && (
              <Button
                text="Mark Attendance"
                style={styles.modalButton}
                textStyle={styles.modalText}
                onPress={handleMarkAttendance}
              />
            )}
          </>
        }
      />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    color: colors.palette.secondary,
  },
  camera: {
    flex: 1,
    height: 350,
    width: 350,
    marginVertical: 100,
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
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ScanBuuttons:{
    display: "flex",
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  modalText: {
    color: colors.palette.secondary,
  },
  modalButton: {
    borderRadius: 10,
    color: colors.palette.secondary,
  },
})
