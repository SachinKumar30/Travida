import { useContent } from '../context/ContentContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import WhyChoose from '../components/WhyChoose';

export default function WhyChoosePage() {
  const { content } = useContent();
  useDocumentTitle('Why Choose Travida | National Logistics Policy Solutions');
  return <WhyChoose data={content?.whyChoose} />;
}
