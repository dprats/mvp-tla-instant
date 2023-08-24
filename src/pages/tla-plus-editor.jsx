import DashboardLayout from "@/components/DashboardLayout";
import MonacoTextEditorTLA from "@/components/MonacoTextEditorTLA";
import MonacoTextEditorContainer from "@/components/MonacoTextEditorContainer";
import InstantFeedbackContainer from "@/components/InstantFeedbackContainer";
import { LAYERS_O1_TLA } from '../utils/constants';

export default function TLAPlusEditorPage() {
  return (
      <div>
        <DashboardLayout>
          <InstantFeedbackContainer />
        </DashboardLayout>
      </div>
  );
}
