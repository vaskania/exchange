const CurrencyInput = (props) => {
  console.log(props)
  return (
     <div>
       {/*<input*/}
       {/*   type='number'*/}
       {/*   value={props.amount}*/}
       {/*   onChange={props.onAmountChange(e => e.target.value)}/>*/}
       <select
          value={props.currency}
          onChange={props.onCurrencyChange(e => e.target.value)}
       >
         {props.currencies.map(currency => (
               <option value={currency}>{currency}</option>
            )
         )}
       </select>
     </div>
  )
}
export default CurrencyInput