import React, { useEffect, useState } from 'react'
import { matchSorter } from 'match-sorter'

const allowedTags = [
  {
    id: 'paragraph',
    tag: 'p',
    label: 'Text',
  },
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
    setItems(
      matchSorter(allowedTags, command, {
        keys: ['label'],
        baseSort: (a, b) => (a.index < b.index ? -1 : 1),
      })
    )
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
          console.log(item)
          const isSelected = items.indexOf(item) === selected
          return (
            <div
              className={isSelected ? 'bg-slate-100' : 'bg-white'}
              key={key}
              role="button"
              tabIndex="0"
              onClick={() => onSelect(item.tag)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {item.label}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SelectMenu
