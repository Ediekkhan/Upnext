import { useContext, useState } from 'react'
import useGetPictures from '../../hooks/useGetPictures'
import banner from '../../assets/img/banner.jpg'
import { setDownload, setLike, sendTip, PINATA_GATEWAY } from '../../utils'
import { PictureContext } from '../../context'
import {domainResolution} from "../../services";


const Home = () => {

  const [tip, setTip] = useState(false)
  const [value, setValue] = useState('')

  const pictures = useGetPictures({refresh: false})

  const { setRefresh } = useContext(PictureContext)

  const download = async (index) => {

    // Download image programmatically.
    


    const res = await setDownload(index)
    if (res) {
      setRefresh(true)
    }

  }

  const like = async (index) => {

    const res = await setLike(index)
    if (res) {
      setRefresh(true)
    }

  }

  const sendTipHandler = async (domain) => {

    const address = new Promise(async resolve => {
      const r = await domainResolution(domain)
      resolve(r)
    })

    const addr = await address

    if (addr) {
      const res = await sendTip(addr, value)
      console.log(res)
    }

  }

  return (
    <main>
      <div className="banner">

        <div className="container">

          <div className="slider-container has-scrollbar">

            <div className="slider-item">

              <img src={banner} alt="banner" className="banner-img" />

              <div className="banner-content">

                <h2 className="banner-title">Beauty to behold</h2>

                <p className="banner-text">
                  The finest of them all!
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      <div className={'pictures'}>
        {pictures && pictures.map((picture, i) => <div key={i}>
        <div>
          <img src={`${PINATA_GATEWAY}/${picture.URL}`} width={'300px'} height={'350px'} title={picture.desc}/>
          {picture.name}
          <div className={'stats'}>
            <span><ion-icon name="heart-outline"></ion-icon> {picture.likes.toNumber()}</span>
            <span><ion-icon name="download-outline"></ion-icon> {picture.downloads.toNumber()}</span>
          </div>
          <span>{picture.UD}</span>
          <button onClick={() => setTip(true)}>Tip</button>
          <button onClick={() => like(i)}>Like</button>
          <button onClick={() => download(i)}>Download</button>
          {tip && <div className={''}>
            <input onChange={e => setValue(e.target.value)} type="number"/>
            <button onClick={() => sendTipHandler(picture.UD)}>Send Tip</button>
          </div>}
        </div>

        </div>)}
      </div>


    </main>
  )
}

export default Home