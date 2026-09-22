import { useContent } from '../context/ContentContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import ContactSection from '../components/ContactSection';

export default function ContactPage() {
  const { content } = useContent();
  useDocumentTitle('Contact Us | Travida Logistics');
  return <ContactSection data={content?.contact} />;
}
