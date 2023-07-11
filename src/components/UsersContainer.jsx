import './UsersContainer.css'
import { useQuery } from '@tanstack/react-query'
import { doGet } from '../query/api'

const UsersContainer = () => {
    const usersQuery = useQuery({
        queryKey: ['users'],
        queryFn: () =>
            doGet('https://reqres.in/api/users').then((res) => res.data),
    })

    if (usersQuery.status === 'loading') return <h1>Loading...</h1>
    if (usersQuery.status === 'error') {
        return <h1>{JSON.stringify(usersQuery.error)}</h1>
    }
    return (
        <div id="container">
            {usersQuery.data.data.map((user) => (
                <li key={user.id}>
                    {user.first_name} {user.last_name} - {user.email}
                </li>
            ))}
        </div>
    )
}

export default UsersContainer
