import { useEffect, useRef, useState } from "react";
import CurrencyItem from "./CurrencyItem";

const currencyArr = ["UAH", "USD", "EUR"]

const Converter = () => {

  const [firstOption, setFirstOption] = useState("UAH")
  const [secondOption, setSecondOption] = useState("USD")
  const [firstValue, setFirstValue] = useState(1)
  const [secondValue, setSecondValue] = useState(1)
  const [result, setResult] = useState()


  const fetchData = async () => {
    const url = `https://api.fastforex.io/fetch-multi?from=${firstOption}&to=${secondOption}&api_key=1b3d7328f9-1d272428f1-rcosaw`
    const result = await (await fetch(url)).json()
    setResult(Object.values(result.results)[0])
    setSecondValue(result.results[secondOption])
  }


  useEffect(() => {
       fetchData()

     }, [firstOption, secondOption]
  )

  const handleFirstValue = (e) => {
    setSecondValue((e * result).toFixed(3))
    setFirstValue(e)
  }

  const handleSecondValue = (e) => {
    setFirstValue((e / result).toFixed(3))
    setSecondValue(e)
  }


  return (
     <>
       <input
          value={firstValue}
          onChange={(e) => handleFirstValue(e.target.value)}
          type="number"
       />
       <CurrencyItem
          onChange={(e) => setFirstOption(e.target.value)}
          value={firstOption}
          option={currencyArr.filter(e => e !== secondOption)}
          inputValue={1}
       />

       <input
          value={secondValue}
          onChange={(e) => handleSecondValue(e.target.value)}
          type="number"
       />
       <CurrencyItem
          onChange={(e) => setSecondOption(e.target.value)}
          value={secondOption}
          inputValue={result}
          option={currencyArr.filter(e => e !== firstOption)}
       />

     </>
  )

}


export default Converter