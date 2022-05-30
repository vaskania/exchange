import { useEffect, useState } from "react";
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

  const format = (number) => number.toFixed(3)

  const handleFirstValue = (e) => {
    setSecondValue(format(e * result))
    setFirstValue(e)
  }

  const handleSecondValue = (e) => {
    setFirstValue(format(e / result))
    setSecondValue(e)
  }

  const handleChangeCurrencyOne = (e) => {
    setFirstValue(format(e / result))
    setFirstOption(e)
  }
  const handleChangeCurrencyTwo = (e) => {
    setSecondValue(format(e * result))
    setSecondOption(e)
  }


  return (
     <>
       <input
          value={firstValue}
          onChange={(e) => handleFirstValue(e.target.value)}
          type="number"
       />
       <select value={firstOption} onChange={e => handleChangeCurrencyOne(e.target.value)}>
         {
           currencyArr.filter(e => e !== secondOption).map((el, index) => <option key={index} value={el}>{el}</option>)
         }
       </select>

       <input
          value={secondValue}
          onChange={(e) => handleSecondValue(e.target.value)}
          type="number"
       />
       <select value={secondOption} onChange={e => handleChangeCurrencyTwo(e.target.value)}>
         {
           currencyArr.filter(e => e !== firstOption).map((el, index) => <option key={index} value={el}>{el}</option>)
         }
       </select>

     </>
  )

}


export default Converter