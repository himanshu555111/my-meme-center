import React, { useEffect, useState } from 'react';
import FabricCanvas from '../components/canvas';

function CreateOwnImage() {
  const pageSizeData = [
    {
      shape: 'Square',
      id: 1,
      width: 720,
      height: 720,
      cssWidth: 20,
      cssHeight: 20,
      isSelected: true
    },
    {
      shape: 'Instagram Reel',
      id: 2,
      width: 720,
      height: 1280,
      cssWidth: 10,
      cssHeight: 20,
      isSelected: false
    },
    {
      shape: 'Youtube',
      id: 3,
      width: 1920,
      height: 1080,
      cssWidth: 20,
      cssHeight: 10,
      isSelected: false
    },
    {
      shape: 'Custom',
      id: 4,
      width: 400,
      height: 600,
      cssWidth: 4,
      cssHeight: 20,
      isSelected: false
    }
  ]
  const [pageSize, setPageSize] = useState(pageSizeData);


  const onClickSize = (res) => {
    const updatedPageSize = pageSize.map((item) => ({
      ...item,
      isSelected: item.id === res.id,
    }));
    setPageSize(updatedPageSize);

  }



  return (
    <>
     <div className='w-full shadow-lg h-auto p-4 flex justify-between items-center fixed z-10 bg-white'>
        <div className='flex items-center'>
          <div className='flex flex-row items-center '>
            <p className='text-sm mr-1'>Width:</p>
            <input type='number' className='border-2 border-black rounded w-20'></input>
            <div className='bg-white px-1 rounded'><p className='text-gray-400'>px</p></div>
          </div>
          <div className='flex flex-row items-center ml-2'>
            <p className='text-sm mr-1'>Height:</p>
            <input type='number' className='border-2 border-black rounded w-20'></input>
            <div className='bg-white px-1 rounded'><p className='text-gray-400'>px</p></div>
          </div>
        </div>
      </div>
      
      <div className='flex flex-row'>
        <div className='w-32 bg-white shadow-lg flex flex-col overflow-y-auto max-h-screen items-center'>
          <p className='text-sm bg-white p-1 rounded font-bold'>Select Size</p>
          <div className='flex flex-col items-center justify-center'>
            {
              pageSize?.map((res, index) => {

                return (
                  <div key={index} onClick={() => onClickSize(res)} className={`flex flex-col items-center justify-center hover:bg-gray-100 hover:cursor-pointer p-2 my-2 rounded ${res?.isSelected ? 'bg-gray-100' : null}`}>
                    <div className={` h-${res?.cssHeight?.toString()} w-${res?.cssWidth?.toString()} border-my-blue border-2 bg-white shadow-md`}>
                    </div>
                    <p className='text-xs mt-1'>{res?.shape}</p>
                    <p className='text-xs text-gray-400'> W: {res?.width}px </p>
                    <p className='text-xs text-gray-400'> H: {res?.height}px </p>
                  </div>
                )
              })
            }
            <div className='h-[2px] w-full bg-gray-300'></div>
          </div>
        </div>
        <div className='bg-gray-100 px-[16rem] py-10'>
          <FabricCanvas pageSize={pageSize} />
        </div>
      </div>




    </>
  )
}

export default CreateOwnImage


