const Currency = ({ title, value, imgUrl }) => {

  return (
     <div className='header-container'>
       <img src={imgUrl} alt={title} className='currency-image'/>
       <div>{title} : {value}</div>
     </div>

  )
}

export default Currency