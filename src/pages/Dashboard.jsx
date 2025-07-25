import { useTheme } from "styled-components";
import BarriersControl from "../components/BarriersControl";
import DashboardStatusCards from "../components/DashboardStatusCard";
import MotorBuzzerControl from "../components/MotorBuzzerControl";
import PedestrianCrossingControl from "../components/PedestrianCrossingControl";
import TrafficSemaphoreControl from "../components/TrafficSemaphoreControl ";
import ViolationsRegistry from "../components/ViolationsRegistry";

const Dashboard = () => {
  const theme = useTheme();

  return (
    <div style={{
      background: theme.background,
      color: theme.text,
      minHeight: "100vh",
      transition: "background 0.3s, color 0.3s"
    }}>
      <DashboardStatusCards />
      <TrafficSemaphoreControl />
      <PedestrianCrossingControl />
      <BarriersControl />
      <MotorBuzzerControl />
      <ViolationsRegistry />
    </div>
  );
};

export default Dashboard;