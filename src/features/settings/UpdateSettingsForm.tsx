import { Link } from "react-router-dom";
import Form from "../../UI/Form";
import FormRow from "../../UI/FormRow";
import Heading from "../../UI/Heading";
// import Input from "../../UI/Input";
import Select from "../../UI/Select";
import Spinner from "../../UI/Spinner";
import { Database } from "../../services/supabase";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";
import styled from "styled-components";
import useWorkouts from "../workout/useWorkouts";

const StyledLink = styled(Link)`
  font-size: 1.7rem;
  transform: all 0.3s;
  &:hover {
    color: var(--color-brand-500);
  }
`;

function UpdateSettingsForm() {
  const {
    isLoading,
    settings = {} as Database["public"]["Tables"]["settings"]["Row"],
  } = useSettings();
  const { updateSetting, isUpdating } = useUpdateSetting();
  const { workouts, isLoading: isLoadingWorkouts } = useWorkouts();

  function handleUpdate(
    e: React.ChangeEvent<HTMLSelectElement>,
    field: string
  ) {
    const { value } = e.target;

    if (!value) return;

    updateSetting({
      [field]: value === "true" ? true : value === "false" ? false : value,
    });
  }

  if (isLoading || isLoadingWorkouts) return <Spinner />;

  return (
    <Form>
      <Heading as="h1" style={{ margin: "1rem 0 2rem" }}>
        Profile
      </Heading>
      <FormRow>
        <StyledLink to={"profile"}>Edit</StyledLink>
      </FormRow>

      <Heading as="h2" style={{ margin: "4rem 0 2rem" }}>
        Units & Localization
      </Heading>
      <FormRow label="Weight">
        <Select
          disabled={isUpdating}
          value={settings?.weight ?? undefined}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleUpdate(e, "weight")
          }
          options={[
            { value: "lbs", label: "lbs" },
            { value: "kg", label: "kg" },
          ]}
        />
      </FormRow>
      <FormRow label="Distance">
        <Select
          disabled={isUpdating}
          value={settings?.distance ?? undefined}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleUpdate(e, "distance")
          }
          options={[
            { value: "m/km", label: "m/km" },
            { value: "ft/miles", label: "ft/miles" },
          ]}
        />
      </FormRow>
      <FormRow label="Size">
        <Select
          disabled={isUpdating}
          value={settings?.size ?? undefined}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleUpdate(e, "size")
          }
          options={[
            { value: "cm", label: "cm" },
            { value: "in", label: "in" },
          ]}
        />
      </FormRow>
      <FormRow label="First weekday">
        <Select
          disabled={isUpdating}
          value={settings?.first_day ?? undefined}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleUpdate(e, "first_day")
          }
          options={[
            { value: "monday", label: "Monday" },
            { value: "saturday", label: "Saturday" },
            { value: "sunday", label: "Sunday" },
          ]}
        />
      </FormRow>
      <Heading as="h2" style={{ margin: "3rem 0 2rem" }}>
        General
      </Heading>
      <FormRow label="Timer increment value">
        <Select
          disabled={isUpdating}
          value={settings?.timer_value ?? undefined}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleUpdate(e, "timer_value")
          }
          options={[
            { value: 5, label: "5s" },
            { value: 10, label: "10s" },
            { value: 15, label: "15s" },
            { value: 30, label: "30s" },
          ]}
        />
      </FormRow>
      <FormRow label="Sound Effect">
        <Select
          disabled={isUpdating}
          value={settings?.sound ?? "boxingBell"}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleUpdate(e, "sound")
          }
          options={[
            { value: "boxingBell", label: "Boxing Bell" },
            { value: "confirmation", label: "Confirmation" },
            { value: "doorBell", label: "Door Bell" },
            { value: "iphone", label: "Iphone" },
            { value: "positive", label: "Positive" },
            { value: "software", label: "Software" },
            { value: "ting", label: "Ting" },
          ]}
        />
      </FormRow>
      <FormRow label="Enable Sound">
        <Select
          disabled={isUpdating}
          value={`${settings?.sound_effect}` ?? "False"}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleUpdate(e, "sound_effect")
          }
          options={[
            { value: "false", label: "False" },
            { value: "true", label: "True" },
          ]}
        />
      </FormRow>
      <Heading as="h2" style={{ margin: "3rem 0 2rem" }}>
        Contact and Support
      </Heading>
      <FormRow>
        <StyledLink to={"profile"}>Twitter</StyledLink>
      </FormRow>
      <FormRow>
        <StyledLink to={"profile"}>Github</StyledLink>
      </FormRow>
      <FormRow>
        <StyledLink to={"profile"}>Instagram</StyledLink>
      </FormRow>
      <FormRow>
        <StyledLink to={"profile"}>Facebook</StyledLink>
      </FormRow>
      {workouts?.length !== 0 && (
        <FormRow>Workouts logged : {workouts?.length}</FormRow>
      )}
    </Form>
  );
}

export default UpdateSettingsForm;
