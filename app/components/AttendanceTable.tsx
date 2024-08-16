import React, { useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { observer } from 'mobx-react-lite';
import { colors } from 'app/theme';


export interface AttendanceTableProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const AttendanceTable = observer(function AttendanceTable(props: AttendanceTableProps) {
  const [tableHead] = useState(['Ticket', 'Expected', 'Checkins', 'Pending']);
  const [tableTitle] = useState(['Participants', 'Sponsors', 'Speakers']);
  const [tableData] = useState([
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-'],
  ]);


  return (
    <View style={styles.container}>
      <Table borderStyle={{borderWidth: 0}}>
        <Row data={tableHead} flexArr={[ 1, 1, 1]} style={styles.head} textStyle={styles.headText}/>
        <TableWrapper style={styles.wrapper}>
          <Col data={tableTitle} style={styles.title} heightArr={[28, 28]} textStyle={styles.text}/>
          <Rows data={tableData} flexArr={[ 1, 1, 1]} style={styles.row} textStyle={styles.text}/>
        </TableWrapper>
      </Table>
    </View>
  )
})

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: colors.palette.secondary },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: { height: 28 },
  text: { textAlign: 'center', fontWeight: 600 , color: "#708090"},
  headText: {color: "#fff", textAlign: 'center', fontWeight: 700 }
});

