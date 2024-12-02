import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, FlatList, Text, TouchableOpacity } from 'react-native';
import api from '../API/api';
<<<<<<< HEAD
import AsyncStorage from '@react-native-async-storage/async-storage';
=======
>>>>>>> ad498fc6717d5068c1cb5ca6a9327a6d9e4d6145

interface Property {
  property_id: number;
  name: string;
}

const PropertyManagement: React.FC = () => {
<<<<<<< HEAD
    const [street, setStreet] = useState<string>(''); 
    const [city, setCity] = useState<string>(''); 
    const [state, setState] = useState<string>(''); 
    const [zip, setZip] = useState<string>(''); 
    const [properties, setProperties] = useState<Property[]>([]); 
    const [editingIndex, setEditingIndex] = useState<number | null>(null); 

    
    const fetchProperties = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId'); //userId from asyncstorage
        if (userId) {
          const response = await api.get(`/properties?user_id=${userId}`);
          setProperties(response.data);
        }
      } catch (error) {
        Alert.alert('Error!', 'Failed to fetch properties.');
        console.error('Error fetching properties:', error);
      }
    };

    // get
    useEffect(() => {
        fetchProperties();
    }, []);

    //add new
    const handleAddProperty = async () => {
        if (street.trim() && city.trim() && state.trim() && zip.trim()) {
            const userId = await AsyncStorage.getItem('userId');
            const fullAddress = `${street}, ${city}, ${state} ${zip}`;

            if (editingIndex !== null) {
                //edit in backedn
                await updateProperty(editingIndex, fullAddress);
            } else {
                //add new
                try {
                    const response = await api.post('/properties', {
                        user_id: userId,
                        name: fullAddress,
                    });
                    setProperties([...properties, response.data]); //add to list
                    Alert.alert('Successful!', 'Property has been added!');
                } catch (error) {
                    Alert.alert('Error!', 'Failed to add property.');
                    console.error('Error adding property:', error);
                }
            }

            //clear fields
            setStreet('');
            setCity('');
            setState('');
            setZip('');
            setEditingIndex(null); //clear editing
        } else {
            Alert.alert('Error!', 'All address fields must be filled out!');
        }
    };

    //update
    const updateProperty = async (propertyId: number, newAddress: string) => {
        try {
            await api.put(`/properties/${propertyId}`, { name: newAddress });
            Alert.alert('Successful!', 'Property has been updated!');
            fetchProperties(); //refresh list for updated property
        } catch (error) {
            Alert.alert('Error!', 'Failed to update property.');
            console.error('Error updating property:', error);
        }
    };

    //edit
    const handleEditProperty = (property: Property) => {
        const [street, city, state, zip] = property.name.split(', ');
        setStreet(street);
        setCity(city);
        setState(state);
        setZip(zip);
        setEditingIndex(property.property_id); //track
    };

    //delete
    const handleDeleteProperty = async (propertyId: number) => {
        try {
            await api.delete(`/properties/${propertyId}`); //send request to backend 
            Alert.alert('Deleted!', 'Property has been removed.');
            fetchProperties(); //refresh list 
        } catch (error) {
            Alert.alert('Error!', 'Failed to delete property.');
            console.error('Error deleting property:', error);
        }
    };

    return (
        <View style={styles.container}>
            {/* Input fields for adding/editing properties */}
            <Text style={styles.label}>Street:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Street"
                value={street}
                onChangeText={setStreet}
            />
            <Text style={styles.label}>City:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter City"
                value={city}
                onChangeText={setCity}
            />
            <Text style={styles.label}>State:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter State"
                value={state}
                onChangeText={setState}
            />
            <Text style={styles.label}>Zip Code:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Zip Code"
                value={zip}
                onChangeText={setZip}
                keyboardType="numeric"
            />

            <Button
                title={editingIndex !== null ? "Update Property" : "Add Property"}
                onPress={handleAddProperty}
            />

            {/* Display the list of properties */}
            {properties.length > 0 && (
                <View style={styles.listContainer}>
                    <Text style={styles.listTitle}>Properties Added:</Text>
                    <FlatList
                        data={properties}
                        keyExtractor={(item) => item.property_id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.propertyItemContainer}>
                                <Text style={styles.propertyItem}>{item.name}</Text>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity 
                                        onPress={() => handleEditProperty(item)} 
                                        style={styles.editButton}
                                    >
                                        <Text style={styles.buttonText}>Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={() => handleDeleteProperty(item.property_id)} 
                                        style={styles.deleteButton}
                                    >
                                        <Text style={styles.buttonText}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8f4f8',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    label: {
        alignSelf: 'flex-start',
        fontSize: 16,
        marginBottom: 4,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    listContainer: {
        marginTop: 20,
        width: '100%',
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    propertyItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingVertical: 10,
    },
    propertyItem: {
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    editButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: '#f44336',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
=======
  const [street, setStreet] = useState<string>(''); 
  const [city, setCity] = useState<string>(''); 
  const [state, setState] = useState<string>(''); 
  const [zip, setZip] = useState<string>(''); 
  const [properties, setProperties] = useState<Property[]>([]); 
  const [editingIndex, setEditingIndex] = useState<number | null>(null); 

  //all props
  const fetchProperties = async () => {
    try {
      const response = await api.get('/properties');
      setProperties(response.data);
    } catch (error) {
      Alert.alert('Error!', 'Failed to fetch properties.');
      console.error('Error fetching properties:', error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  //add/edit
  const handleAddProperty = async () => {
    if (street.trim() && city.trim() && state.trim() && zip.trim()) {
      const fullAddress = `${street}, ${city}, ${state}, ${zip}`;

      if (editingIndex !== null) {
        //update
        await updateProperty(editingIndex, fullAddress);
      } else {
        // add new
        try {
          const response = await api.post('/properties', {
            name: fullAddress,
          });
          setProperties([...properties, response.data]); //add to list 
          Alert.alert('Successful!', 'Property has been added!');
        } catch (error) {
          Alert.alert('Error!', 'Failed to add property.');
          console.error('Error adding property:', error);
        }
      }

      //clear after submitting 
      setStreet('');
      setCity('');
      setState('');
      setZip('');
      setEditingIndex(null); //reset state 
    } else {
      Alert.alert('Error!', 'All address fields must be filled out!');
    }
  };

  //update
  const updateProperty = async (propertyId: number, newAddress: string) => {
    try {
      await api.put(`/properties/${propertyId}`, { name: newAddress });
      Alert.alert('Successful!', 'Property has been updated!');
      fetchProperties(); //refresh list after update 
    } catch (error) {
      Alert.alert('Error!', 'Failed to update property.');
      console.error('Error updating property:', error);
    }
  };

  //edit proj
  const handleEditProperty = (property: Property) => {
    const [street, city, state, zip] = property.name.split(', ');
    setStreet(street);
    setCity(city);
    setState(state);
    setZip(zip);
    setEditingIndex(property.property_id); //track proj being edit 
  };

  //delete 
  const handleDeleteProperty = async (propertyId: number) => {
    try {
      await api.delete(`/properties/${propertyId}`);
      Alert.alert('Deleted!', 'Property has been removed.');
      fetchProperties(); //refresh list 
    } catch (error) {
      Alert.alert('Error!', 'Failed to delete property.');
      console.error('Error deleting property:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Input fields for adding/editing properties */}
      <Text style={styles.label}>Street:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Street"
        value={street}
        onChangeText={setStreet}
      />
      <Text style={styles.label}>City:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter City"
        value={city}
        onChangeText={setCity}
      />
      <Text style={styles.label}>State:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter State"
        value={state}
        onChangeText={setState}
      />
      <Text style={styles.label}>Zip Code:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Zip Code"
        value={zip}
        onChangeText={setZip}
        keyboardType="numeric"
      />

      <Button
        title={editingIndex !== null ? "Update Property" : "Add Property"}
        onPress={handleAddProperty}
      />

      {/* Display the list of properties */}
      {properties.length > 0 && (
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Properties Added:</Text>
          <FlatList
            data={properties}
            keyExtractor={(item) => item.property_id.toString()}
            renderItem={({ item }) => (
              <View style={styles.propertyItemContainer}>
                <Text style={styles.propertyItem}>{item.name}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity 
                    onPress={() => handleEditProperty(item)} 
                    style={styles.editButton}
                  >
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => handleDeleteProperty(item.property_id)} 
                    style={styles.deleteButton}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};









//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  listContainer: {
    marginTop: 20,
    width: '100%',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  propertyItemContainer: {
    alignItems: 'flex-start',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginBottom: 10,
  },
  propertyItem: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
>>>>>>> ad498fc6717d5068c1cb5ca6a9327a6d9e4d6145
});

export default PropertyManagement;
