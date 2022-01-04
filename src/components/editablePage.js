import { v4 as uuidv4 } from 'uuid'
import React, { useState } from 'react'

const initialBlock = { id: uuidv4(), html: '', tag: 'p' }

const EditablePage = () => {
  const blocks = useState([initialBlock])

  return (
    <div className="Page">
      {blocks.map((block, key) => {
        return (
          <div key={key} id={block.id}>
            Tag: {block.tag}, Content: {block.html}
          </div>
        )
      })}
    </div>
  )
}

export default EditablePage
