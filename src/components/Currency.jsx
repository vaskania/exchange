const Currency = ({ title, value, imgUrl }) => {
  return (
     <div>
       <img src={imgUrl} alt={title}/>
       <div>{title} : {value}</div>
     </div>

  )
}

export default Currency