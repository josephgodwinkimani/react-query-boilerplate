import "./UsersContainer.css";

import { HttpResponse } from "@capacitor/core";
import { useMutation } from "@tanstack/react-query";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";

import queryClient from "../query";
import { doPost } from "../query/api";

interface ContainerProps {}

interface MyFormValues {
  first_name: string;
  last_name: string;
  id?: number;
}

const NewUserContainer: React.FC<ContainerProps> = () => {
  const initialValues: MyFormValues = { first_name: "", last_name: "" };
  const mutation = useMutation({
    // use a required function to perform an asynchronous task and return a promise
    mutationFn: (data: MyFormValues) => {
      return doPost("https://reqres.in/api/users", data);
    },
    // use a function to fire before the mutation function is fired and is passed the same variables the mutation function would receive
    onMutate: async (newUser) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["users"] });

      // Snapshot the previous value
      const previousUsers = queryClient.getQueryData(["users"]);

      // Optimistically update to the new value
      // queryClient.setQueryData(["users"], (old) => [...old, newUser])

      // Return a context object with the snapshotted value
      return { previousUsers };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (
      err,
      newUser,
      context:
        | {
            previousUsers: unknown;
          }
        | undefined,
    ) => {
      queryClient.setQueryData(["users"], context?.previousUsers);
    },
    // If the mutation suceeds
    // use synchronous function to immediately update a query's cached data
    onSuccess: (
      response: HttpResponse,
      variables: MyFormValues,
      context:
        | {
            previousUsers: unknown;
          }
        | undefined,
    ) => {
      queryClient.setQueryData(["users"], (old: any) => [...old, variables]);
      console.log(response.data);
    },
  });

  return (
    <div id="container2">
      <Formik
        initialValues={initialValues}
        onSubmit={(
          values: MyFormValues,
          actions: FormikHelpers<MyFormValues>,
        ) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          mutation.mutate({
            id: 276,
            first_name: values.first_name,
            last_name: values.last_name,
          });
          actions.setSubmitting(false);
        }}
      >
        <Form>
          <label htmlFor="first_name">First Name</label>
          <Field id="first_name" name="first_name" placeholder="First Name" />
          <label htmlFor="last_name">Last Name</label>
          <Field id="last_name" name="last_name" placeholder="Last Name" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default NewUserContainer;
