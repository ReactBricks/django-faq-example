import React from 'react'
import { Text, types } from 'react-bricks/frontend'

const Faq: types.Brick = () => {
  return (
    <div className="py-12 container max-w-3 mx-auto">
      <Text
        customFieldName="question"
        placeholder="Question..."
        renderBlock={({ children }) => (
          <h2 className="text-2xl text-gray-900 font-bold mb-6 dark:text-white">
            {children}
          </h2>
        )}
      />
      <Text
        customFieldName="answer"
        placeholder="Answer..."
        renderBlock={({ children }) => (
          <p className="text-gray-600 dark:text-gray-300">{children}</p>
        )}
      />
    </div>
  )
}

Faq.schema = {
  name: 'django-faq',
  label: 'Faq',

  // Sidebar Edit controls for props
  sideEditProps: [],
}

export default Faq
