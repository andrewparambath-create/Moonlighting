export default async function handler(req, res) {
  const calId = "13vqf3pst3jhvustuosm0pippcrgdlcg@import.calendar.google.com";
  const now = new Date();
  const timeMin = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const timeMax = new Date(now.getFullYear(), now.getMonth() + 2, 0).toISOString();

  // Try the iCal URL directly — public calendar, no auth needed
  const ICAL_URL = `https://calendar.google.com/calendar/ical/${encodeURIComponent(calId)}/public/basic.ics`;

  try {
    const r = await fetch(ICAL_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)',
        'Accept': '*/*',
      }
    });

    const text = await r.text();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(`STATUS: ${r.status}\nCONTENT-TYPE: ${r.headers.get('content-type')}\nFIRST 800 CHARS:\n${text.slice(0, 800)}`);

  } catch (err) {
    res.status(500).send('ERROR: ' + err.message);
  }
}
