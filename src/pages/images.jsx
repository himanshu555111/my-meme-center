import React from 'react'
import { useDispatch } from 'react-redux';
import { getImagesData, deleteImage, getImagesByCatData, getSearchImages } from '../APIs/images';
import { useState, useEffect, useRef } from 'react';
import ViewMediaModel from '../models/view-media-model';
import MyImageCard from '../components/my-image-card';
import { TbMoodConfuzed } from "react-icons/tb"
import { Box } from '@mui/material';





function Images() {

  const [imagesData, setImagesData] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState({});
  const [open, setOpen] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState('All Categories');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [allCategories, setAllCategories] = useState(['All Categories', '#Politics', '#Corporate', '#Gaming', '#SchoolLife', '#Hollywood', '#Songs & Music']);


  const wrapperRef = useRef(null);

  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowCategoryDropdown(false)
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const dispatch = useDispatch();

  useEffect(() => {
    refreshItemsData();
  }, [])

  const refreshItemsData = () => {
    dispatch(getImagesData({ isVeg: true }, data => {
      setImagesData(data?.data);
    }))
  }

  const onClickImage = (res) => {
    setOpen(true);
    setSelectedMedia(res)
  }

  const handleOnCategorySelect = (category) => {
    if (category === 'All Categories') {
      refreshItemsData();
    } else {
      dispatch(getImagesByCatData({ cat: category?.toLowerCase(), isVeg: true }, data => {
        if (data?.data?.status === 'ok') {
          setImagesData(data?.data?.DBResponse)
        }
      }))
    }
    setShowCategoryDropdown(false)
  }

  const handleSearchOnChange = (e) => {
    const { name, value } = e.target;
    setSearchKeyword(value);

  }

  const handleSearchNow = (e) => {
    e.preventDefault();
    if (!searchKeyword) {
      refreshItemsData();
    } else {
      dispatch(getSearchImages({ searchKeyword: searchKeyword, isVeg: true }, data => {
        setImagesData(data?.data?.DBResponse)
      }))
    }
  }

  console.log(searchKeyword, '52')

  return (
    <>
      <form className='pt-6 mx-8'>
        <div class="flex w-full">
          <button onClick={() => {
            setShowCategoryDropdown(state => !state)
          }} id="dropdown-button" data-dropdown-toggle="dropdown" class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">{selectedCategoryName} <svg aria-hidden="true" class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
          {showCategoryDropdown ? <div ref={wrapperRef} id="dropdown" class="z-10 absolute top-36 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
              {allCategories?.map((res, index) => (
                <li key={index} onClick={() => {
                  setSelectedCategoryName(res)
                  handleOnCategorySelect(res.replace("#", ""))
                }}>
                  <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{res}</button>
                </li>
              ))}
            </ul>
          </div> : null}
          <div class="relative w-full">
            <input onChange={handleSearchOnChange} type="search" id="search-dropdown" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search here..." required />
            <button onClick={handleSearchNow} type="submit" class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-my-blue rounded-r-lg border border-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <span class="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>

      {imagesData.length > 0 ?
        <>
          <MyImageCard
            imagesData={imagesData}
            refreshItemsData={refreshItemsData}
            onClickImage={onClickImage}
          />
          <ViewMediaModel
            setOpen={setOpen}
            open={open}
            selectedMedia={selectedMedia}
          />
        </> :
        <>
          <div style={{ alignItems: 'center' }} className='flex flex-col mt-20'>
            <TbMoodConfuzed className="text-[40px] text-gray-400 my-4" />
            <p className='text-sm text-gray-400'>Sorry, No Data found</p>
          </div>
        </>
      }


    </>
  )
}

export default Images