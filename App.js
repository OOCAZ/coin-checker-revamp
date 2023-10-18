//Origianl commits by Zac Poorman : OOCAZ
//5/26/2021 date of origin
//This is the file that controls the whole app, if you have an idea to make this
//app better just ask and we will make it better together.

//Please feel free to comment in the code where you made changes so that people get to see you work.

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Linking,
  Modal,
  Pressable,
} from "react-native";
import axios from "axios";
import { Dropdown } from "react-native-element-dropdown";

//local JSON Imports
import coinList from "./assets/json/coinList10-17.json";
import currencyList from "./assets/json/currencyList.json";

//URL to call for Doge
//https://api.coingecko.com/api/v3/coins/dogecoin

const App = () => {
  const [coinPrice, setCoinPrice] = React.useState("Rate will appear here");
  const [lastUpdate, setLastUpdate] = React.useState(
    "Last update will appear here"
  );
  const [high24, setHigh24] = React.useState("24 hour high will appear here");
  const [low24, setLow24] = React.useState("24 hour low will appear here");
  const [testCoin, setTestCoin] = React.useState("");
  const [testCurrency, setTestCurrency] = React.useState("");
  const [coinSelected, setCoinSelected] = React.useState(false);
  const [currencySelected, setCurrencySelected] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.textTop}>Built by OOCAZ / Zac Poorman</Text>
      <Text style={{ color: "white" }}></Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={coinList}
        search
        maxHeight={300}
        labelField="name"
        valueField="name"
        placeholder="Select a coin"
        searchPlaceholder="Search..."
        value={testCoin}
        onChange={(item) => {
          setTestCoin(item.id);
          setCoinSelected(true);
          console.log(item.id);
        }}
      />

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={currencyList}
        search
        maxHeight={300}
        labelField="name"
        valueField="name"
        placeholder="Select a currency"
        searchPlaceholder="Search..."
        value={testCurrency}
        onChange={(item) => {
          setTestCurrency(item.name);
          setCurrencySelected(true);
          console.log(item.name);
        }}
      />
      <View
        style={{
          color: "white",
          alignSelf: "center",
          paddingHorizontal: 100,
        }}
      >
        <Button
          onPress={() => {
            if (!coinSelected || !currencySelected) {
              setModalVisible(true);
              return;
            }
            URL = "https://api.coingecko.com/api/v3/coins/" + testCoin;
            axios
              .get(URL.toString(), {
                headers: { accept: "application/json" },
              })
              .then((response) => {
                // If request is good...
                //console.log("successfully got request");
                //console.log(response.data);
                var builtPrice =
                  "response.data.market_data.current_price." + testCurrency;
                var builtDate = "response.data.last_updated";
                var builthigh24 =
                  "response.data.market_data.high_24h." + testCurrency;
                var builtlow24 =
                  "response.data.market_data.low_24h." + testCurrency;
                //eval() function allows us to interpret a string as a variable name or math operation
                setCoinPrice(eval(builtPrice));
                setLastUpdate(eval(builtDate));
                setHigh24(eval(builthigh24));
                setLow24(eval(builtlow24));
              })
              .catch((error) => {
                console.log("error " + error);
              });
          }}
          title="Check Price"
          color="#0B8CFD"
          accessibilityLabel="Press to find the crypto price"
        />
      </View>
      <Text placeholder="price will appear here" style={styles.textLower}>
        Price Per Coin: {coinPrice}
      </Text>
      <Text
        placeholder="last updated date will appear here"
        style={styles.textLower}
      >
        Last Updated: {lastUpdate}
      </Text>
      <Text placeholder="24 high will appear here" style={styles.textLower}>
        24 Hour High: {high24}
      </Text>
      <Text placeholder="24 low will appear here" style={styles.textLower}>
        24 Hour Low: {low24}
      </Text>

      <Text placeholder="24 low will appear here" style={styles.textLower}>
        {" "}
      </Text>

      <Text
        style={styles.textLower}
        onPress={() => {
          Linking.openURL("https://www.coingecko.com/en/api");
        }}
      >
        Thanks to CoinGecko API for Powering this app
      </Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {!coinSelected ? "Please Select a Coin!" : null}
            </Text>
            <Text style={styles.modalText}>
              {!currencySelected ? "Please Select a Currency!" : null}
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Acknkowledge</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#27394A",
  },
  textUpper: {
    color: "white",
    margin: 15,
    alignSelf: "center",
  },
  textLower: {
    color: "white",
    margin: 10,
    alignSelf: "center",
  },
  textTop: {
    color: "white",
    marginTop: 50,
    marginBottom: 20,
    alignSelf: "center",
  },
  textInput: {
    color: "white",
    borderWidth: 2,
    borderColor: "white",
    padding: 10,
    marginLeft: 40,
    marginRight: 40,
    margin: 15,
  },
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    color: "red",
    textAlign: "center",
  },
});

export default App;
