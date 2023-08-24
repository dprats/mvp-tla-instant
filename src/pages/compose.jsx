import DashboardLayout from "@/components/DashboardLayout";
import ProblemList from "@/components/ProblemList";


export default function ComposePage() {
  return (
    <DashboardLayout header="Composing">
      <ProblemList />
    </DashboardLayout>
  );
}