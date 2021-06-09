import React from 'react'
import { API } from '../../Backend'

const ImageHelper = ({product,productId}) => {

  const imageurl = product ?`${API}/product/photo/${product._id}` :`${API}/product/photo/${productId}`
return (
        <div className="rounded p-2">
            <img
              src={imageurl}
              alt={imageurl}
              style={product?{maxHeight: "100%", maxWidth: "100%",objectFit:'contain',height:'200px',width:"300px" }:{maxHeight: "100%", maxWidth: "100%",height:'500px',objectFit:"contain",width:"400px",backgroundColor:"white",padding:"20% 10%"}}
              className="image mb-3 rounded"
            />
          </div>
    )
}

export default ImageHelper
