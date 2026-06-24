export default async function handler(req, res) {
  const ICAL_URL = "https://calendar.google.com/calendar/ical/u09d9iqubekft96njmqiedn23tshinlb%40import.calendar.google.com/public/basic.ics";
  try {
    const response = await fetch(ICAL_URL, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    if (!response.ok) throw new Error(`Failed: ${response.status}`);
    const text = await response.text();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 's-maxage=3600');
    res.status(200).send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
