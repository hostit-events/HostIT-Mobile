import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, StyleSheet, TouchableOpacity } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"
import { screenContentContainer } from "app/styles/mainStyle"
import { CameraView, CameraType, useCameraPermissions } from "expo-camera"
import { useState } from "react"
import { colors } from "app/theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ScanScreenProps extends AppStackScreenProps<"Scan"> {}

export const ScanScreen: FC<ScanScreenProps> = observer(function ScanScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const [facing, setFacing] = useState<CameraType>("back")
  const [permission, requestPermission] = useCameraPermissions()
  const [scanData, setScanData] = useState({})

  if (!permission) {
    // Camera permissions are still loading.
    return <View />
  }

  const handleBarCodeScanned = ({type, data}:any) =>{
    setScanData(data)
    console.log(`type ${type}`)
    console.log(`data ${data}`)
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
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
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
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
  },
  camera: {
    flex: 1,
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
})
