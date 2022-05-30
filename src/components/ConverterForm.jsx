const ConverterForm = ({onChangeInput, onChangeCur, option, inputValue}) => {

  return (
      <>
        <input type='number' onChange={e => onChangeInput(e.target.value)} value={inputValue}/>
        <select onChange={(e) => onChangeCur(e.target.value)}>
          {
            option.map((el, index) => <option key={index} value={el}>{el}</option>)
          }
        </select>
      </>
  )
}

export default ConverterForm