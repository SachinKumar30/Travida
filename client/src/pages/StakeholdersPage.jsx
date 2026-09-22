import { useContent } from '../context/ContentContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import Stakeholders from '../components/Stakeholders';

export default function StakeholdersPage() {
  const { content } = useContent();
  useDocumentTitle('Who We Serve — MSME Logistics Infrastructure | Travida Logistics');
  return <Stakeholders data={content?.stakeholders} />;
}
