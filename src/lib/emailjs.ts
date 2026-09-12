import emailjs from '@emailjs/browser';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export function isEmailJsConfigured(): boolean {
  return Boolean(
    import.meta.env.VITE_EMAILJS_SERVICE_ID &&
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );
}

/**
 * Send via EmailJS when configured, otherwise fall back to opening the
 * user's mail client with a pre-filled message.
 *
 * Returns `{ via: 'emailjs' | 'mailto' }` so the UI can show a success message.
 */
export async function sendContact(
  payload: ContactPayload
): Promise<{ via: 'emailjs' | 'mailto' }> {
  if (isEmailJsConfigured()) {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID as string,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string,
      {
        from_name: payload.name,
        reply_to: payload.email,
        message: payload.message,
      },
      { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string }
    );
    return { via: 'emailjs' };
  }

  const subject = encodeURIComponent(
    `Portfolio inquiry from ${payload.name}`
  );
  const body = encodeURIComponent(
    `From: ${payload.name} <${payload.email}>\n\n${payload.message}`
  );
  window.location.href = `mailto:bikashtalukder040@gmail.com?subject=${subject}&body=${body}`;
  return { via: 'mailto' };
}
