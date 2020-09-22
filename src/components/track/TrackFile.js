import React, {useState, useRef} from 'react'
import {Toast, ToastBody, ToastHeader} from 'reactstrap'

const TrackFile = props => {
  const fileData = props.file

  return(
    <> 
      <audio controls>
        <source src="none"/>
      </audio>
    </>
  )
}
export default TrackFile