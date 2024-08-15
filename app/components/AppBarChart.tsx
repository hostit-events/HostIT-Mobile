import * as React from "react"
import { StyleProp, Text, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import {BarChart} from 'react-native-gifted-charts';

export interface AppBarChartProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */

const barData = [
  {
    value: 1000,
    label: 'Awaiting Arrival',
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: {color: 'gray'},
    frontColor: '#11EBF2',
  },
  {value: 400, frontColor: '#ED6665'},
  {value: 100, frontColor: '#23ed56'},
  {
    value: 300,
    label: 'Checkins',
    spacing: 2,
    labelWidth: 30,
    labelTextStyle: {color: 'gray'},
    frontColor: '#11EBF2',
  },
  {value: 200, frontColor: '#ED6665'},
  {value: 100, frontColor: '#23ed56'},
]


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
            backgroundColor: '#11EBF2',
            marginRight: 8,
          }}
        />
        <Text
          style={{
            width: 60,
            height: 16,
            color: 'lightgray',
          }}>
         Partcipants
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            backgroundColor: '#ED6665',
            marginRight: 8,
          }}
        />
        <Text
          style={{
            width: 60,
            height: 16,
            color: 'lightgray',
          }}>
          Sponsors
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            backgroundColor: '#23ed56',
            marginRight: 8,
          }}
        />
        <Text
          style={{
            width: 60,
            height: 16,
            color: 'lightgray',
          }}>
          Speakers
        </Text>
      </View>
    </View>
  </View>
  )
}

export const AppBarChart = observer(function AppBarChart(props: AppBarChartProps) {

  return (
    <View
        style={{
          backgroundColor: '#ffffff',
          paddingBottom: 10,
          borderRadius: 10,
        }}>
        {renderTitle()}
        <BarChart
          data={barData}
          barWidth={40}
          spacing={4}
          xAxisThickness={1}
          yAxisThickness={0}
          yAxisTextStyle={{color: 'gray'}}
          noOfSections={4}
          maxValue={2000}
          rulesType="solid"
        />
      </View>
  )
})



