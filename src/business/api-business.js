const create = async(params, credentials, business) => {
    try {
        let response = await fetch('http://localhost:4000/api/business/by/'+params.businessId, {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Authorization':'Bearer ' + credentials.t
            },
            body: business
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

const list = async(signal) =>{
    try {
        let response = await fetch('http://localhost:4000/api/businesses', {
            method:'GET',
            signal: signal
        })
        return response.json()
    } catch (error) {
        
    }
}

const listByOwner = async(params, credentials, signal) => {
    try {
        let response = await fetch('http://localhost:4000/api/business/by/'+params.userId, {
            method:'GET',
            signal: signal,
            headers:{
                'Accept':'application/json',
                'Authorization':'Bearer ' + credentials.t
            }
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

const read = async(params, signal) =>{
    try {
        let response= await fetch('http://localhost:4000/api/business/'+params.businessId, {
            method: 'GET',
            signal: signal
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

const update = async(params, credentials, business) =>{
    try {
        let response= await fetch('http://localhost:4000/api/business/'+params.businessId, {
            method: 'GET',
            headers:{
                'Accept':'application/json',
                'Authorization':'Bearer '+ credentials.t
            },
            body: business
        })
        return response.json()
    } catch (error) {
        console.log(error)     
    }   
}

const remove = async(params, credentials) => {
    try {
        let response= await fetch('http://localhost:4000/api/business/'+params.businessId, {
            method: 'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Bearer '+credentials.t
            }
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}
export {
    create, list, listByOwner, read, update, remove
}