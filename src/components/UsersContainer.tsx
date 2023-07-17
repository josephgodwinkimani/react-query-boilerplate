import "./UsersContainer.css";

import { HttpResponse } from "@capacitor/core";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import React, {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";

import { doGet } from "../query/api";

interface ContainerProps {}

const UsersContainer: React.FC<ContainerProps> = () => {
  const usersQuery: UseQueryResult<any, unknown> = useQuery({
    // use a query key to use for this query. It will be hashed into a stable hash.
    queryKey: ["users"],
    // use a function that the query will use to request data.
    queryFn: () =>
      doGet("https://reqres.in/api/users").then(
        (res: HttpResponse) => res.data.data,
      ),
    enabled: true,
    networkMode: "offlineFirst",
    // set to false so that the query will not be retried on mount if it contains an error.
    retryOnMount: true,
    // apply exponential backoff
    retryDelay: (attempt: number) =>
      Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
    staleTime: 1000,
    // If set to true, the query will refetch on mount if the data is stale.
    refetchOnMount: true,
    // If set to false, the query will not refetch on window focus.
    refetchOnWindowFocus: "always",
    // If set to "always", the query will always refetch on reconnect.
    refetchOnReconnect: "always",
    // If set, any previous data will be kept when fetching new data because the query key changed.
    keepPreviousData: false,
    // onError: (error: any) => <h1>{JSON.stringify(usersQuery.error)}</h1>
    // If set, stores additional information on the query cache entry that can be used as needed. It will be accessible wherever the query is available, and is also part of the QueryFunctionContext provided to the queryFn.
    meta: {
      persist: false,
    },
  });

  if (usersQuery.status === "loading") return <h1>Fetching ...</h1>;
  if (usersQuery.status === "error") {
    return <h1>{JSON.stringify(usersQuery.error)}</h1>;
  }

  return (
    <div id="container">
      {usersQuery.data.map(
        (user: {
          id: Key | null | undefined;
          first_name:
            | string
            | number
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | ReactPortal
            | null
            | undefined;
          last_name:
            | string
            | number
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | ReactPortal
            | null
            | undefined;
          email:
            | string
            | number
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | ReactPortal
            | null
            | undefined;
        }) => (
          <li key={user.id}>
            {user.first_name} {user.last_name}
          </li>
        ),
      )}
    </div>
  );
};

export default UsersContainer;
