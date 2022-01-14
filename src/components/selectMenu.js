import React, { useEffect, useState } from 'react'
import { matchSorter } from 'match-sorter'

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
  const [positionX, setPositionX] = useState(0)
  const [positionY, setPositionY] = useState(0)

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
        if (e.key.length === 1) {
          setCommand(command + e.key)
        }
        break
    }
  }

  /**
   *  Re-register the event listener every time, so a callback always gets fresh state from the enclosing scope
   */

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler)

    return function cleanup() {
      document.removeEventListener('keydown', keyDownHandler)
    }
  }, [command])

  useEffect(() => {
    setItems(matchSorter(allowedTags, command, { keys: ['label'] }))
  }, [command])

  useEffect(() => {
    setPositionX(props.position.x)
    setPositionY(props.position.y)
  }, [])

  return (
    <div
      className={`py-4 px-4 bg-white shadow-xl ring-1 ring-gray-900/5 sm:max-w-lg sm:mx-auto sm:rounded-lg`}
      style={{
        position: 'absolute',
        left: `${positionX}px`,
        top: `${positionY + 24}px`,
      }}
    >
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
