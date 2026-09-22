import { useState } from 'react';
import { Mail, Phone, MapPin, Loader2, CheckCircle2 } from 'lucide-react';
import { api, extractErrorMessage } from '../api/client';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialForm = {
  name: '',
  email: '',
  company: '',
  phone: '',
  inquiryType: '',
  message: '',
};

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Name is required';
  if (!form.email.trim() || !EMAIL_RE.test(form.email)) {
    errors.email = 'Enter a valid email address';
  }
  if (!form.inquiryType) errors.inquiryType = 'Please select an inquiry type';
  if (!form.message.trim()) errors.message = 'Please tell us a bit about your requirement';
  return errors;
}

export default function ContactSection({ data }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [serverError, setServerError] = useState('');

  const inquiryTypes = data?.inquiryTypes || [];

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setStatus('submitting');
    setServerError('');
    try {
      await api.post('/contact', form);
      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setServerError(extractErrorMessage(err, 'Could not send your message. Please try again.'));
    }
  };

  return (
    <section id="contact" className="bg-[#f6f8fc] py-20 sm:py-28">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <span className="section-eyebrow">Get in Touch</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
              Schedule a Consultation
            </h2>
            <p className="mt-5 text-navy-900/70">
              Tell us about your warehouse asset or logistics requirement and our team will get
              back to you with next steps.
            </p>

            <div className="mt-10 space-y-5">
              {data?.email && (
                <a
                  href={`mailto:${data.email}`}
                  className="flex items-center gap-3 text-navy-900 hover:text-green-600"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-950">
                    <Mail size={18} className="text-green-400" />
                  </span>
                  {data.email}
                </a>
              )}
              {data?.phone && (
                <a
                  href={`tel:${data.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3 text-navy-900 hover:text-green-600"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-950">
                    <Phone size={18} className="text-green-400" />
                  </span>
                  {data.phone}
                </a>
              )}
              {data?.address && (
                <div className="flex items-center gap-3 text-navy-900">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-950">
                    <MapPin size={18} className="text-green-400" />
                  </span>
                  {data.address}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-3">
            {status === 'success' ? (
              <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-green-500/30 bg-white p-10 text-center">
                <CheckCircle2 className="text-green-600" size={44} />
                <h3 className="mt-4 text-xl font-bold text-navy-900">Thank you</h3>
                <p className="mt-2 max-w-sm text-navy-900/65">
                  Your message has been received. Our team will reach out shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="btn-outline-dark mt-6"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl border border-navy-900/10 bg-white p-6 sm:p-8"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label" htmlFor="name">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      className="input"
                      value={form.name}
                      onChange={handleChange('name')}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="label" htmlFor="email">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="input"
                      value={form.email}
                      onChange={handleChange('email')}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="label" htmlFor="company">
                      Company
                    </label>
                    <input
                      id="company"
                      className="input"
                      value={form.company}
                      onChange={handleChange('company')}
                    />
                  </div>
                  <div>
                    <label className="label" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      id="phone"
                      className="input"
                      value={form.phone}
                      onChange={handleChange('phone')}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label" htmlFor="inquiryType">
                      Inquiry Type *
                    </label>
                    <select
                      id="inquiryType"
                      className="input"
                      value={form.inquiryType}
                      onChange={handleChange('inquiryType')}
                      aria-invalid={!!errors.inquiryType}
                    >
                      <option value="">Select an inquiry type</option>
                      {inquiryTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.inquiryType && (
                      <p className="mt-1 text-xs text-red-600">{errors.inquiryType}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label" htmlFor="message">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="input resize-none"
                      value={form.message}
                      onChange={handleChange('message')}
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-600">{errors.message}</p>
                    )}
                  </div>
                </div>

                {serverError && <p className="mt-4 text-sm text-red-600">{serverError}</p>}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-primary mt-6 w-full sm:w-auto"
                >
                  {status === 'submitting' && <Loader2 size={18} className="animate-spin" />}
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
