import React from "react";
import { Form, Field } from "@leveluptuts/fresh";
import "./styles.css";

export default function App() {
  return (
    <Form formId="less-simple" onSubmit={() => {}}>
      <Field>Name</Field>
      <Field type="email">Email</Field>
      <Field type="password">Password</Field>
      <Field type="tags">Tags</Field>
      <Field type="number">Number</Field>
      <Field required type="select" options={[1, 2, 3, 4, 5]}>
        Type
      </Field>
      <Field
        required
        type="select"
        displayProperty="name"
        valueProperty="value"
        options={[
          { name: "Scott", value: "scott-tolinski" },
          { name: "Wes", value: "wes-bos" }
        ]}
      >
        Author
      </Field>
      <Field type="textarea">Text Area</Field>
      <Field type="markdown">Markdown</Field>
      <Field type="toggle">Toggle</Field>
    </Form>
  );
}
