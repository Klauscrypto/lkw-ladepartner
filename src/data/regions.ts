// Standort-Daten für regionale Landingpages. Geo-Koordinaten werden auch fürs LocalBusiness-Schema genutzt.

export const regions = [
  {
    slug: 'deggendorf', name: 'Deggendorf', plz: '94469', lat: 48.8339, lng: 12.9575,
    de: {
      lead: 'Unser Standort im Herzen Niederbayerns. Wir elektrifizieren Betriebshöfe in Deggendorf und Umgebung schlüsselfertig — von der Übergabestation bis zum Ladepunkt.',
      angle: 'Direkt an A3 und A92 gelegen, mit dem Hafen Deggendorf und kurzen Wegen Richtung Passau und Regensburg. Als ansässiger Anbieter sind wir schnell vor Ort — für Netzcheck, Planung und Umsetzung.',
      nearby: ['Plattling', 'Osterhofen', 'Hengersberg', 'Metten', 'Lalling'],
    },
    en: {
      lead: 'Our home base in the heart of Lower Bavaria. We electrify depots in and around Deggendorf turnkey — from the transformer station to the charge point.',
      angle: 'Located directly on the A3 and A92, with the Port of Deggendorf and short distances towards Passau and Regensburg. As a local provider we are quickly on site — for grid checks, planning and delivery.',
      nearby: ['Plattling', 'Osterhofen', 'Hengersberg', 'Metten', 'Lalling'],
    },
  },
  {
    slug: 'passau', name: 'Passau', plz: '94032', lat: 48.5667, lng: 13.4319,
    de: {
      lead: 'Lkw-Ladeinfrastruktur für Betriebshöfe in Passau und dem Dreiländereck — Netzanschluss, PV, Speicher und Ladepunkte aus einer Hand.',
      angle: 'Im Dreiländereck an A3 und A8, mit starkem Grenzverkehr nach Österreich und Tschechien. Für Speditionen im internationalen Fernverkehr wird eigenes Depotladen zum echten Standortvorteil.',
      nearby: ['Vilshofen', 'Pocking', 'Hauzenberg', 'Fürstenzell', 'Freyung'],
    },
    en: {
      lead: 'Truck charging infrastructure for depots in Passau and the tri-border area — grid connection, PV, storage and charge points from one source.',
      angle: 'In the tri-border area on the A3 and A8, with heavy cross-border traffic to Austria and the Czech Republic. For long-haul hauliers, on-site depot charging becomes a real competitive edge.',
      nearby: ['Vilshofen', 'Pocking', 'Hauzenberg', 'Fürstenzell', 'Freyung'],
    },
  },
  {
    slug: 'regensburg', name: 'Regensburg', plz: '93047', lat: 49.0134, lng: 12.1016,
    de: {
      lead: 'Depot-Elektrifizierung für Flotten in Regensburg — planbar, gefördert und komplett aus einer Hand.',
      angle: 'Donauhafen, starke Industrie und das Autobahnkreuz A3/A93. Hoher Anteil an Werk- und Verteilverkehren sowie große Hallendächer machen Depotladen mit eigener Photovoltaik besonders wirtschaftlich.',
      nearby: ['Neutraubling', 'Lappersdorf', 'Bad Abbach', 'Obertraubling', 'Kelheim'],
    },
    en: {
      lead: 'Depot electrification for fleets in Regensburg — predictable, funded and fully from one source.',
      angle: 'Danube port, strong industry and the A3/A93 motorway junction. A high share of works and distribution traffic plus large hall roofs make depot charging with your own photovoltaics especially cost-effective.',
      nearby: ['Neutraubling', 'Lappersdorf', 'Bad Abbach', 'Obertraubling', 'Kelheim'],
    },
  },
  {
    slug: 'straubing', name: 'Straubing', plz: '94315', lat: 48.8772, lng: 12.5761,
    de: {
      lead: 'Lkw-Ladeinfrastruktur für Betriebshöfe in Straubing und dem Gäuboden — schlüsselfertig geplant und gefördert.',
      angle: 'Agrar- und Lebensmittellogistik im Gäuboden, dazu der Hafen Straubing-Sand an der A3. Feste Touren mit täglicher Rückkehr zum Hof sind der Idealfall fürs Depotladen.',
      nearby: ['Bogen', 'Geiselhöring', 'Aiterhofen', 'Feldkirchen', 'Oberschneiding'],
    },
    en: {
      lead: 'Truck charging infrastructure for depots in Straubing and the Gäuboden region — planned turnkey and funded.',
      angle: 'Agricultural and food logistics in the Gäuboden, plus the Straubing-Sand port on the A3. Fixed routes with daily return to the yard are the ideal case for depot charging.',
      nearby: ['Bogen', 'Geiselhöring', 'Aiterhofen', 'Feldkirchen', 'Oberschneiding'],
    },
  },
  {
    slug: 'landshut', name: 'Landshut', plz: '84028', lat: 48.5372, lng: 12.1516,
    de: {
      lead: 'Depot-Elektrifizierung für Fuhrparks in Landshut — Netzanschluss, Ladepunkte und Förderung aus einer Hand.',
      angle: 'Automotive-Region an der A92 Richtung Flughafen München. Zulieferer- und Verteilverkehre mit festen Routen lassen sich hervorragend kalkulieren — die beste Grundlage für planbare Ladeinfrastruktur.',
      nearby: ['Ergolding', 'Essenbach', 'Vilsbiburg', 'Moosburg', 'Altdorf'],
    },
    en: {
      lead: 'Depot electrification for fleets in Landshut — grid connection, charge points and funding from one source.',
      angle: 'Automotive region on the A92 towards Munich Airport. Supplier and distribution traffic on fixed routes is highly predictable — the best basis for plannable charging infrastructure.',
      nearby: ['Ergolding', 'Essenbach', 'Vilsbiburg', 'Moosburg', 'Altdorf'],
    },
  },
];

export const regionUi = {
  de: {
    eyebrow: 'Standort', h1pre: 'Lkw-Ladeinfrastruktur in',
    whyH: 'Warum am Standort', whyLede: 'Was diese Region für Depotladen besonders macht',
    chainH: 'Alles aus einer Hand', chainSub: 'Wir liefern die komplette Kette — Details auf der Hauptseite:',
    chain: ['Netzanschluss & Übergabestation', 'Photovoltaik', 'Batteriespeicher', 'DC-Ladepunkte', 'Fördermanagement'],
    nearbyH: 'Auch aktiv in der Umgebung', backHome: 'Zur Hauptseite: alle Leistungen',
    otherRegionsH: 'Weitere Standorte', ctaH: 'Standortanalyse für Ihren Betriebshof', ctaText: 'Kostenlose Ersteinschätzung inkl. Netzcheck und Förderhöhe.', cta: 'Beratung anfragen',
    fundNote: 'BMV-Förderung 500 €/kW — Fristen laufen 2026.',
  },
  en: {
    eyebrow: 'Location', h1pre: 'Truck charging infrastructure in',
    whyH: 'Why this location', whyLede: 'What makes this region ideal for depot charging',
    chainH: 'Everything from one source', chainSub: 'We deliver the complete chain — details on the main page:',
    chain: ['Grid connection & transformer', 'Photovoltaics', 'Battery storage', 'DC charge points', 'Funding management'],
    nearbyH: 'Also active nearby', backHome: 'To the main page: all services',
    otherRegionsH: 'More locations', ctaH: 'Site assessment for your depot', ctaText: 'Free initial assessment incl. grid check and funding amount.', cta: 'Request advice',
    fundNote: 'German BMV funding €500/kW — deadlines running in 2026.',
  },
};
