import PageLayout from "@/components/PageLayout";
import DashboardLayout from "@/components/DashboardLayout";
import SequenceDiagram from "@/components/SequenceDiagram";
import MonacoTextEditorSequenceDiagram from "@/components/MonacoTextEditorSequenceDiagram";

export default function SequenceDiagramPage() {
  return (
    <DashboardLayout header="Sequence Diagram">
      <MonacoTextEditorSequenceDiagram />
    </DashboardLayout>
  );
}
