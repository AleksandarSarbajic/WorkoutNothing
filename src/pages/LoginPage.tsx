import AuthLayout from "../UI/AuthLayout";
import LoginAuth from "../features/auth/LoginAuth";

function LoginPage() {
  return (
    <AuthLayout
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100dvh",
      }}
    >
      <LoginAuth />
    </AuthLayout>
  );
}

export default LoginPage;
