/* ============================================================
   TAMIL WEB APP — SITE CONFIGURATION
   Edit everything below to update the live website.
   No HTML/CSS knowledge required for most of this file.
   ============================================================ */

const CONFIG = {

  business: {
    name: "Tamil Web App",
    phone: "8668070454",
    phoneDisplay: "+91 86680 70454",
    whatsappNumber: "918668070454", // country code + number, no + or spaces
    whatsappMessage: "Hi Tamil Web App, எனக்கு Website பற்றி details வேண்டும்.",
    email: "dgowtham429@gmail.com",
    location: "Tamil Nadu, India",
    social: {
      instagram: "#",
      facebook: "#",
      youtube: "#",
      whatsapp: "#" // auto-generated below, override if needed
    }
  },

  /* ---------------- SERVICES ---------------- */
  services: [
    {
      icon: "layout",
      title: "Business Website",
      desc: "உங்கள் business-ஐ professional-ஆ represent செய்யும் multi-page website.",
    },
    {
      icon: "user",
      title: "Portfolio Website",
      desc: "Freelancers &amp; professionals-க்கான personal showcase website.",
    },
    {
      icon: "cart",
      title: "E-Commerce Website",
      desc: "Products online sell செய்ய complete ஆன shopping website.",
    },
    {
      icon: "bolt",
      title: "Landing Page",
      desc: "Ads &amp; campaigns-க்கான high-converting single page.",
    },
    {
      icon: "refresh",
      title: "Website Redesign",
      desc: "பழைய website-ஐ modern &amp; fast-ஆ மாற்றி அமைப்போம்.",
    },
    {
      icon: "search",
      title: "SEO &amp; Google Setup",
      desc: "Google search &amp; maps-ல் business தெரியும்படி setup.",
    },
    {
      icon: "server",
      title: "Domain &amp; Hosting Setup",
      desc: "Domain purchase முதல் secure hosting வரை முழுவதும் நாங்களே.",
    },
    {
      icon: "whatsapp",
      title: "WhatsApp Business Integration",
      desc: "Website visitors-ஐ நேரடியாக WhatsApp chat-க்கு connect செய்வோம்.",
    }
  ],

  /* ---------------- PORTFOLIO ----------------
     category must be one of: Business | E-Commerce | Portfolio | Landing Page
     Replace image with your real project screenshot path, e.g. "assets/projects/client1.jpg"
  ------------------------------------------------ */
  portfolio: [
    {
      name: "Sri Lakshmi Silks",
      category: "E-Commerce",
      tech: "React, Node.js, Razorpay",
      desc: "Online saree store with WhatsApp ordering &amp; catalog management.",
      image: null
    },
    {
      name: "Anand Diagnostics",
      category: "Business",
      tech: "Next.js, Tailwind CSS",
      desc: "Multi-branch diagnostic center site with appointment booking.",
      image: null
    },
    {
      name: "Design by Kavya",
      category: "Portfolio",
      tech: "HTML, CSS, GSAP",
      desc: "Interior designer's personal portfolio with project gallery.",
      image: null
    },
    {
      name: "FitZone Gym Offer",
      category: "Landing Page",
      tech: "HTML, CSS, JS",
      desc: "Single-page membership offer campaign for social media ads.",
      image: null
    },
    {
      name: "Murugan Hardware",
      category: "Business",
      tech: "WordPress, Elementor",
      desc: "Local hardware shop catalog site with product enquiry form.",
      image: null
    },
    {
      name: "Chennai Spice Kitchen",
      category: "E-Commerce",
      tech: "Shopify, Custom Theme",
      desc: "Home-food delivery store with daily menu &amp; online orders.",
      image: null
    }
  ],

  /* ---------------- TESTIMONIALS ---------------- */
  testimonials: [
    {
      name: "Ramesh Kumar",
      business: "Ramesh Textiles",
      rating: 5,
      review: "Website ரொம்ப நல்லா வந்தது. Customers WhatsApp-ல் நேரடியா message பண்ணுறாங்க. Business-க்கு பெரிய help ஆச்சு."
    },
    {
      name: "Priya Suresh",
      business: "Priya's Boutique",
      rating: 5,
      review: "Mobile-ல் site எவ்வளவு smooth-ஆ இருக்குனு பாருங்க. Google search-லயும் easy-ஆ கிடைக்குது இப்போ."
    },
    {
      name: "Karthik R.",
      business: "Karthik Fitness Studio",
      rating: 5,
      review: "Team ரொம்ப patient-ஆ இருந்து எல்லா changes-யும் பண்ணி தந்தாங்க. Delivery time-லயும் exact-ஆ கொடுத்தாங்க."
    },
    {
      name: "Divya Balan",
      business: "Divya Interiors",
      rating: 5,
      review: "Portfolio site design ரொம்ப premium-ஆ இருக்கு. Clients இப்போ direct website பாத்துட்டு தான் contact பண்றாங்க."
    }
  ],

  /* ---------------- PRICING ----------------
     Edit prices/features freely — figures below are placeholders.
  ------------------------------------------------ */
  pricing: [
    {
      name: "Starter",
      tagline: "For individuals and small businesses.",
      price: "₹4,999",
      period: "starting",
      featured: false,
      features: [
        "Up to 3 pages",
        "Mobile responsive design",
        "WhatsApp button integration",
        "Basic on-page SEO",
        "1 round of revisions"
      ]
    },
    {
      name: "Professional",
      tagline: "For growing businesses.",
      price: "₹9,999",
      period: "starting",
      featured: true,
      features: [
        "Up to 6 pages",
        "Premium custom design",
        "WhatsApp + Call integration",
        "Google Search Console setup",
        "Contact form &amp; Google Maps",
        "3 rounds of revisions"
      ]
    },
    {
      name: "Premium",
      tagline: "For businesses that need advanced features.",
      price: "Custom",
      period: "quote",
      featured: false,
      features: [
        "Unlimited pages",
        "E-commerce / booking features",
        "Advanced SEO &amp; analytics",
        "Domain &amp; hosting setup included",
        "Priority post-launch support"
      ]
    }
  ],

  /* ---------------- FAQ ---------------- */
  faq: [
    {
      q: "Website உருவாக்க எவ்வளவு நாள் ஆகும்?",
      a: "பொதுவா ஒரு simple website 5–7 நாட்களில் ready ஆகும். E-commerce அல்லது complex projects 2–3 வாரங்கள் ஆகலாம்."
    },
    {
      q: "Domain & Hosting என்ன?",
      a: "Domain என்பது உங்கள் website address (எ.கா. yourbusiness.com). Hosting என்பது அந்த website internet-ல் live-ஆ இருக்க தேவையான storage space. இரண்டையும் நாங்களே setup செய்து தருவோம்."
    },
    {
      q: "Website mobile-ல் வேலை செய்யுமா?",
      a: "நிச்சயமா. நாங்கள் உருவாக்கும் ஒவ்வொரு website-யும் mobile, tablet, laptop எல்லா screen sizes-லும் perfect-ஆ வேலை செய்யும்படி design செய்யப்படும்."
    },
    {
      q: "WhatsApp button சேர்க்க முடியுமா?",
      a: "ஆம். ஒவ்வொரு website-லும் floating WhatsApp button standard-ஆ சேர்க்கப்படும், customers ஒரு click-ல் நேரடியா chat பண்ணலாம்."
    },
    {
      q: "Google-ல் website வருமா?",
      a: "Website launch ஆன பிறகு Google Search Console-ல் submit செய்து, basic SEO setup பண்ணுவோம் — இது Google-ல் visible ஆக உதவும்."
    },
    {
      q: "SEO செய்ய முடியுமா?",
      a: "ஆம், on-page SEO (titles, meta descriptions, headings, image alt text) எல்லா packages-லும் included. Advanced SEO campaigns தனியா discuss பண்ணலாம்."
    },
    {
      q: "Website update செய்ய முடியுமா?",
      a: "நிச்சயமா. Launch ஆன பிறகும் content, images, prices போன்றவற்றை update பண்ண support தருவோம்."
    },
    {
      q: "Payment எப்படி இருக்கும்?",
      a: "பொதுவா 50% advance project start பண்ண, மீதி 50% website launch ஆன பிறகு. UPI, Bank Transfer இரண்டும் ஏற்றுக்கொள்ளப்படும்."
    }
  ]
};
