import React, { useEffect, useState } from 'react'
import { matchSorter } from 'match-sorter'

const allowedTags = [
  {
    id: 'page-title',
    tag: 'h1',
    label: 'Heading 1',
  },
  {
    id: 'heading',
    tag: 'h2',
    label: 'Heading 2',
  },
  {
    id: 'subheading',
    tag: 'h3',
    label: 'Heading 3',
  },
  {
    id: 'paragraph',
    tag: 'p',
    label: 'Text',
  },
]

const SelectMenu = ({ position, onSelect, close }) => {
  const [items, setItems] = useState(allowedTags)
  const [command, setCommand] = useState('')
  const [selected, setSelected] = useState(0)
  const [positionX, setPositionX] = useState(0)
  const [positionY, setPositionY] = useState(0)

  useEffect(() => {
    const keyDownHandler = (e) => {
      switch (e.key) {
        case 'Enter':
          e.preventDefault()
          onSelect(items[selected].tag)
          break
        case 'Backspace':
          if (!command) close()
          setCommand(command.slice(0, -1))
          break
        case 'ArrowUp':
          e.preventDefault()
          if (selected !== 0) {
            setSelected(selected - 1)
          }
          break
        case 'ArrowDown':
        case 'Tab':
          e.preventDefault()
          if (selected !== items.length - 1) {
            setSelected(selected + 1)
          }
          break
        default:
          if (e.key.length === 1) {
            setCommand(command + e.key)
          }
          break
      }
    }

    document.addEventListener('keydown', keyDownHandler)

    return function cleanup() {
      document.removeEventListener('keydown', keyDownHandler)
    }
  }, [items, selected, command, onSelect, close])

  useEffect(() => {
    setItems(matchSorter(allowedTags, command, { keys: ['label'] }))
  }, [command])

  useEffect(() => {
    setPositionX(position.x)
    setPositionY(position.y)
  }, [position.x, position.y])

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
              className={isSelected ? 'bg-slate-100' : 'bg-white'}
              key={key}
              role="button"
              tabIndex="0"
              onClick={() => onSelect(item.tag)}
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
