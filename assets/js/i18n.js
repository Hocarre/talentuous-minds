/* ==========================================================================
   Talentuous Minds Fellowship — Internationalisation FR / EN
   Système léger sans dépendance : les traductions vivent dans le DOM.
   Chaque élément traduisible porte :
     data-i18n="clé"          -> remplace textContent
     data-i18n-html="clé"     -> remplace innerHTML (gras, liens)
     data-i18n-placeholder    -> remplace l'attribut placeholder
     data-i18n-aria           -> remplace l'attribut aria-label
   Le dictionnaire FR est le texte par défaut présent dans le HTML.
   ========================================================================== */

(function () {
  "use strict";

  var STORAGE_KEY = "tm-lang";
  var DEFAULT_LANG = "fr";
  var SUPPORTED = ["fr", "en"];

  /* ------------------------------------------------------------------------
     Dictionnaire de traduction
     Clés : identiques dans toutes les pages, préfixées par page si besoin.
     ------------------------------------------------------------------------ */
  var I18N = {
    en: {
      /* --- Navigation et éléments communs --- */
      "nav.home": "Home",
      "nav.about": "About",
      "nav.programs": "Programs",
      "nav.services": "Services",
      "nav.contact": "Contact",
      "nav.events": "Events",
      "nav.team": "Team",
      "nav.apply": "Apply",
      "nav.training": "Drug Discovery",
      "nav.cta": "Join us",
      "nav.toggle": "Open menu",
      "brand.tag": "Fellowship",
      "skip": "Skip to main content",

      /* --- Accueil : hero --- */
      "home.hero.eyebrow": "Skills · Education · Talent",
      "home.hero.title": "Building a generation of",
      "home.hero.title.accent": "capable, autonomous talents",
      "home.hero.lead": "Talentuous Minds Fellowship is an initiative dedicated to skills development, education, youth support and the recognition of talent. We create an environment conducive to learning, personal and professional growth, innovation and entrepreneurship.",
      "home.hero.quote": "Building a generation of competent, autonomous talents able to contribute to the development of their community.",
      "home.hero.panel.title": "What we do",
      "home.hero.panel.1": "Computer and digital skills training",
      "home.hero.panel.2": "Entrepreneurship and leadership programs",
      "home.hero.panel.3": "Data management and analysis services",
      "home.hero.panel.4": "Scientific writing and research support",
      "home.hero.btn.primary": "Discover our programs",
      "home.hero.btn.secondary": "Contact us",

      /* --- Accueil : piliers --- */
      "home.pillars.eyebrow": "Our areas of action",
      "home.pillars.title": "Six pillars to develop talent",
      "home.pillars.lead": "Our activities are structured around complementary areas, from digital skills to scientific research.",
      "home.pillar.1.title": "Digital & IT training",
      "home.pillar.1.text": "General computing, office software, collaborative tools, digital tools for studies and work, introduction to programming and data analysis.",
      "home.pillar.2.title": "Personal development",
      "home.pillar.2.text": "Time management, communication, public speaking, self-confidence, teamwork, project management and problem solving.",
      "home.pillar.3.title": "Entrepreneurship & leadership",
      "home.pillar.3.text": "Business creation, opportunity identification, project design, leadership, team management and innovation.",
      "home.pillar.4.title": "Research & academia",
      "home.pillar.4.text": "Research methodology, scientific writing, LaTeX, bibliographic research, statistics and thesis support.",
      "home.pillar.5.title": "Data & analysis",
      "home.pillar.5.text": "Data analysis, data cleaning, survey design, interview guides, data entry forms and methodological support.",
      "home.pillar.6.title": "Mentoring",
      "home.pillar.6.text": "Support for students, researchers and professionals in their academic and career paths.",

      /* --- Accueil : approche --- */
      "home.approach.eyebrow": "Our teaching approach",
      "home.approach.title": "A practical, results-oriented pedagogy",
      "home.approach.lead": "Our approach rests on four principles designed to turn knowledge into concrete skills.",
      "home.step.1.title": "Learn",
      "home.step.1.text": "Acquire the fundamental knowledge required.",
      "home.step.2.title": "Practise",
      "home.step.2.text": "Immediately apply knowledge through exercises and projects.",
      "home.step.3.title": "Experiment",
      "home.step.3.text": "Work on real, concrete situations.",
      "home.step.4.title": "Transform",
      "home.step.4.text": "Use the acquired skills to solve real problems in studies, business or the community.",

      /* --- Accueil : public --- */
      "home.audience.eyebrow": "Who is it for?",
      "home.audience.title": "A program open to different profiles",
      "home.audience.1.title": "Students",
      "home.audience.1.text": "To develop digital, academic and professional skills.",
      "home.audience.2.title": "Young graduates",
      "home.audience.2.text": "To ease their entry into the job market and strengthen employability.",
      "home.audience.3.title": "Researchers",
      "home.audience.3.text": "For methodology, scientific tools, data management and writing.",
      "home.audience.4.title": "Entrepreneurs",
      "home.audience.4.text": "To develop entrepreneurship, leadership and project management skills.",
      "home.audience.5.title": "Professionals",
      "home.audience.5.text": "To strengthen skills and the ability to use digital tools.",
      "home.audience.6.title": "Organisations",
      "home.audience.6.text": "For data services, studies, surveys and staff training.",

      /* --- Accueil : pourquoi nous rejoindre --- */
      "home.why.eyebrow": "Why join us?",
      "home.why.title": "What you gain with Talentuous Minds",
      "home.why.1.title": "Develop your skills",
      "home.why.1.text": "Acquire skills directly useful in your studies and professional life.",
      "home.why.2.title": "Learn from experienced people",
      "home.why.2.text": "Benefit from training and support adapted to participants' needs.",
      "home.why.3.title": "Grow your network",
      "home.why.3.text": "Meet other students, researchers, professionals and entrepreneurs.",
      "home.why.4.title": "Turn your ideas into projects",
      "home.why.4.text": "Move from an idea to a concrete project.",
      "home.why.5.title": "Prepare for the professional world",
      "home.why.5.text": "Develop the technical and behavioural skills organisations look for.",

      /* --- Accueil : CTA --- */
      "home.cta.title": "Ready to develop your talent?",
      "home.cta.text": "Join our programs or contact us to discuss your training, support or data analysis needs.",
      "home.cta.btn.primary": "Apply now",
      "home.cta.btn.secondary": "Contact us",

      /* --- À propos --- */
      "about.hero.title": "About Talentuous Minds",
      "about.hero.lead": "An initiative oriented towards skills development, education, youth support and the recognition of talent.",
      "about.who.eyebrow": "Who we are",
      "about.who.title": "An initiative for talent development",
      "about.who.p1": "Talentuous Minds Fellowship, presented as Talentuous Minds, is an initiative oriented towards skills development, education, youth support and the recognition of talent.",
      "about.who.p2": "Through its activities, Talentuous Minds seeks to create an environment conducive to learning, personal and professional growth, innovation and entrepreneurship.",
      "about.who.p3": "The organisation focuses particularly on developing the practical skills that young people, students, researchers, entrepreneurs and professionals need to better meet the demands of the academic and professional world.",
      "about.who.p4": "Its documented activities include computer training, entrepreneurship and leadership programs, as well as training and services related to data management and analysis. Public records also attest to scientific training activities, notably around scientific writing and digital tools.",
      "about.vision.eyebrow": "Our vision",
      "about.vision.title": "Our vision",
      "about.vision.quote": "Building a generation of competent, autonomous talents able to contribute to the development of their community.",
      "about.vision.p1": "The vision of Talentuous Minds rests on the idea that the sustainable development of a society depends above all on the development of its human capital.",
      "about.vision.p2": "The organisation therefore aims to contribute to the emergence of a generation that is:",
      "about.vision.li1": "better trained;",
      "about.vision.li2": "more autonomous;",
      "about.vision.li3": "able to use technology;",
      "about.vision.li4": "able to undertake;",
      "about.vision.li5": "able to solve problems;",
      "about.vision.li6": "open to innovation;",
      "about.vision.li7": "committed to its community;",
      "about.vision.li8": "able to turn knowledge into concrete solutions.",
      "about.vision.p3": "Talentuous Minds thus seeks to help bring forth talented minds capable of thinking, innovating and acting.",
      "about.mission.eyebrow": "Our mission",
      "about.mission.title": "Our mission",
      "about.mission.quote": "Develop skills and recognise talent through training, support, mentoring, entrepreneurship, digital tools, research and knowledge management.",
      "about.mission.p1": "Concretely, Talentuous Minds seeks to:",
      "about.mission.li1": "offer accessible and practical training;",
      "about.mission.li2": "strengthen young people's digital skills;",
      "about.mission.li3": "support students and professionals;",
      "about.mission.li4": "promote entrepreneurship;",
      "about.mission.li5": "develop leadership skills;",
      "about.mission.li6": "encourage research and scientific output;",
      "about.mission.li7": "support organisations in data management and analysis;",
      "about.mission.li8": "promote the use of technology in education and work;",
      "about.mission.li9": "create learning and professional development opportunities.",
      "about.values.eyebrow": "Our values",
      "about.values.title": "The principles that guide us",
      "about.values.lead": "Seven values shape our identity and our way of working.",
      "about.value.1.title": "Excellence",
      "about.value.1.text": "We encourage our members and beneficiaries to strive for excellence in their academic, professional and entrepreneurial paths.",
      "about.value.2.title": "Integrity",
      "about.value.2.text": "We place particular importance on honesty, responsibility and respect for ethical principles.",
      "about.value.3.title": "Innovation",
      "about.value.3.text": "We encourage new ideas, the use of technology and the creation of solutions adapted to the problems of our society.",
      "about.value.4.title": "Sharing",
      "about.value.4.text": "Knowledge gains more value when it is shared. Talentuous Minds therefore encourages the transmission of knowledge and mutual aid.",
      "about.value.5.title": "Leadership",
      "about.value.5.text": "We want to help train people able to take initiative, lead projects and have a positive impact on their environment.",
      "about.value.6.title": "Commitment",
      "about.value.6.text": "We encourage our members to actively participate in the development of their community.",
      "about.value.7.title": "Inclusion",
      "about.value.7.text": "We want to create learning opportunities accessible to different profiles, notably young people, students, researchers and professionals.",
      "about.impact.eyebrow": "Our impact",
      "about.impact.title": "Our impact",
      "about.impact.lead": "These indicators will be published once the figures have been verified with Talentuous Minds.",
      "about.impact.1": "People trained",
      "about.impact.2": "Training sessions held",
      "about.impact.3": "Cities covered",
      "about.impact.4": "Projects supported",
      "about.impact.5": "Entrepreneurs supported",
      "about.impact.6": "Researchers supported",
      "about.impact.7": "Partner organisations",
      "about.impact.8": "Certificates issued",
      "about.impact.pending": "To be confirmed",
      "about.partners.eyebrow": "Our partners",
      "about.partners.title": "Together, we can create more opportunities",
      "about.partners.text": "We work with universities, schools, research centres, companies, NGOs, associations, public institutions and international organisations. Partner names and logos are published only after confirmation of the relationship with each organisation.",

      /* --- Programmes --- */
      "programs.hero.title": "Our programs",
      "programs.hero.lead": "Practical training designed to develop directly useful skills in studies, work and entrepreneurship.",
      "programs.cat1.title": "IT & digital",
      "programs.cat1.1": "General computing",
      "programs.cat1.2": "Office software",
      "programs.cat1.3": "Microsoft Word",
      "programs.cat1.4": "Microsoft Excel",
      "programs.cat1.5": "PowerPoint",
      "programs.cat1.6": "Collaborative tools",
      "programs.cat1.7": "Online information research",
      "programs.cat1.8": "Digital tools for studies",
      "programs.cat1.9": "Professional digital tools",
      "programs.cat1.10": "Introduction to programming",
      "programs.cat1.11": "Data analysis tools",
      "programs.cat1.12": "Digital communication tools",
      "programs.cat2.title": "Research & science",
      "programs.cat2.1": "Introduction to scientific research",
      "programs.cat2.2": "Research methodology",
      "programs.cat2.3": "Scientific writing",
      "programs.cat2.4": "Bibliographic research",
      "programs.cat2.5": "Survey design",
      "programs.cat2.6": "Data collection",
      "programs.cat2.7": "Data processing",
      "programs.cat2.8": "Statistical analysis",
      "programs.cat2.9": "Presentation of results",
      "programs.cat2.10": "Theses and reports",
      "programs.cat2.11": "Scientific tools",
      "programs.cat2.12": "Support for students and researchers",
      "programs.cat3.title": "Entrepreneurship & leadership",
      "programs.cat3.1": "Entrepreneurship",
      "programs.cat3.2": "Business creation",
      "programs.cat3.3": "Opportunity identification",
      "programs.cat3.4": "Project design",
      "programs.cat3.5": "Leadership",
      "programs.cat3.6": "Team management",
      "programs.cat3.7": "Entrepreneurial communication",
      "programs.cat3.8": "Project management",
      "programs.cat3.9": "Innovation",
      "programs.cat3.10": "Business idea development",
      "programs.cat4.title": "Personal development",
      "programs.cat4.1": "Personal development",
      "programs.cat4.2": "Time management",
      "programs.cat4.3": "Communication",
      "programs.cat4.4": "Public speaking",
      "programs.cat4.5": "Self-confidence",
      "programs.cat4.6": "Teamwork",
      "programs.cat4.7": "Project management",
      "programs.cat4.8": "Problem solving",
      "programs.cat4.9": "Academic and career guidance",
      "programs.cat4.10": "Preparation for professional integration",
      "programs.events.eyebrow": "Our events",
      "programs.events.title": "Documented activities",
      "programs.events.lead": "A selection of publicly documented activities. Each event page includes photos, description, date, venue, speakers, program and participants.",
      "programs.event.1.title": "Computer training — holiday session",
      "programs.event.1.meta": "Garoua, 2023",
      "programs.event.1.text": "A special holiday computer training session held in Garoua in 2023.",
      "programs.event.2.title": "Entrepreneurship & leadership seminar",
      "programs.event.2.meta": "7–8 April 2023 · with certificate",
      "programs.event.2.text": "A training seminar on entrepreneurship and leadership, delivered with a certificate.",
      "programs.event.3.title": "Scientific Document Writing with LaTeX",
      "programs.event.3.meta": "May 2023 · certified",
      "programs.event.3.text": "A training course on scientific document writing using LaTeX, delivered by Talentuous Minds Fellowship.",
      "programs.cta.title": "Interested in one of our programs?",
      "programs.cta.text": "Contact us to find out about upcoming sessions, schedules and registration terms.",
      "programs.cta.btn": "Request information",

      /* --- Services --- */
      "services.hero.title": "Data & analysis services",
      "services.hero.lead": "Support for organisations, researchers and professionals in designing studies, collecting, cleaning and analysing data.",
      "services.1.title": "Data analysis",
      "services.1.text": "Support in organising, processing, analysing and interpreting data.",
      "services.2.title": "Data cleaning",
      "services.2.text": "Identification and correction of inconsistencies, duplicates, missing values or errors in databases.",
      "services.3.title": "Survey design",
      "services.3.text": "Design of questionnaires adapted to the objectives of a study or survey.",
      "services.4.title": "Interview guides",
      "services.4.text": "Development of structured guides for qualitative interviews and field studies.",
      "services.5.title": "Data entry forms",
      "services.5.text": "Design of tools facilitating structured data collection and entry.",
      "services.6.title": "Methodological support",
      "services.6.text": "Assistance in study design, data collection and preparation of datasets for analysis.",
      "services.process.eyebrow": "How we work",
      "services.process.title": "A structured approach",
      "services.process.1.title": "Framing",
      "services.process.1.text": "Clarifying objectives, research questions and expected deliverables.",
      "services.process.2.title": "Design",
      "services.process.2.text": "Building collection tools: questionnaires, interview guides, data entry forms.",
      "services.process.3.title": "Collection & cleaning",
      "services.process.3.text": "Gathering data and correcting inconsistencies, duplicates and missing values.",
      "services.process.4.title": "Analysis & reporting",
      "services.process.4.text": "Statistical analysis, interpretation and presentation of results.",
      "services.cta.title": "A data project to discuss?",
      "services.cta.text": "Describe your needs and we will get back to you with a proposal adapted to your context.",
      "services.cta.btn": "Request a quote",

      /* --- Services : Drug Discovery --- */
      "services.dd.eyebrow": "Molecular modelling",
      "services.dd.title": "Drug Discovery services",
      "services.dd.lead": "Beyond training, we support research teams in their computer-aided drug discovery projects: from target preparation to results analysis.",
      "services.dd.1.title": "Molecular docking",
      "services.dd.1.text": "Receptor and ligand preparation, grid definition, AutoDock Vina docking, validation by redocking and RMSD calculation.",
      "services.dd.2.title": "Virtual screening",
      "services.dd.2.text": "Building and preparing compound libraries, automated screening, ADMET filtering and prioritisation of hits.",
      "services.dd.3.title": "Molecular dynamics",
      "services.dd.3.text": "Simulating complex stability, RMSD and RMSF analysis, interactions over time, binding free energy.",
      "services.dd.4.title": "Interaction analysis",
      "services.dd.4.text": "PLIP analysis, interaction fingerprints, pose clustering, consensus scoring and publication-quality figures.",
      "services.dd.5.title": "Structure prediction",
      "services.dd.5.text": "Obtaining and validating 3D structures with AlphaFold, ESMFold or homology modelling, preparation for docking.",
      "services.dd.6.title": "Automated pipelines",
      "services.dd.6.text": "Developing Python scripts to automate preparation, batch execution, analysis and report generation.",
      "services.dd.btn": "See the related training",
      "services.dd.btn2": "Request a quote",

      /* --- Contact --- */
      "contact.hero.title": "Contact us",
      "contact.hero.lead": "A question about our programs, a training request or a data project? Write to us.",
      "contact.form.title": "Send us a message",
      "contact.form.name": "Full name",
      "contact.form.email": "Email address",
      "contact.form.subject": "Subject",
      "contact.form.subject.1": "Training information",
      "contact.form.subject.2": "Program application",
      "contact.form.subject.3": "Data & analysis service",
      "contact.form.subject.4": "Partnership",
      "contact.form.subject.5": "Other",
      "contact.form.message": "Your message",
      "contact.form.submit": "Send message",
      "contact.form.note": "This form opens your email client. No data is stored on this site.",
      "contact.info.title": "Contact details",
      "contact.info.email": "Email",
      "contact.info.phone": "Phone",
      "contact.info.address": "Address",
      "contact.info.social": "Social media",
      "contact.info.pending": "To be completed",
      "contact.apply.title": "Apply to a program",
      "contact.apply.text": "Applications are handled through an external form. Click below to access it.",
      "contact.apply.btn": "Open the application form",

      /* --- Événements --- */
      "events.hero.title": "Our events and activities",
      "events.hero.lead": "Training sessions, seminars and support programs organised by Talentuous Minds Fellowship. This page progressively builds the organisation's digital archives.",
      "events.filter.all": "All activities",
      "events.filter.it": "IT",
      "events.filter.entrepreneurship": "Entrepreneurship",
      "events.filter.research": "Research",
      "events.photo.pending": "Photo to be provided",
      "events.tag.it": "IT",
      "events.tag.entrepreneurship": "Entrepreneurship",
      "events.tag.research": "Research",
      "events.tag.past": "Past",
      "events.tag.certified": "Certificate",
      "events.meta.date": "Date",
      "events.meta.place": "Venue",
      "events.meta.type": "Type",
      "events.1.title": "Computer training — holiday session",
      "events.1.date": "2023",
      "events.1.place": "Garoua, Cameroon",
      "events.1.type": "Practical training",
      "events.1.text": "A special holiday computer training session held in Garoua in 2023. This session aimed to introduce participants to basic computer tools and digital skills useful in studies and work.",
      "events.1.note": "Details to be completed: number of participants, duration, detailed program, speakers.",
      "events.2.title": "Training seminar on entrepreneurship and leadership",
      "events.2.date": "7 and 8 April 2023",
      "events.2.place": "To be completed",
      "events.2.type": "Seminar with certificate",
      "events.2.text": "A training seminar on entrepreneurship and leadership, held on 7 and 8 April 2023 and delivered with a certificate. This seminar is among the publicly documented activities of Talentuous Minds Fellowship.",
      "events.2.note": "Details to be completed: speakers, two-day program, number of participants, certificate award photos.",
      "events.3.title": "Scientific Document Writing with LaTeX",
      "events.3.date": "May 2023",
      "events.3.place": "To be completed",
      "events.3.type": "Certified training",
      "events.3.text": "A training course on scientific document writing using LaTeX, delivered by Talentuous Minds Fellowship in May 2023. A public certification mentions this activity.",
      "events.3.note": "Details to be completed: program, number of participants, trainer, examples of documents produced.",
      "events.schema.eyebrow": "Event page structure",
      "events.schema.title": "What each event contains",
      "events.schema.lead": "Each event page can include the following elements, in order to build a complete and searchable archive.",
      "events.schema.1": "Photos",
      "events.schema.2": "Date and venue",
      "events.schema.3": "Speakers",
      "events.schema.4": "Program",
      "events.schema.5": "Participants",
      "events.schema.6": "Certificates",
      "events.schema.7": "Training materials",
      "events.schema.8": "Registration link",
      "events.upcoming.eyebrow": "Upcoming sessions",
      "events.upcoming.title": "Upcoming events",
      "events.upcoming.lead": "The calendar of upcoming sessions will be published as soon as it is confirmed.",
      "events.cta.title": "Would you like to join an upcoming session?",
      "events.cta.text": "Contact us to be informed about upcoming training sessions and seminars.",

      /* --- Équipe --- */
      "team.hero.title": "Our team",
      "team.hero.lead": "The people who design, run and support the activities of Talentuous Minds Fellowship.",
      "team.board.eyebrow": "Coordination",
      "team.board.title": "Coordination and leadership",
      "team.board.lead": "The coordination, leadership and representation roles of the organisation.",
      "team.role.coordinator": "General coordination",
      "team.role.coordinator.bio": "Steering activities, coordinating programs and representing the organisation.",
      "team.role.programs": "Programs manager",
      "team.role.programs.bio": "Designing training, planning sessions and pedagogical follow-up.",
      "team.role.research": "Research manager",
      "team.role.research.bio": "Scientific support, methodology and supervision of research work.",
      "team.status.pending": "To be filled / confirmed",
      "team.trainers.eyebrow": "Trainers",
      "team.trainers.title": "Trainers and speakers",
      "team.trainers.lead": "The areas of expertise mobilised during training sessions and seminars.",
      "team.expertise.it": "IT & digital",
      "team.expertise.it.bio": "Office software, digital tools, introduction to programming.",
      "team.expertise.data": "Data & analysis",
      "team.expertise.data.bio": "Data processing, cleaning and statistical analysis.",
      "team.expertise.research": "Research & writing",
      "team.expertise.research.bio": "Methodology, scientific writing, LaTeX, bibliography.",
      "team.expertise.entrepreneurship": "Entrepreneurship & leadership",
      "team.expertise.entrepreneurship.bio": "Business creation, project management, leadership.",
      "team.members.eyebrow": "Community",
      "team.members.title": "Members and volunteers",
      "team.members.lead": "Talentuous Minds relies on the commitment of its members and volunteers.",
      "team.members.1.title": "Become a volunteer",
      "team.members.1.text": "Contribute to organising training, following up participants and the life of the association.",
      "team.members.2.title": "Become a trainer",
      "team.members.2.text": "Share your expertise by leading a training session or workshop.",
      "team.members.3.title": "Become a partner",
      "team.members.3.text": "Support the organisation's activities, materially or financially.",
      "team.cta.title": "Want to join the team?",
      "team.cta.text": "Whether you are a trainer, researcher, student or professional, your contribution can help develop skills and recognise talent.",

      /* --- Candidature --- */
      "apply.hero.eyebrow": "Application",
      "apply.hero.title": "Apply to a program",
      "apply.hero.lead": "Fill in this form to apply for our training, our support or our mentoring program. We will get back to you.",
      "apply.step.1": "Profile",
      "apply.step.2": "Background",
      "apply.step.3": "Program",
      "apply.step.4": "Motivation",
      "apply.step.5": "Confirmation",
      "apply.s1.title": "Your profile",
      "apply.s2.title": "Your background",
      "apply.s3.title": "The program you want",
      "apply.s4.title": "Your motivation",
      "apply.s5.title": "Review and send",
      "apply.s5.lead": "Check the information you entered before sending your application.",
      "apply.s5.note": "This form opens your email client with the information you entered. No data is stored on this site.",
      "apply.firstname": "First name",
      "apply.lastname": "Last name",
      "apply.email": "Email address",
      "apply.phone": "Phone / WhatsApp",
      "apply.country": "Country",
      "apply.city": "City",
      "apply.status": "Current situation",
      "apply.status.1": "Student",
      "apply.status.2": "Recent graduate",
      "apply.status.3": "Researcher",
      "apply.status.4": "Entrepreneur",
      "apply.status.5": "Professional",
      "apply.status.6": "Job seeker",
      "apply.status.7": "Other",
      "apply.level": "Education level",
      "apply.level.1": "Secondary school",
      "apply.level.2": "High school diploma",
      "apply.level.3": "Bachelor's degree",
      "apply.level.4": "Master's degree",
      "apply.level.5": "Doctorate",
      "apply.level.6": "Other",
      "apply.field": "Field of study or activity",
      "apply.org": "Institution or organisation",
      "apply.program": "Program",
      "apply.program.1": "IT & digital",
      "apply.program.2": "Research & scientific writing",
      "apply.program.3": "Entrepreneurship & leadership",
      "apply.program.4": "Personal development",
      "apply.program.5": "Data & analysis",
      "apply.program.6": "Mentoring / support",
      "apply.program.7": "Other",
      "apply.format": "Preferred format",
      "apply.format.1": "In person",
      "apply.format.2": "Online",
      "apply.format.3": "Hybrid",
      "apply.format.4": "No preference",
      "apply.availability": "Availability",
      "apply.avail.1": "Daytime",
      "apply.avail.2": "Evening",
      "apply.avail.3": "Weekend",
      "apply.avail.4": "School holidays",
      "apply.needs": "Specific needs (optional)",
      "apply.needs.1": "I would like to receive a certificate",
      "apply.needs.2": "I would like to request a fee waiver",
      "apply.needs.3": "I need specific accommodations",
      "apply.motivation": "Why do you want to join this program?",
      "apply.expectations": "What do you expect from this program?",
      "apply.consent": "I agree that my data may be used to process my application. It will not be sold or shared with third parties.",
      "apply.next": "Next",
      "apply.prev": "Previous",
      "apply.review": "Review",
      "apply.submit": "Send my application",
      "apply.success.title": "Application prepared",
      "apply.success.text": "Your email client should open with your application pre-filled. If not, write to us directly at the address shown on the Contact page.",

      /* --- Mentions légales --- */
      "legal.hero.eyebrow": "Legal information",
      "legal.hero.title": "Legal notice",
      "legal.hero.lead": "Legal information, privacy policy and terms of use for the Talentuous Minds Fellowship website.",
      "legal.toc": "Contents",
      "legal.toc.1": "Site publisher",
      "legal.toc.2": "Hosting",
      "legal.toc.3": "Intellectual property",
      "legal.toc.4": "Personal data",
      "legal.toc.5": "Cookies",
      "legal.toc.6": "Liability",
      "legal.toc.7": "External links",
      "legal.toc.8": "Applicable law",
      "legal.toc.9": "Contact",
      "legal.pending": "to be completed",
      "legal.field.name": "Name",
      "legal.field.status": "Legal status",
      "legal.field.registration": "Registration number",
      "legal.field.address": "Address",
      "legal.field.email": "Email",
      "legal.field.phone": "Phone",
      "legal.editor.title": "1. Site publisher",
      "legal.editor.intro": "This website is published by Talentuous Minds Fellowship.",
      "legal.editor.identity": "Identification",
      "legal.editor.publication": "Publication manager",
      "legal.host.title": "2. Hosting",
      "legal.host.text": "This site is hosted by Cloudflare Pages, a service of Cloudflare, Inc.",
      "legal.host.note": "This is a static site: no database is used and no server-side processing is performed.",
      "legal.ip.title": "3. Intellectual property",
      "legal.ip.text1": "All content on this site (text, structure, layout, source code, graphic elements) is the property of Talentuous Minds Fellowship, unless explicitly stated otherwise.",
      "legal.ip.text2": "Any reproduction, representation, modification or adaptation, in whole or in part, without prior written authorisation is prohibited.",
      "legal.ip.text3": "Logos and trademarks of any partners mentioned remain the property of their respective owners.",
      "legal.privacy.title": "4. Protection of personal data",
      "legal.privacy.collect": "What data is collected?",
      "legal.privacy.collect.text": "This site has no database and stores no personal data. The contact and application forms work exclusively through your email client: the information you enter is sent directly by email and does not pass through this site.",
      "legal.privacy.purpose": "Use of the data received",
      "legal.privacy.purpose.text": "Data sent by email (name, contact details, background, motivation) is used only to process your request or application. It is neither sold, rented nor shared with third parties.",
      "legal.privacy.rights": "Your rights",
      "legal.privacy.rights.text": "You have the right to access, rectify, erase and object to data concerning you. To exercise these rights, write to contact@talentuousminds.org.",
      "legal.privacy.retention": "Retention period",
      "legal.privacy.retention.text": "Applications received are kept for as long as necessary to process them, then deleted on request.",
      "legal.cookies.title": "5. Cookies and local storage",
      "legal.cookies.text1": "This site uses no advertising cookies or third-party trackers.",
      "legal.cookies.text2": "Only one item is stored in your browser's local storage (localStorage): your language preference (French or English). This information stays on your device and is never transmitted.",
      "legal.cookies.text3": "You can delete this preference at any time by clearing your browser's browsing data.",
      "legal.liability.title": "6. Limitation of liability",
      "legal.liability.text1": "Talentuous Minds Fellowship strives to ensure the accuracy of the information published on this site. However, this information is provided for guidance only and is subject to change.",
      "legal.liability.text2": "Talentuous Minds Fellowship cannot be held liable for direct or indirect damage resulting from the use of this site or the inability to access it.",
      "legal.liability.text3": "The programs, dates and terms presented on this site may be changed without notice. Only information confirmed directly by Talentuous Minds Fellowship is contractually binding.",
      "legal.links.title": "7. External links",
      "legal.links.text": "This site may contain links to third-party sites (social networks, form services). Talentuous Minds Fellowship has no control over these sites and accepts no liability for their content or their personal data practices.",
      "legal.law.title": "8. Applicable law",
      "legal.law.text": "This site and these legal notices are governed by the law of the country where Talentuous Minds Fellowship is established. to be completed",
      "legal.contact.title": "9. Contact",
      "legal.contact.text": "For any question relating to these legal notices or to your personal data:",
      "legal.updated": "Last updated",

      /* --- Formations Drug Discovery --- */
      "training.hero.eyebrow": "Specialised training",
      "training.hero.title": "Drug Discovery: from target to drug candidate",
      "training.hero.lead": "Hands-on training in computer-aided drug discovery: molecular docking, virtual screening, molecular dynamics, interaction analysis and structure prediction. With practical work on real cases.",
      "training.hero.btn": "Request the program",
      "training.hero.btn2": "See the modules",
      "training.modules.eyebrow": "Modular pathway",
      "training.modules.title": "Seven modules, from beginner to advanced",
      "training.modules.lead": "Each module can be taken independently. A complete pathway is also offered, from target preparation to results analysis.",
      "training.level.intro": "Beginner",
      "training.level.inter": "Intermediate",
      "training.level.adv": "Advanced",
      "training.price.free": "Free",
      "training.price.paid": "Paid",
      "training.meta.duration": "Duration",
      "training.meta.prereq": "Prerequisites",
      "training.meta.format": "Format",
      "training.format.hybrid": "In person or online",
      "training.format.onsite": "In person recommended (compute-intensive)",
      "training.format.online": "Online",

      "training.m1.title": "Molecular docking",
      "training.m1.text": "Principles of docking, receptor and ligand preparation, search grid definition, AutoDock Vina parameterisation and interpretation of affinity scores.",
      "training.m1.t1": "Theory: protein-ligand interactions, scoring functions",
      "training.m1.t2": "PDB → PDBQT preparation (receptor and ligand)",
      "training.m1.t3": "Active site selection and grid definition",
      "training.m1.t4": "Vina parameters: exhaustiveness, num_modes, energy_range",
      "training.m1.t5": "Validation by redocking and RMSD calculation",
      "training.m1.dur": "2 days (14 h)",
      "training.m1.prereq": "Basic biochemistry, command line",

      "training.m2.title": "Virtual screening",
      "training.m2.text": "Building a compound library, batch ligand preparation, automated screening and result ranking. ADMET filtering and hit classification.",
      "training.m2.t1": "Compound sources: ZINC, PubChem, ChEMBL",
      "training.m2.t2": "Automated library preparation",
      "training.m2.t3": "Screening scripts and parallelisation",
      "training.m2.t4": "ADMET filters and Lipinski's rules",
      "training.m2.t5": "Hit classification and prioritisation",
      "training.m2.dur": "3 days (21 h)",
      "training.m2.prereq": "Module 1 or equivalent",

      "training.m3.title": "Molecular dynamics",
      "training.m3.text": "Simulating the stability of protein-ligand complexes over time: system preparation, solvation, equilibration and trajectory analysis.",
      "training.m3.t1": "System preparation: force field, solvation, ions",
      "training.m3.t2": "Minimisation, equilibration, production",
      "training.m3.t3": "RMSD and RMSF analysis",
      "training.m3.t4": "Hydrogen bond interactions over time",
      "training.m3.t5": "Binding free energy (MM/PBSA, MM/GBSA)",
      "training.m3.dur": "3 days (21 h)",
      "training.m3.prereq": "Module 1, notions of classical mechanics",

      "training.m4.title": "Interaction analysis",
      "training.m4.text": "Identification and quantification of protein-ligand interactions, pose analysis and result validation. Production of publication-quality figures.",
      "training.m4.t1": "PLIP analysis: hydrogen bonds, hydrophobic contacts, π-stacking",
      "training.m4.t2": "Interaction fingerprints (IFP)",
      "training.m4.t3": "Clustering of docking poses",
      "training.m4.t4": "Multi-function consensus scoring",
      "training.m4.t5": "PyMOL visualisation and 2D diagrams",
      "training.m4.dur": "2 days (14 h)",
      "training.m4.prereq": "Module 1",

      "training.m5.title": "Structure prediction",
      "training.m5.text": "Obtaining a 3D structure when no experimental structure is available: AlphaFold, homology modelling and model quality assessment.",
      "training.m5.t1": "AlphaFold2 / ESMFold: use and interpretation",
      "training.m5.t2": "Reading pLDDT and PAE scores",
      "training.m5.t3": "Homology modelling (MODELLER, SWISS-MODEL)",
      "training.m5.t4": "Model validation: Ramachandran, Z-score",
      "training.m5.t5": "Preparing a predicted model for docking",
      "training.m5.dur": "2 days (14 h)",
      "training.m5.prereq": "Basic structural biochemistry",

      "training.m6.title": "Scientific programming",
      "training.m6.text": "Automating an end-to-end docking pipeline: preparation, execution, analysis and report generation. An introductory module.",
      "training.m6.t1": "Python for bioinformatics: basics and best practices",
      "training.m6.t2": "Structure manipulation with RDKit and Biopython",
      "training.m6.t3": "Batch preparation and execution scripts",
      "training.m6.t4": "Results analysis with pandas",
      "training.m6.t5": "Automatic report generation",
      "training.m6.dur": "3 days (21 h)",
      "training.m6.prereq": "None (introductory module)",

      "training.m1.link": "Detailed hour-by-hour program",
      "training.m2.link": "Detailed hour-by-hour program",
      "training.m3.link": "Detailed hour-by-hour program",
      "training.m4.link": "Detailed hour-by-hour program",
      "training.m5.link": "Detailed hour-by-hour program",
      "training.m6.link": "Detailed hour-by-hour program",
      "training.m7.link": "Detailed hour-by-hour program",
      "training.m7.title": "Scientific writing",
      "training.m7.text": "Structuring and writing an article or thesis presenting molecular modelling results, with compliant figures and references.",
      "training.m7.t1": "IMRaD structure and argumentative logic",
      "training.m7.t2": "Writing the Methods section for docking",
      "training.m7.t3": "Presenting results: tables and figures",
      "training.m7.t4": "Reference management with BibTeX",
      "training.m7.t5": "Proofreading and responding to reviewers",
      "training.m7.dur": "2 days (14 h)",
      "training.m7.prereq": "Having results to present",

      "training.audience.eyebrow": "Target audience",
      "training.audience.title": "Who is this training for?",
      "training.aud.1.title": "Students (Master's, PhD)",
      "training.aud.1.text": "To acquire the practical skills needed for a thesis or dissertation in molecular modelling.",
      "training.aud.2.title": "Academic researchers",
      "training.aud.2.text": "To integrate virtual screening into a research project and publish reproducible results.",
      "training.aud.3.title": "Pharmaceutical and biotech industry",
      "training.aud.3.text": "To train teams in computer-aided drug discovery tools.",
      "training.aud.4.title": "Career changers",
      "training.aud.4.text": "To train for careers in cheminformatics and molecular modelling.",
      "training.aud.5.title": "Teachers",
      "training.aud.5.text": "To integrate docking practical work into their courses and have reusable materials.",

      "training.formats.eyebrow": "Formats offered",
      "training.formats.title": "Three learning modes",
      "training.fmt.1.title": "In-person workshop",
      "training.fmt.1.text": "Hands-on work on machines, in small groups. Direct support and on-site resolution of installation issues.",
      "training.fmt.2.title": "Online training",
      "training.fmt.2.text": "Video conference sessions with screen sharing, downloadable materials and guided exercises to complete on your own machine.",
      "training.fmt.3.title": "Individual mentoring",
      "training.fmt.3.text": "Personalised support on your research project: from defining the biological question to analysing the results.",

      "training.specs.eyebrow": "Technical requirements",
      "training.specs.title": "What you need to follow the practical work",
      "training.specs.lead": "Modules can be followed on your own computer or on a machine provided during in-person workshops.",
      "training.specs.col1": "Item",
      "training.specs.col2": "Minimum",
      "training.specs.col3": "Recommended",
      "training.specs.os": "Operating system",
      "training.specs.ram": "Memory (RAM)",
      "training.specs.cpu": "Processor",
      "training.specs.disk": "Disk space",
      "training.specs.net": "Connection",

      "training.pricing.eyebrow": "Pricing",
      "training.pricing.title": "A mixed model: some modules are free",
      "training.pricing.free.title": "Introductory modules",
      "training.pricing.free.text": "The Scientific programming and Scientific writing modules are offered free of charge, to make the basics accessible to as many people as possible.",
      "training.pricing.paid.title": "Technical modules",
      "training.pricing.paid.text": "The docking, screening, molecular dynamics, interaction analysis and structure prediction modules are quoted individually, adapted to the participant's status (student, researcher, company).",

      "training.cta.title": "Interested in a training course?",
      "training.cta.text": "Tell us your status, your level and the modules you want. We will reply with a tailored program.",
      "training.cta.btn": "Request the program",

      /* --- Détail des modules --- */
      "mod.nav.back": "Module",
      "mod.nav.all": "All modules",
      "mod.nav.next": "Next module: Virtual screening →",
      "mod.nav.prev.docking": "← Previous: Molecular docking",
      "mod.nav.next.dynamics": "Next: Molecular dynamics →",
      "mod.nav.prev.screening": "← Previous: Virtual screening",
      "mod.nav.next.analysis": "Next: Interaction analysis →",
      "mod.nav.prev.dynamics": "← Previous: Molecular dynamics",
      "mod.nav.next.prediction": "Next: Structure prediction →",
      "mod.nav.prev.analysis": "← Previous: Interaction analysis",
      "mod.nav.next.programming": "Next: Scientific programming →",
      "mod.nav.prev.prediction": "← Previous: Structure prediction",
      "mod.nav.next.writing": "Next: Scientific writing →",
      "mod.nav.prev.programming": "← Previous: Scientific programming",
      "mod.level": "Level",
      "mod.price": "Price",
      "mod.price.quote": "On quotation",
      "mod.price.free": "Free",
      "mod.format": "Format",
      "mod.objectives.eyebrow": "Learning objectives",
      "mod.objectives.title": "By the end of this module, you will be able to",
      "mod.day1": "Day 1 — Foundations and preparation",
      "mod.day2": "Day 2 — Grid, docking and validation",
      "mod.day3": "Day 3 — Consolidation and project",
      "mod.schedule.caption": "Detailed program — Day 1",
      "mod.schedule.caption2": "Detailed program — Day 2",
      "mod.schedule.caption3": "Detailed program — Day 3",
      "mod.col.time": "Time",
      "mod.col.topic": "Content",
      "mod.col.type": "Type",
      "mod.type.intro": "Introduction",
      "mod.type.theory": "Theory",
      "mod.type.practice": "Practical work",
      "mod.type.wrap": "Wrap-up",
      "mod.type.break": "Break",
      "mod.break": "Break",
      "mod.lunch": "Lunch",
      "mod.prereq.title": "Prerequisites",
      "mod.material.title": "Required equipment",
      "mod.material.1": "Computer with at least 8 GB RAM",
      "mod.material.2": "Linux, macOS or Windows 10+",
      "mod.material.3": "20 GB free disk space",
      "mod.material.4": "Software provided: AutoDock Vina, MGLTools, PyMOL",
      "mod.material.5": "50 GB free disk space (compound libraries)",
      "mod.material.6": "8-core processor recommended (dynamics)",
      "mod.material.7": "Stable internet connection",
      "mod.material.8": "No specific software required",
      "mod.cta.title": "Interested in this module?",
      "mod.cta.text": "Tell us your status and level. We will reply with the terms and a tailored quotation.",
      "mod.cta.btn": "Request the program",

      /* Module 1 */
      "mod.m1.o1": "Explain the principles of docking and the limitations of scoring functions",
      "mod.m1.o2": "Prepare a receptor and a ligand in PDBQT format",
      "mod.m1.o3": "Select an active site and define a relevant search grid",
      "mod.m1.o4": "Parameterise AutoDock Vina according to the biological question",
      "mod.m1.o5": "Validate a protocol by redocking and interpret the RMSD",
      "mod.m1.prereq2": "Basic knowledge of protein structure",
      "mod.m1.prereq3": "No programming experience required",
      "mod.m1.d1s1": "Welcome, introduction of participants and objectives",
      "mod.m1.d1s2": "Theory: protein-ligand interactions (hydrogen, hydrophobic, electrostatic, π-stacking)",
      "mod.m1.d1s3": "Scoring functions: principles, strengths and limitations. Why the score is not a free energy",
      "mod.m1.d1s4": "Receptor preparation: PDB cleaning, adding hydrogens, handling waters and cofactors",
      "mod.m1.d1s5": "PDB → PDBQT conversion with AutoDockTools and MGLTools. Ligand preparation",
      "mod.m1.d1s6": "Day summary and questions",
      "mod.m1.d2s1": "Review of day 1. Active site identification: experimental structures, prediction, literature",
      "mod.m1.d2s2": "Search grid definition: centre, dimensions, allosteric site cases",
      "mod.m1.d2s3": "Vina parameterisation: exhaustiveness, num_modes, energy_range. Effect on computation time and results",
      "mod.m1.d2s4": "Running the docking. Reading the output file and affinity scores",
      "mod.m1.d2s5": "Validation by redocking: RMSD calculation between predicted and crystallographic pose",
      "mod.m1.d2s6": "Interpreting results, common pitfalls, final assessment and closing",

      /* Module 2 */
      "mod.m2.o1": "Identify and select relevant compound sources for a screening campaign",
      "mod.m2.o2": "Prepare a chemical library in a batch and automated manner",
      "mod.m2.o3": "Set up and run a large-scale virtual screening",
      "mod.m2.o4": "Apply ADMET filters and Lipinski's rules to eliminate unsuitable compounds",
      "mod.m2.o5": "Classify and prioritise hits for experimental testing",
      "mod.m2.prereq2": "Basic command line usage",
      "mod.m2.prereq3": "Basic understanding of molecular docking",
      "mod.m2.d1s1": "Welcome, introduction of participants and objectives",
      "mod.m2.d1s2": "Theory: principles of virtual screening, from high-throughput screening to in silico",
      "mod.m2.d1s3": "Compound sources: ZINC, PubChem, ChEMBL. Criteria for choosing a library",
      "mod.m2.d1s4": "Downloading and filtering a compound library",
      "mod.m2.d1s5": "Batch ligand preparation: protonation, tautomers, conformers",
      "mod.m2.d1s6": "Day summary and questions",
      "mod.m2.d2s1": "Why automate? Overview of a screening pipeline",
      "mod.m2.d2s2": "Writing a batch preparation script",
      "mod.m2.d2s3": "Running the screening in parallel. Monitoring and error handling",
      "mod.m2.d2s4": "Collecting and consolidating results",
      "mod.m2.d2s5": "Extracting and interpreting scores",
      "mod.m2.d2s6": "Day summary and questions",
      "mod.m2.d3s1": "ADMET filters: absorption, distribution, metabolism, excretion, toxicity",
      "mod.m2.d3s2": "Applying Lipinski's rules and other filters",
      "mod.m2.d3s3": "Clustering hits by chemical similarity",
      "mod.m2.d3s4": "Prioritising hits: score, interactions, diversity",
      "mod.m2.d3s5": "Final assessment and closing",

      /* Module 3 */
      "mod.m3.o1": "Prepare a protein-ligand system for molecular dynamics simulation",
      "mod.m3.o2": "Choose an appropriate force field and parameters",
      "mod.m3.o3": "Run minimisation, equilibration and production phases",
      "mod.m3.o4": "Analyse RMSD, RMSF and hydrogen bond stability",
      "mod.m3.o5": "Estimate the binding free energy (MM/PBSA, MM/GBSA)",
      "mod.m3.prereq2": "Basic notions of classical mechanics",
      "mod.m3.prereq3": "Comfortable with the command line",
      "mod.m3.d1s1": "Welcome, introduction of participants and objectives",
      "mod.m3.d1s2": "Theory: why dynamics? Limits of static docking",
      "mod.m3.d1s3": "Force fields: AMBER, CHARMM, OPLS. Choosing parameters",
      "mod.m3.d1s4": "System preparation: solvation, ions, box size",
      "mod.m3.d1s5": "Minimisation and equilibration",
      "mod.m3.d1s6": "Day summary and questions",
      "mod.m3.d2s1": "Production phase: duration, time step, trajectory saving",
      "mod.m3.d2s2": "Launching and monitoring the simulation",
      "mod.m3.d2s3": "RMSD analysis: system stability over time",
      "mod.m3.d2s4": "RMSF analysis: residue flexibility",
      "mod.m3.d2s5": "Hydrogen bond analysis over the trajectory",
      "mod.m3.d2s6": "Day summary and questions",
      "mod.m3.d3s1": "Theory: principles of free energy calculation",
      "mod.m3.d3s2": "MM/PBSA and MM/GBSA: practical implementation",
      "mod.m3.d3s3": "Comparing several ligands: per-residue decomposition",
      "mod.m3.d3s4": "Interpreting results and common pitfalls",
      "mod.m3.d3s5": "Final assessment and closing",

      /* Module 4 */
      "mod.m4.o1": "Identify and classify protein-ligand interactions",
      "mod.m4.o2": "Use PLIP to analyse a complex automatically",
      "mod.m4.o3": "Compare poses using interaction fingerprints",
      "mod.m4.o4": "Cluster docking poses to identify representative binding modes",
      "mod.m4.o5": "Produce publication-quality figures",
      "mod.m4.prereq2": "Basic knowledge of non-covalent interactions",
      "mod.m4.prereq3": "Having already run a docking",
      "mod.m4.d1s1": "Welcome, introduction of participants and objectives",
      "mod.m4.d1s2": "Theory: types of interactions, geometry, energetic contribution",
      "mod.m4.d1s3": "PLIP: installation and first analysis",
      "mod.m4.d1s4": "Reading a PLIP report: hydrogen bonds, hydrophobic contacts, π-stacking",
      "mod.m4.d1s5": "Analysing several complexes and comparing profiles",
      "mod.m4.d1s6": "Day summary and questions",
      "mod.m4.d2s1": "Interaction fingerprints (IFP): principle and use cases",
      "mod.m4.d2s2": "Calculating and comparing IFPs",
      "mod.m4.d2s3": "Clustering poses: methods and choice of threshold",
      "mod.m4.d2s4": "Consensus scoring: combining several functions",
      "mod.m4.d2s5": "PyMOL visualisation and 2D diagram production",
      "mod.m4.d2s6": "Final assessment and closing",

      /* Module 5 */
      "mod.m5.o1": "Choose a structure prediction method suited to your case",
      "mod.m5.o2": "Run AlphaFold or ESMFold and interpret the results",
      "mod.m5.o3": "Read and critically assess pLDDT and PAE scores",
      "mod.m5.o4": "Build a homology model and validate its quality",
      "mod.m5.o5": "Prepare a predicted model for molecular docking",
      "mod.m5.prereq2": "Basic structural biochemistry",
      "mod.m5.prereq3": "No programming experience required",
      "mod.m5.d1s1": "Welcome, introduction of participants and objectives",
      "mod.m5.d1s2": "Theory: the protein folding problem and its computational approaches",
      "mod.m5.d1s3": "AlphaFold2 and ESMFold: using the online servers",
      "mod.m5.d1s4": "Reading pLDDT and PAE scores: what is reliable and what is not",
      "mod.m5.d1s5": "Practical case: predicting a target with no experimental structure",
      "mod.m5.d1s6": "Day summary and questions",
      "mod.m5.d2s1": "Homology modelling: principles and when to use it",
      "mod.m5.d2s2": "Template selection and alignment with MODELLER or SWISS-MODEL",
      "mod.m5.d2s3": "Model validation: Ramachandran plot, Z-score, ERRAT",
      "mod.m5.d2s4": "Repairing and preparing the model for docking",
      "mod.m5.d2s5": "Comparing predicted and experimental structures",
      "mod.m5.d2s6": "Final assessment and closing",

      /* Module 6 */
      "mod.m6.o1": "Write Python scripts to automate repetitive tasks",
      "mod.m6.o2": "Manipulate molecular structures with RDKit and Biopython",
      "mod.m6.o3": "Build a complete docking pipeline from preparation to analysis",
      "mod.m6.o4": "Analyse results with pandas and produce tables",
      "mod.m6.o5": "Generate automated reports",
      "mod.m6.prereq2": "No programming experience required",
      "mod.m6.prereq3": "Basic computer skills",
      "mod.m6.d1s1": "Welcome, introduction of participants and objectives",
      "mod.m6.d1s2": "Python basics: variables, loops, functions, modules",
      "mod.m6.d1s3": "Handling files and paths, reading PDB files",
      "mod.m6.d1s4": "Introduction to RDKit: reading and writing molecules",
      "mod.m6.d1s5": "Structure manipulation with Biopython",
      "mod.m6.d1s6": "Day summary and questions",
      "mod.m6.d2s1": "Principles of a reproducible pipeline",
      "mod.m6.d2s2": "Writing the preparation script",
      "mod.m6.d2s3": "Automating batch execution",
      "mod.m6.d2s4": "Parsing output files and extracting scores",
      "mod.m6.d2s5": "Building result tables with pandas",
      "mod.m6.d2s6": "Day summary and questions",
      "mod.m6.d3s1": "Generating charts and summary tables",
      "mod.m6.d3s2": "Automating report generation",
      "mod.m6.d3s3": "Versioning with Git: basics",
      "mod.m6.d3s4": "Documenting and sharing a script",
      "mod.m6.d3s5": "Final assessment and closing",

      /* Module 7 */
      "mod.m7.o1": "Structure a scientific article according to the IMRaD format",
      "mod.m7.o2": "Write the Methods section of a docking study reproducibly",
      "mod.m7.o3": "Present results in clear tables and figures",
      "mod.m7.o4": "Manage references with BibTeX",
      "mod.m7.o5": "Respond constructively to reviewer comments",
      "mod.m7.prereq2": "Having results to present",
      "mod.m7.prereq3": "Basic written French or English",
      "mod.m7.d1s1": "Welcome, introduction of participants and objectives",
      "mod.m7.d1s2": "IMRaD structure: role of each section",
      "mod.m7.d1s3": "Building the argument: from biological question to conclusion",
      "mod.m7.d1s4": "Writing the Introduction: context, gap, objective",
      "mod.m7.d1s5": "Writing the Methods section for docking: reproducibility requirements",
      "mod.m7.d1s6": "Day summary and questions",
      "mod.m7.d2s1": "Presenting results: choosing between table and figure",
      "mod.m7.d2s2": "Creating clear figures for molecular modelling",
      "mod.m7.d2s3": "Writing the Results section without interpretation",
      "mod.m7.d2s4": "Writing the Discussion: limitations and perspectives",
      "mod.m7.d2s5": "Managing references with BibTeX",
      "mod.m7.d2s6": "Responding to reviewers and final assessment",

      /* --- Prestations de simulation --- */
      "services.sim.eyebrow": "Computational services",
      "services.sim.title": "We run your simulations for you",
      "services.sim.lead": "You don't have the computing power, the installed software or the time? We take charge of your simulations and deliver the analysed results.",
      "services.sim.1.title": "Docking on demand",
      "services.sim.1.text": "You provide a target and a list of molecules: we prepare the files, run the docking and deliver the scores, poses and analysed interactions.",
      "services.sim.2.title": "Library screening",
      "services.sim.2.text": "Virtual screening of compound collections (ZINC, PubChem, in-house libraries), with ADMET filtering and prioritisation of hits.",
      "services.sim.3.title": "Long molecular dynamics",
      "services.sim.3.text": "Simulations from 100 ns to several microseconds, stability analysis, interactions over time and binding free energy calculation.",
      "services.sim.4.title": "Structure modelling",
      "services.sim.4.text": "Structure prediction with AlphaFold or homology modelling, model validation and preparation for your docking studies.",
      "services.sim.how.eyebrow": "Process",
      "services.sim.how.title": "How a service engagement works",
      "services.sim.step.1.title": "Scoping",
      "services.sim.step.1.text": "You describe the biological question, the target and the molecules of interest. We assess feasibility and required computation time.",
      "services.sim.step.2.title": "Quotation",
      "services.sim.step.2.text": "We send you a quotation specifying the scope, the deadline and the expected deliverable.",
      "services.sim.step.3.title": "Execution",
      "services.sim.step.3.text": "File preparation, running the simulations, quality control and regular progress updates.",
      "services.sim.step.4.title": "Delivery",
      "services.sim.step.4.text": "Analysed results, figures, tables and a reproducible methodological report. Raw files are provided.",
      "services.sim.btn": "Describe my project",
      "services.sim.btn2": "See also the training",

      /* --- Accueil : Drug Discovery --- */
      "home.dd.eyebrow": "Specialised training",
      "home.dd.title": "Drug Discovery: from target to drug candidate",
      "home.dd.lead": "A 7-module pathway in computer-aided drug discovery: molecular docking, virtual screening, molecular dynamics, interaction analysis, structure prediction, programming and scientific writing.",
      "home.dd.text": "We also offer simulation services for teams that lack the necessary computing resources.",
      "home.dd.btn": "Discover the pathway",
      "home.dd.btn2": "Simulation services",

      /* --- Programmes : Drug Discovery --- */
      "programs.dd.eyebrow": "Pillar 05 — Specialised training",
      "programs.dd.lead": "A 7-module pathway in computer-aided drug discovery: molecular docking, virtual screening, molecular dynamics, interaction analysis, structure prediction, programming and scientific writing.",
      "programs.dd.btn": "See the full pathway",
      "programs.dd.btn2": "Start with module 1",

      /* --- Pied de page --- */
      "footer.about": "Talentuous Minds Fellowship is an initiative dedicated to skills development, education, youth support and the recognition of talent.",
      "footer.nav.title": "Navigation",
      "footer.programs.title": "Programs",
      "footer.contact.title": "Contact",
      "footer.programs.1": "IT & digital",
      "footer.programs.2": "Research & science",
      "footer.programs.3": "Entrepreneurship",
      "footer.programs.4": "Personal development",
      "footer.rights": "All rights reserved.",
      "footer.legal": "Legal notice",
      "footer.back": "Back to top"
    }
  };

  /* ------------------------------------------------------------------------
     Gestion de la langue
     ------------------------------------------------------------------------ */
  function getStoredLang() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
    } catch (e) {
      /* localStorage indisponible (mode privé) : on ignore */
    }
    return DEFAULT_LANG;
  }

  function storeLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* silencieux */
    }
  }

  /* ------------------------------------------------------------------------
     Sauvegarde du texte français original (pour pouvoir y revenir)
     ------------------------------------------------------------------------ */
  function captureFrenchSource() {
    var nodes = document.querySelectorAll(
      "[data-i18n], [data-i18n-html], [data-i18n-placeholder], [data-i18n-aria]"
    );
    Array.prototype.forEach.call(nodes, function (node) {
      if (node.hasAttribute("data-i18n")) {
        node.setAttribute("data-fr-text", node.textContent);
      }
      if (node.hasAttribute("data-i18n-html")) {
        node.setAttribute("data-fr-html", node.innerHTML);
      }
      if (node.hasAttribute("data-i18n-placeholder")) {
        node.setAttribute("data-fr-placeholder", node.getAttribute("placeholder") || "");
      }
      if (node.hasAttribute("data-i18n-aria")) {
        node.setAttribute("data-fr-aria", node.getAttribute("aria-label") || "");
      }
    });
  }

  /* ------------------------------------------------------------------------
     Application d'une langue
     ------------------------------------------------------------------------ */
  function applyLang(lang) {
    var dict = I18N[lang] || null;

    var nodes = document.querySelectorAll(
      "[data-i18n], [data-i18n-html], [data-i18n-placeholder], [data-i18n-aria]"
    );

    Array.prototype.forEach.call(nodes, function (node) {
      /* Texte simple */
      if (node.hasAttribute("data-i18n")) {
        var keyText = node.getAttribute("data-i18n");
        if (lang === "fr") {
          var frText = node.getAttribute("data-fr-text");
          if (frText !== null) node.textContent = frText;
        } else if (dict && dict[keyText] !== undefined) {
          node.textContent = dict[keyText];
        }
      }

      /* HTML enrichi */
      if (node.hasAttribute("data-i18n-html")) {
        var keyHtml = node.getAttribute("data-i18n-html");
        if (lang === "fr") {
          var frHtml = node.getAttribute("data-fr-html");
          if (frHtml !== null) node.innerHTML = frHtml;
        } else if (dict && dict[keyHtml] !== undefined) {
          node.innerHTML = dict[keyHtml];
        }
      }

      /* Placeholder */
      if (node.hasAttribute("data-i18n-placeholder")) {
        var keyPh = node.getAttribute("data-i18n-placeholder");
        if (lang === "fr") {
          var frPh = node.getAttribute("data-fr-placeholder");
          if (frPh !== null) node.setAttribute("placeholder", frPh);
        } else if (dict && dict[keyPh] !== undefined) {
          node.setAttribute("placeholder", dict[keyPh]);
        }
      }

      /* aria-label */
      if (node.hasAttribute("data-i18n-aria")) {
        var keyAria = node.getAttribute("data-i18n-aria");
        if (lang === "fr") {
          var frAria = node.getAttribute("data-fr-aria");
          if (frAria !== null) node.setAttribute("aria-label", frAria);
        } else if (dict && dict[keyAria] !== undefined) {
          node.setAttribute("aria-label", dict[keyAria]);
        }
      }
    });

    /* Attribut lang du document et titre */
    document.documentElement.setAttribute("lang", lang);

    var titleNode = document.querySelector("title");
    if (titleNode) {
      var titleFr = titleNode.getAttribute("data-title-fr");
      var titleEn = titleNode.getAttribute("data-title-en");
      if (lang === "en" && titleEn) titleNode.textContent = titleEn;
      if (lang === "fr" && titleFr) titleNode.textContent = titleFr;
    }

    /* Description meta */
    var desc = document.querySelector('meta[name="description"]');
    if (desc) {
      var descFr = desc.getAttribute("data-desc-fr");
      var descEn = desc.getAttribute("data-desc-en");
      if (lang === "en" && descEn) desc.setAttribute("content", descEn);
      if (lang === "fr" && descFr) desc.setAttribute("content", descFr);
    }

    /* État des boutons de langue */
    var buttons = document.querySelectorAll("[data-lang-btn]");
    Array.prototype.forEach.call(buttons, function (btn) {
      var isActive = btn.getAttribute("data-lang-btn") === lang;
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    storeLang(lang);
  }

  /* ------------------------------------------------------------------------
     Initialisation
     ------------------------------------------------------------------------ */
  function init() {
    captureFrenchSource();

    /* Boutons de bascule */
    var buttons = document.querySelectorAll("[data-lang-btn]");
    Array.prototype.forEach.call(buttons, function (btn) {
      btn.addEventListener("click", function () {
        applyLang(btn.getAttribute("data-lang-btn"));
      });
    });

    /* Langue initiale : préférence stockée, sinon français */
    applyLang(getStoredLang());

    /* Menu mobile */
    var toggle = document.querySelector("[data-nav-toggle]");
    var nav = document.querySelector("[data-nav]");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      /* Fermer le menu après un clic sur un lien */
      Array.prototype.forEach.call(nav.querySelectorAll("a"), function (link) {
        link.addEventListener("click", function () {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    /* Année dynamique dans le pied de page */
    var yearNodes = document.querySelectorAll("[data-current-year]");
    Array.prototype.forEach.call(yearNodes, function (node) {
      node.textContent = String(new Date().getFullYear());
    });

    /* Animations d'apparition au défilement */
    var reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && reveals.length) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      Array.prototype.forEach.call(reveals, function (el) {
        observer.observe(el);
      });
    } else {
      Array.prototype.forEach.call(reveals, function (el) {
        el.classList.add("is-visible");
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
