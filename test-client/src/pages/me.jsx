import {useState, useEffect} from 'react'

const Me = () => {
    const [user, setUser] = useState()

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token')
            
            const res = await fetch('http://127.0.0.1:5000/api/me', {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            })
            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.error || 'Error fetching user data.')
            }

            const data = await res.json()
            setUser(data)
        } catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        fetchUserData()
    }, [])
    return (
        <>
        {!user ? (
            <div>
                Loading data...
            </div>
        ): (
            <div>
                {user.id} <br />
                {user.username} <br />
                {user.email}
            </div>
        )}   
        </>
    )
}

export default Me;