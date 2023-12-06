import React, { useState } from 'react'
import { types } from 'react-bricks/frontend'
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io'

import Link from 'next/link'

interface CategoryProps {
  category: { props: types.Props; name: string }
  faqs: {
    props: types.Props
    slug: string
    id: string
  }[]
}

const Category: React.FC<CategoryProps> = ({ category, faqs }) => {
  const [showFaqs, setShowFaqs] = useState<boolean>(false)
  faqs = faqs.sort((prev, next) => prev.props.order - next.props.order)
  return (
    <button className="w-full">
      <div
        className="flex justify-between items-center p-6"
        onClick={() => setShowFaqs((o) => !o)}
      >
        <p className="text-gray-700 font-bold">{category.name}</p>
        {!showFaqs ? (
          <IoIosArrowForward size={28} color="#ff6b50" strokeWidth={18} />
        ) : (
          <IoIosArrowDown size={28} color="#ff6b50" strokeWidth={18} />
        )}
      </div>
      {showFaqs && (
        <div className="py-4 bg-[#fff0ed] rounded-b-3xl text-left flex flex-col gap-6">
          {faqs.map((faq) => (
            <Link
              key={faq.id}
              href={`/${faq.slug}`}
              className="flex justify-between px-6 text-gray-700 font-semibold items-center"
              target="_blank"
            >
              {faq.props.question}
              <IoIosArrowForward size={16} strokeWidth={16} color="#4f505f" />
            </Link>
          ))}
        </div>
      )}
    </button>
  )
}

export default Category
