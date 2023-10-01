import graduation from '../assets/graduation.svg'

const Submission = ({ date }: { date: string }) => (
  <div className='border-2  my-8 shadow-md rounded-[50px] overflow-hidden'>
    <img
      src={graduation}
      alt='graduation'
      className='w-full h-60 object-cover bg-orange-400'
    />
    <div className='p-8'>
      <div className='font-bold'>
        Completed on {new Date(date).toUTCString()}
      </div>
      <div className='my-4'>
        Well done on completing your test. You can view the results now.
      </div>
      <button className='bg-orange-400 rounded-lg font-bold py-4 px-16'>
        See your results
      </button>
    </div>
  </div>
)

export default Submission
