import { useContext, useState } from 'react'
import useGetPictures from '../../hooks/useGetPictures'
import banner from '../../assets/img/banner.jpg'
import { setDownload, setLike, sendTip, PINATA_GATEWAY } from '../../utils'
import { PictureContext } from '../../context'
import {domainResolution} from "../../services";
import { saveAs } from 'file-saver'


const Home = () => {

  const [tip, setTip] = useState(false)
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('')
  const [domain, setDomain] = useState('')

  const pictures = useGetPictures({refresh: false})

  const { setRefresh } = useContext(PictureContext)

  const download = async (index) => {

    // Download image programmatically.


    saveAs(`${PINATA_GATEWAY}/${pictures[index].URL}`, 'image.jpg') // Put your image url here.

    const res = await setDownload(index)
    if (res) {
      setRefresh(true)
    }
    const tipHandler = ud => {
      setTip(true)
      setDomain(ud)
    }
  }

  const like = async (index) => {

    const res = await setLike(index)
    if (res) {
      setRefresh(true)
    }

  }

  const tipHandler = ud => {
    setTip(true)
    setDomain(ud)
  }

  const sendTipHandler = async () => {

    setLoading(true)
    const address = new Promise(async resolve => {
      const r = await domainResolution(domain)
      resolve(r)
    })

    const addr = await address

    if (addr) {
      const res = await sendTip(addr, value)
      console.log(res)
      setTip(false)
    }

    setLoading(false)
    
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

      {tip && <div className={'sendTipHandler'}>
        <input  className='tip-input'  onChange={e => setValue(e.target.value)} type="number"/>
        <button className='send tips'onClick={() => sendTipHandler()}>{loading ? 'Sending ...' : 'Send Tip'}</button>
      </div>}

      <div className={'pictures'}>
        {pictures && pictures.map((picture, i) => <div key={i}>
        <div className='picture'>
          <div className='img-container'>
            <img src={`${PINATA_GATEWAY}/${picture.URL}`} height="230px" title={picture.desc} alt="please wait"/>
          </div>  
          
          <h3 style={{margin: '16px 0 20px 12px'}}>{picture.name}</h3>

          <div className={'stats'}>

            <div className='outline'>
              <span><ion-icon name="heart-outline"></ion-icon> {picture.likes.toNumber()}</span>
              <button className='react'onClick={() => like(i)}>Like</button>
            </div>

            <div className='outline'>
              <span><ion-icon name="download-outline"></ion-icon> {picture.downloads.toNumber()}</span>
              <button className='react' onClick={() => download(i)}>Download</button>
            </div>

          </div>

      
          <div style={{marginTop: '12px'}}>
            <span className='react tips' onClick={() => tipHandler(picture.UD)}>Tip</span>
            <span>{picture.UD}</span>
          </div>
          
          {/* <button  className='react'onClick={() => like(i)}>Like</button>
          <button className='react' onClick={() => download(i)}>Download</button> */}
          
        </div>

        </div>)}
      </div>


    </main>
  )
}

export default Home