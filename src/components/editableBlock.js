import React, { useState } from 'react'
import ContentEditable from '../utils/content-editable'

function EditableBlock() {
  const [text, setText] = useState('Woot! Hooks working')

  const handleChange = (evt) => {
    setText(evt.target.value)
  }

  const handleBlur = () => {
    console.log(text)
  }

  return (
    <ContentEditable html={text} onBlur={handleBlur} onChange={handleChange} />
  )
}

export default EditableBlock
