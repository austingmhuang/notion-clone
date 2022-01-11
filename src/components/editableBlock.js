import React, { useState, useRef } from 'react'
import ContentEditable from '../utils/content-editable'
import SelectMenu from './selectMenu'

function EditableBlock(props) {
  const [text, setText] = useState('')
  const [tag, setTag] = useState('p')
  const contentEditable = useRef()
  const [previousKey, setPreviousKey] = useState('')
  const [selectMenuIsOpen, setSelectMenuIsOpen] = useState(false)
  const [selectMenuPosition, setSelectMenuPosition] = useState({
    x: null,
    y: null,
  })

  const handleChange = (evt) => {
    setText(evt.target.value)
  }

  const getCaretCoordinates = () => {
    let x, y
    const selection = window.getSelection()
    if (selection.rangeCount !== 0) {
      const range = selection.getRangeAt(0).cloneRange()
      range.collapse(false)
      const rect = range.getClientRects()[0]
      if (rect) {
        x = rect.left
        y = rect.top
      }
    }
    return { x, y }
  }

  const handleBlur = () => {}

  const handleKeyUp = (e) => {
    if (e.key === '/') {
      openSelectMenuHandler()
    }
    if (e.key === 'Shift') {
      setPreviousKey('')
    }
  }

  const openSelectMenuHandler = () => {
    const { x, y } = getCaretCoordinates()
    setSelectMenuIsOpen(true)
    setSelectMenuPosition({ x: x, y: y })
    document.addEventListener('click', closeSelectMenuHandler)
  }

  const closeSelectMenuHandler = () => {
    setSelectMenuPosition({ x: null, y: null })
    setSelectMenuIsOpen(false)
    document.removeEventListener('click', closeSelectMenuHandler)
  }

  const tagSelectionHandler = (tag) => {
    setTag(tag)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (previousKey !== 'Shift') {
        e.preventDefault()
        props.addBlock({
          id: props.id,
          ref: contentEditable.current,
        })
      }
    } else if (e.key === 'Backspace' && text.length === 0) {
      e.preventDefault()
      props.deleteBlock({
        id: props.id,
        ref: contentEditable.current,
      })
    } else {
      setPreviousKey(e.key)
    }
  }

  return (
    <>
      {selectMenuIsOpen && (
        <SelectMenu
          position={selectMenuPosition}
          onSelect={tagSelectionHandler}
          close={closeSelectMenuHandler}
        />
      )}
      <ContentEditable
        innerRef={contentEditable}
        className="bg-sky-600"
        html={text}
        tagName={tag}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      />
    </>
  )
}

export default EditableBlock
