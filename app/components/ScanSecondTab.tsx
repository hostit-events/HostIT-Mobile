import * as React from "react"
import {
  ActivityIndicator,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native"
import { observer } from "mobx-react-lite"
import { colors } from "app/theme"
import { TextField } from "./TextField"
import { Icon } from "./Icon"
import { Row, Table } from "react-native-table-component"
import { api, fetchApi } from "app/services/api"
import { ScanModal } from "./ScanModal"
import { TouchableOpacity } from "react-native"
import { BaseModal } from "./BaseModal"
import { Text } from "./Text"
import { Button } from "./Button"

const getUserDetails = async (email: any) => {
  const userDetails = await api.apisauce.get(`api/attendance/${email}`)
  console.log(userDetails.data)
  return userDetails.data
}

const markAttendance = async (email: any) => {
  const response = await api.apisauce.post(`api/attendance`, { email: email })
  console.log(response.data)
  return response.data
}

const getAllAttendees = async () => {
  try {
    const response = await fetchApi.apisauce.get("api/general-registrations/");
    
    if (response.ok && response.data) {
      const tableData = response.data;
      const attendees = tableData.map((obj: { name: any; email: any; role: any }) => [
        obj.name, 
        obj.email, 
        obj.role
      ]);

      return attendees; 
    } else {
      console.error('Error fetching data:', response.problem);
      return []; 
    }
  } catch (error) {
    console.error('Error:', error);
    return []; // Return an empty array in case of an error
  }
}

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
  const [showModal, setShowModal] = React.useState(false)
  const [scanData, setScanData] = React.useState<any>(null)
  const [loading, setLoading] = React.useState<Boolean>(false)
  const [tableHead] = React.useState(["Name", "Email", "Role"])
  const [widthArr] = React.useState([160, 180, 140])
  const [userEmail, setUserEmail] = React.useState("")
  const [tableData, setTableData] = React.useState([])
  const [showCongratulations, setShowCongratulations] = React.useState(false)


  React.useEffect( () => {

   const makeCall = async()=>{
      const data = await getAllAttendees()
      setTableData(data)
    } 
    makeCall()
  }, [])
  
  const handleGetUserDetails = async (email: string) => {
    try {
      setLoading(true)
      console.log(email)
      const eachUserDetail = await getUserDetails(email)
      console.log(eachUserDetail)
      setScanData(eachUserDetail)
      setShowModal(true)
      setLoading(false)
      
    } catch (error) {
      console.error("Failed to parse scanned data:", error)
      setLoading(false)
    }
  }

  const handleMarkAttendance = async (email: any) => {
    try {
      setLoading(true)
      await markAttendance(email)
      setLoading(false)
      setShowModal(false)
      setShowCongratulations(true)
    } catch (error) {
      console.error("Failed to parse scanned data:", error)
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
      <View style={styles.textFieldStyle}>
        <TextField
          placeholder="Enter email address"
          style={styles.field}
          inputWrapperStyle={styles.containerStyle}
          containerStyle={{ marginVertical: 10, width: "100%" }}
          value={userEmail}
          onChangeText={(text)=>handleInputChange(text)}
        />

        <TouchableOpacity onPress={()=>{handleGetUserDetails(userEmail)}}
        >
          <Icon
            icon="search"
            containerStyle={styles.iconContainerStyle}
            color={colors.palette.secondary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View >
            <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}  >
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
      <ScanModal
        showModal={showModal}
        setShowModal={setShowModal}
        scanData={scanData}
        handleMarkAttendance={handleMarkAttendance}
      />
       <BaseModal modalVisible={showCongratulations} modalBody={<View>
       <Text text={`You are number 1 to check in`} size="lg" />
        <Button text="Scan next attendee" onPress={()=>{
          setShowCongratulations(false)
        }}/>
      </View>} />
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
