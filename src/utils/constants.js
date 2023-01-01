export const TRANSACTION_STATUS = index => {
  const status = [
    'Cancelled',
    'InProgress',
    'Reviewing',
    'Completed'
  ]
  return status[index]
}

export const PINATA_GATEWAY = 'https://gateway.pinata.cloud/ipfs'