export default async function handler(req, res) {
  const ICAL_URL = "https://calendar.google.com/calendar/ical/13vqf3pst3jhvustuosm0pippcrgdlcg%40import.calendar.google.com/public/basic.ics";
  
  try {
    const response = await fetch(ICAL_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/calendar,text/plain,*/*',
      },
      redirect: 'follow'
    });

    const text = await response.text();

    if (!text.includes('BEGIN:VCALENDAR')) {
      res.setHeader('Content-Type', 'text/plain');
      res.status(200).send(`STATUS: ${response.status}\nFIRST 500 CHARS:\n${text.slice(0, 500)}`);
      return;
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 's-maxage=3600');
    res.status(200).send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
