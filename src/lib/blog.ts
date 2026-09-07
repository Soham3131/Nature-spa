export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  image: string;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "choosing-the-right-massage",
    title: "How to Choose the Right Massage for Your Body",
    excerpt:
      "Balinese, deep tissue, Thai or aroma? A plain-English guide to picking the therapy your body is actually asking for.",
    category: "Guides",
    date: "2026-08-24",
    readingTime: "6 min read",
    image: "https://images.unsplash.com/photo-1775133262667-316bd4d9e5b5?auto=format&fit=crop&w=1200&q=80",
    body: [
      {
        type: "p",
        text: "Walking into a spa menu for the first time can feel like reading a wine list in a language you do not speak. Balinese, Swedish, deep tissue, Thai, reflexology — they all promise relaxation, so how do you know which one your body needs today? The honest answer is that the right choice depends less on the name and more on what you have been doing with your body for the last few weeks.",
      },
      { type: "h2", text: "Start with the symptom, not the style" },
      {
        type: "p",
        text: "Before you book, spend thirty seconds noticing where you are holding tension. Is it a dull ache across the shoulders from a laptop? A tight lower back from long drives on the expressway? Restless sleep and a mind that will not switch off? Each of those points to a different therapy.",
      },
      {
        type: "list",
        items: [
          "Desk and screen tension across the neck, shoulders and upper back — a Balinese massage, which combines acupressure with long flowing strokes.",
          "Chronic knots that keep coming back in the same spot — deep tissue therapy, worked slowly and firmly through the deeper muscle layers.",
          "Stiff hips, hamstrings and a body that feels short and compressed — Thai dry massage, which uses assisted stretching rather than oil.",
          "A racing mind, poor sleep or high stress weeks — aroma therapy, where the essential oil blend does as much work as the hands.",
          "Tired, heavy legs after long days on your feet — foot reflexology, which works pressure points from ankle to toe.",
        ],
      },
      { type: "h2", text: "Pressure is a conversation, not a setting" },
      {
        type: "p",
        text: "The single biggest mistake guests make is enduring pressure that hurts because they assume that is how it is supposed to feel. It is not. Good deep tissue work should feel like a strong, satisfying ache that you can breathe through — never a sharp pain that makes you tense up. If you are bracing, your muscles are contracting, and the therapist is working against you rather than with you.",
      },
      {
        type: "quote",
        text: "Tell your therapist in the first five minutes. A small adjustment early is worth more than an hour of quiet suffering.",
      },
      { type: "h2", text: "How often should you go?" },
      {
        type: "p",
        text: "For general stress and desk tension, once every three to four weeks keeps you comfortably ahead of the build-up. If you are working through a specific injury or a long-standing knot, a tighter run of weekly sessions for three or four weeks does far more than one occasional deep session. Think of it the way you would think of the gym: consistency beats intensity.",
      },
      { type: "h2", text: "The hour before and the hour after" },
      {
        type: "p",
        text: "Arrive ten minutes early so your heart rate has settled before you get on the table — a rushed arrival costs you the first fifteen minutes of the massage. Eat something light beforehand rather than arriving on an empty stomach or straight after a heavy meal. Afterwards, drink water, skip the intense workout for the rest of the day, and give yourself a slow evening if you can. The therapy continues working for several hours after you leave the room.",
      },
      {
        type: "p",
        text: "Still unsure? Tell us what your week has looked like when you book and we will match you to the right therapist and therapy. That conversation takes two minutes and makes all the difference.",
      },
    ],
  },
  {
    slug: "benefits-of-regular-body-massage",
    title: "What Regular Body Massage Actually Does For You",
    excerpt:
      "Beyond the hour of calm — how consistent bodywork changes sleep, posture, stress hormones and recovery.",
    category: "Wellness",
    date: "2026-08-10",
    readingTime: "5 min read",
    image: "https://images.unsplash.com/photo-1741714297621-9ff218799077?auto=format&fit=crop&w=1200&q=80",
    body: [
      {
        type: "p",
        text: "Most people book a massage the way they book a holiday — as a reward after a hard stretch. That is a perfectly good reason to come in. But the guests who see the biggest change are the ones who treat bodywork as maintenance rather than celebration, and the difference shows up in places you might not expect.",
      },
      { type: "h2", text: "Your nervous system gets a reset" },
      {
        type: "p",
        text: "Sustained pressure and slow, rhythmic strokes shift the body out of its fight-or-flight state and into the parasympathetic mode where repair happens. That is why people so often fall asleep on the table — it is not boredom, it is a nervous system finally standing down. Guests who come in regularly report falling asleep faster at night and waking less often, which is usually the first benefit they notice.",
      },
      { type: "h2", text: "Posture improves because tension stops winning" },
      {
        type: "p",
        text: "Long hours at a desk shorten the chest and the front of the hips while the upper back stretches and weakens. Over months, that becomes the rounded-shoulder posture almost everyone in an office recognises. Regular work through the pecs, upper back and hip flexors gives those tissues a chance to lengthen so that your posture corrections in the gym or in physiotherapy actually hold.",
      },
      { type: "h2", text: "Circulation and recovery" },
      {
        type: "list",
        items: [
          "Improved blood flow to worked muscles, which speeds the clearing of metabolic waste after training.",
          "Reduced delayed-onset muscle soreness when timed a day or two after a hard session.",
          "Lighter, less swollen legs for anyone who stands or travels a lot.",
          "Better range of motion at the shoulder and hip, especially with stretching-based therapies.",
        ],
      },
      { type: "h2", text: "The part no one measures" },
      {
        type: "p",
        text: "There is also something quieter that happens in a good spa hour. Phones are away, no one needs anything from you, and for sixty or ninety minutes you are not solving a problem. In a city that runs as fast as Gurugram does, that hour of deliberate nothing is not indulgent — it is the counterweight that makes the rest of the week sustainable.",
      },
      {
        type: "quote",
        text: "You do not need to be in pain to deserve care. Maintenance is cheaper than repair — for bodies as much as for anything else.",
      },
    ],
  },
  {
    slug: "your-first-spa-visit",
    title: "Your First Spa Visit: Everything Nobody Tells You",
    excerpt:
      "What to wear, what happens in the room, how tipping works, and how to stop feeling awkward about all of it.",
    category: "Guides",
    date: "2026-07-28",
    readingTime: "5 min read",
    image: "https://images.unsplash.com/photo-1719123045765-08ca3c27991b?auto=format&fit=crop&w=1200&q=80",
    body: [
      {
        type: "p",
        text: "A surprising number of people put off their first spa visit for years, not because they do not want it but because they are quietly unsure of the etiquette. Here is everything, plainly, so that you can walk in knowing exactly what happens.",
      },
      { type: "h2", text: "Before you arrive" },
      {
        type: "p",
        text: "Book ahead, especially for evenings and weekends. Arrive ten to fifteen minutes early — you will fill a short health form covering injuries, allergies, pregnancy, blood pressure and recent surgeries. This matters: certain therapies and essential oils are adjusted or avoided in those cases. Wear something comfortable and easy to change out of, and leave heavy jewellery at home.",
      },
      { type: "h2", text: "In the room" },
      {
        type: "p",
        text: "Your therapist will show you the room, explain the therapy, and then step out while you change and get under the towel or sheet. You undress to your own comfort level — most guests keep underwear on, and you are draped throughout, with only the area being worked on uncovered. The therapist knocks before re-entering. If at any point the pressure, temperature, music or lighting is not right, say so. You are not being difficult; you are helping.",
      },
      {
        type: "list",
        items: [
          "You do not have to make conversation. Silence is completely normal and often preferred.",
          "Falling asleep is a compliment, not an embarrassment.",
          "Breathe out into deep pressure rather than holding your breath.",
          "Tell your therapist about any injury before they find it with their thumbs.",
        ],
      },
      { type: "h2", text: "Afterwards" },
      {
        type: "p",
        text: "Get up slowly — blood pressure drops during deep relaxation and standing up quickly can leave you lightheaded. Drink the water you are offered. Some tenderness the next day after deep tissue work is normal and passes within twenty-four to forty-eight hours. Tipping is not compulsory in India, but if your therapist did excellent work, a tip handed directly is always appreciated.",
      },
      { type: "h2", text: "Hygiene questions worth asking" },
      {
        type: "p",
        text: "You are entitled to ask, and a good spa will answer without hesitation: are linens changed for every guest, are therapists certified, is the room sanitised between sessions, and are single-use disposables used where relevant. At The Nature Spa the answer to all four is yes, and we are happy to show you the room before you commit.",
      },
    ],
  },
  {
    slug: "aromatherapy-oils-guide",
    title: "A Practical Guide to Aromatherapy Oils",
    excerpt:
      "Lavender, lemongrass, eucalyptus, sandalwood — what each oil actually does and when to choose it.",
    category: "Therapies",
    date: "2026-07-12",
    readingTime: "4 min read",
    image: "https://images.unsplash.com/photo-1671492246169-cdd6305870a0?auto=format&fit=crop&w=1200&q=80",
    body: [
      {
        type: "p",
        text: "When we hand you the oil tray at the start of an aroma therapy session, most guests pick by smell alone — which is a perfectly valid method. But each blend does have a character, and choosing deliberately can shape the whole hour.",
      },
      { type: "h2", text: "To wind down and sleep" },
      {
        type: "p",
        text: "Lavender is the classic for a reason: soft, floral and reliably calming, it pairs best with slow evening sessions when you plan to go straight home afterwards. Chamomile works similarly and is gentler for anyone who finds lavender too sweet. Both are good choices if you have been sleeping badly.",
      },
      { type: "h2", text: "To lift a flat mood" },
      {
        type: "p",
        text: "Lemongrass and sweet orange are bright, citrus-forward and genuinely mood-lifting. Choose them for a daytime session when you have to go back to work afterwards and do not want to feel heavy-lidded. Peppermint has a similar effect with a cooling edge that suits hot Gurugram afternoons.",
      },
      { type: "h2", text: "To clear the head and chest" },
      {
        type: "p",
        text: "Eucalyptus and tea tree open up the breathing and cut through the stuffiness that comes with dust, pollution or the tail end of a cold. Paired with a warm compress across the chest and upper back, this is our most requested winter combination.",
      },
      { type: "h2", text: "To feel grounded" },
      {
        type: "p",
        text: "Sandalwood, vetiver and frankincense are the deep, woody, resinous end of the tray. They suit anyone who feels scattered and over-stimulated rather than tired, and they hold on the skin for hours after the session ends.",
      },
      {
        type: "quote",
        text: "If you are pregnant, managing high blood pressure, or prone to skin sensitivity, tell your therapist — several oils are adjusted or replaced in those cases.",
      },
      {
        type: "p",
        text: "Not sure? Smell three and pick the one your body leans toward. Instinct is a surprisingly good guide here.",
      },
    ],
  },
  {
    slug: "desk-job-neck-and-back",
    title: "Nine Hours at a Desk: Fixing the Neck and Back You Bring Home",
    excerpt:
      "Why corporate Gurugram lives in near-permanent shoulder tension, and the mix of bodywork and habits that actually helps.",
    category: "Wellness",
    date: "2026-06-30",
    readingTime: "6 min read",
    image: "https://images.unsplash.com/photo-1719123592776-621ac28b3133?auto=format&fit=crop&w=1200&q=80",
    body: [
      {
        type: "p",
        text: "If you work in one of the towers along Golf Course Road or Cyber City, there is a good chance you recognise this: a tight band across the top of the shoulders, a nagging spot beside the right shoulder blade from the mouse hand, and a neck that clicks when you turn to reverse the car. It is the single most common complaint that walks into our spa.",
      },
      { type: "h2", text: "What is actually happening" },
      {
        type: "p",
        text: "Holding your arms forward at a keyboard for hours keeps the upper trapezius, levator scapulae and pectorals in a low-grade contraction. Muscles are built for that in bursts, not for nine hours a day, five days a week. Over months, the tissue adapts by shortening, blood flow drops in the shortened areas, and trigger points form — those exquisitely tender knots that refer pain up into the head.",
      },
      { type: "h2", text: "What bodywork does about it" },
      {
        type: "p",
        text: "Sustained pressure into a trigger point, held for thirty to ninety seconds while you breathe out, releases the contraction and restores blood flow. Deep tissue work through the pecs and the front of the shoulder is just as important as work on the upper back, even though the pain is at the back — the tightness in front is what is pulling you into the rounded posture in the first place.",
      },
      { type: "h2", text: "The four habits that hold the results" },
      {
        type: "list",
        items: [
          "Raise your monitor so the top of the screen is at eye level — this alone removes most forward head posture.",
          "Stand up every forty-five minutes, even for ninety seconds. A timer works better than good intentions.",
          "Open the chest daily: a doorway stretch, thirty seconds per side, twice a day.",
          "Sleep on your back or side with a pillow that keeps the neck level, not propped forward.",
        ],
      },
      { type: "h2", text: "A realistic schedule" },
      {
        type: "p",
        text: "If the tension has been building for years, one session will feel wonderful and then fade in about a week. A run of four weekly deep tissue sessions, followed by monthly maintenance, is what actually shifts the pattern. Pair it with the habits above and most guests find the ache stops being their default state within six to eight weeks.",
      },
    ],
  },
  {
    slug: "couple-spa-day-gurugram",
    title: "Planning a Couple's Spa Day in Gurugram",
    excerpt:
      "How to book it, what a good couple's suite looks like, and how to time the day so it never feels rushed.",
    category: "Experiences",
    date: "2026-06-15",
    readingTime: "4 min read",
    image: "https://images.unsplash.com/photo-1775133263816-8b2a1c5d13e8?auto=format&fit=crop&w=1200&q=80",
    body: [
      {
        type: "p",
        text: "A couple's spa session is one of the few gifts that works equally well for an anniversary, a birthday, or a Saturday when both of you have simply had enough of the week. Here is how to plan one that feels unhurried.",
      },
      { type: "h2", text: "Book the room, not just the therapy" },
      {
        type: "p",
        text: "The thing that makes a couple's session special is the private suite — two tables, two therapists, one room, and a door that stays closed. Confirm when you book that you are getting a genuine private couple's room rather than two adjacent single rooms. Weekend evening slots go first, so call three to four days ahead.",
      },
      { type: "h2", text: "Match the therapies, not necessarily the pressure" },
      {
        type: "p",
        text: "You should both book the same duration so you finish together, but you do not have to pick the same style or pressure. One of you can have deep tissue while the other has a gentle aroma therapy. Tell us at booking and we will pair therapists accordingly.",
      },
      { type: "h2", text: "Give the day some room" },
      {
        type: "list",
        items: [
          "Arrive fifteen minutes early so the session does not start with a rush.",
          "Ninety minutes is the sweet spot — sixty can feel over just as you have both settled.",
          "Do not schedule anything demanding for two hours afterwards. Plan a slow meal instead.",
          "Skip the alcohol beforehand; it blunts the whole thing and dehydrates you.",
        ],
      },
      { type: "h2", text: "Making it a surprise" },
      {
        type: "p",
        text: "If you are surprising someone, message us in advance and we will set the room with candles and have the towels and tea ready when you walk in. We can also hold a gift card if you would rather let them choose their own date.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
