import { Link } from "react-router-dom";
import Form from "../../UI/Form";
import Heading from "../../UI/Heading";
import AuthInput from "../../UI/AuthInput";
import ProviderContainer from "../../UI/ProviderContainer";
import Button from "../../UI/Button";
import { useForm } from "react-hook-form";
import { useLogin } from "./useLogin";
import AuthLink from "../../UI/AuthLink";
import ErrorFormMessage from "../../UI/FormError";

interface FormData {
  email: string;
  password: string;
}

function LoginAuth() {
  const { register, reset, formState, handleSubmit } = useForm<FormData>();
  const { errors } = formState;
  const { login, isPending } = useLogin();

  function onSubmitHandler({ email, password }: FormData) {
    login(
      { email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <Form $type="login" onSubmit={handleSubmit(onSubmitHandler)}>
      <Heading as={"h3"} style={{ textAlign: "center" }}>
        Login
      </Heading>
      <div style={{ marginTop: "1.6rem" }}>
        <div>
          <AuthInput
            placeholder="Email address"
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
          By logging in, you agree to our{" "}
          <Link style={{ textDecoration: "underline" }} to={"/signup"}>
            Privacy Policy.
          </Link>
        </p>
        <Button $variation="login" $size="login" type="submit">
          Login
        </Button>
        <AuthLink
          text="Don't have an account yet?"
          linkText="Sign up"
          link="/signup"
        />
        <AuthLink
          text="Forgot your password?"
          linkText="Click here"
          link="/signup"
          margin="1rem"
        />
      </div>
    </Form>
  );
}

export default LoginAuth;
