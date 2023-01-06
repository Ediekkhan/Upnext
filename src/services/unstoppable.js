
import UAuth from '@uauth/js'
import { Resolution }  from '@unstoppabledomains/resolution'

const resolution = new Resolution()


const uauth = new UAuth({
  // clientID: '517e5112-cd4e-42a1-9959-883451fcaafb',
  clientID: '7e848bbc-0aff-4a54-bd81-1b6abd338b69',
  // redirectUri: 'https://myhelpa.netlify.app',
  // redirectUri: 'http://localhost:3000',
  redirectUri: 'https://upnexxt.netlify.app',
  scope: 'openid wallet email profile:optional social:optional'
})

export const domainResolution = async domain => {
  try{
    return await resolution.addr(domain, 'ETH')
  }catch(err){
    console.log(err)
  }
}


export const login = async () => {
  return await uauth.loginWithPopup()
}

export const logout = async () => {
  return await uauth.logout()
}
