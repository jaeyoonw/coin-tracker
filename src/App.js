import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [myMoney, setMyMoney] = useState(0);
  const [coinMoney, setCoinMoney] = useState(0);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setLoading(false);
        setCoins(json);
      });
  }, []);
  //  select coin
  const onChange = (event) => {
    if (event.target.value === "=====Option=====") {
      setClicked(false);
    } else {
      setClicked(true);
    }
    setCoinMoney(event.target.value);
    console.log(event.target);
  };
  // input my money
  const inputChange = (event) => {
    setMyMoney(event.target.value);
  };
  return (
    <div>
      <h1>The Coins!{loading ? "" : `(${coins.length})`}</h1>
      <div>
        {loading ? (
          <strong>Loading...</strong>
        ) : (
          <select onChange={onChange}>
            <option defaultValue={{ label: "Option", value: 0 }}>
              =====Option=====
            </option>
            {coins.map((coin) => (
              <option key={coin.id} value={coin.quotes.USD.price}>
                {coin.name} ({coin.symbol}): ${coin.quotes.USD.price}
              </option>
            ))}
          </select>
        )}
        {/* 클릭하면 input이 보이게 한다 */}
        {clicked ? (
          <div>
            Your money -{">"}
            <input
              onChange={inputChange}
              value={myMoney}
              placeholder="your money"
            ></input>
            $
            <div>
              Number of coins you can get -{">"} {parseInt(myMoney / coinMoney)}{" "}
              coins
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
