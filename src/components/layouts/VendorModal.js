import { useContext, useState } from 'react'
import { createVendor } from '../../utils'
import { addToIPFS, domainResolution } from '../../services'
import { VendorContext } from '../../contexts/AppContext'


const VendorModal = ({ closeTxModal }) => {

  const { setUpdateVendor } = useContext(VendorContext)

  const [loading, setLoading] = useState(false)
  const [businessName, setBusinessName] = useState('')
  const [profession, setProfession] = useState('default')
  const [image, setImage] = useState('')
  const [serviceCharge, setServiceCharge] = useState('')
  const [domain, setDomain] = useState('')
  const [description, setDescription] = useState('')
  const [ud, setUd] = useState('')

  const createVendorHandler = async () => {

    if (isNotValid()) return alert('All fields are required')

    setLoading(true)

    let CID = new Promise(async resolve => {
      const res = await addToIPFS(image)
      resolve(res)
    })

   CID = await CID

    const res = await createVendor(businessName, profession, domain, CID, description, serviceCharge)
    if (res) {
      setLoading(false)
      setUpdateVendor(true)
      document.getElementById('form').reset()
      closeModal()
    } else {
      setLoading(false)
      document.getElementById('form').reset()
    }
  }

  const closeModal = () => {
    closeTxModal()
  }

  const isNotValid = () => {
    let res = false
    if (
      businessName === '' ||
      profession === 'default' ||
      image === '' ||
      serviceCharge === '' ||
      domain === '' ||
      description === ''
    ) {
      res = true
    }

    return res
  }

  const setDomainRes = async () => {
    const res = await domainResolution(domain)
    setUd(res)
  }


 return (
   <form id={'form'}>
     <input onChange={e => setBusinessName(e.target.value)} placeholder={'Business name'}/>
     <select value={profession} onChange={e => setProfession(e.target.value)}>
       <option value="default" disabled hidden>Select Skill</option>
       <option value="Software_Engineer">Software Engineer</option>
       <option value="Graphics Designer">Graphics Designer</option>
       <option value="UI/UX Designer">UI/UX Designer</option>
       <option value="DevOps Engineer">DevOps Engineer</option>
       <option value="Digital Marketer">Digital Marketer</option>
       <option value="Project Manager">Project Manager</option>
     </select>
     <input type={'file'} onChange={e => setImage(e.target.files[0])} placeholder={'Business logo'}/>
     <div id="input-btn-container">
      <input onChange={e => setDomain(e.target.value)} placeholder={'UD domain'}/>
      <input onClick={() => setDomainRes()} className={'input-btn'} type="button" value="Resolve Address" /> 
      <small>{ud}</small>
     </div>
    
     <input onChange={e => setServiceCharge(e.target.value)} type={'number'} min={0} placeholder={'Service charge'}/>
     <textarea minLength={10} maxLength={50} onChange={e => setDescription(e.target.value)} placeholder={'Description'}/>
     <div className={'modal-btns'}>
       <button className={'btn cancel'} onClick={closeModal}>Cancel</button>
       <button className={'btn'} type={'button'} onClick={createVendorHandler}>
         {loading ? 'Submitting...' : 'Submit'}
       </button>
     </div>

   </form>
 )
}

export default VendorModal