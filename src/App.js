import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { colorArray } from "./utils/colors";
import { Chart } from "./components/Chart/chart.component";
import styles from "./app.module.css";
import { Chip } from "./components/Chip/chip.component";
/**
 *
 * Function to remove duplicates in according to symbol
 * @param {array} array
 * @return {array}
 */
function removeDuplicate(array) {
  let newArr = [];
  for (const obj of array) {
    if (!newArr.find((arr) => arr.baseSymbol === obj.baseSymbol)) {
      newArr.push(obj);
    }
  }
  return newArr;
}
/**
 *
 * Function to Find top 50 according to rank
 * @param {array} array
 * @return {array}
 */
function findTop50Crypto(array) {
  array.sort((a, b) => a.rank - b.rank);
  return array.slice(0, 50);
}

/**
 *
 * React Component to Show real time changes in crypto prices
 */
export default function App() {
  const [prices, setPrices] = useState([]);
  const [top50Crypto, setTop50Crypto] = useState([]);
  const [filter, setFilter] = useState([]);
  useEffect(() => {
    if (top50Crypto) {
      const priceWs = new WebSocket(
        `wss://ws.coincap.io/prices?assets=${top50Crypto.join(",")}`
      );
      priceWs.onmessage = ({ data }) => {
        const priceData = JSON.parse(data);
        let object = { ...prices };
        top50Crypto.forEach((key) => {
          if (object[key]) {
            if (object[key].length >= 200) {
              object[key] = object[key].splice(25);
            }
            object[key].push({
              name: new Date().toLocaleTimeString(),
              value: priceData[key] || object[key].slice(-1)[0].value,
            });
          }
        });
        setPrices((prev) => ({
          ...prev,
          ...object,
        }));
      };
    }
  }, [top50Crypto, prices]);

  /**
   * Selecting top 50 Values of Crypto to show their real time update
   */
  const selectTop50Crypto = useCallback(() => {
    axios.get("https://api.coincap.io/v2/markets").then((response) => {
      const Top50Crypto = findTop50Crypto(removeDuplicate(response.data.data));
      setTop50Crypto(Top50Crypto.map((top) => top.baseId));
      let data = {};
      for (const top of Top50Crypto) {
        data[top.baseId] = [
          { name: new Date().toLocaleTimeString(), value: top.priceUsd },
        ];
      }
      setPrices(data);
    });
  }, []);

  useEffect(() => {
    selectTop50Crypto();
  }, [selectTop50Crypto]);

  /**
   *
   * Filtering values to filter the displaying of graph
   * @param {string} id
   * @param {string} action
   */
  const filterCrypto = (id, action) => () => {
    if (action === "add") {
      setFilter((filter) => [...filter, id]);
    } else {
      setFilter(filter.filter((f) => f !== id));
    }
  };
  /**
   * Filter Logic
   */
  const showCrypto = top50Crypto.filter(
    (top) => !filter.includes(top.toLowerCase())
  );

  return (
    <>
      <div className={styles["chip-container"]}>
        <h4>Filter</h4>
        {top50Crypto.map((top) => {
          return (
            <Chip
              id={top}
              key={top}
              filtered={filter.includes(top)}
              onFilter={filterCrypto}
            />
          );
        })}
      </div>
      <div className={styles["graph-container"]}>
        {showCrypto.map((top, i) => {
          return (
            <div
              key={i}
              style={{ boxShadow: `0 0 5px ${colorArray[i]}`, margin: "5px" }}
            >
              <h3 style={{ textAlign: "center" }}>{top.toUpperCase()}</h3>
              <Chart priceData={prices[top]} color={colorArray[i]} />
            </div>
          );
        })}
      </div>
    </>
  );
}
