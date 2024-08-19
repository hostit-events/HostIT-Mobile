import * as React from "react"
import { StyleProp, Text, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import {BarChart} from 'react-native-gifted-charts';
import { useStores } from "app/models";

export interface AppBarChartProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */




const renderTitle = () => {
  return(
    <View style={{marginVertical: 10}}>
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 24,
        backgroundColor: '#ffffff',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            backgroundColor: '#6ce5e8',
            marginRight: 8,
          }}
        />
        <Text
          style={{
            width: 60,
            height: 16,
            color: 'lightgray',
          }}>
         Expected 
        </Text>
      </View>
    
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            backgroundColor: '#41b8d5',
            marginRight: 8,
          }}
        />
        <Text
          style={{
            width: 60,
            height: 16,
            color: 'lightgray',
          }}>
          Check Ins
        </Text>
      </View>
    </View>
  </View>
  )
}

export const AppBarChart = observer(function AppBarChart(props: AppBarChartProps) {
  const { AttendeesStore} = useStores()

  const totalAttendees = AttendeesStore.totalAttendees
  const checkIns = AttendeesStore.totalFilteredData
  const barData = [
    {
      value: totalAttendees,
      label: 'Day 1',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#6ce5e8',
    },
    {value: checkIns, frontColor: '#41b8d5'},
    {
      value: totalAttendees,
      label: 'Day 2',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#6ce5e8',
    },
    {value: 0, frontColor: '#41b8d5'},
    {
      value: totalAttendees,
      label: 'Day 3',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#6ce5e8',
    },
    {value: 0, frontColor: '#41b8d5'},
  ]
  return (
    <View
        style={{
          backgroundColor: '#ffffff',
          paddingBottom: 10,
          borderRadius: 10,
          width: "100%"
        }}>
        {renderTitle()}
        <BarChart
          data={barData}
          barWidth={40}
          spacing={3}
          xAxisThickness={1}
          yAxisThickness={0}
          yAxisTextStyle={{color: 'gray'}}
          noOfSections={4}
          maxValue={1500}
          rulesType="solid"
        />
      </View>
  )
})



