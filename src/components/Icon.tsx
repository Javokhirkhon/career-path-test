import { TIcon } from '../types'

const Icon = ({ icon, border, bg }: TIcon) => (
  <div
    className={`border-2 rounded-full w-16 h-16 flex justify-center items-center ${border} ${bg}`}
  >
    <img src={icon} alt='icon' className='w-7' />
  </div>
)

export default Icon
