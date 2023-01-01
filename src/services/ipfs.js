import axios  from 'axios'

export const IPFS = async (image) => {

  let data = new FormData()

  data.append('file', image, image.name)
  data.append('pinataOptions', '{"cidVersion": 1}')


  let config = {
    method: 'post',
    url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
    headers: {
      'Content-Type': `multipart/form-data boundary=${data._boundary}`,
      'Authorization': `Bearer ${process.env.REACT_APP_PINATA_JWT}`
    },
    data
  }

  const res = await axios(config)

  return res.data.IpfsHash



}

