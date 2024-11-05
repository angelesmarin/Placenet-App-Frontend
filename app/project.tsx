import { View, TextInput, Button, StyleSheet, Alert, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import api from '../API/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Project {
  project_id: number;
  name: string;
  description: string;
  date: string;
}

const ProjectManagement: React.FC = () => {
  const [projectName, setProjectName] = useState<string>('');
  const [projectDescription, setProjectDescription] = useState<string>('');
  const [projectDate, setProjectDate] = useState<string>('');
  const [projects, setProjects] = useState<Project[]>([]); // To store added projects
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null); // Track index of the project being edited


  const fetchProjects = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        const response = await api.get(`/projects?user_id=${userId}`)
        setProjects(response.data)
      }
    }catch (error) {
      Alert.alert('Error!', 'Failed to fetch projects.');
      console.error('Error fetching projects:', error);
    }
  };

  // get
  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddProject = async () => {
    if (projectName.trim() && projectDescription.trim() && projectDate.trim()) {
      const userId = await AsyncStorage.getItem('userId');

      if (editIndex !== null) {
        console.log(editIndex)
        await updateProject(editIndex, projectName, projectDescription, projectDate);
      } else {
        try {
          const response = await api.post(`/projects`, {
            property_id: 1,
            user_id: userId,
            name: projectName,
            description: projectDescription,
            start_date: projectDate,
          });
          setProjects([...projects, response.data]);
          Alert.alert('Successful!', 'Project has been added!');
        } catch (error) {
          Alert.alert('Error!', 'Failed to add project.');
          console.error('Error adding project:', error);
        }
      }
      
      // Clear form
      setProjectName('');
      setProjectDescription('');
      setProjectDate('');
      setEditIndex(null);
    } else {
      Alert.alert('Error!', 'All fields must be filled out!');
    }
  };

  const updateProject = async(projectId: number, name: string, description: string, date: string) => {
    try{
      console.log(date)
      await api.put(`/projects/${projectId}`, {name: name, description: description, start_date: date});
      Alert.alert('Successful!', 'Project has been updated!');
      fetchProjects();
    } catch (error) {
      Alert.alert('Error!', 'Failed to update project.');
      console.error('Error updating project:', error);
      console.log(projectId)
    }
  }


  const handleEditProject = (project: Project) => {
    setProjectName(project.name);
    setProjectDescription(project.description);
    setProjectDate(project.date);
    setIsEditing(true);
    setEditIndex(project.project_id);
  };

  const handleDeleteProject = async (projectId: number) => {
    try{
      await api.delete(`/projects/${projectId}`);
      Alert.alert('Deleted!', 'Project has been removed.');
      fetchProjects();
    } catch (error) {
      Alert.alert('Error!', 'Failed to delete project.');
      console.error('Error deleting project:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Project Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter project name"
        value={projectName}
        onChangeText={setProjectName}
      />
      <Text>Project Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter project description"
        value={projectDescription}
        onChangeText={setProjectDescription}
      />
      <Text>Project Date:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter project date"
        value={projectDate}
        onChangeText={setProjectDate}
      />
      <Button
        title={editIndex !== null ? "Update Project" : "Add Project"}
        onPress={handleAddProject}
        color="#1e90ff"
      />

      {/* Displaying the list of added projects */}
      {projects.length > 0 && (
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Projects Added:</Text>
          <FlatList
            data={projects}
            keyExtractor={(item) => item.project_id.toString()}
            renderItem={({ item }) => (
              <View style={styles.projectItem}>
                <Text style={styles.projectText}>Name: {item.name}</Text>
                <Text style={styles.projectText}>Description: {item.description}</Text>
                <Text style={styles.projectText}>Date: {item.date}</Text>
                <View style={styles.buttonRow}>
                  <TouchableOpacity onPress={() => handleEditProject(item)} style={styles.editButton}>
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteProject(item.project_id)} style={styles.deleteButton}>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
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
  projectItem: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  projectText: {
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
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
});

export default ProjectManagement;

