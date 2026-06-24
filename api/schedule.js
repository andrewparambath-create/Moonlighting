export default async function handler(req, res) {
  const calId = "13vqf3pst3jhvustuosm0pippcrgdlcg@import.calendar.google.com";
  const now = new Date();
  const timeMin = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const timeMax = new Date(now.getFullYear(), now.getMonth() + 2, 0).toISOString();

  const url = `https://www.google.com/calendar/feeds/${encodeURIComponent(calId)}/public/basic?alt=json&orderby=starttime&singleevents=true&timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}&max-results=100`;

  try {
    const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' } });
    const text = await r.text();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=3600');
    res.status(200).send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
