import Heading from "../UI/Heading";
import Row from "../UI/Row";
import UpdatePasswordForm from "../features/auth/UpdatePasswordForm";
import UpdateUserDataForm from "../features/auth/UpdateUserDataForm";

function ProfilePage() {
  return (
    <>
      <Heading as={"h1"}> Update Your Account</Heading>
      <Row>
        <Heading as={"h2"}>Basic Information</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as={"h2"}> Update Your Password</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default ProfilePage;
