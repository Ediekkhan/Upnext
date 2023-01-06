import { useContext, useState } from 'react'
import useGetPictures from '../../hooks/useGetPictures'
import banner from '../../assets/img/banner.jpg'
import { setDownload, setLike, sendTip, PINATA_GATEWAY } from '../../utils'
import { PictureContext } from '../../context'
import {domainResolution} from "../../services";
import { saveAs } from 'file-saver'


const Home = () => {

  const [tip, setTip] = useState(false)
  const [value, setValue] = useState('')

  const pictures = useGetPictures({refresh: false})

  const { setRefresh } = useContext(PictureContext)

  const download = async (index) => {

    // Download image programmatically.

    // const blob = new Blob([output]);                   // Step 3
    // const fileDownloadUrl = URL.createObjectURL(blob); // Step 4
    // this.setState ({fileDownloadUrl: fileDownloadUrl}, // Step 5
    //   () => {
    //     this.dofileDownload.click();                   // Step 6
    //     URL.revokeObjectURL(fileDownloadUrl);          // Step 7
    //     this.setState({fileDownloadUrl: ""})
    // })

    saveAs(`${PINATA_GATEWAY}/${pictures[index].URL}`, 'image.jpg') // Put your image url here.

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
          <img src={`${PINATA_GATEWAY}/${picture.URL}`} width={'300px'} height={'320px'} title={picture.desc} alt="please wait"/>
          {picture.name}

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

          <span>{picture.UD}</span>
          <button className='react' onClick={() => setTip(true)}>Tip</button>
          {/* <button  className='react'onClick={() => like(i)}>Like</button>
          <button className='react' onClick={() => download(i)}>Download</button> */}
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