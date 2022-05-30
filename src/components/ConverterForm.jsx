const ConverterForm = ({ onChange, option, inputValue }) => {
  return (
     <>
       <select onChange={onChange}>
         {
           option.map((el, index) => <option key={index} value={el}>{el}</option>)
         }
       </select>
     </>
  )
}

export default ConverterForm