import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../UI/Heading";
import Row from "../UI/Row";

function SettingsPage() {
  return (
    <Row>
      <Heading as="h1">Settings</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default SettingsPage;
