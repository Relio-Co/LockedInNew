// ReportScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import darkTheme from '../themes/DarkTheme';

export default function ReportScreen({ route, navigation }) {
  const { data } = route.params;
  const [reportText, setReportText] = useState('');

  const submitReport = () => {
    console.log(`Report submitted: ${reportText}`);
    console.log(`Reported data: ${JSON.stringify(data)}`);
    // Submit the report to your backend here
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe the issue..."
        placeholderTextColor={darkTheme.placeholderColor}
        value={reportText}
        onChangeText={setReportText}
      />
      <Button title="Submit Report" onPress={submitReport} color={darkTheme.accentColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.backgroundColor,
    padding: 16,
    paddingTop: 50,
  },
  title: {
    color: darkTheme.textColor,
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    backgroundColor: darkTheme.cardColor,
    color: darkTheme.textColor,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
});
