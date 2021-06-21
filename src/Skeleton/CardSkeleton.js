import React from 'react'
import Skeleton from './Skeleton'
const CardSkeleton = () => {
    return (
        <div className="skeleton-card">
            <Skeleton type="photo" size="small" />
            <Skeleton type="text" size="small" />
            <Skeleton type="title" size="small" />
            <Skeleton type="title" size="small" />
        </div>
    )
}

export default CardSkeleton
