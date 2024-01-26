import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const EditModal = ({ text, onSave, onClose }) => {
  const [newText, setNewText] = useState(text);

  const handleSave = () => {
    onSave(newText);
  };

  return (
    <View style={styles.modalContainer}>
      <TextInput
        style={styles.input}
        value={newText}
        onChangeText={(text) => setNewText(text)}
      />
      <View style={styles.buttonContainer}>
        <Button title="Guardar" onPress={handleSave} />
        <Button title="Cancelar" onPress={onClose} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    backgroundColor: "#fff",
    width: "80%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginTop: 20,
  },
});

export default EditModal;
