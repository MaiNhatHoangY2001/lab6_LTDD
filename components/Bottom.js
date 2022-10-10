import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function Bottom({ data, setData, screen }) {
  const handleRemoveData = (id) => {
    if (screen) {
      setData((prev) => prev.filter((item) => item.id !== id));
    } else {
      deleteDataApi(id);
    }
  };

  const deleteDataApi = async (id) => {
    try {
      await fetch(
        `https://633f9c31d1fcddf69ca5ca14.mockapi.io/api/todo/${id}`,
        {
          method: "DELETE", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // .then(async (response) => await response.json())
      // .then((todos) => {
      //   setData(todos);
      // });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {data.map((todo, index) => {
        return (
          <View style={styles.item} key={index}>
            <TouchableOpacity style={styles.button} disabled>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                {index + 1}
              </Text>
            </TouchableOpacity>
            <Text style={styles.title}>{todo.title}</Text>
            <TouchableOpacity
              style={[
                styles.button,
                { flex: 2, backgroundColor: "#4285F4", borderWidth: 0 },
              ]}
              onPress={() => handleRemoveData(todo.id)}
            >
              <Text
                style={
                  screen
                    ? { fontWeight: "bold", fontSize: 20, color: "white" }
                    : {
                        fontWeight: "bold",
                        fontSize: 13,
                        color: "white",
                      }
                }
              >
                {screen ? "Done" : "Remove"}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: "100%",
  },
  item: {
    backgroundColor: "white",
    borderRadius: 5,
    flexDirection: "row",
    margin: 4,
  },
  button: {
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    margin: 10,
    borderRadius: 3,
    flex: 1,
  },
  title: {
    alignSelf: "center",
    fontSize: 20,
    margin: 20,
    flex: 7,
  },
});
