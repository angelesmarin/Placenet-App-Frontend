<<<<<<< HEAD
import { View, Button, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as DocumentPicker from "expo-document-picker"
import api from '../API/api';
/* 
  'DOCUMENT'PAGE  
*/

const UploadFile = () => {
  const [selectedDocuments, setSelectedDocuments] = useState<DocumentPicker.DocumentPickerAsset[]>([]);

  const pickDocument = async () => {
    try{
      const result = await DocumentPicker.getDocumentAsync({ multiple: true});
      if (!result.canceled) {
        const successResult = result as DocumentPicker.DocumentPickerSuccessResult;

        if (selectedDocuments.length + successResult.assets.length <= 5) {
          console.log('Hello')
          setSelectedDocuments((prevSelectedDocuments) => [
            ...prevSelectedDocuments,
            ...successResult.assets,
          ]);

        } else {
          console.log("Maximim of 5 documents allowed.");
        }
      } else {
        console.log("Document selection cancelled.");
      }
    } catch (error){
      console.log("Error picking documents:", error)
    }
  };




  //POST
  const uploadDocuments = async () => {
=======
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

//doc manage page 
const UploadFile = () => {
  const [projects, setProjects] = useState([]); //get proj from backend
  const [selectedProject, setSelectedProject] = useState(null); // project
  const [selectedDocuments, setSelectedDocuments] = useState<DocumentPicker.DocumentPickerAsset[]>([]);

  // get projects from backend 
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        setProjects(response.data);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch projects.');
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  //doc picker for pdfs
  const pickDocument = async () => {
    if (!selectedProject) {
      Alert.alert('Error', 'Please select a project before uploading documents.');
      return;
    }

    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' }); //only pdfs
      if (!result.canceled) {
        const successResult = result as DocumentPicker.DocumentPickerSuccessResult;

        setSelectedDocuments((prevSelectedDocuments) => [
          ...prevSelectedDocuments,
          ...successResult.assets,
        ]);
      } else {
        console.log('Document selection cancelled.');
      }
    } catch (error) {
      console.log('Error picking documents:', error);
    }
  };

  //upload to backend 
  const uploadDocuments = async () => {
    if (!selectedProject) {
      Alert.alert('Error', 'Please select a project before uploading documents.');
      return;
    }

>>>>>>> ad498fc6717d5068c1cb5ca6a9327a6d9e4d6145
    try {
      for (const document of selectedDocuments) {
        const formData = new FormData();
        formData.append('file', {
          uri: document.uri,
          name: document.name,
          type: document.mimeType,
<<<<<<< HEAD
        });
        const response = await api.post('/documents', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log("Document uploaded:", response.data);
      }
      // Clear selected documents after upload
      setSelectedDocuments([]);
    } catch (error) {
      console.error("Error uploading documents:", error);
    }
  }; 
  
  
  //DELETE 
  const deleteDocument = async (index: number) => {
    const document = selectedDocuments[index];
    try {
      // Assuming the backend needs a document ID or some identifier to delete
      const documentId = document.id;  // Make sure each document has an 'id' assigned when uploaded
      await api.delete(`/documents/${documentId}`);
      console.log("Document deleted:", documentId);

      // Remove the document from the local state
      setSelectedDocuments((prevSelectedDocuments) =>
        prevSelectedDocuments.filter((_, i) => i !== index)
      );
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };























   // Additional code snippet to get the document type 
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

// Remove a document from the array 
const removeDocument = (index: number) => {
  setSelectedDocuments((prevSelectedDocuments) =>
    prevSelectedDocuments.filter((_, i) => i !== index)
  );
};

  return (
    <View style={styles.background}>
      <Text style={styles.file}>Upload File</Text>
      <View style={styles.button}>
        <TouchableOpacity>
          <Button
            title="upload your file"
            color="#1e90ff"
            onPress={pickDocument}
          />
        </TouchableOpacity>
      </View>

      {/* Display selected documents */}
=======
        } as any); // Using "any" for type compatibility
        formData.append('project_id', selectedProject.project_id); // link doc to proj

        const response = await api.post('/documents', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Document uploaded:', response.data);
      }

      // clear selected documents after upload //maybe fix later 
      setSelectedDocuments([]);
      Alert.alert('Success', 'Documents uploaded successfully.');
    } catch (error) {
      console.error('Error uploading documents:', error);
      Alert.alert('Error', 'Failed to upload documents.');
    }
  };

  //delete doc
  const handleDeleteDocument = async (documentId: number) => {
    try {
      await api.delete(`/documents/${documentId}`);
      Alert.alert('Deleted!', 'Document has been removed.');
      //update list 
      setSelectedDocuments((prevSelectedDocuments) =>
        prevSelectedDocuments.filter((document) => document.document_id !== documentId)
      );
    } catch (error) {
      Alert.alert('Error!', 'Failed to delete document.');
      console.error('Error deleting document:', error);
    }
  };

  // Handle selecting a project
  const handleSelectProject = (project) => {
    setSelectedProject(project);
    Alert.alert('Project Selected', `You selected: ${project.name}`);
  };

  return (
    <View style={styles.container}>
      {/* Project Selection */}
      <Text style={styles.title}>Select a Project:</Text>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.project_id.toString()}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.projectItem,
              selectedProject?.project_id === item.project_id && styles.selectedProject,
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
        <Button title="Upload PDF" color="#1e90ff" onPress={pickDocument} />
      </View>

      {/* Display Selected Documents */}
>>>>>>> ad498fc6717d5068c1cb5ca6a9327a6d9e4d6145
      <FlatList
        data={selectedDocuments}
        keyExtractor={(item, index) => item.uri + index}
        renderItem={({ item, index }) => (
          <View style={styles.documentItem}>
            <Text style={styles.fileName}>Name: {item.name}</Text>
<<<<<<< HEAD
            <Text>Type: {getFileType(item.name)}</Text>
            <TouchableOpacity onPress={() => removeDocument(index)}>
=======
            <TouchableOpacity onPress={() => handleDeleteDocument(index)}>
>>>>>>> ad498fc6717d5068c1cb5ca6a9327a6d9e4d6145
              <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
<<<<<<< HEAD
    </View>
  ); 
}


const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: '#e8f4f8',
      alignItems: 'center',
      justifyContent: 'center',
    },
    file: {
      color: "black",
      marginHorizontal: 145,
    },
    button: {
      marginHorizontal: 60,
    },
    documentItem: {
      marginTop: 10,
      padding: 10,
      backgroundColor: '#f9f9f9',
      borderRadius: 5,
      alignItems: 'center',
      width: 300,
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
  });

export default UploadFile;
=======

      {/* Upload Documents Button */}
      {selectedDocuments.length > 0 && (
        <TouchableOpacity style={styles.uploadDocumentsButton} onPress={uploadDocuments}>
          <Text style={styles.uploadDocumentsText}>Upload Documents</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Styles unchanged
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
>>>>>>> ad498fc6717d5068c1cb5ca6a9327a6d9e4d6145
