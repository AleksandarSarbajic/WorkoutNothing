import { useState } from "react";

import Button from "../../UI/Button";

import Form from "../../UI/Form";
import FormRow from "../../UI/FormRow";
import Input from "../../UI/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import UpdateAvatar from "../../UI/UpdateAvatar";
import Select from "../../UI/Select";

function UpdateUserDataForm() {
  const { user } = useUser();

  const currentFullName =
    user?.user_metadata.full_name || user?.user_metadata.userName;
  const currentGender = user?.user_metadata.gender || "male";
  const { updateUser, isUpdating } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [gender, setGender] = useState(currentGender);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName) return;
    updateUser({ userName: fullName, gender });
  }

  function handleCancel() {
    setFullName(currentFullName);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={user?.email} disabled />
      </FormRow>

      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Gender">
        <Select
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
          ]}
          value={currentGender}
          onChange={(e) => setGender(e.target.value)}
          disabled={isUpdating}
        />
      </FormRow>

      <UpdateAvatar
        avatar={
          user?.user_metadata.profile_picture
            ? user?.user_metadata.profile_picture
            : user?.user_metadata.avatar_url
        }
      />

      <FormRow>
        <Button
          type="reset"
          $variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
