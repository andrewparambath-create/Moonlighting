export default async function handler(req, res) {
  const calId = "13vqf3pst3jhvustuosm0pippcrgdlcg@import.calendar.google.com";
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
    res.setHeader('Cache-Control', 's-maxage=3600');
    res.status(200).send(text);
  } catch (err) {
    res.status(500).send('ERROR: ' + err.message);
  }
}
