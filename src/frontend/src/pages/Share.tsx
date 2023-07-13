import React from 'react'

function Share() {
  return (
    <div
      className='pt-12'
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 32,
        paddingBottom: 32,
        maxWidth: 996,
        margin: '0 auto',
      }}
    >
      <div
        className='w-2/4 border p-4 relative rounded-md pt-8 pb-8'
      >
        <h2 className='absolute -top-4 pl-1 pr-1 bg-white'>Share a Youtube movie</h2>
        <label htmlFor="url">Youtube URL</label>
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-700 ">
          <input type="text" name="url" id="url" className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
        </div>

        <button type="submit" className="w-full mt-4 rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">Share</button>
      </div>
    </div>
  )
}

export default Share