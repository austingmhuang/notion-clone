import React, { useState, useRef } from 'react'
import ContentEditable from '../utils/content-editable'

function EditableBlock(props) {
  const [text, setText] = useState('')
  const [tag, setTag] = useState('p')
  const contentEditable = useRef()
  const [previousKey, setPreviousKey] = useState('')

  const handleChange = (evt) => {
    setText(evt.target.value)
  }

  const handleBlur = () => {}

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (previousKey !== 'Shift') {
        e.preventDefault()
        console.log('did it')
        console.log(props)
        props.addBlock({
          id: props.id,
          ref: contentEditable.current,
        })
      }
    }
    if (e.key === 'Backspace' && text.length === 0) {
      e.preventDefault()
      console.log('deletedBlock')
      props.deleteBlock({
        id: props.id,
        ref: contentEditable.current,
      })
    }
    setPreviousKey({ previousKey: e.key })
  }

  return (
    <ContentEditable
      innerRef={contentEditable}
      className="Block"
      html={text}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  )
}

export default EditableBlock
