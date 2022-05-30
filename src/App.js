import { useState, useEffect } from "react";
import Header from "./components/Header";
import Converter from "./components/Converter";
import CurrencyInput from "./components/CurrencyInput";


const App = () => {

  const [firstValue, setFirstValue] = useState(1)
  const [secondValue, setSecondValue] = useState(1)
  const [cur1, setCur1] = useState('UAH')
  const [cur2, setCur2] = useState('USD')
  const [rates, setRates] = useState([])

  const fetchData = async () => {
    const res = await (await fetch(`https://api.fastforex.io/fetch-multi?from=${cur1}&to=${cur2}&api_key=1b3d7328f9-1d272428f1-rcosaw`)).json()
    setRates(res.results)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleAmountChange1 = (e) => {
    setSecondValue(e * rates[cur2] / rates[cur1])
    setFirstValue(e)
  }

  console.log(rates)

  return (
     <>
       <Header/>
       <CurrencyInput
          currencies={Object.keys(rates)}
          amount={firstValue}
          currency={cur1}
          onAmountChange={handleAmountChange1}
          onCurrencyChange={setCur1}
       />
       <CurrencyInput
          currencies={Object.keys(rates)}
          amount={secondValue}
          currency={cur2}
          onAmountChange={setSecondValue}
          onCurrencyChange={setCur2}
       />

       {/*<Converter/>*/}
     </>
  );
}

export default App;
