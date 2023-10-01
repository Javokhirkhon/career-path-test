import backgroundImage from '../assets/discover-journey-maze.svg'

const Banner = () => (
  <div
    className='flex flex-col justify-end h-72 bg-cover bg-bottom bg-slate-50 px-20'
    style={{ backgroundImage: `url(${backgroundImage})` }}
  >
    <h1 className='font-bold text-4xl'>Career path test</h1>
    <p className='pt-6 pb-12'>
      Discover careers that match your skills and personality
    </p>
  </div>
)

export default Banner
