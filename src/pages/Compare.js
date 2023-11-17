//Please feel free to comment in the code where you made changes so that people get to see you work.

import React from "react";
import {
  Text,
  View,
  ScrollView,
  Linking,
  Modal,
  Pressable,
} from "react-native";
import { Button, ActivityIndicator } from "react-native-paper";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { Dropdown } from "react-native-element-dropdown";
import styles from "../styles/styles";

//local JSON Imports
import coinList from "../../assets/json/coinList11-16.json";
import currencyList from "../../assets/json/currencyList.json";

//URL to call for Doge
//https://api.coingecko.com/api/v3/coins/dogecoin

const Compare = ({ navigation, route }) => {
  //firstCoin vars
  const [coinPrice, setCoinPrice] = React.useState("Rate will appear here");
  const [lastUpdate, setLastUpdate] = React.useState(
    "Last update will appear here"
  );
  const [high24, setHigh24] = React.useState("24 hour high will appear here");
  const [low24, setLow24] = React.useState("24 hour low will appear here");
  const [testCoin, setTestCoin] = React.useState("");
  const [testCurrency, setTestCurrency] = React.useState("");

  //secondCoin vars
  const [testCoin2, setTestCoin2] = React.useState("");
  const [lastUpdate2, setLastUpdate2] = React.useState(
    "Last update will appear here"
  );
  const [coinPrice2, setCoinPrice2] = React.useState("Rate will appear here");
  const [testCurrency2, setTestCurrency2] = React.useState("");
  const [high242, setHigh242] = React.useState("24 hour high will appear here");
  const [low242, setLow242] = React.useState("24 hour low will appear here");

  //other vars
  const [currencySelected, setCurrencySelected] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [errorModalVisible, setErrorModalVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isCoinSelected, setIsCoinSelected] = React.useState(false);
  const [coinSelected, setCoinSelected] = React.useState(false);
  const [coin2Selected, setCoin2Selected] = React.useState(false);

  async function getCoinPrice() {
    if (!coinSelected || !coin2Selected || !currencySelected) {
      setIsLoading(false);
      setModalVisible(true);
      return;
    }
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${testCoin}`, {
        headers: { accept: "application/json" },
      })
      .then((response) => {
        //request for 2nd coin
        axios
          .get(`https://api.coingecko.com/api/v3/coins/${testCoin2}`, {
            headers: { accept: "application/json" },
          })
          .then((response2) => {
            setCoinPrice2(
              response2.data.market_data.current_price[testCurrency]
            );
            setLastUpdate2(response2.data.last_updated);
            setHigh242(response2.data.market_data.high_24h[testCurrency]);
            setLow242(response2.data.market_data.low_24h[testCurrency]);
          })
          .catch((error) => {
            setIsLoading(false);
            setErrorModalVisible(true);
            console.log("error " + error);
          });
        setCoinPrice(response.data.market_data.current_price[testCurrency]);
        setLastUpdate(response.data.last_updated);
        setHigh24(response.data.market_data.high_24h[testCurrency]);
        setLow24(response.data.market_data.low_24h[testCurrency]);
        setIsCoinSelected(true);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorModalVisible(true);
        console.log("error " + error);
      });
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" backgroundColor="#27394A" />

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
        valueField="id"
        placeholder="Select a coin"
        searchPlaceholder="Search..."
        value={testCoin}
        onChange={(item) => {
          setTestCoin(item.id);
          setCoinSelected(true);
        }}
      />
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
        valueField="id"
        placeholder="Select a second coin"
        searchPlaceholder="Search..."
        value={testCoin2}
        onChange={(item) => {
          setTestCoin2(item.id);
          setCoin2Selected(true);
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
        }}
      />
      <View
        style={{
          color: "white",
          alignSelf: "center",
          paddingHorizontal: 100,
          paddingVertical: 20,
        }}
      >
        <Button
          mode="contained"
          contentStyle={{ height: 75, backgroundColor: "#009900" }}
          onPress={() => {
            setIsLoading(true);
            getCoinPrice();
          }}
          accessibilityLabel="Press to find the crypto price"
        >
          <Text style={{ fontSize: 20 }}>Check Price</Text>
        </Button>
      </View>
      {isLoading ? (
        <View>
          <ActivityIndicator animating={true} color="#009900" />
          <Text style={styles.textLowerOnly}>Loading...</Text>
        </View>
      ) : null}
      {isCoinSelected ? (
        <View style={{ alignItems: "center" }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.textCompare}>Coin 1</Text>
              <Text
                placeholder="price will appear here"
                style={styles.textCompare}
              >
                Price Per Coin: {coinPrice}
              </Text>
              <Text
                placeholder="24 high will appear here"
                style={styles.textCompare}
              >
                24 Hour High: {high24}
              </Text>
              <Text
                placeholder="24 low will appear here"
                style={styles.textCompare}
              >
                24 Hour Low: {low24}
              </Text>

              <Text
                placeholder="24 low will appear here"
                style={styles.textCompare}
              >
                {" "}
              </Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.textCompare}>Coin 2</Text>
              <Text
                placeholder="price will appear here"
                style={styles.textCompare}
              >
                Price Per Coin: {coinPrice2}
              </Text>
              <Text
                placeholder="24 high will appear here"
                style={styles.textCompare}
              >
                24 Hour High: {high242}
              </Text>
              <Text
                placeholder="24 low will appear here"
                style={styles.textCompare}
              >
                24 Hour Low: {low242}
              </Text>

              <Text
                placeholder="24 low will appear here"
                style={styles.textCompare}
              >
                {" "}
              </Text>
            </View>
          </View>
          <Text
            placeholder="last updated date will appear here"
            style={styles.textCompare}
          >
            Last Updated: {lastUpdate}
          </Text>
        </View>
      ) : (
        <View>
          <Text style={styles.textLowerOnly}>
            Please select a Coin and a Currency
          </Text>
        </View>
      )}
      <View
        style={{
          color: "white",
          alignSelf: "center",
          paddingHorizontal: 100,
          paddingVertical: 20,
        }}
      >
        <Button
          mode="contained"
          contentStyle={{ height: 75, backgroundColor: "#009900" }}
          onPress={() => {
            navigation.navigate("Home");
          }}
          accessibilityLabel="Press to find the crypto price"
        >
          <Text style={{ fontSize: 20 }}>Back to Coin Checker</Text>
        </Button>
      </View>

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
      <Modal
        animationType="slide"
        transparent={true}
        visible={errorModalVisible}
        onRequestClose={() => {
          setErrorModalVisible(!errorModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Request Failed, Please Try Again!
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setErrorModalVisible(!errorModalVisible)}
            >
              <Text style={styles.textStyle}>Acknkowledge</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Compare;
