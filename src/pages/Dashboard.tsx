import styled from "styled-components";
import Heading from "../UI/Heading";
import Row from "../UI/Row";
import { useUser } from "../features/auth/useUser";
import useWorkouts from "../features/workout/useWorkouts";
import DashboardWorkoutsChart from "../UI/DashboardWorkoutsChart";

import { WorkoutSupabase } from "../types/WorkoutTypes";
import Spinner from "../UI/Spinner";
import QuickWorkouts from "../UI/QuickWorkouts";
import FavoriteMuscles from "../UI/FavoriteMuscles";
import useTemplates from "../features/templates/useTemplates";
import { TemplateTypes } from "../types/TemplateTypes";
import useRecordsExercises from "../features/exercises/useRecordsExercises";
import useExercises from "../features/exercises/useExercises";
import useCreateSettings from "../features/settings/useCreateSettings";
import { useEffect } from "react";
import useCreateMeasures from "../features/measures/useCreateMeasures";

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  & p {
    font-size: 2.4rem;
  }

  img {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    object-fit: cover;
  }
`;
const StyledBox = styled.div`
  display: flex;
  gap: 3rem;

  @media only screen and (max-width: 68.75em) {
    flex-direction: column;
  }
`;

function Dashboard() {
  const { user } = useUser();
  const { workouts, isLoading: isLoadingWorkouts } = useWorkouts();
  const { templates, isLoading: isLoadingTemplates } = useTemplates();
  const { user_exercises, isLoading: isLoadingUserExercises } =
    useRecordsExercises();
  const { exercises, isLoading: isLoadingExercises } = useExercises({
    filter: null,
  });

  const { insertSettings } = useCreateSettings();
  const { insertMeasures } = useCreateMeasures();
  useEffect(() => {
    insertSettings(user?.id);
    insertMeasures(user?.id);
  });

  const matchedExercises = user_exercises?.map((userExercise) => {
    const matchedExercise = exercises?.find(
      (exercise) => exercise.id === userExercise.exercise_id
    );
    return matchedExercise;
  });

  if (
    isLoadingWorkouts ||
    isLoadingTemplates ||
    isLoadingUserExercises ||
    isLoadingExercises
  ) {
    return <Spinner />;
  }

  return (
    <>
      <Row>
        <Heading as={"h1"}>Dashboard</Heading>
      </Row>
      <Row>
        <ProfileBox>
          <img
            src={`${
              user?.user_metadata.profile_picture
                ? user?.user_metadata.profile_picture || "default-user.jpg"
                : user?.user_metadata.avatar_url || "default-user.jpg"
            }`}
          />
          <div>
            <p>{user?.user_metadata.userName || "Aleksandar"}</p>
            <span style={{ opacity: "0.7" }}>{workouts?.length} workouts</span>
          </div>
        </ProfileBox>
      </Row>
      <StyledBox>
        <QuickWorkouts templates={templates as TemplateTypes[]} />
        <FavoriteMuscles
          workouts={
            matchedExercises?.map((exercise) => exercise?.muscle) as string[]
          }
          heading={"Workout Statistic"}
        />
      </StyledBox>
      <Row>
        <DashboardWorkoutsChart
          workouts={workouts as WorkoutSupabase[]}
          heading={"Workout Statistic"}
        />
      </Row>
    </>
  );
}

export default Dashboard;
