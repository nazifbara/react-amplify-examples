import { React } from 'react'
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react'

function Admin() {
  return (
    <div>
      <h1 style={titleStyle}>Admin</h1>
    </div>
  )
}

const titleStyle = {
  fontWeight: 'normal',
  margin: '0px 0px 10px 0px'
}

export default Admin
