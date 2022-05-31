import { useEffect, useState } from "react";
import usa from '../assets/usa.png'
import euro from '../assets/euro.png'
import Currency from "./Currency";

const Header = () => {
  const [data, setData] = useState({})

  const fetchData = async () => {
    const res = await (await fetch('https://api.fastforex.io/fetch-multi?from=UAH&to=USD,EUR&api_key=1b3d7328f9-1d272428f1-rcosaw')).json()
    setData(res.results)
  }

  useEffect(() => {
    fetchData()

  }, [])

  return (
     <header>
       {
          data && Object.entries(data).map(([key, value]) =>
             <Currency key={key} title={key} value={value} imgUrl={key === "USD" ? usa : euro}/>)
       }
     </header>
  )
}

export default Header