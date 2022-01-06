import React, { useEffect, useState } from 'react'
import { matchSorter } from 'match-sorter'

const MENU_HEIGHT = 150
const allowedTags = [
  {
    id: 'page-title',
    tag: 'h1',
    label: 'Page Title',
  },
  {
    id: 'heading',
    tag: 'h2',
    label: 'Heading',
  },
  {
    id: 'subheading',
    tag: 'h3',
    label: 'Subheading',
  },
  {
    id: 'paragraph',
    tag: 'p',
    label: 'Paragraph',
  },
]

const SelectMenu = (props) => {
  const [items, setItems] = useState(allowedTags)
  const [command, setCommand] = useState('')
  const [selected, setSelected] = useState(0)

  const keyDownHandler = (e) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault()
        props.onSelect(items[selected].tag)
        break
      case 'Backspace':
        if (!command) props.close()
        setCommand(command.substring(0, command.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        const prevSelected = selected === 0 ? items.length - 1 : selected - 1
        setSelected(prevSelected)
        break
      case 'ArrowDown':
      case 'Tab':
        e.preventDefault()
        const nextSelected = selected === items.length - 1 ? 0 : selected + 1
        setSelected(nextSelected)
        break
      default:
        setCommand(command + e.key)
        break
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler)

    return function cleanup() {
      document.removeEventListener('keydown', keyDownHandler)
    }
  }, [])

  useEffect(() => {
    setItems(matchSorter(allowedTags, command, { keys: ['tag'] }))
  }, [command])

  const x = props.position.x
  const y = props.position.y - MENU_HEIGHT
  const positionAttributes = { top: y, left: x }

  return (
    <div className="SelectMenu" style={positionAttributes}>
      <div className="Items">
        {items.map((item, key) => {
          const isSelected = items.indexOf(item) === selected
          return (
            <div
              className={isSelected ? 'Selected' : null}
              key={key}
              role="button"
              tabIndex="0"
              onClick={() => props.onSelect(item.tag)}
            >
              {item.label}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SelectMenu
