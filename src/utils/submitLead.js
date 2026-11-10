// Sends a form enquiry to the team's Google Sheet, through the script in google-apps-script/leads.gs.
// The Web app URL comes from Apps Script: Deploy → Manage deployments → Web app URL.
const LEADS_URL = 'https://script.google.com/macros/s/AKfycbzTSbSq6_75M_ZT7zjMkwr-dQ5sY7Rnrfg0ysF5C4QyUofdmWJIJVzehWkJ6nsGrfRA/exec';

export const submitLead = async (lead) => {
  if (!LEADS_URL) throw new Error('LEADS_URL is not set in src/utils/submitLead.js');

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    // Sent as plain text (no Content-Type header) so the browser skips a CORS check that Apps Script can't answer
    const response = await fetch(LEADS_URL, {
      method: 'POST',
      body: JSON.stringify({ ...lead, page: window.location.href }),
      signal: controller.signal,
    });
    const result = await response.json();
    if (!result.ok) throw new Error(result.error || 'The enquiry was not saved');
  } finally {
    clearTimeout(timeout);
  }
};
