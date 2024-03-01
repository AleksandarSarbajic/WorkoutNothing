import { Link } from "react-router-dom";
import Form from "../../UI/Form";
import Heading from "../../UI/Heading";
import AuthInput from "../../UI/AuthInput";
import ProviderContainer from "../../UI/ProviderContainer";
import Button from "../../UI/Button";
import { useForm } from "react-hook-form";
import AuthLink from "../../UI/AuthLink";
import ErrorFormMessage from "../../UI/FormError";
import useSignup from "./useSignup";

interface FormData {
  email: string;
  password: string;
  userName: string;
}

function SignUpAuth() {
  const { register, reset, formState, handleSubmit } = useForm<FormData>();
  const { errors } = formState;
  const { signup, isPending } = useSignup();

  function onSubmitHandler({ userName, email, password }: FormData) {
    signup(
      { userName, email, password },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  }

  return (
    <Form $type="login" onSubmit={handleSubmit(onSubmitHandler)}>
      <Heading as={"h3"} style={{ textAlign: "center" }}>
        Sign Up
      </Heading>
      <div style={{ marginTop: "1.6rem" }}>
        <div>
          <AuthInput
            placeholder="Username"
            type="text"
            id="userName"
            autoComplete="userName"
            {...register("userName", {
              required: "This field is required",
            })}
            disabled={isPending}
          />
          {errors?.userName && (
            <ErrorFormMessage>
              {errors?.userName?.message?.toString()}
            </ErrorFormMessage>
          )}
        </div>
        <div>
          <AuthInput
            placeholder="Email address"
            style={{ borderTop: "none" }}
            type="email"
            id="email"
            autoComplete="email"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address",
              },
            })}
            disabled={isPending}
          />
          {errors?.email && (
            <ErrorFormMessage>
              {errors?.email?.message?.toString()}
            </ErrorFormMessage>
          )}
        </div>
        <div>
          <AuthInput
            placeholder="Password"
            style={{ borderTop: "none" }}
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            })}
            disabled={isPending}
          />
          {errors?.password && (
            <ErrorFormMessage>
              {errors?.password?.message?.toString()}
            </ErrorFormMessage>
          )}
        </div>
        <ProviderContainer />
        <p style={{ fontSize: "1.4rem", fontWeight: "400" }}>
          By signing up, you have read our{" "}
          <Link style={{ textDecoration: "underline" }} to={"/signup"}>
            Privacy Policy
          </Link>{" "}
          and consent to receiving Nothing marketing communications.
        </p>
        <Button $variation="login" $size="login" type="submit">
          Sign Up
        </Button>
        <AuthLink
          text="Already have an account?"
          linkText="Sign in"
          link="/login"
        />
      </div>
    </Form>
  );
}

export default SignUpAuth;
