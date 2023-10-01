import { TCard } from '../types'
import Icon from './Icon'

const Card = ({ icon, border, bg, title, desc }: TCard) => (
  <div className='flex-1 h-auto border-2 rounded-lg px-14 py-8 relative shadow-md'>
    <div className='absolute -left-8 top-1/2 transform -translate-y-1/2 w-10'>
      <Icon {...{ icon, border, bg }} />
    </div>
    <h2 className='font-bold mb-2'>{title}</h2>
    <p>{desc}</p>
  </div>
)

export default Card
