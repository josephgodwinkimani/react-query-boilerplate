import { UseQueryResult, useQuery } from '@tanstack/react-query';
import './UsersContainer.css';
import { doGet } from '../query/api';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';
import { HttpResponse } from '@capacitor/core';

interface ContainerProps { }

const UsersContainer: React.FC<ContainerProps> = () => {
  const usersQuery: UseQueryResult<any, unknown> = useQuery({
    queryKey: ['users'],
    queryFn: () =>
      doGet('https://reqres.in/api/users').then((res: HttpResponse) => res.data),
  })

  if (usersQuery.status === 'loading') return <h1>Loading...</h1>
  if (usersQuery.status === 'error') {
    return <h1>{JSON.stringify(usersQuery.error)}</h1>
  }

  return (
    <div id="container">
      {usersQuery.data.data.map((user: { id: Key | null | undefined; first_name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; last_name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; email: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
        <li key={user.id}>
          {user.first_name} {user.last_name} - {user.email}
        </li>
      ))}
    </div>
  );
};

export default UsersContainer;
