import { useContent } from '../context/ContentContext';
import WhyChoose from '../components/WhyChoose';

export default function WhyChoosePage() {
  const { content } = useContent();
  return <WhyChoose data={content?.whyChoose} />;
}
