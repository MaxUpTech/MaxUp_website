export interface ServiceData {
  slug: string;
  icon: string;
  title: { ar: string; en: string; he: string };
  shortDescription: { ar: string; en: string; he: string };
  fullDescription: { ar: string; en: string; he: string };
  bullets: { ar: string[]; en: string[]; he: string[] };
  deliverables: Array<{
    icon: string;
    title: { ar: string; en: string; he: string };
    description: { ar: string; en: string; he: string };
  }>;
  processSteps: Array<{
    number: string;
    title: { ar: string; en: string; he: string };
    description: { ar: string; en: string; he: string };
  }>;
}

export const services: ServiceData[] = [
  {
    slug: 'web-design',
    icon: '🌐',
    title: { ar: 'تصميم وتطوير المواقع', en: 'Web Design & Development', he: 'עיצוב ופיתוח אתרים' },
    shortDescription: {
      ar: 'مواقع حديثة ومتجاوبة محسّنة لمحركات البحث وتجربة المستخدم',
      en: 'Modern, responsive websites optimized for search engines and user experience',
      he: 'אתרים מודרניים ורספונסיביים מותאמים למנועי חיפוש וחוויית משתמש',
    },
    fullDescription: {
      ar: 'نبني مواقع إلكترونية حديثة ومتجاوبة تبدو رائعة على كل الأجهزة. مواقعنا محسّنة للسرعة ومحركات البحث والتحويل — لتحويل الزوار إلى عملاء. نستخدم أحدث التقنيات والممارسات لضمان أداء عالٍ وتجربة مستخدم سلسة.',
      en: 'We build modern, responsive websites that look stunning on every device. Our sites are optimized for speed, SEO, and conversion — turning visitors into customers. We use the latest technologies and best practices to ensure high performance and seamless user experience.',
      he: 'אנחנו בונים אתרים מודרניים ורספונסיביים שנראים מדהים בכל מכשיר. האתרים שלנו מותאמים למהירות, SEO והמרות — הופכים מבקרים ללקוחות. אנחנו משתמשים בטכנולוגיות העדכניות ביותר כדי להבטיח ביצועים גבוהים וחוויית משתמש חלקה.',
    },
    bullets: {
      ar: ['تصميم متجاوب مخصص لجميع الأجهزة', 'بنية محسّنة لمحركات البحث', 'سرعة تحميل فائقة وأداء عالي', 'تكامل مع نظام إدارة المحتوى وسهولة الإدارة'],
      en: ['Custom responsive design for all devices', 'SEO-optimized architecture', 'Fast loading speeds & performance', 'CMS integration & easy management'],
      he: ['עיצוב רספונסיבי מותאם אישית לכל מכשיר', 'ארכיטקטורה מותאמת SEO', 'מהירות טעינה גבוהה וביצועים מעולים', 'אינטגרציה עם מערכת ניהול תוכן וניהול קל'],
    },
    deliverables: [
      {
        icon: '💻',
        title: { ar: 'موقع متجاوب بالكامل', en: 'Fully Responsive Website', he: 'אתר רספונסיבי מלא' },
        description: { ar: 'موقع يعمل بشكل مثالي على جميع الأجهزة والشاشات', en: 'A website that works perfectly on all devices and screen sizes', he: 'אתר שעובד בצורה מושלמת בכל מכשיר וגודל מסך' },
      },
      {
        icon: '⚡',
        title: { ar: 'تحسين الأداء', en: 'Performance Optimization', he: 'אופטימיזציית ביצועים' },
        description: { ar: 'سرعة تحميل فائقة ونتائج عالية في Core Web Vitals', en: 'Lightning-fast load times and high Core Web Vitals scores', he: 'זמני טעינה מהירים וציוני Core Web Vitals גבוהים' },
      },
      {
        icon: '🔧',
        title: { ar: 'لوحة تحكم سهلة', en: 'Easy Admin Panel', he: 'פאנל ניהול נוח' },
        description: { ar: 'نظام إدارة محتوى بسيط لتحديث موقعك بسهولة', en: 'Simple CMS to update your site content with ease', he: 'מערכת ניהול תוכן פשוטה לעדכון האתר בקלות' },
      },
    ],
    processSteps: [
      {
        number: '01',
        title: { ar: 'الاكتشاف', en: 'Discovery', he: 'גילוי' },
        description: { ar: 'نفهم أهداف عملك وجمهورك المستهدف ومتطلباتك', en: 'We understand your business goals, target audience, and requirements', he: 'אנחנו מבינים את יעדי העסק, קהל היעד והדרישות שלכם' },
      },
      {
        number: '02',
        title: { ar: 'الاستراتيجية', en: 'Strategy', he: 'אסטרטגיה' },
        description: { ar: 'نصمم خطة عمل واضحة مع هيكلية الموقع والتصميم', en: 'We design a clear action plan with site structure and wireframes', he: 'אנחנו מעצבים תוכנית פעולה ברורה עם מבנה האתר ואפיון' },
      },
      {
        number: '03',
        title: { ar: 'التنفيذ', en: 'Execution', he: 'ביצוע' },
        description: { ar: 'نبني ونطور موقعك مع مراجعات مستمرة', en: 'We build and develop your site with continuous reviews', he: 'אנחנו בונים ומפתחים את האתר עם ביקורות שוטפות' },
      },
      {
        number: '04',
        title: { ar: 'التحسين', en: 'Optimization', he: 'אופטימיזציה' },
        description: { ar: 'نطلق الموقع ونراقب الأداء ونحسّن باستمرار', en: 'We launch, monitor performance, and continuously optimize', he: 'אנחנו משיקים, עוקבים אחר ביצועים ומשפרים באופן מתמיד' },
      },
    ],
  },
  {
    slug: 'marketing',
    icon: '📈',
    title: { ar: 'التسويق الرقمي', en: 'Digital Marketing', he: 'שיווק דיגיטלי' },
    shortDescription: {
      ar: 'إدارة حملات إعلانية على جوجل وميتا مع تحسين مستمر لأقصى عائد',
      en: 'Google and Meta ad campaign management with continuous optimization for maximum ROI',
      he: 'ניהול קמפיינים בגוגל ומטא עם אופטימיזציה מתמדת להחזר מקסימלי',
    },
    fullDescription: {
      ar: 'حملات إعلانية مبنية على البيانات عبر جوجل وميتا وتيك توك. ندير ميزانيتك بذكاء ونحسّن باستمرار لتحقيق أقصى عائد على الاستثمار. فريقنا يستخدم أحدث الأدوات والتقنيات لاستهداف جمهورك بدقة.',
      en: 'Data-driven ad campaigns across Google, Meta, and TikTok. We manage your budget smartly and optimize continuously to deliver maximum return on investment. Our team uses the latest tools and techniques to target your audience with precision.',
      he: 'קמפיינים מבוססי נתונים בגוגל, מטא וטיקטוק. אנחנו מנהלים את התקציב שלכם בחכמה ומשפרים באופן מתמיד כדי להשיג החזר מקסימלי על ההשקעה.',
    },
    bullets: {
      ar: ['إدارة حملات Google Ads و Meta', 'اختبار A/B وتحسين مستمر', 'تقارير تحليلية مفصلة شهرياً', 'إعادة استهداف وتقسيم الجمهور'],
      en: ['Google Ads & Meta campaign management', 'Continuous A/B testing & optimization', 'Detailed analytics & monthly reports', 'Retargeting & audience segmentation'],
      he: ['ניהול קמפיינים בגוגל ומטא', 'בדיקות A/B ואופטימיזציה מתמדת', 'דוחות אנליטיקס מפורטים חודשיים', 'רימרקטינג ופילוח קהלים'],
    },
    deliverables: [
      {
        icon: '🎯',
        title: { ar: 'إعداد الحملات', en: 'Campaign Setup', he: 'הקמת קמפיינים' },
        description: { ar: 'إعداد وإطلاق حملات محسّنة على المنصات المختارة', en: 'Setup and launch of optimized campaigns on chosen platforms', he: 'הקמה והשקה של קמפיינים מותאמים בפלטפורמות הנבחרות' },
      },
      {
        icon: '📊',
        title: { ar: 'تقارير شهرية', en: 'Monthly Reports', he: 'דוחות חודשיים' },
        description: { ar: 'تقارير أداء مفصلة مع توصيات للتحسين', en: 'Detailed performance reports with improvement recommendations', he: 'דוחות ביצועים מפורטים עם המלצות לשיפור' },
      },
      {
        icon: '🔄',
        title: { ar: 'تحسين مستمر', en: 'Ongoing Optimization', he: 'אופטימיזציה שוטפת' },
        description: { ar: 'مراقبة وتحسين يومي للحملات لتحقيق أفضل النتائج', en: 'Daily campaign monitoring and optimization for best results', he: 'ניטור ואופטימיזציה יומית של קמפיינים לתוצאות מיטביות' },
      },
    ],
    processSteps: [
      {
        number: '01',
        title: { ar: 'الاكتشاف', en: 'Discovery', he: 'גילוי' },
        description: { ar: 'نحلل السوق والمنافسين ونحدد الجمهور المستهدف', en: 'We analyze the market, competitors, and define your target audience', he: 'אנחנו מנתחים את השוק, המתחרים ומגדירים את קהל היעד' },
      },
      {
        number: '02',
        title: { ar: 'الاستراتيجية', en: 'Strategy', he: 'אסטרטגיה' },
        description: { ar: 'نضع استراتيجية إعلانية شاملة مع تحديد الميزانية', en: 'We create a comprehensive ad strategy with budget allocation', he: 'אנחנו יוצרים אסטרטגיית פרסום מקיפה עם הקצאת תקציב' },
      },
      {
        number: '03',
        title: { ar: 'التنفيذ', en: 'Execution', he: 'ביצוע' },
        description: { ar: 'نطلق الحملات ونراقبها يومياً مع اختبارات مستمرة', en: 'We launch campaigns and monitor daily with continuous testing', he: 'אנחנו משיקים קמפיינים ועוקבים יומית עם בדיקות מתמדות' },
      },
      {
        number: '04',
        title: { ar: 'التحسين', en: 'Optimization', he: 'אופטימיזציה' },
        description: { ar: 'نحسّن الأداء بناءً على البيانات ونوسّع الحملات الناجحة', en: 'We optimize based on data and scale successful campaigns', he: 'אנחנו משפרים על בסיס נתונים ומרחיבים קמפיינים מצליחים' },
      },
    ],
  },
  {
    slug: 'content',
    icon: '🎬',
    title: { ar: 'صناعة المحتوى', en: 'Content Creation', he: 'יצירת תוכן' },
    shortDescription: {
      ar: 'محتوى إبداعي يروي قصة علامتك التجارية ويجذب جمهورك المستهدف',
      en: 'Creative content that tells your brand story and engages your target audience',
      he: 'תוכן יצירתי שמספר את סיפור המותג שלכם ומושך את קהל היעד',
    },
    fullDescription: {
      ar: 'من إنتاج الفيديو إلى كتابة المحتوى، نصنع محتوى جذاب يروي قصة علامتك التجارية ويتفاعل مع جمهورك المستهدف عبر جميع المنصات. نجمع بين الإبداع والاستراتيجية لتحقيق أقصى تأثير.',
      en: 'From video production to copywriting, we create compelling content that tells your brand story and resonates with your target audience across all platforms. We combine creativity with strategy for maximum impact.',
      he: 'מהפקת וידאו ועד כתיבת תוכן, אנחנו יוצרים תוכן מרתק שמספר את סיפור המותג שלכם ומתחבר לקהל היעד בכל הפלטפורמות.',
    },
    bullets: {
      ar: ['إنتاج فيديو احترافي', 'كتابة محتوى إبداعي وسرد قصصي', 'تصوير فوتوغرافي ومحتوى بصري', 'استراتيجية وتخطيط المحتوى'],
      en: ['Professional video production', 'Engaging copywriting & storytelling', 'Photography & visual content', 'Content strategy & planning'],
      he: ['הפקת וידאו מקצועית', 'כתיבת תוכן יצירתית וסטוריטלינג', 'צילום ותוכן ויזואלי', 'אסטרטגיית תוכן ותכנון'],
    },
    deliverables: [
      {
        icon: '🎥',
        title: { ar: 'محتوى فيديو', en: 'Video Content', he: 'תוכן וידאו' },
        description: { ar: 'فيديوهات احترافية للمنصات الرقمية والسوشيال ميديا', en: 'Professional videos for digital platforms and social media', he: 'סרטונים מקצועיים לפלטפורמות דיגיטליות ורשתות חברתיות' },
      },
      {
        icon: '✍️',
        title: { ar: 'محتوى مكتوب', en: 'Written Content', he: 'תוכן כתוב' },
        description: { ar: 'مقالات ونصوص تسويقية ومحتوى للمدونة', en: 'Articles, marketing copy, and blog content', he: 'מאמרים, קופי שיווקי ותוכן בלוג' },
      },
      {
        icon: '📸',
        title: { ar: 'تصوير فوتوغرافي', en: 'Photography', he: 'צילום' },
        description: { ar: 'تصوير منتجات واحترافي لعلامتك التجارية', en: 'Product and professional photography for your brand', he: 'צילום מוצרים ומקצועי למותג שלכם' },
      },
      {
        icon: '📋',
        title: { ar: 'تقويم محتوى', en: 'Content Calendar', he: 'לוח תוכן' },
        description: { ar: 'خطة محتوى شهرية منظمة ومجدولة', en: 'Organized and scheduled monthly content plan', he: 'תוכנית תוכן חודשית מאורגנת ומתוזמנת' },
      },
    ],
    processSteps: [
      {
        number: '01',
        title: { ar: 'الاكتشاف', en: 'Discovery', he: 'גילוי' },
        description: { ar: 'نتعرف على علامتك التجارية وصوتها ورسالتها', en: 'We learn your brand voice, message, and identity', he: 'אנחנו לומדים את קול המותג, המסר והזהות שלכם' },
      },
      {
        number: '02',
        title: { ar: 'الاستراتيجية', en: 'Strategy', he: 'אסטרטגיה' },
        description: { ar: 'نطور استراتيجية محتوى شاملة مع تقويم نشر', en: 'We develop a comprehensive content strategy with publishing calendar', he: 'אנחנו מפתחים אסטרטגיית תוכן מקיפה עם לוח פרסום' },
      },
      {
        number: '03',
        title: { ar: 'التنفيذ', en: 'Execution', he: 'ביצוע' },
        description: { ar: 'ننتج المحتوى بجودة عالية مع مراجعات وتعديلات', en: 'We produce high-quality content with reviews and revisions', he: 'אנחנו מפיקים תוכן באיכות גבוהה עם ביקורות ותיקונים' },
      },
      {
        number: '04',
        title: { ar: 'التحسين', en: 'Optimization', he: 'אופטימיזציה' },
        description: { ar: 'نحلل أداء المحتوى ونحسّن الاستراتيجية بناءً على النتائج', en: 'We analyze content performance and refine strategy based on results', he: 'אנחנו מנתחים ביצועי תוכן ומשפרים אסטרטגיה על בסיס תוצאות' },
      },
    ],
  },
  {
    slug: 'branding',
    icon: '🎨',
    title: { ar: 'تصميم الهوية البصرية', en: 'Brand Identity Design', he: 'עיצוב זהות מותג' },
    shortDescription: {
      ar: 'شعارات وهوية بصرية متكاملة تعكس رؤية علامتك وتميزك عن المنافسين',
      en: 'Logos and complete visual identity that reflect your brand vision and set you apart',
      he: 'לוגואים וזהות ויזואלית מלאה שמשקפים את חזון המותג ומבדלים אתכם',
    },
    fullDescription: {
      ar: 'علامتك التجارية هي أكثر من مجرد شعار. نصمم هويات بصرية متكاملة تعبر عن قيمك، تبني الثقة، وتترك انطباعاً دائماً. من الشعار إلى دليل الهوية الشامل، نضمن اتساق علامتك عبر جميع نقاط الاتصال.',
      en: 'Your brand is more than a logo. We craft complete visual identities that communicate your values, build trust, and make lasting impressions. From logo to comprehensive brand guidelines, we ensure consistency across all touchpoints.',
      he: 'המותג שלכם הוא יותר מלוגו. אנחנו יוצרים זהויות ויזואליות מלאות שמתקשרות את הערכים שלכם, בונות אמון ויוצרות רושם מתמשך.',
    },
    bullets: {
      ar: ['تصميم شعار وعلامات تجارية', 'نظام هوية بصرية متكامل', 'دليل إرشادات العلامة التجارية', 'تصميم التغليف والمواد المطبوعة'],
      en: ['Logo design & brand marks', 'Complete visual identity system', 'Brand guidelines documentation', 'Packaging & collateral design'],
      he: ['עיצוב לוגו וסימני מותג', 'מערכת זהות ויזואלית מלאה', 'מסמך הנחיות מותג', 'עיצוב אריזות וחומרים נלווים'],
    },
    deliverables: [
      {
        icon: '✨',
        title: { ar: 'تصميم الشعار', en: 'Logo Design', he: 'עיצוב לוגו' },
        description: { ar: 'شعار فريد وقابل للاستخدام بمختلف الأحجام والألوان', en: 'Unique logo scalable across all sizes and color variations', he: 'לוגו ייחודי שמתאים לכל גודל ווריאציות צבע' },
      },
      {
        icon: '🎨',
        title: { ar: 'الهوية البصرية', en: 'Visual Identity', he: 'זהות ויזואלית' },
        description: { ar: 'ألوان وخطوط وأنماط بصرية متكاملة', en: 'Colors, typography, and cohesive visual patterns', he: 'צבעים, טיפוגרפיה ודפוסים ויזואליים מגובשים' },
      },
      {
        icon: '📖',
        title: { ar: 'دليل العلامة التجارية', en: 'Brand Guidelines', he: 'הנחיות מותג' },
        description: { ar: 'وثيقة شاملة لاستخدام الهوية بشكل متسق', en: 'Comprehensive document for consistent brand usage', he: 'מסמך מקיף לשימוש עקבי במותג' },
      },
    ],
    processSteps: [
      {
        number: '01',
        title: { ar: 'الاكتشاف', en: 'Discovery', he: 'גילוי' },
        description: { ar: 'نستكشف رؤيتك وقيمك والسوق المستهدف', en: 'We explore your vision, values, and target market', he: 'אנחנו חוקרים את החזון, הערכים ושוק היעד שלכם' },
      },
      {
        number: '02',
        title: { ar: 'الاستراتيجية', en: 'Strategy', he: 'אסטרטגיה' },
        description: { ar: 'نطور مفهوم العلامة التجارية واتجاه التصميم', en: 'We develop the brand concept and design direction', he: 'אנחנו מפתחים את קונספט המותג וכיוון העיצוב' },
      },
      {
        number: '03',
        title: { ar: 'التنفيذ', en: 'Execution', he: 'ביצוע' },
        description: { ar: 'نصمم الشعار والهوية البصرية الكاملة مع مراجعات', en: 'We design the logo and full visual identity with revisions', he: 'אנחנו מעצבים את הלוגו והזהות הויזואלית המלאה עם תיקונים' },
      },
      {
        number: '04',
        title: { ar: 'التحسين', en: 'Optimization', he: 'אופטימיזציה' },
        description: { ar: 'نسلّم الملفات النهائية ودليل الاستخدام الشامل', en: 'We deliver final files and comprehensive usage guidelines', he: 'אנחנו מוסרים קבצים סופיים והנחיות שימוש מקיפות' },
      },
    ],
  },
  {
    slug: 'social-media',
    icon: '📱',
    title: { ar: 'إدارة وسائل التواصل الاجتماعي', en: 'Social Media Management', he: 'ניהול רשתות חברתיות' },
    shortDescription: {
      ar: 'إدارة احترافية لحساباتك على وسائل التواصل مع استراتيجية نمو واضحة',
      en: 'Professional management of your social media accounts with a clear growth strategy',
      he: 'ניהול מקצועי של חשבונות הרשתות החברתיות שלכם עם אסטרטגיית צמיחה ברורה',
    },
    fullDescription: {
      ar: 'ندير حضورك على وسائل التواصل الاجتماعي باستراتيجية واضحة تركز على النمو والتفاعل وبناء المجتمع عبر جميع المنصات الرئيسية. نحول متابعيك إلى عملاء حقيقيين من خلال محتوى مدروس وتفاعل مستمر.',
      en: 'We manage your social media presence with a clear strategy focused on growth, engagement, and community building across all major platforms. We turn your followers into real customers through thoughtful content and consistent engagement.',
      he: 'אנחנו מנהלים את הנוכחות שלכם ברשתות החברתיות עם אסטרטגיה ברורה שמתמקדת בצמיחה, מעורבות ובניית קהילה בכל הפלטפורמות המובילות.',
    },
    bullets: {
      ar: ['تقويم محتوى وجدولة المنشورات', 'إدارة المجتمع والتفاعل', 'استراتيجية نمو واكتساب متابعين', 'تتبع الأداء والتحليلات'],
      en: ['Content calendar & scheduling', 'Community management & engagement', 'Growth strategy & follower acquisition', 'Performance tracking & analytics'],
      he: ['לוח תוכן ותזמון פוסטים', 'ניהול קהילה ומעורבות', 'אסטרטגיית צמיחה ורכישת עוקבים', 'מעקב ביצועים ואנליטיקס'],
    },
    deliverables: [
      {
        icon: '📅',
        title: { ar: 'تقويم محتوى شهري', en: 'Monthly Content Calendar', he: 'לוח תוכן חודשי' },
        description: { ar: 'خطة محتوى مفصلة ومجدولة لكل منصة', en: 'Detailed content plan scheduled for each platform', he: 'תוכנית תוכן מפורטת ומתוזמנת לכל פלטפורמה' },
      },
      {
        icon: '💬',
        title: { ar: 'إدارة التفاعل', en: 'Engagement Management', he: 'ניהול מעורבות' },
        description: { ar: 'رد على التعليقات والرسائل وبناء علاقات مع الجمهور', en: 'Responding to comments and messages, building audience relationships', he: 'מענה לתגובות והודעות ובניית קשרים עם הקהל' },
      },
      {
        icon: '📈',
        title: { ar: 'تقارير أداء', en: 'Performance Reports', he: 'דוחות ביצועים' },
        description: { ar: 'تقارير شهرية مفصلة مع رؤى وتوصيات', en: 'Monthly detailed reports with insights and recommendations', he: 'דוחות חודשיים מפורטים עם תובנות והמלצות' },
      },
    ],
    processSteps: [
      {
        number: '01',
        title: { ar: 'الاكتشاف', en: 'Discovery', he: 'גילוי' },
        description: { ar: 'نحلل حساباتك الحالية وجمهورك والمنافسين', en: 'We analyze your current accounts, audience, and competitors', he: 'אנחנו מנתחים את החשבונות הנוכחיים, הקהל והמתחרים שלכם' },
      },
      {
        number: '02',
        title: { ar: 'الاستراتيجية', en: 'Strategy', he: 'אסטרטגיה' },
        description: { ar: 'نطور استراتيجية محتوى ونمو مخصصة', en: 'We develop a customized content and growth strategy', he: 'אנחנו מפתחים אסטרטגיית תוכן וצמיחה מותאמת אישית' },
      },
      {
        number: '03',
        title: { ar: 'التنفيذ', en: 'Execution', he: 'ביצוע' },
        description: { ar: 'نبدأ بإنشاء ونشر المحتوى وإدارة التفاعل يومياً', en: 'We start creating, publishing content, and managing engagement daily', he: 'אנחנו מתחילים ליצור, לפרסם תוכן ולנהל מעורבות יומית' },
      },
      {
        number: '04',
        title: { ar: 'التحسين', en: 'Optimization', he: 'אופטימיזציה' },
        description: { ar: 'نراجع البيانات ونحسّن الاستراتيجية لتحقيق نمو مستمر', en: 'We review data and refine strategy for continuous growth', he: 'אנחנו סוקרים נתונים ומשפרים אסטרטגיה לצמיחה מתמדת' },
      },
    ],
  },
  {
    slug: 'seo',
    icon: '🔍',
    title: { ar: 'تحسين محركات البحث', en: 'Search Engine Optimization', he: 'קידום אתרים (SEO)' },
    shortDescription: {
      ar: 'تحسين ترتيب موقعك في نتائج البحث لجذب زيارات مستهدفة ومستمرة',
      en: 'Improve your site\'s search rankings to attract consistent, targeted organic traffic',
      he: 'שיפור דירוג האתר במנועי חיפוש למשיכת תנועה אורגנית ממוקדת ועקבית',
    },
    fullDescription: {
      ar: 'نحسّن ترتيب موقعك في نتائج البحث العضوية لجذب زيارات مستهدفة ومستمرة وعالية الجودة. استراتيجياتنا المُثبتة تشمل التحسين التقني والمحتوى وبناء الروابط لنتائج طويلة الأمد.',
      en: 'Improve your organic search rankings and drive consistent, high-quality traffic to your website with our proven SEO strategies and techniques. Our approach covers technical SEO, content optimization, and link building for lasting results.',
      he: 'שפרו את דירוג החיפוש האורגני שלכם והביאו תנועה עקבית ואיכותית לאתר עם אסטרטגיות וטכניקות SEO מוכחות שלנו.',
    },
    bullets: {
      ar: ['تدقيق SEO تقني وإصلاح المشاكل', 'بحث الكلمات المفتاحية والاستراتيجية', 'تحسين داخلي وخارجي للموقع', 'SEO محلي وملف Google Business'],
      en: ['Technical SEO audit & fixes', 'Keyword research & strategy', 'On-page & off-page optimization', 'Local SEO & Google Business Profile'],
      he: ['ביקורת SEO טכני ותיקונים', 'מחקר מילות מפתח ואסטרטגיה', 'אופטימיזציה On-page ו-Off-page', 'SEO מקומי ופרופיל Google Business'],
    },
    deliverables: [
      {
        icon: '🔎',
        title: { ar: 'تدقيق شامل', en: 'Comprehensive Audit', he: 'ביקורת מקיפה' },
        description: { ar: 'تحليل شامل لموقعك مع تحديد فرص التحسين', en: 'Full analysis of your site with improvement opportunities identified', he: 'ניתוח מלא של האתר עם זיהוי הזדמנויות לשיפור' },
      },
      {
        icon: '🗝️',
        title: { ar: 'استراتيجية الكلمات المفتاحية', en: 'Keyword Strategy', he: 'אסטרטגיית מילות מפתח' },
        description: { ar: 'قائمة مستهدفة بالكلمات المفتاحية مع خطة محتوى', en: 'Targeted keyword list with content plan', he: 'רשימת מילות מפתח ממוקדת עם תוכנית תוכן' },
      },
      {
        icon: '📈',
        title: { ar: 'تقارير ترتيب شهرية', en: 'Monthly Ranking Reports', he: 'דוחות דירוג חודשיים' },
        description: { ar: 'متابعة تقدم ترتيب موقعك وحركة الزيارات العضوية', en: 'Track your site ranking progress and organic traffic growth', he: 'מעקב אחר התקדמות הדירוג וצמיחת תנועה אורגנית' },
      },
    ],
    processSteps: [
      {
        number: '01',
        title: { ar: 'الاكتشاف', en: 'Discovery', he: 'גילוי' },
        description: { ar: 'نحلل موقعك الحالي والمنافسين وفرص البحث', en: 'We analyze your current site, competitors, and search opportunities', he: 'אנחנו מנתחים את האתר הנוכחי, המתחרים והזדמנויות חיפוש' },
      },
      {
        number: '02',
        title: { ar: 'الاستراتيجية', en: 'Strategy', he: 'אסטרטגיה' },
        description: { ar: 'نضع خطة SEO شاملة مع أولويات التحسين', en: 'We create a comprehensive SEO plan with optimization priorities', he: 'אנחנו יוצרים תוכנית SEO מקיפה עם סדרי עדיפויות' },
      },
      {
        number: '03',
        title: { ar: 'التنفيذ', en: 'Execution', he: 'ביצוע' },
        description: { ar: 'ننفذ التحسينات التقنية ونحسّن المحتوى ونبني الروابط', en: 'We implement technical fixes, optimize content, and build links', he: 'אנחנו מיישמים תיקונים טכניים, משפרים תוכן ובונים קישורים' },
      },
      {
        number: '04',
        title: { ar: 'التحسين', en: 'Optimization', he: 'אופטימיזציה' },
        description: { ar: 'نراقب الترتيب ونحسّن الاستراتيجية بناءً على البيانات', en: 'We monitor rankings and refine strategy based on data', he: 'אנחנו עוקבים אחר דירוגים ומשפרים אסטרטגיה על בסיס נתונים' },
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}
