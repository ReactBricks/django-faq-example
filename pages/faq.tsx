import { GetStaticProps } from 'next'
import Head from 'next/head'
import {
  PageViewer,
  cleanPage,
  fetchPage,
  fetchPages,
  fetchTags,
  types,
  useReactBricksContext,
} from 'react-bricks/frontend'
import Layout from '../components/layout'
import ErrorNoHeader from '../components/errorNoHeader'
import ErrorNoFooter from '../components/errorNoFooter'
import config from '../react-bricks/config'
import ErrorNoKeys from '../components/errorNoKeys'
import Category from '../components/Category'

interface HomeProps {
  errorNoKeys: string
  errorHeader: string
  errorFooter: string
  faqs: types.Page[]
  categories: types.Page[]
  header: types.Page
  footer: types.Page
}

const BlogList: React.FC<HomeProps> = ({
  categories,
  faqs,
  errorNoKeys,
  errorHeader,
  errorFooter,
  header,
  footer,
}) => {
  const { pageTypes, bricks } = useReactBricksContext()
  const headerOk = header ? cleanPage(header, pageTypes, bricks) : null
  const footerOk = footer ? cleanPage(footer, pageTypes, bricks) : null

  categories = categories.sort(
    (prev, next) => prev.customValues.order - next.customValues.order
  )

  return (
    <Layout>
      {!errorNoKeys && (
        <>
          <Head>
            <title>Categories List</title>
            <meta name="description" content="React Bricks blog starter" />
          </Head>
          {headerOk && !errorHeader ? (
            <PageViewer page={headerOk} showClickToEdit={false} />
          ) : (
            <ErrorNoHeader />
          )}
          <div className="bg-[#f8f9fb] dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-8 py-16">
              <h1 className="max-w-2xl text-4xl sm:text-6xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white pb-4 mt-10 sm:mt-12 mb-4">
                Categories
              </h1>

              <div className="flex flex-wrap flex-col gap-4">
                {categories?.map((category) => {
                  const faqsCategory = faqs
                    .map((faq) => {
                      if (
                        faq.customValues.categoryId.split('_')[0] ===
                        category.id
                      ) {
                        return {
                          props: faq.customValues,
                          slug: faq.slug,
                          id: faq.id,
                        }
                      }
                    })
                    .filter((faq) => faq)
                  return (
                    <div
                      key={category.id}
                      className="shadow-xl bg-white rounded-3xl"
                    >
                      <Category
                        category={{
                          props: category.customValues,
                          name: category.name,
                        }}
                        faqs={faqsCategory}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          {footerOk && !errorFooter ? (
            <PageViewer page={footerOk} showClickToEdit={false} />
          ) : (
            <ErrorNoFooter />
          )}
        </>
      )}
      {errorNoKeys && <ErrorNoKeys />}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  let header: {} | types.Page = {}
  let footer: {} | types.Page = {}
  let errorNoKeys: boolean = false
  let errorHeader: boolean = false
  let errorFooter: boolean = false

  if (!config.apiKey) {
    errorNoKeys = true
    return { props: { errorNoKeys } }
  }
  try {
    const categories = await fetchPages(process.env.API_KEY, {
      type: 'category',
    })
    const faqs = await fetchPages(process.env.API_KEY, {
      type: 'question',
    })

    header = await fetchPage('header', config.apiKey, context.locale).catch(
      () => {
        errorHeader = true
        return {}
      }
    )

    footer = await fetchPage('footer', config.apiKey, context.locale).catch(
      () => {
        errorFooter = true
        return {}
      }
    )

    return {
      props: { categories, faqs, header, footer, errorHeader, errorFooter },
    }
  } catch {
    return { props: { header, footer, errorHeader, errorFooter } }
  }
}

export default BlogList
