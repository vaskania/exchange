import {useEffect, useState} from "react";
import ConverterForm from "./ConverterForm";

const currencies = ["UAH", "USD", "EUR"]

const Converter = () => {

  const [firstOption, setFirstOption] = useState("UAH")
  const [secondOption, setSecondOption] = useState("USD")
  const [firstValue, setFirstValue] = useState(1)
  const [secondValue, setSecondValue] = useState(1)
  const [result, setResult] = useState()

  const format = (number) => number.toFixed(3)

  const fetchData = async () => {
    const url = `https://api.fastforex.io/fetch-multi?from=${firstOption}&to=${secondOption}&api_key=1b3d7328f9-1d272428f1-rcosaw`
    const result = await (await fetch(url)).json()

    setResult(result.results[secondOption])
    setSecondValue(format(firstValue * result.results[secondOption]))
  }


  useEffect(() => {
        fetchData()
        // eslint-disable-next-line
      }, [firstOption, secondOption]
  )


  const handleFirstInput = (e) => {
    setSecondValue(format(e * result))
    setFirstValue(e)
  }

  const handleSecondInput = (e) => {
    setFirstValue(format(e / result))
    setSecondValue(e)
  }

  const handleChangeCurrencyOne = (e) => {
    setSecondValue(format(firstValue * result))
    setFirstOption(e)
  }
  const handleChangeCurrencyTwo = (e) => {
    setFirstValue(format(secondValue / result))
    setSecondOption(e)
  }
  return (
      <>
        <input
            value={firstValue}
            onChange={(e) => handleFirstInput(e.target.value)}
            type="number"
        />
        <select value={firstOption} onChange={e => handleChangeCurrencyOne(e.target.value)}>
          {
            currencies.filter(e => e !== secondOption).map((el, index) => <option key={index} value={el}>{el}</option>)
          }
        </select>

        <input
            value={secondValue}
            onChange={(e) => handleSecondInput(e.target.value)}
            type="number"
        />
        <select value={secondOption} onChange={e => handleChangeCurrencyTwo(e.target.value)}>
          {
            currencies.filter(e => e !== firstOption).map((el, index) => <option key={index} value={el}>{el}</option>)
          }
        </select>

        {/*<hr/>*/}

        {/*<ConverterForm*/}
        {/*    onChangeInput={handleFirstInput}*/}
        {/*    option={currencies.filter(e => e !== secondOption)}*/}
        {/*    onChangeCur={handleChangeCurrencyOne}*/}
        {/*    inputValue={firstValue}*/}
        {/*/>*/}

        {/*<ConverterForm*/}
        {/*    onChangeInput={handleSecondInput}*/}
        {/*    option={currencies.filter(e => e !== firstOption)}*/}
        {/*    onChangeCur={handleChangeCurrencyTwo}*/}
        {/*    inputValue={secondValue}*/}
        {/*/>*/}

      </>
  )

}


export default Converter