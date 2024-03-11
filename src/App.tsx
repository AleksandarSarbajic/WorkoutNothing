import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyles from "./styles/GlobalStyles";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./UI/ProtectedRoute";
import AppLayout from "./UI/AppLayout";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PageNotFound from "./pages/PageNotFount";
import { DarkModeProvider } from "./context/DarkModeContext";
import ExercisesPage from "./pages/ExercisesPage";
import { SkeletonTheme } from "react-loading-skeleton";
import ExercisePage from "./pages/ExercisePage";
import MeasuresPage from "./pages/MeasuresPage";
import MeasurePage from "./pages/MeasurePage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import WorkoutPage from "./pages/WorkoutPage";
import HistoryPage from "./pages/HistoryPage";
import HistoryWorkoutPage from "./pages/HistoryWorkoutPage";
import WorkoutTemplatePage from "./pages/WorkoutTemplatePage";
import CalculatorPage from "./pages/CalculatorPage";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        index: true,
        element: <Navigate replace to={"dashboard"} />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/history",
        element: <HistoryPage />,
      },
      {
        path: "/history/:historyId",
        id: "historyId",
        element: <HistoryWorkoutPage />,
      },
      {
        path: "/workout",
        element: <WorkoutPage />,
      },
      {
        path: "/workout/:workoutId",
        element: <WorkoutTemplatePage />,
        id: "workoutId",
      },
      {
        path: "/exercises",
        element: <ExercisesPage />,
      },
      {
        path: "/exercises/:exerciseId",
        id: "exerciseId",
        element: <ExercisePage />,
      },
      {
        path: "/measures",
        element: <MeasuresPage />,
      },
      {
        path: "/measures/:measureId",
        id: "measureId",
        element: <MeasurePage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
      {
        path: "/one-rep-max-calculator",
        element: <CalculatorPage />,
      },
      {
        path: "/settings/profile",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <>
      <DarkModeProvider>
        <GlobalStyles />
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <SkeletonTheme
            baseColor="var(--color-grey-200)"
            highlightColor="var(--color-grey-300)"
          >
            <RouterProvider router={router} />
          </SkeletonTheme>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontFamily: "NotoSans, sans-serif",
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "var(--color-black-100)",
                color: "#c1c2c3",
              },
            }}
          />
        </QueryClientProvider>
      </DarkModeProvider>
    </>
  );
}

export default App;
