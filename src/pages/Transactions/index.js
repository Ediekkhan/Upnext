import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { domainResolution } from '../../services'
import {
  customerTransactions,
  confirmService,
  formatDate,
  sendTx,
  PINATA_GATEWAY
} from '../../utils'

const Transactions = () => {

  const [transactions, setTransactions] = useState(undefined)
  const [showTip, setShowTip] = useState(false)
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState('')

  const approveHandler = async (transIndex, vendorAddr) => {
    const res = await confirmService(transIndex, vendorAddr)
    if (res) {
      customerTransactions()
    }
  }

  const sendTip = async domain => {

    if (!amount) return alert('Amount is empty')

    setLoading(true)

    const address = new Promise(async resolve => {
      const r = await domainResolution(domain)
      resolve(r)
    })

    const addr = await address

    if (addr) {
      await sendTx(addr, amount)
      setLoading(false)
      setShowTip(false)
    }
  }


  useEffect( () => {

    const transactionsHandler = async () => {

      const res = await customerTransactions()
      console.log('res ', res)
      setTransactions(res)

    }

    transactionsHandler()

  }, [])

  return (
    <div className="product-container">

      <div className="container">

        <div className="product-main">

          {loading && <div className={'lds-dual-ring'}></div>}

          <h2 className="title">My Transactions</h2>

          <div className="product-grid">

            {transactions && transactions.map(item => (

              <div className="showcase">

                <div className="showcase-banner">
                  <img src={`${PINATA_GATEWAY}/${item.CID}`} alt="transaction" width="300" className={'product-img'} />

                <div className="showcase-content">

                  <small className={item.status}>{item.status}</small>
                  <p><small>Amount: {ethers.utils.formatEther(item.amount.toNumber())} MATIC</small></p>
                  <small>Created {formatDate(item.dateCreated.toNumber())}</small><br/>
                  <div className={'tip-container'}>
                  {item.status === 'Completed' && <small onClick={() => setShowTip(true)}>
                    Tip <span className={'tip'}>{item.UDName}</span>
                  </small>}
                    {showTip && <div className={'tip-form'}>
                      <input onChange={e => setAmount(e.target.value)} type='number' placeholder='Enter amount' />
                      <button onClick={() => sendTip(item.UDName)} className={'btn'}>{'Send Tip'}</button></div>}
                  </div>
                  

                  <div className="price-box">
                    {(item.status === 'In Progress' || item.status === 'Reviewing') &&
                    <button className="btn" onClick={() => approveHandler(item.transactionIndex, item.vendor)}>Confirm</button>
                    }
                  </div>
                </div>
                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  )
}

export default Transactions