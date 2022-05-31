import { useEffect, useState } from "react";

const currencies = ["UAH", "USD", "EUR"]

const Converter = () => {
  const format = (number) => number.toFixed(3)
  const [firstOption, setFirstOption] = useState("UAH")
  const [secondOption, setSecondOption] = useState("USD")
  const [firstValue, setFirstValue] = useState(1)
  const [secondValue, setSecondValue] = useState(1)
  const [result, setResult] = useState()


  const fetchData = async () => {
    const url = `https://api.fastforex.io/fetch-multi?from=${firstOption}&to=${secondOption}&api_key=1b3d7328f9-1d272428f1-rcosaw`
    const res = await (await fetch(url)).json()

    setResult(res.results[secondOption])
    setSecondValue(format(firstValue * res.results[secondOption]))
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
    setFirstValue(Math.round(secondValue / result))
    setSecondOption(e)
  }
  return (
     <div className='currency-container'>
       <h3>Currency Converter</h3>
       <div className='currency'>
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
       </div>

       <div className='currency'>
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
       </div>
     </div>
  )
}


export default Converter