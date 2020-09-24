import React, {useState, useRef} from 'react'
import {Toast, ToastBody, ToastHeader} from 'reactstrap'

const TrackFile = props => {
  const fileData = props.data

  return(
    <> 
      <audio controls>
        <source src={fileData.url}/>
      </audio>
    </>
  )
}
export default TrackFile