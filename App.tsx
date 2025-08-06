import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import analytics from '@segment/analytics-react-native';
import CleverTapIntegration from '@segment/analytics-react-native-clevertap';

const segmentWriteKey = 'c7AqxO6SB7MPH6q5u6VAeuiNCsTRUiD8';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [name, setName] = useState('');
  const [identity, setIdentity] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const initializeSegment = async () => {
      try {
        await analytics.setup(segmentWriteKey, {
          trackAppLifecycleEvents: true,
          recordScreenViews: true,
          android: { collectDeviceId: true },
          ios: { trackAdvertising: true },
        });

        // Register CleverTap integration
        (analytics as any).use(CleverTapIntegration);

        console.log('Segment + CleverTap initialized successfully');
      } catch (error) {
        console.error('Error initializing Segment:', error);
      }
    };

    initializeSegment();
  }, []);

  const handleIdentify = () => {
    if (!identity) {
      Alert.alert('Error', 'Identity is required!');
      return;
    }
    analytics.identify(identity, { name, email, phone });
    console.log(`Identify called for ${identity}`, { name, email, phone });
    Alert.alert('Success', 'User Identified!');
  };

  const handleTrackEvent = () => {
    analytics.track('Segment Product Viewed');
    console.log('Event: Segment Product Viewed');
    Alert.alert('Event', 'Segment Product Viewed event tracked');
  };

  const handleTrackEventWithProps = () => {
    analytics.track('Segment Product Purchased', {
      productName: 'T-Shirt',
      price: 499,
      currency: 'INR',
    });
    console.log('Event: Product Purchased with properties');
    Alert.alert('Event', 'Purchase event tracked with properties');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text style={styles.heading}>Segment + CleverTap Integration</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Identity (Required)"
        value={identity}
        onChangeText={setIdentity}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity style={styles.button} onPress={handleIdentify}>
        <Text style={styles.buttonText}>IDENTIFY USER</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleTrackEvent}>
        <Text style={styles.buttonText}>TRACK EVENT</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleTrackEventWithProps}>
        <Text style={styles.buttonText}>TRACK EVENT WITH PROPERTIES</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginVertical: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;