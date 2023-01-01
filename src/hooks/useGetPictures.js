import {useContext, useEffect, useState} from 'react'
import { getPictures } from '../utils'
import { PictureContext } from '../context'

export default function useGetPictures() {

  const [pictures, setPictures] = useState(undefined)

  const { refresh, setRefresh } = useContext(PictureContext)

  useEffect(() => {

    const getPicturesHandler = async () => {
      const res = await getPictures()

      setPictures(res)
      setRefresh(false)
    }

    if (refresh) {
      getPicturesHandler()
    }

    getPicturesHandler()
  }, [refresh])

  return pictures

}