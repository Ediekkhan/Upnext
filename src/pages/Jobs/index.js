import { useState, useEffect } from 'react'
import {vendorTransactions, forReview, formatDate} from '../../utils'


const Jobs = () => {

  const [transactions, setTransactions] = useState(undefined)

  const approveHandler = async (transIndex, customerAddr) => {
    const res = await forReview(transIndex, customerAddr)
    console.log(res)
  }


  useEffect( () => {

    const transactionsHandler = async () => {

      const res = await vendorTransactions()
      console.log('res ', res)
      setTransactions(res)

    }

    transactionsHandler()

  }, [])

  return (
    <div className="product-container">

      <div className="container">

        <div className="product-main">

          <h2 className="title">My Jobs</h2>

          <div className="product-grid">

            {transactions && transactions.map(item => (

              <div className="showcase">

                <div className="showcase-banner">
                  <small>Created {formatDate(item.dateCreated.toNumber())}</small><br/>
                  <small>{item.status}</small>

                  <div className="price-box">
                    {item.status === 'In Progress' &&
                      <button className="btn" onClick={() => approveHandler(item.transactionIndex.toNumber(), item.customer)}>
                        Mark Completed
                      </button>
                    }
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

export default Jobs