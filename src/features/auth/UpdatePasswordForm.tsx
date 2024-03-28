import { useForm } from "react-hook-form";
import Button from "../../UI/Button";
import Form from "../../UI/Form";
import FormRow from "../../UI/FormRow";
import Input from "../../UI/Input";

import { useUpdateUser } from "./useUpdateUser";
interface FormData {
  password: string;
  passwordConfirm: string;
}
function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } =
    useForm<FormData>();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }: FormData) {
    updateUser({ password }, { onSuccess: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="New password (min 8 chars)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow buttons={true}>
        <Button onClick={() => reset()} type="reset" $variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
