/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import { ImageBackground, StyleSheet, View, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "app/components"
import { colors } from "app/theme"
import { useStores } from "app/models"

const splashThree = require("../../assets/images/splashThree.png")

export const SignInScreen = observer(function SignInScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")

  // Pull in one of our MST stores
  const {
    AuthenticationStore: { setAuthToken },
  } = useStores()
  // Pull in navigation via hook
  const Login = () => {
    setAuthToken(String(Date.now()))
  }

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll" contentContainerStyle={styles.splashContainer}>
      <ImageBackground source={splashThree} style={styles.background}>
        <View style={styles.signInModal}>
          <View style={styles.header}>
            <Text preset="subheading" text="Sign In" size="xxl" style={styles.text} />
          </View>
          <View style={styles.inputGap}>
            <TextField
            style={styles.textField}
              value={email}
              onChangeText={(value) => setEmail(value)}
              label="Email"
              placeholder="Email"
              inputWrapperStyle={styles.inputWrapper}
            />
          </View>
          <View style={styles.inputGap}>
            <TextField
              style={styles.textField}
              value={password}
              onChangeText={(value) => setPassword(value)}
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect={false}
              secureTextEntry={isAuthPasswordHidden}
              label="Password"
              RightAccessory={PasswordRightAccessory}
              placeholder="Enter password"
              inputWrapperStyle={styles.inputWrapper}
            />
          </View>
        <Button text="Login" style={styles.btn} textStyle={styles.btnText} onPress={Login} />
        </View>
      
      </ImageBackground>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const styles = StyleSheet.create({
  bottomTextContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
    marginVertical: 20,
  },

  btn: {
    alignItems: "center",
    backgroundColor: colors.palette.primary,
    borderRadius: 30,
    borderColor: colors.palette.primary,
    color: colors.palette.secondary,
    width: "100%",
    height: 30,
    display: "flex",
    justifyContent: "center",
    paddingHorizontal: 30,
    fontSize: 18,
    fontWeight: 600
  },

  btnText: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.palette.secondary
  },

  header: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "left",
    marginVertical: 20,
  },

  inputGap: {
    marginBottom: 10,
  },

  loginStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  
  signInText: {
    color: "#667085",
    fontWeight: "400",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  splashContainer: {
    flex: 1,
  },
  signInModal:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width:"80%",
    marginHorizontal: "10%",
    backgroundColor: "#000107CC",
    padding: 12,
    paddingBottom: 40,
    borderRadius: 6
  },
  textField:{
    backgroundColor: "#000107CC",
    borderColor: "#000107CC",
  },
  inputWrapper: {
    backgroundColor: "#000107CC",
    borderWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: colors.palette.neutral100
  },
  text:{
    color: colors.palette.neutral100,
    textAlign: "left",
    fontSize: 40
  }
})
