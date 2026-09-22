import { useContent } from '../context/ContentContext';
import Stakeholders from '../components/Stakeholders';

export default function StakeholdersPage() {
  const { content } = useContent();
  return <Stakeholders data={content?.stakeholders} />;
}
