import { useContent } from '../context/ContentContext';
import ContactSection from '../components/ContactSection';

export default function ContactPage() {
  const { content } = useContent();
  return <ContactSection data={content?.contact} />;
}
