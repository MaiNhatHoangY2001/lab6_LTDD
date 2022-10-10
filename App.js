import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Bottom from "./components/Bottom";
import Top from "./components/Top";

const initData = [
  {
    id: 1,
    title: "Study",
  },
  {
    id: 2,
    title: "Homework",
  },
];

export default function App() {
  const [data, setData] = useState(initData);
  const [api, setApi] = useState([]);
  const [screen, setScreen] = useState(true);

  useEffect(() => {
    fetch("https://633f9c31d1fcddf69ca5ca14.mockapi.io/api/todo")
      .then((response) => response.json())
      .then((todos) => setApi(todos));
  }, [api]);

  const screenView = (data, setData, screen) => {
    return (
      <View style={styles.container}>
        <Top data={data} setData={setData} screen={screen}/>
        <Bottom data={data} setData={setData} screen={screen} />
      </View>
    );
  };

  return (
    <>
      {screen
        ? screenView(data, setData, screen)
        : screenView(api, setApi, screen)}

      <TouchableOpacity
        style={styles.screenButton}
        onPress={() => setScreen(!screen)}
      >
        <Text style={{ color: "white", fontSize: 15 }}>
          {screen ? "Screen 2" : "Screen 1"}
        </Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E5E5E5",
  },
  screenButton: {
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "red",
    padding: 18,
    margin: 10,
  },
});
