import { useContent } from '../context/ContentContext';
import ProcessTimeline from '../components/ProcessTimeline';

export default function ProcessPage() {
  const { content } = useContent();
  return <ProcessTimeline data={content?.process} />;
}
