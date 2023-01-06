import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { createPicture } from '../../utils'
import {IPFS, domainResolution, login, logout} from '../../services'
import useGetPictures from '../../hooks/useGetPictures'
import { PictureContext } from '../../context'


const Header = () => {

  const [refresh, seRefresh] = useState(false)
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [UD, setUD] = useState('')
  const [domain, setDomain] = useState('')
  const [image, setImage] = useState('')
  const [address, setAddress] = useState('')

  const { setRefresh } = useContext(PictureContext)

  const showForm = () => {
    if (!address) return alert('Connect wallet first to proceed')
    setModal(true)
  }

  const domainHandler = async value => {
    try {
      const res = await domainResolution(value)
      if (res) {
        setUD(value)
        setDomain(res)
      }
    } catch (e) {
      console.log(e)
    }

  }

  const submitHandler = async e => {
  e.preventDefault()
  
    // if (
    //   name === '' ||
    //   UD === '' ||
    //   desc === ''
    // ) {
    //   return
    // }
    alert("done")
    setLoading(true)

    let url = new Promise(async resolve => {
      const res = await IPFS(image)
      resolve(res)
    })

    url = await url

    const res = await createPicture(name, desc, UD, url)
    if (res) {
      setLoading(false)
      setRefresh(true)
      setModal(false)
    }
  }

  const connectDisconnect = async () => {
debugger
    const result = localStorage.getItem('domain')

    if (result) {

      await logout()
      localStorage.clear()
      setAddress('')

    } else {

      try {
        let res = await login()
        console.log(res)
        localStorage.setItem('domain', res.idToken.sub)
        setAddress(res.idToken.sub)
      } catch (e) {
        console.log(e)
      }


    }
  }

  const cancel = () => {
    setModal(false)
    setLoading(false)
    document.getElementsByClassName('form').reset()
  }


  useEffect(() => {
    const domain = localStorage.getItem('domain')
    if (domain) {
      setAddress(domain)
    }
  }, [setAddress])

  return (
    <header>

      <div className="header-main">

        <div className="container">

          <Link to='/' className="header-logo">
            Upnexxt
          </Link>

          <div className={'links'}>
            <button className={'banner-btn upload-image'} onClick={showForm}>Upload Image</button>
          </div>

          <div className="header-user-actions">
            <button onClick={connectDisconnect} className={'banner-btn btn-address'}>
              {address ? `${address} - Disconnect` : 'Connect Wallet'}
            </button>
          </div>

        </div>

      </div>

      {modal && <div className={'app-modal'}>
        <span className={'close'} onClick={cancel}>&#x2715; </span>
        <form className={'form'}>
          <input onChange={e => setName(e.target.value)} placeholder={'Image Name'}/>
          <input onChange={e => setDesc(e.target.value)} placeholder={'Image Description'}/>
          <input onBlur={e => domainHandler(e.target.value)} placeholder={'UD'}/>
          {domain && <small>{domain}</small>}
          <input type={'file'} onChange={e => setImage(e.target.files[0])} placeholder={'Business logo'}/>
          <button className={'banner-btn'} onClick={submitHandler}>{loading ? 'Submitting ...' : 'Submit'}</button>
        </form>
      </div>}

    </header>
  )
}

export default Header