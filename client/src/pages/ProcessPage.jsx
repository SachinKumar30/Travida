import { useContent } from '../context/ContentContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import ProcessTimeline from '../components/ProcessTimeline';

export default function ProcessPage() {
  const { content } = useContent();
  useDocumentTitle('Our Grade-B to Grade-A Retrofit Process | Travida Logistics');
  return <ProcessTimeline data={content?.process} />;
}
