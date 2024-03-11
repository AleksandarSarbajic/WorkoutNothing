import ButtonText from "../UI/ButtonText";
import Heading from "../UI/Heading";
import Row from "../UI/Row";
import UpdatePasswordForm from "../features/auth/UpdatePasswordForm";
import UpdateUserDataForm from "../features/auth/UpdateUserDataForm";
import { useMoveBack } from "../hooks/useMoveBack";

function ProfilePage() {
  const moveBack = useMoveBack();
  return (
    <>
      <Row $type="horizontal">
        <Heading as={"h1"}> Update Your Account</Heading>
        <ButtonText style={{ fontSize: "2rem" }} onClick={moveBack}>
          &larr; Back
        </ButtonText>
      </Row>
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
