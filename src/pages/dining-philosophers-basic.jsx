import DashboardLayout from "@/components/DashboardLayout";
import DiningPhilosophersBasic from "@/components/DiningPhilosophersBasic";

export default function DiningPhilosophersPage() {
  return (
    <DashboardLayout header="Introduction">
      <DiningPhilosophersBasic />
    </DashboardLayout>
  );
}