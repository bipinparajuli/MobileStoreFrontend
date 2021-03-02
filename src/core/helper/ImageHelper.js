import React from 'react'
import { API } from '../../Backend'
const ImageHelper = ({product}) => {
const imageurl = product ?`${API}/product/photo/${product._id}` :`https://images.unsplash.com/photo-1592921411716-e5ea119cc724?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60`
return (
        <div className="rounded p-2">
            <img
              src={imageurl}
              alt={imageurl}
              style={{ maxHeight: "100%", maxWidth: "100%",objectFit:'contain',height:'200px',width:"300px" }}
              className="image mb-3 rounded"
            />
          </div>
    )
}

export default ImageHelper
