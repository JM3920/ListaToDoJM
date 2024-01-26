import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Modal } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Task from "./Task";
import EditModal from "./EditModal";

//import appFirebase from "../database/firebase";

import { getFirestore, addDoc, collection} from "firebase/firestore";

//const db = getFirestore(appFirebase);  

export default function Tareas (props) {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editTaskIndex, setEditTaskIndex] = useState(null);  
  
  
  const addTask = async() => {
    if (task.trim() !== "") {
      setTasks([...tasks, task]);
      setTask("");
     
      //const db = getFirestore(appFirebase);   
    try {
      await addDoc(collection(db, 'tareas'),{
         ...state
     })
     Alert.alert('Alerta','Registro exitoso!');
     //props.navigation.navigate('UsersList');
 }
 catch{
     console.error(error);
 }

  }};

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const editTask = (index, newText) => {
    const newTasks = [...tasks];
    newTasks[index] = newText;
    setTasks(newTasks);
    setEditModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Lista de Tareas</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Agregar tarea..."
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <FontAwesome5
          name="plus"
          size={24}
          color="green"
          onPress={addTask}
        />
      </View>

      <ScrollView style={styles.tasks}>
        {tasks.map((text, index) => (
          <Task
            key={index}
            text={text}
            onDelete={() => deleteTask(index)}
            onEdit={() => {
              setEditModalVisible(true);
              setEditTaskIndex(index);
            }}
          />
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
      >
        <EditModal
          text={tasks[editTaskIndex]}
          onSave={(newText) => editTask(editTaskIndex, newText)}
          onClose={() => setEditModalVisible(false)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "black",
  },
  headerText: {
    fontSize: 36,
    fontWeight: "bold",
    color:"white",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  tasks: {
    marginTop: 30,
  },
});

//export default App;
