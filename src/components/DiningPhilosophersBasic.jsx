import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid'
import MonacoTextEditorTLA from './MonacoTextEditorTLA';
import MonacoTextEditorContainer from "@/components/MonacoTextEditorContainer";
import { DINING_PHILOSOPHERS_SPEC } from '../utils/constants';
import LLMChatContainer from "@/components/LLMChatContainer";

const defaultText = 'How can I help? (e.g. "Tell me about what properties the TLA+ below satisfies")'

export default function DiningPhilosophersBasic() {
  return (
    <MonacoTextEditorContainer >
    <LLMChatContainer defaultText={defaultText}/>
      <MonacoTextEditorTLA readOnly={false} content={DINING_PHILOSOPHERS_SPEC}/>
    </MonacoTextEditorContainer>
  )
}
