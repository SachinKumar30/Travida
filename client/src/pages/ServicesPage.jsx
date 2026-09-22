import { useContent } from '../context/ContentContext';
import Services from '../components/Services';

export default function ServicesPage() {
  const { content } = useContent();
  return <Services data={content?.services} />;
}
