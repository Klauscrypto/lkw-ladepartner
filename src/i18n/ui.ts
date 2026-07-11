// Zentrale Übersetzungen DE/EN. Weitere Sprachen (TR/RO/FR) lassen sich analog ergänzen.

export const languages = { de: 'Deutsch', en: 'English' };
export const defaultLang = 'de';

export const brand = {
  somv: 'https://www.somv-project.de',
  trafo: 'https://trafo-uebergabestation.de',
  sep: 'https://solar-energie-partner.de',
  waermekraft: 'https://waerme-kraft.de',
  virta: 'https://www.virta.global/de',
  email: 'info@somv-project.de',
};

export const ui = {
  de: {
    htmlLang: 'de',
    meta: {
      title: 'Lkw-Ladeinfrastruktur & Depotladen für E-Lkw | Netzanschluss, PV & BMV-Förderung – SOMV',
      desc: 'Depotladen für E-Lkw schlüsselfertig: Netzanschluss, Übergabestation, Photovoltaik, Speicher und Ladepunkte aus einer Hand. BMV-Förderung 500 €/kW, Software von Virta. Kostenlose Standortanalyse für Ihren Betriebshof.',
    },
    nav: { leistungen: 'Leistungen', system: 'System', ablauf: 'Ablauf', foerderung: 'Förderung', hardware: 'Ladehardware', cta: 'Beratung anfragen', reseller: 'Offizieller' , resellerTail: 'Reseller' },
    hero: {
      eyebrow: 'Depot-Elektrifizierung für Nutzfahrzeugflotten',
      h1a: 'Ihr Betriebshof wird zur', h1b: 'Lkw-Ladeinfrastruktur.',
      lead: 'Vom Netzanschluss bis zum geladenen Lkw — Übergabestation, Photovoltaik, Speicher und Ladepunkte aus einer Hand. Software von Virta, gefördert nach BMV.',
      cta1: 'Kostenlose Standortanalyse', cta2: 'Förderung berechnen',
      stats: [['500 €', 'Förderung je kW'], ['1 Mrd. €', 'BMV-Programm bis 2029'], ['82,5 %', 'laden am Betriebshof']],
    },
    sld: {
      caption: 'EINPOLSCHEMA · STROMFLUSS',
      nodes: [['STROMNETZ', 'Mittelspannung'], ['ÜBERGABESTATION', 'Trafo · SOMV'], ['LASTMANAGEMENT', '+ PV & Speicher'], ['LADEPUNKTE', 'DC 150–360 kW'], ['E-LKW', 'Depotladen']],
    },
    foerder: { pill: 'Förderfenster offen · 2026', text: 'Der Bund fördert Lkw-Ladeinfrastruktur mit <strong>500 €/kW</strong>. Die Antragsfenster laufen jetzt — wir bringen Ihr Projekt fristgerecht auf den Weg.', cta: 'Zuschuss schätzen' },
    leist: {
      kicker: 'Leistungen', h2: 'Die komplette Wertschöpfungskette',
      sub: 'Andere verkaufen eine Ladebox und scheitern am Rest. Bei uns kommt alles vom selben Anbieter — physische Infrastruktur von SOMV, Ladeplattform von Virta.',
      items: [
        { tag: '01 · NETZ', who: 'SOMV', title: 'Netzanschluss & Übergabestation', text: 'Netzanschlussbegehren, Mittelspannungsanschluss und Trafostation — der teuerste Baustein, unser Kerngeschäft.', href: brand.trafo, hrefLabel: 'Zur Trafo-Übergabestation' },
        { tag: '02 · ERZEUGUNG', who: 'SOMV', title: 'Photovoltaik', text: 'PV auf Dach- und Parkflächen als eigene, günstige Stromquelle für die Flotte.', href: brand.sep, hrefLabel: 'PV mit Solar Energie Partner' },
        { tag: '03 · SPEICHER', who: 'SOMV', title: 'Batteriespeicher & Lastmanagement', text: 'Lastspitzen kappen, Netzkosten senken, Ladeleistung intelligent auf die Fahrzeuge verteilen.' },
        { tag: '04 · LADEN', who: 'SOMV', title: 'DC-Depotlader', text: 'Ladepunkte von 50 bis 360 kW, MCS-ready. Ausgelegt auf Ihre Touren und Standzeiten.' },
        { tag: '05 · SOFTWARE', who: 'VIRTA', title: 'Ladeplattform & Abrechnung', text: 'Backend, App, Abrechnung, Roaming und Monitoring von Virta — als White-Label unter Ihrer Marke.' },
        { tag: '06 · FÖRDERUNG', who: 'SOMV', title: 'Fördermanagement', text: 'Wirtschaftlichkeitsrechnung, BMV-Antrag und Nachweise — wir halten die Fristen für Sie ein.' },
      ],
    },
    system: {
      kicker: 'Das System', h2: 'Hardware von uns. Plattform von Virta.',
      sub: 'Zwei Spezialisten, ein Ansprechpartner. Sie bekommen Netz, Erzeugung und Ladung schlüsselfertig — plus eine preisgekrönte Ladesoftware im eigenen Branding.',
      somvH: 'Vor Ort & im Boden',
      somvItems: ['Netzanschluss & Übergabestation (Trafo)', 'Tiefbau, Fundamente, Verkabelung', 'Photovoltaik & Batteriespeicher', 'DC-Ladepunkte & Lastmanagement', 'Förderantrag & Inbetriebnahme'],
      virtaH: 'In der Cloud',
      virtaItems: ['Ladeplattform & Backend (Virta Hub)', 'Abrechnung, Bezahlung & Roaming', 'Fahrer- & Betreiber-App im White-Label', 'Energiemanagement & Monitoring', 'EU-konform, laufend aktualisiert'],
      statsLabel: 'Virta-Netzwerk',
      stats: [['35+', 'Länder'], ['1.000+', 'B2B-Kunden'], ['690.000+', 'Ladepunkte inkl. Roaming'], ['10+ Jahre', 'Ladebetrieb-Erfahrung']],
    },
    rechner: {
      kicker: 'Förderrechner', h2: 'Was fördert der Bund für Ihren Hof?',
      sub: 'Stellen Sie Ladepunkte und Ladeleistung ein — wir zeigen die installierte Leistung und den geschätzten BMV-Zuschuss. Richtwerte, keine verbindliche Zusage.',
      count: 'Anzahl Ladepunkte', power: 'Leistung je Ladepunkt',
      outPower: 'Installierte Ladeleistung', outGrant: 'Geschätzter BMV-Zuschuss',
      cta: 'Genaue Berechnung anfragen',
      noteKmu: 'Basis: 500 €/kW. Passender Förderaufruf: nicht-öffentliche Ladeinfrastruktur, u. a. für KMU.',
      noteUnt: 'Basis: 500 €/kW. Passender Förderaufruf: nicht-öffentliche Ladeinfrastruktur für Unternehmen (bis 5 Mio. € je Antrag).',
      noteBig: 'Basis: 500 €/kW. Großprojekt — förderfähig über die öffentlichen Aufrufe; Details klären wir individuell.',
      unitKw: 'kW',
    },
    ablauf: {
      kicker: 'Ablauf', h2: 'In vier Schritten zur eigenen Ladeinfrastruktur',
      steps: [
        ['1', 'Standortanalyse & Netzcheck', 'Wir prüfen Betriebshof, Touren, Standzeiten und den vorhandenen Netzanschluss vor Ort.'],
        ['2', 'Konzept & Förderantrag', 'Auslegung von Ladepunkten, PV und Speicher, Wirtschaftlichkeitsrechnung und BMV-Antrag.'],
        ['3', 'Installation & Netzanschluss', 'Tiefbau, Übergabestation, Ladepunkte und Anbindung — schlüsselfertig aus einer Hand.'],
        ['4', 'Betrieb & Abrechnung', 'Inbetriebnahme, Monitoring und Abrechnung über die Virta-Plattform in Ihrem Branding.'],
      ],
    },
    zielg: {
      kicker: 'Für wen', h2: 'Gemacht für Flotten mit eigenem Betriebshof',
      items: [['Speditionen & Logistik', 'Feste Touren, tägliche Rückkehr zum Betriebshof.'], ['Handwerk & Bau', 'Flotten, die nachts und am Wochenende laden.'], ['Kommunen & Bauhöfe', 'Entsorgung, Winterdienst, Bus.'], ['Gewerbe mit Dachflächen', 'Laden kombiniert mit eigener Photovoltaik.']],
    },
    faqBlock: {
      kicker: 'Fragen', h2: 'Kurz erklärt',
      items: [
        ['Wie hoch ist die Förderung?', 'Das BMV fördert Lkw-Ladeinfrastruktur mit 500 € netto je kW installierter Ladeleistung. Über vier Jahre steht rund 1 Mrd. € bereit. Wir ermitteln Ihren konkreten Zuschuss und stellen den Antrag.'],
        ['Was ist der größte Kostenblock?', 'Meist nicht die Ladesäule, sondern der Netzanschluss samt Übergabestation. Genau das ist unsere Kernkompetenz — deshalb kommt alles aus einer Hand.'],
        ['Was übernimmt Virta?', 'Virta liefert die Ladeplattform: Abrechnung, Roaming, App, Energiemanagement und Monitoring — EU-konform und als White-Label unter Ihrer Marke.'],
        ['Wie lange dauert die Umsetzung?', 'Das hängt vor allem vom Netzanschluss ab. Wir starten mit Netzcheck und Förderantrag parallel, um keine Zeit zu verlieren.'],
      ],
    },
    ctaBlock: { h2: 'Reden wir über Ihren Betriebshof.', text: 'Kostenlose Ersteinschätzung inklusive Netzcheck und Förderhöhe — unverbindlich.', cta1: 'Standortanalyse anfragen', cta2: 'Rückruf vereinbaren', mailSubject: 'Anfrage Lkw-Ladeinfrastruktur' },
    form: {
      kicker: 'Kontakt', h2: 'Standortanalyse anfragen',
      sub: 'Erzählen Sie uns kurz von Ihrem Betriebshof — wir melden uns mit einer ersten Einschätzung inklusive Netzcheck und Förderhöhe.',
      name: 'Name', company: 'Firma', email: 'E-Mail', phone: 'Telefon (optional)',
      message: 'Ihre Nachricht', messagePlaceholder: 'Anzahl Fahrzeuge, Standort, Fragen …',
      consent: 'Ich habe die <a href="/datenschutz">Datenschutzerklärung</a> gelesen und bin mit der Verarbeitung meiner Angaben zur Bearbeitung der Anfrage einverstanden.',
      submit: 'Anfrage senden', sending: 'Wird gesendet …',
      ok: 'Vielen Dank! Wir melden uns zeitnah bei Ihnen.',
      err: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder schreiben Sie an info@somv-project.de.',
      required: 'Bitte füllen Sie die Pflichtfelder aus und stimmen Sie der Datenverarbeitung zu.',
    },
    foot: { note: 'Komplettanbieter Depot-Elektrifizierung für Nutzfahrzeugflotten · Offizieller Virta Reseller · Deggendorf, Bayern.', hLeist: 'Leistungen', lHardware: 'Hardware & Plattform', lRechner: 'Förderrechner', hGruppe: 'Unternehmensgruppe', hKontakt: 'Kontakt & Partner', virtaLink: 'Ladeplattform von Virta', impressum: 'Impressum', datenschutz: 'Datenschutz', region: 'Deggendorf · Bayern' },
  },

  en: {
    htmlLang: 'en',
    meta: {
      title: 'Truck Charging Infrastructure & Depot Charging for E-Trucks | Grid, PV & Funding – SOMV',
      desc: 'Turnkey depot charging for electric trucks: grid connection, transformer station, photovoltaics, storage and charge points from a single source. German BMV funding of €500/kW, software by Virta. Free site assessment for your depot.',
    },
    nav: { leistungen: 'Services', system: 'System', ablauf: 'Process', foerderung: 'Funding', hardware: 'Charging hardware', cta: 'Request advice', reseller: 'Official', resellerTail: 'Reseller' },
    hero: {
      eyebrow: 'Depot electrification for commercial fleets',
      h1a: 'Turn your depot into', h1b: 'truck charging infrastructure.',
      lead: 'From grid connection to a charged truck — transformer station, photovoltaics, storage and charge points from a single source. Software by Virta, backed by German BMV funding.',
      cta1: 'Free site assessment', cta2: 'Estimate funding',
      stats: [['€500', 'funding per kW'], ['€1bn', 'BMV programme to 2029'], ['82.5%', 'charge at the depot']],
    },
    sld: {
      caption: 'SINGLE-LINE DIAGRAM · POWER FLOW',
      nodes: [['GRID', 'medium voltage'], ['TRANSFORMER', 'station · SOMV'], ['LOAD MGMT', '+ PV & storage'], ['CHARGE POINTS', 'DC 150–360 kW'], ['E-TRUCK', 'depot charging']],
    },
    foerder: { pill: 'Funding window open · 2026', text: 'Germany funds truck charging infrastructure at <strong>€500/kW</strong>. The application windows are open now — we get your project submitted on time.', cta: 'Estimate grant' },
    leist: {
      kicker: 'Services', h2: 'The complete value chain',
      sub: 'Others sell a charging box and fall short on the rest. With us it all comes from one source — physical infrastructure by SOMV, charging platform by Virta.',
      items: [
        { tag: '01 · GRID', who: 'SOMV', title: 'Grid connection & transformer', text: 'Grid connection request, medium-voltage connection and transformer station — the costliest element, and our core business.', href: brand.trafo, hrefLabel: 'About the transformer station' },
        { tag: '02 · GENERATION', who: 'SOMV', title: 'Photovoltaics', text: 'PV on roof and parking areas as your own low-cost power source for the fleet.', href: brand.sep, hrefLabel: 'PV with Solar Energie Partner' },
        { tag: '03 · STORAGE', who: 'SOMV', title: 'Battery storage & load management', text: 'Cut peak loads, reduce grid fees and distribute charging power intelligently across vehicles.' },
        { tag: '04 · CHARGING', who: 'SOMV', title: 'DC depot chargers', text: 'Charge points from 50 to 360 kW, MCS-ready. Sized to your routes and dwell times.' },
        { tag: '05 · SOFTWARE', who: 'VIRTA', title: 'Charging platform & billing', text: 'Backend, app, billing, roaming and monitoring by Virta — white-labelled under your brand.' },
        { tag: '06 · FUNDING', who: 'SOMV', title: 'Funding management', text: 'Business case, BMV application and documentation — we keep the deadlines for you.' },
      ],
    },
    system: {
      kicker: 'The system', h2: 'Hardware from us. Platform from Virta.',
      sub: 'Two specialists, one point of contact. You get grid, generation and charging turnkey — plus award-winning charging software in your own branding.',
      somvH: 'On site & in the ground',
      somvItems: ['Grid connection & transformer station', 'Civil works, foundations, cabling', 'Photovoltaics & battery storage', 'DC charge points & load management', 'Funding application & commissioning'],
      virtaH: 'In the cloud',
      virtaItems: ['Charging platform & backend (Virta Hub)', 'Billing, payment & roaming', 'Driver & operator app, white-label', 'Energy management & monitoring', 'EU-compliant, continuously updated'],
      statsLabel: 'Virta network',
      stats: [['35+', 'countries'], ['1,000+', 'B2B customers'], ['690,000+', 'charge points incl. roaming'], ['10+ yrs', 'charging operations experience']],
    },
    rechner: {
      kicker: 'Funding calculator', h2: 'What will Germany fund for your depot?',
      sub: 'Set charge points and power — we show the installed power and the estimated BMV grant. Guide values, not a binding commitment.',
      count: 'Number of charge points', power: 'Power per charge point',
      outPower: 'Installed charging power', outGrant: 'Estimated BMV grant',
      cta: 'Request a precise calculation',
      noteKmu: 'Basis: €500/kW. Matching call: non-public charging infrastructure, incl. for SMEs.',
      noteUnt: 'Basis: €500/kW. Matching call: non-public charging infrastructure for companies (up to €5m per application).',
      noteBig: 'Basis: €500/kW. Large project — eligible via the public calls; details to be clarified individually.',
      unitKw: 'kW',
    },
    ablauf: {
      kicker: 'Process', h2: 'Four steps to your own charging infrastructure',
      steps: [
        ['1', 'Site assessment & grid check', 'We review the depot, routes, dwell times and the existing grid connection on site.'],
        ['2', 'Concept & funding application', 'Sizing of charge points, PV and storage, business case and BMV application.'],
        ['3', 'Installation & grid connection', 'Civil works, transformer station, charge points and connection — turnkey from one source.'],
        ['4', 'Operation & billing', 'Commissioning, monitoring and billing via the Virta platform in your branding.'],
      ],
    },
    zielg: {
      kicker: 'For whom', h2: 'Built for fleets with their own depot',
      items: [['Hauliers & logistics', 'Fixed routes, daily return to the depot.'], ['Trades & construction', 'Fleets that charge overnight and at weekends.'], ['Municipalities & yards', 'Waste, winter service, buses.'], ['Businesses with roof space', 'Charging combined with your own solar.']],
    },
    faqBlock: {
      kicker: 'Questions', h2: 'Briefly explained',
      items: [
        ['How high is the funding?', 'Germany funds truck charging infrastructure at €500 net per kW of installed charging power. Around €1bn is available over four years. We determine your specific grant and file the application.'],
        ['What is the biggest cost block?', 'Usually not the charge point, but the grid connection and transformer station. That is exactly our core competence — which is why it all comes from one source.'],
        ['What does Virta provide?', 'Virta supplies the charging platform: billing, roaming, app, energy management and monitoring — EU-compliant and white-labelled under your brand.'],
        ['How long does implementation take?', 'It depends mainly on the grid connection. We start the grid check and the funding application in parallel to save time.'],
      ],
    },
    ctaBlock: { h2: 'Let’s talk about your depot.', text: 'Free initial assessment including grid check and funding amount — no obligation.', cta1: 'Request a site assessment', cta2: 'Arrange a call-back', mailSubject: 'Enquiry truck charging infrastructure' },
    form: {
      kicker: 'Contact', h2: 'Request a site assessment',
      sub: 'Tell us briefly about your depot — we’ll get back to you with an initial assessment including grid check and funding amount.',
      name: 'Name', company: 'Company', email: 'Email', phone: 'Phone (optional)',
      message: 'Your message', messagePlaceholder: 'Number of vehicles, location, questions …',
      consent: 'I have read the <a href="/datenschutz">privacy policy</a> and consent to the processing of my data to handle this enquiry.',
      submit: 'Send enquiry', sending: 'Sending …',
      ok: 'Thank you! We’ll be in touch shortly.',
      err: 'Something went wrong. Please try again or email info@somv-project.de.',
      required: 'Please complete the required fields and agree to the data processing.',
    },
    foot: { note: 'Turnkey depot electrification for commercial fleets · Official Virta reseller · Deggendorf, Germany.', hLeist: 'Services', lHardware: 'Hardware & platform', lRechner: 'Funding calculator', hGruppe: 'Group companies', hKontakt: 'Contact & partner', virtaLink: 'Charging platform by Virta', impressum: 'Imprint', datenschutz: 'Privacy', region: 'Deggendorf · Germany' },
  },
};
