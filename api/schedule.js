export default async function handler(req, res) {
  const calId = "13vqf3pst3jhvustuosm0pippcrgdlcg@import.calendar.google.com";
  const now = new Date();
  const yr = now.getFullYear();
  const mo = now.getMonth();
  
  // Fetch 2 months to catch shifts near month boundaries
  const timeMin = new Date(yr, mo, 1).toISOString();
  const timeMax = new Date(yr, mo + 2, 0).toISOString();

  // Google public calendar JSON feed (no API key needed for public calendars)
  const FEED_URL = `https://www.google.com/calendar/feeds/${encodeURIComponent(calId)}/public/basic?alt=json&orderby=starttime&singleevents=true&timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}&max-results=100`;

  try {
    const response = await fetch(FEED_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
      }
    });

    const text = await response.text();
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(`STATUS: ${response.status}\nFIRST 1000:\n${text.slice(0,1000)}`);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
