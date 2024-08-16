import * as React from "react"
import { Pressable, StyleSheet, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing } from "app/theme"
import { Text } from "app/components/Text"
import { Icon } from "app/components/Icon"

export interface AppHeaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  pageTitle: boolean
}

/**
 * Describe your component here
 */

const onNamePress =()=>{
  console.log("go to profile")
}

const onNotificationPress = () =>{
  console.log("show notification")
}

export const AppHeader = observer(function AppHeader(props: AppHeaderProps) {
  const { pageTitle } = props
  const $styles = [$container]

  return (
    <View style={$styles}>
      <View style={styles.containerStyle}>
        <Pressable onPress={() => onNamePress()}>
          <View style={styles.TextArea}>
           <Icon icon={"userProfile"} size={30} />
            {pageTitle && <Text text="Hello Admin," weight="bold" size="xl" />}
          </View>
        </Pressable>
        <View style={styles.TextArea}>
            <View style={styles.iconContainer}>
              <Icon icon={"notification"} onPress={() => onNotificationPress()} />
            </View>
        </View>
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const styles = StyleSheet.create({
  TextArea: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    flexShrink: 1,
    gap: 2,
  },
  containerStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    paddingBottom: 3,
    marginHorizontal: spacing.md,
  },
  iconContainer: {
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 40,
    display: "flex",
    height: 40,
    justifyContent: "center",
    padding: 8,
    shadowColor: "#000000",
    shadowOffset: { width: -8, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: 40,
  },
})
