import React from 'react'
import './Skeleton.css'

const Skeleton = ({type,size}) => {
    const classes = `skeleton ${type} ${size}`
    return (
        <div className={classes}>
            
        </div>
    )
}

export default Skeleton
