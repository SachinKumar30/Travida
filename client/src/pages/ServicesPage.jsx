import { useContent } from '../context/ContentContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import Services from '../components/Services';

export default function ServicesPage() {
  const { content } = useContent();
  useDocumentTitle('Industrial Warehouse Compliance & Retrofit Services | Travida Logistics');
  return <Services data={content?.services} />;
}
