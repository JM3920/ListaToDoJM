import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal, Button } from "react-native";

import tacho from "../imagenes/tacho.png";
import lapiz from "../imagenes/lapiz.png";

const Task = ({ text, onDelete, onEdit }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = () => {
    setModalVisible(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setModalVisible(false);
  };

  const handleCancelDelete = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.task}>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={onEdit}>
          <Image source={lapiz} style={styles.tacho} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete}>
          <Image source={tacho} style={styles.tacho} />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>¿Seguro que quieres eliminar?</Text>
            <View style={styles.buttonRow}>
              <Button title="Sí" onPress={handleConfirmDelete} />
              <Button title="No" onPress={handleCancelDelete} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "skyblue",
    padding: 15,
    borderRadius: 10,
    margin: 10,
  },
  textWrapper: {
    flex: 1,
  },
  text: {
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  edit: {
    color: "blue",
    marginRight: 10,
  },
  delete: {
    color: "red",
  },
  tacho: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: "contain",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 20,
    fontSize: 18,
  },
  buttonRow: {
   flexDirection: "row",
   justifyContent: "space-around",
   width: "100%",
   marginTop: 20,
 },
});

export default Task;