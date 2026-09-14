import { contact, SITE_URL } from '../data/site';

/**
 * Pre-filled WhatsApp link. The page path is included so the clinic can see
 * which page the enquiry came from (supports "How did you hear about Dr Kartini?").
 */
export function whatsappHref(path = '/', topic?: string) {
  const intro = topic
    ? `Hello Dr Kartini, I would like to enquire about an appointment regarding ${topic}.`
    : 'Hello Dr Kartini, I would like to enquire about an appointment.';
  const text = `${intro}\n\n(Sent from ${SITE_URL.replace('https://', '')}${path})`;
  return `${contact.whatsappLink}?text=${encodeURIComponent(text)}`;
}
