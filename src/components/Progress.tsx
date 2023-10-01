const Progress = ({ percentage }: { percentage: number }) => (
  <div className='border-b-2 flex items-center gap-8 p-8'>
    Your progress - {percentage}%
    <div className='w-48 h-5 bg-gray-300 rounded-full overflow-hidden'>
      <div
        className='h-full bg-blue-400 transition-all'
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
)

export default Progress
