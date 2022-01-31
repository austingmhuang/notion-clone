import { v4 as uuidv4 } from 'uuid'
import React, { useEffect, useState } from 'react'
import EditableBlock from './editableBlock'

const initialBlock = { id: uuidv4(), html: '', tag: 'p' }

const EditablePage = () => {
  const [blocks, setBlocks] = useState([initialBlock])
  const [currentBlock, setCurrentBlock] = useState()

  const updatePageHandler = (updatedBlock) => {
    const index = blocks.map((b) => b.id).indexOf(updatedBlock.id)
    console.log(index)
    const updatedBlocks = [...blocks]
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: updatedBlock.tag,
      html: updatedBlock.html,
    }

    setBlocks({ blocks: updatedBlocks })
  }

  const addBlockHandler = (currentBlock) => {
    const newBlock = { id: uuidv4(), html: '', tag: currentBlock.tag }
    const index = blocks.map((b) => b.id).indexOf(currentBlock.id)
    const updatedBlocks = [...blocks]
    updatedBlocks.splice(index + 1, 0, newBlock)
    setBlocks(updatedBlocks)
    setCurrentBlock(currentBlock)
  }

  useEffect(() => {
    if (currentBlock) {
      currentBlock.ref.nextElementSibling.focus()
    }
  }, [currentBlock])

  const setCaretToEnd = (element) => {
    const range = document.createRange()
    const selection = window.getSelection()
    range.selectNodeContents(element)
    range.collapse(false)
    selection.removeAllRanges()
    selection.addRange(range)
    element.focus()
  }

  const deleteBlockHandler = (currentBlock) => {
    const previousBlock = currentBlock.ref.previousElementSibling
    if (previousBlock) {
      const index = blocks.map((b) => b.id).indexOf(currentBlock.id)
      const updatedBlocks = [...blocks]
      updatedBlocks.splice(index, 1)
      setBlocks(updatedBlocks)
      setCaretToEnd(previousBlock)
      previousBlock.focus()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 sm:px-24 md:px-48 lg:px-72 xl:px-96 py-6 flex flex-col relative overflow-hidden sm:py-12">
      {blocks.map((block, key) => {
        return (
          <EditableBlock
            key={key}
            id={block.id}
            tag={block.tag}
            html={block.html}
            updatePage={updatePageHandler}
            addBlock={addBlockHandler}
            deleteBlock={deleteBlockHandler}
          />
        )
      })}
    </div>
  )
}

export default EditablePage
