import { types } from 'react-bricks/frontend'

import HeroUnit from './custom/MyHeroUnit'
import Faq from './custom/Faq'
import Pokemon from './custom/Pokemon'
import reactBricksUITheme from './react-bricks-ui'

const bricks: types.Theme[] = [
  reactBricksUITheme, // React Bricks UI
  {
    themeName: 'Default',
    categories: [
      {
        categoryName: 'Hero sections',
        bricks: [HeroUnit], // Custom Bricks
      },
      {
        categoryName: 'Django',
        bricks: [Faq],
      },
      {
        categoryName: 'Pokemon',
        bricks: [Pokemon], // External data Bricks
      },
    ],
  },
]

export default bricks
