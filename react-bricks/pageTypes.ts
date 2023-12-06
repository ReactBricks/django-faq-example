import { types } from 'react-bricks/frontend'

const pageTypes: types.IPageType[] = [
  {
    name: 'page',
    pluralName: 'pages',
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
    excludedBlockTypes: ['pokemon'],
  },
  {
    name: 'blog',
    pluralName: 'Blog',
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
    allowedBlockTypes: [
      'title',
      'paragraph',
      'big-image',
      'video',
      'code',
      'tweet',
      'tweet-light',
      'blog-title',
      'newsletter-subscribe',
    ],
    excludedBlockTypes: ['pokemon'],
  },
  {
    name: 'pokemon',
    pluralName: 'pokemon',
    getExternalData: (page) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${page.slug}`)
        .then((response) => response.json())
        .then((data) => ({
          ...data,
          imageUrl: `https://img.pokemondb.net/artwork/large/${data.name}.jpg`,
        }))
        .catch((error) => {
          console.log(error)
          return {}
        }),
  },
  {
    name: 'category',
    pluralName: 'categories',
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
    customFields: [
      {
        name: 'order',
        label: 'Order',
        type: types.SideEditPropType.Number,
      },
    ],
  },
  {
    name: 'question',
    pluralName: 'questions',
    defaultLocked: true,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => ['django-faq'],
    slugPrefix: {
      default: 'faq/',
    },
    customFields: [
      {
        name: 'categoryId',
        label: 'Category',
        type: types.SideEditPropType.Relationship,
        relationshipOptions: {
          references: 'category',
          multiple: false,
          label: 'Category',
        },
      },
      {
        name: 'order',
        label: 'Order',
        type: types.SideEditPropType.Number,
      },
      {
        name: 'question',
        label: 'Question',
        type: types.SideEditPropType.Textarea,
      },
      {
        name: 'answer',
        label: 'Answer',
        type: types.SideEditPropType.Textarea,
      },
    ],
  },
  {
    name: 'layout',
    pluralName: 'layout',
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
    isEntity: true,
    excludedBlockTypes: ['pokemon'],
  },
]

export default pageTypes
