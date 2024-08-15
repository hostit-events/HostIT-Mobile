import * as React from "react"
import { Modal, StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { AttendanceModal } from "./AttendanceModal"
import { NotAttendanceModal } from "./NotAttendanceModal"
import { colors } from "app/theme"

export interface ScanModalProps {
  /**
   * An optional style override useful for padding & margin.
   */
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  style?: StyleProp<ViewStyle>
  scanData: any
  handleMarkAttendance: any
}

/**
 * Describe your component here
 */
export const ScanModal = observer(function ScanModal(props: ScanModalProps) {
  const { showModal, setShowModal, scanData, handleMarkAttendance } = props

  return (
    <Modal
      visible={showModal}
      onRequestClose={() => {
        setShowModal(false)
      }}
      animationType="slide"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {scanData?.email ? <AttendanceModal userDetails={scanData} handleMarkAttendance={handleMarkAttendance}/> : <NotAttendanceModal />}
        </View>
      </View>
    </Modal>
  )
})

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: colors.palette.neutral100,
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
})
