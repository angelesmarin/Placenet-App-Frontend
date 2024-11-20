import {
  View,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import api from '../API/api';

// Mock project data (replace with API call to fetch real data)
const mockProjects = [
  { id: 1, name: 'Project Alpha' },
  { id: 2, name: 'Project Beta' },
  { id: 3, name: 'Project Gamma' },
];

const UploadFile = () => {
  const [projects, setProjects] = useState(mockProjects); // Replace with API call to fetch projects
  const [selectedProject, setSelectedProject] = useState(null); // Selected project
  const [selectedDocuments, setSelectedDocuments] = useState<DocumentPicker.DocumentPickerAsset[]>([]);

  // Fetch projects from the backend
  useEffect(() => {
    // Uncomment and use when integrating with the backend
    // const fetchProjects = async () => {
    //   try {
    //     const response = await api.get('/projects');
    //     setProjects(response.data);
    //   } catch (error) {
    //     console.error('Error fetching projects:', error);
    //   }
    // };
    // fetchProjects();
  }, []);

  const pickDocument = async () => {
    if (!selectedProject) {
      Alert.alert('Error', 'Please select a project before uploading documents.');
      return;
    }

    try {
      const result = await DocumentPicker.getDocumentAsync({ multiple: true });
      if (!result.canceled) {
        const successResult = result as DocumentPicker.DocumentPickerSuccessResult;

        if (selectedDocuments.length + successResult.assets.length <= 5) {
          setSelectedDocuments((prevSelectedDocuments) => [
            ...prevSelectedDocuments,
            ...successResult.assets,
          ]);
        } else {
          Alert.alert('Error', 'Maximum of 5 documents allowed.');
        }
      } else {
        console.log('Document selection cancelled.');
      }
    } catch (error) {
      console.log('Error picking documents:', error);
    }
  };

  const uploadDocuments = async () => {
    if (!selectedProject) {
      Alert.alert('Error', 'Please select a project before uploading documents.');
      return;
    }

    try {
      for (const document of selectedDocuments) {
        const formData = new FormData();
        formData.append('file', {
          uri: document.uri,
          name: document.name,
          type: document.mimeType,
        });
        formData.append('project_id', selectedProject.id); // Link document to project
        const response = await api.post('/documents', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log('Document uploaded:', response.data);
      }

      // Clear selected documents after upload
      setSelectedDocuments([]);
      Alert.alert('Success', 'Documents uploaded successfully.');
    } catch (error) {
      console.error('Error uploading documents:', error);
      Alert.alert('Error', 'Failed to upload documents.');
    }
  };

  const handleSelectProject = (project) => {
    setSelectedProject(project);
  };

  const getFileType = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'PDF';
      case 'doc':
      case 'docx':
        return 'Word';
      case 'xls':
      case 'xlsx':
        return 'Excel';
      default:
        return 'Unknown';
    }
  };

  const removeDocument = (index: number) => {
    setSelectedDocuments((prevSelectedDocuments) =>
      prevSelectedDocuments.filter((_, i) => i !== index)
    );
  };

  return (
    <View style={styles.container}>
      {/* Project Selection */}
      <Text style={styles.title}>Select a Project:</Text>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.projectItem,
              selectedProject?.id === item.id && styles.selectedProject,
            ]}
            onPress={() => handleSelectProject(item)}
          >
            <Text style={styles.projectText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Display Selected Project */}
      {selectedProject && (
        <Text style={styles.selectedProjectText}>
          Selected Project: {selectedProject.name}
        </Text>
      )}

      {/* Upload Button */}
      <View style={styles.uploadButton}>
        <Button title="Upload File" color="#1e90ff" onPress={pickDocument} />
      </View>

      {/* Display Selected Documents */}
      <FlatList
        data={selectedDocuments}
        keyExtractor={(item, index) => item.uri + index}
        renderItem={({ item, index }) => (
          <View style={styles.documentItem}>
            <Text style={styles.fileName}>Name: {item.name}</Text>
            <Text>Type: {getFileType(item.name)}</Text>
            <TouchableOpacity onPress={() => removeDocument(index)}>
              <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Upload Documents Button */}
      {selectedDocuments.length > 0 && (
        <TouchableOpacity style={styles.uploadDocumentsButton} onPress={uploadDocuments}>
          <Text style={styles.uploadDocumentsText}>Upload Documents</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f4f8',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  projectItem: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  selectedProject: {
    backgroundColor: '#4CAF50',
  },
  projectText: {
    fontSize: 16,
    color: '#333',
  },
  selectedProjectText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  uploadButton: {
    marginVertical: 20,
  },
  documentItem: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginBottom: 10,
  },
  fileName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    color: 'red',
    marginTop: 5,
    fontWeight: 'bold',
  },
  uploadDocumentsButton: {
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  uploadDocumentsText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default UploadFile;
