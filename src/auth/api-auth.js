const signin = async (user) => {
    try {
      let response = await fetch('http://localhost:4000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'http://localhost:4000'
        },
        credentials: 'include',
        body: JSON.stringify(user)
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
const adminSignin = async (user) => {
    try {
      let response = await fetch('/auth/admin/signin/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(user)
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  const signout = async () => {
    try {
      let response = await fetch('http://localhost:4000/auth/signout/', { method: 'GET' })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  export {
    signin,
    adminSignin,
    signout
  }