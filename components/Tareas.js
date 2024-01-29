import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Modal,Alert } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { getFirestore, addDoc, collection, updateDoc, doc, deleteDoc,Timestamp } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';



import Task from "./Task";
import EditModal from "./EditModal";

import appFirebase from "../database/firebase";


const db = getFirestore(appFirebase);  

export default function Tareas (props) {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editTaskIndex, setEditTaskIndex] = useState(null);  
  
  const addTask = async() => {
    if (task.trim() !== "") {
      const tareaId = uuidv4(); 
      setTasks([...tasks, task]);
      setTask("");
      try {
        await addDoc(collection(db, 'tareas'),{tareaId, task}); // Guarda la nueva tarea en la base de datos
        Alert.alert('Alerta', 'Tarea agregada exitosamente!');
      } catch (error) {
        console.error(error);
      }
    }
  };
  

  const deleteTask = async (index, tareaId) => { 
    try {
      const newTasks = tasks.filter((_, i) => i !== index);
      setTasks(newTasks);
      
      await deleteDoc(doc(db, "tareas", tareaId));
      Alert.alert('Alerta', 'Tarea eliminada exitosamente!');
    } catch (error) {
      console.error(error);
    }
  };
  
  

  const editTask = async (index, newText, tareaId) => {
    const newTasks = [...tasks];
    newTasks[index] = newText;
    setTasks(newTasks);
    setEditModalVisible(false);

      try {
        await updateDoc(doc(db, 'tareas',tareaId), {task:newText}); // Guarda la nueva tarea en la base de datos
        Alert.alert('Alerta', 'Tarea agregada exitosamente!');
      } catch (error) {
        console.error(error);
      }

    
  }  
      

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


/*

  const addTask = async() => {
    if (task.trim() !== "") {
      
    try {
    const addTaskRef = await addDoc(collection(db, 'tareas'),{
        text: task,
        completed: false,
        date: selectDate.toISOString(),
        manualDate: manualDate ? new Date(manualDate).toISOString():null,
    });
    setTasks([...tasks, 
    {
        id: newTaskRef,id,
        text: task,
        completed: false,
        date: selectDate.toISOString(),
        manualDate: manualDate ? new Date(manualDate).toISOString():null,
    }
    ]);
    setTask("");

 }
 catch(error){
     console.error("Error al agregar tarea", error);
 }

  }else{
    Alert.alert('Warning', 'Task cannont be empty')
  }
};


  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const editTask = async (index, newText) => {
    const newTasks = [...tasks];
    newTasks[index] = newText;
    setTasks(newTasks);
    setEditModalVisible(false);
  
    
  };*/