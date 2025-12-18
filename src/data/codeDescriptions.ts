/**
 * UAE Purpose Code Detailed Descriptions
 * Based on UAEFTS AUX700 Technical Specification
 * Central Bank of UAE regulatory requirements
 *
 * This file contains comprehensive descriptions, use cases, and guidance
 * for each of the 117 UAE purpose codes to help operators select the
 * correct code for transactions.
 */

export interface CodeDescription {
  code: string;
  shortDescription: string;
  detailedDescription: string;
  useCases: string[];
  examples: string[];
  commonMistakes?: string[];
  notes?: string[];
  relatedCodes?: string[];
  regulatoryReference?: string;
  keywords: string[];
}

export const CODE_DESCRIPTIONS: Record<string, CodeDescription> = {
  // ============================================================================
  // SALARY AND COMPENSATION (SAL Category)
  // ============================================================================
  SAL: {
    code: 'SAL',
    shortDescription: 'Regular monthly salary payments to employees',
    detailedDescription:
      'Use this code for regular periodic salary payments made to employees as part of their employment contract. This includes basic salary, fixed allowances that are part of the regular salary structure, and any recurring monthly compensation. The payment should be from an employer to an employee for services rendered during the employment period.',
    useCases: [
      'Monthly salary disbursement to staff',
      'Regular payroll processing',
      'Fixed salary payments including basic + fixed allowances',
      'Wage payments to workers',
    ],
    examples: [
      'Company paying AED 15,000 monthly salary to an accountant',
      'Factory paying weekly wages to production workers',
      'Organization disbursing salaries on the 25th of each month',
    ],
    commonMistakes: [
      'Using SAL for one-time bonus payments (use BON instead)',
      'Using SAL for end-of-service payments (use EOS instead)',
      'Using SAL for overtime payments (use OVT instead)',
      'Confusing with contractor payments (use consulting service codes)',
    ],
    relatedCodes: ['BON', 'OVT', 'LAS', 'COP', 'SAA', 'EOS'],
    regulatoryReference: 'UAEFTS AUX700 - Employment Payments',
    keywords: ['salary', 'wage', 'payroll', 'monthly', 'employee', 'compensation', 'pay'],
  },

  SAA: {
    code: 'SAA',
    shortDescription: 'Advance payment against future salary',
    detailedDescription:
      'Use this code when an employer provides an advance payment to an employee against their future salary. This is typically a portion of salary paid before the regular pay date, which will be deducted from subsequent salary payments. Common for employees facing unexpected expenses or during probation periods.',
    useCases: [
      'Emergency salary advance to employee',
      'Mid-month advance against end-of-month salary',
      'New employee advance before first full salary',
    ],
    examples: [
      'Employee requests AED 5,000 advance due to medical emergency',
      'New hire receives 50% salary advance before first pay date',
    ],
    commonMistakes: [
      'Confusing with personal loans (use LND for loans)',
      'Using for bonus payments (use BON)',
    ],
    relatedCodes: ['SAL', 'EMI'],
    keywords: ['advance', 'salary advance', 'prepayment', 'early payment'],
  },

  BON: {
    code: 'BON',
    shortDescription: 'Bonus and incentive payments',
    detailedDescription:
      'Use this code for discretionary or performance-based bonus payments to employees. This includes annual bonuses, performance incentives, sales commissions paid as bonus, holiday bonuses, and any non-regular additional compensation tied to performance or company profits.',
    useCases: [
      'Annual performance bonus',
      'Eid/holiday bonus payments',
      'Sales target achievement bonus',
      'Project completion bonus',
      'Profit-sharing bonus',
    ],
    examples: [
      'Annual bonus of AED 20,000 for meeting sales targets',
      'Ramadan bonus payment to all staff',
      'Project milestone bonus to development team',
    ],
    commonMistakes: [
      'Using BON for regular monthly incentives that are part of salary structure (use SAL)',
      'Confusing with commission payments to agents (use ACM)',
    ],
    relatedCodes: ['SAL', 'COP', 'ACM'],
    keywords: ['bonus', 'incentive', 'reward', 'performance', 'annual bonus'],
  },

  COP: {
    code: 'COP',
    shortDescription: 'Compensation and settlement payments',
    detailedDescription:
      'Use this code for compensation payments that are not regular salary or bonus. This includes settlement payments, damages, compensation for injury or loss, settlement of disputes, and any compensatory payments outside normal employment remuneration.',
    useCases: [
      'Settlement of employment dispute',
      'Compensation for workplace injury',
      'Damages payment',
      'Non-compete agreement compensation',
      'Settlement of legal claim',
    ],
    examples: [
      'Payment of AED 50,000 to settle wrongful termination claim',
      'Compensation for workplace accident',
      'Settlement payment following employment dispute',
    ],
    relatedCodes: ['EOS', 'SAL', 'MCR'],
    keywords: ['compensation', 'settlement', 'damages', 'dispute', 'claim'],
  },

  LAS: {
    code: 'LAS',
    shortDescription: 'Leave salary and vacation pay',
    detailedDescription:
      'Use this code for payments related to employee leave entitlements. This includes payment for annual leave, sick leave encashment, leave travel allowance, and any compensation for unused leave days. Typically paid when an employee takes leave or upon leaving the organization.',
    useCases: [
      'Annual leave salary payment',
      'Leave encashment on resignation',
      'Vacation pay advance',
      'Leave travel allowance',
    ],
    examples: [
      'Payment of 30 days accumulated leave on employee exit',
      'Annual leave salary for employee going on vacation',
      'Leave fare payment for home country visit',
    ],
    commonMistakes: [
      'Confusing with regular salary during leave period (use SAL)',
      'Using for end-of-service which includes multiple components (use EOS)',
    ],
    relatedCodes: ['SAL', 'EOS', 'STR'],
    keywords: ['leave', 'vacation', 'annual leave', 'leave salary', 'leave encashment'],
  },

  PEN: {
    code: 'PEN',
    shortDescription: 'Pension payments',
    detailedDescription:
      'Use this code for pension and retirement benefit payments. This includes regular pension disbursements, retirement fund payments, and any payments from pension schemes to retirees or their beneficiaries.',
    useCases: [
      'Monthly pension to retired employee',
      'Retirement fund withdrawal',
      'Pension fund contribution refund',
      'Survivor pension to beneficiary',
    ],
    examples: [
      'Monthly pension payment of AED 8,000 to retired government employee',
      'Lump sum pension withdrawal upon retirement',
    ],
    relatedCodes: ['EOS', 'SAL'],
    keywords: ['pension', 'retirement', 'retired', 'retirement benefit'],
  },

  OVT: {
    code: 'OVT',
    shortDescription: 'Overtime payments',
    detailedDescription:
      'Use this code specifically for overtime compensation - additional pay for hours worked beyond the standard working hours as defined by UAE labor law or employment contract. This is separate from regular salary and should reflect only the overtime component.',
    useCases: [
      'Payment for extra hours worked',
      'Weekend/holiday work compensation',
      'Extended shift payments',
    ],
    examples: [
      'Payment for 20 hours overtime worked during month-end closing',
      'Double-time payment for public holiday work',
    ],
    commonMistakes: [
      'Including overtime in regular SAL code (separate OVT for clarity)',
      'Using for regular shift allowances (use SAL)',
    ],
    relatedCodes: ['SAL', 'BON'],
    keywords: ['overtime', 'extra hours', 'OT', 'extended hours'],
  },

  // ============================================================================
  // FAMILY MAINTENANCE (FAM Category)
  // ============================================================================
  FAM: {
    code: 'FAM',
    shortDescription: 'Family support and worker remittances',
    detailedDescription:
      'Use this code for personal remittances sent to support family members abroad. This is the most common code for expatriate workers sending money home to their families for living expenses, household support, and general family maintenance. This code is specifically for OFFSHORE (cross-border) transactions.',
    useCases: [
      'Monthly remittance to family in home country',
      'Support payment to parents/spouse/children abroad',
      'Household expense support for family overseas',
      'Regular family maintenance transfers',
    ],
    examples: [
      'Worker sending AED 3,000 monthly to family in India',
      'Expatriate supporting parents in Philippines',
      'Employee sending school fees for children in Pakistan',
    ],
    commonMistakes: [
      'Using FAM for domestic transfers (use TOF for domestic)',
      'Using FAM for own account transfers (use OAT)',
      'Using for gifts/charity (use CHC)',
    ],
    notes: [
      'This code is for OFFSHORE transactions only',
      'For domestic family transfers, use TOF',
    ],
    relatedCodes: ['TOF', 'OAT', 'AE015', 'EDU'],
    keywords: ['remittance', 'family', 'support', 'maintenance', 'home country', 'worker remittance'],
  },

  TOF: {
    code: 'TOF',
    shortDescription: 'Transfer of funds between persons',
    detailedDescription:
      'Use this code for personal transfers between individuals that are not classified under other specific categories. This includes gifts, personal payments, settlements between individuals, and general person-to-person transfers both domestic and international.',
    useCases: [
      'Gift transfer to friend or relative',
      'Personal settlement between individuals',
      'Payment for personal purchase from individual',
      'General person-to-person transfer',
    ],
    examples: [
      'Sending AED 10,000 as wedding gift to friend',
      'Repaying personal loan from colleague',
      'Transfer to friend for shared vacation expenses',
    ],
    relatedCodes: ['FAM', 'OAT', 'CHC'],
    keywords: ['transfer', 'personal', 'gift', 'individual', 'person to person', 'P2P'],
  },

  OAT: {
    code: 'OAT',
    shortDescription: 'Own account transfer',
    detailedDescription:
      'Use this code when transferring funds between your own accounts. This applies to transfers between accounts held by the same individual or entity, whether at the same bank or different banks, domestic or international.',
    useCases: [
      'Transfer between own accounts at different banks',
      'Moving funds to own account abroad',
      'Consolidating funds across personal accounts',
      'Transfer to own savings account',
    ],
    examples: [
      'Moving AED 50,000 from current account to savings account',
      'Transferring to own USD account abroad',
      'Moving funds between own ADCB and ENBD accounts',
    ],
    commonMistakes: [
      'Using OAT when sending to family member account (use FAM/TOF)',
      'Using for business entity transfers (may need different code)',
    ],
    relatedCodes: ['TOF', 'AFA', 'AFL'],
    keywords: ['own account', 'self transfer', 'same person', 'consolidation'],
  },

  AE015: {
    code: 'AE015',
    shortDescription: 'Family support (alternative code)',
    detailedDescription:
      'Alternative code for family support payments, particularly used for cross-border remittances to support family members. Functions similarly to FAM code. Use when the payment system specifically requires the AE015 format.',
    useCases: [
      'Same as FAM - family maintenance remittances',
      'When system requires AE-prefixed codes',
    ],
    examples: ['Monthly family support payment using AE-format code'],
    relatedCodes: ['FAM', 'TOF'],
    keywords: ['family', 'support', 'remittance'],
  },

  // ============================================================================
  // GOODS - EXPORT (GDE Category)
  // ============================================================================
  GDE: {
    code: 'GDE',
    shortDescription: 'Payment for goods sold/exported',
    detailedDescription:
      'Use this code for receiving payment for goods sold and exported from UAE. This applies to export proceeds, payment for merchandise shipped abroad, and any incoming payment for physical goods sold to overseas buyers.',
    useCases: [
      'Export proceeds received',
      'Payment for goods shipped to foreign buyer',
      'Settlement of export invoice',
      'Receipt for merchandise sold abroad',
    ],
    examples: [
      'Receiving USD 100,000 for electronics exported to Saudi Arabia',
      'Payment for textiles exported to UK',
      'Export proceeds for gold jewelry shipped to India',
    ],
    commonMistakes: [
      'Using GDE for services (use service codes like AE001, PMS)',
      'Using GDE for domestic sales (this is for exports only)',
    ],
    notes: ['This code is for OFFSHORE transactions only - export proceeds'],
    relatedCodes: ['GDI', 'TCR', 'GMS'],
    keywords: ['export', 'goods', 'merchandise', 'sale', 'export proceeds'],
  },

  GDI: {
    code: 'GDI',
    shortDescription: 'Payment for goods bought/imported',
    detailedDescription:
      'Use this code for payments made for goods purchased and imported into UAE. This applies to import payments, payment for merchandise received from abroad, and any outgoing payment for physical goods bought from overseas sellers.',
    useCases: [
      'Payment to foreign supplier for goods',
      'Import payment for merchandise',
      'Settlement of import invoice',
      'Payment for raw materials imported',
    ],
    examples: [
      'Paying EUR 50,000 to German supplier for machinery',
      'Import payment for fabrics from China',
      'Payment for spare parts from Japan',
    ],
    commonMistakes: [
      'Using GDI for services (use service codes)',
      'Using GDI for domestic purchases',
    ],
    notes: ['This code is for OFFSHORE transactions only - import payments'],
    relatedCodes: ['GDE', 'TCP', 'GMS'],
    keywords: ['import', 'goods', 'purchase', 'merchandise', 'supplier payment'],
  },

  GMS: {
    code: 'GMS',
    shortDescription: 'Processing, repair and maintenance on goods',
    detailedDescription:
      'Use this code for payments related to processing, repair, or maintenance services performed on goods. This includes manufacturing services, assembly fees, repair of equipment/machinery, and maintenance services on physical goods.',
    useCases: [
      'Payment for goods sent abroad for repair',
      'Manufacturing/assembly service fees',
      'Maintenance service on imported equipment',
      'Processing fees for goods',
    ],
    examples: [
      'Payment for aircraft engine repair done in Germany',
      'Assembly charges for components processed in India',
      'Maintenance fees for machinery serviced abroad',
    ],
    relatedCodes: ['GDE', 'GDI', 'SRV'],
    keywords: ['repair', 'maintenance', 'processing', 'manufacturing', 'assembly'],
  },

  GOS: {
    code: 'GOS',
    shortDescription: 'Government goods and services',
    detailedDescription:
      'Use this code for payments related to government procurement of goods and services. This includes payments for goods supplied to government entities, government contracts, and public sector purchases.',
    useCases: [
      'Payment for goods supplied to government',
      'Government contract payments',
      'Public sector procurement',
    ],
    examples: [
      'Payment for office supplies to government ministry',
      'Government contract for equipment supply',
    ],
    relatedCodes: ['GDE', 'GDI', 'GRI'],
    keywords: ['government', 'public sector', 'procurement', 'contract'],
  },

  TCP: {
    code: 'TCP',
    shortDescription: 'Trade credits and advances payable',
    detailedDescription:
      'Use this code for trade credit payments and advance payments made to suppliers for goods. This includes pre-payments for future shipments, supplier advances, and settlement of trade credit extended by foreign suppliers.',
    useCases: [
      'Advance payment to supplier before shipment',
      'Pre-payment for ordered goods',
      'Settlement of supplier trade credit',
    ],
    examples: [
      '30% advance payment for machinery order',
      'Pre-payment for bulk raw material order',
    ],
    notes: ['For OFFSHORE transactions only'],
    relatedCodes: ['GDI', 'TCR'],
    keywords: ['advance', 'prepayment', 'trade credit', 'supplier advance'],
  },

  TCR: {
    code: 'TCR',
    shortDescription: 'Trade credits and advances receivable',
    detailedDescription:
      'Use this code for receiving trade credits and advance payments from customers for goods. This includes receipts of pre-payments from foreign buyers, customer advances, and collection of trade credit provided to foreign customers.',
    useCases: [
      'Receiving advance from foreign buyer',
      'Collection of customer trade credit',
      'Pre-payment received for export order',
    ],
    examples: [
      'Receiving 50% advance for export order',
      'Customer advance for bulk order',
    ],
    notes: ['For OFFSHORE transactions only'],
    relatedCodes: ['GDE', 'TCP'],
    keywords: ['advance', 'prepayment', 'trade credit', 'customer advance', 'receivable'],
  },

  PIP: {
    code: 'PIP',
    shortDescription: 'Profits on Islamic products',
    detailedDescription:
      'Use this code for profit payments related to Islamic financial products and Sharia-compliant trade financing. This includes Murabaha profits, Islamic trade finance returns, and profits from Sharia-compliant goods transactions.',
    useCases: [
      'Murabaha profit payment',
      'Islamic trade finance returns',
      'Profit on Sharia-compliant goods transaction',
    ],
    examples: [
      'Profit payment on Murabaha financing for equipment',
      'Islamic trade finance profit distribution',
    ],
    relatedCodes: ['GDE', 'GDI', 'IOL'],
    keywords: ['Islamic', 'Murabaha', 'Sharia', 'profit', 'halal'],
  },

  // ============================================================================
  // SERVICES (SRV Category)
  // ============================================================================
  'AE001': {
    code: 'AE001',
    shortDescription: 'Consulting services',
    detailedDescription:
      'Use this code for payments for consulting services including business consulting, strategy consulting, management consulting, and professional advisory services. This covers fees paid to consultants and consulting firms for their professional advice and expertise.',
    useCases: [
      'Business strategy consulting fees',
      'Management consulting services',
      'Professional advisory fees',
      'Corporate consulting engagement',
    ],
    examples: [
      'Payment to McKinsey for strategy consulting',
      'Business advisory fees to consulting firm',
      'Management consultant engagement fees',
    ],
    commonMistakes: [
      'Using for IT consulting (use ITS)',
      'Using for legal services (use AE002)',
      'Using for accounting services (use FIS)',
    ],
    relatedCodes: ['AE002', 'PMS', 'FIS'],
    keywords: ['consulting', 'advisory', 'consultant', 'strategy', 'business advice'],
  },

  'AE002': {
    code: 'AE002',
    shortDescription: 'Legal services',
    detailedDescription:
      'Use this code for payments for legal services including attorney fees, legal advisory, litigation costs, legal consultation, and law firm charges. This covers all payments to legal professionals and law firms.',
    useCases: [
      'Attorney/lawyer fees',
      'Legal advisory services',
      'Litigation and court representation costs',
      'Legal document preparation',
      'Corporate legal services',
    ],
    examples: [
      'Payment to law firm for contract review',
      'Litigation fees for commercial dispute',
      'Legal advisory for M&A transaction',
    ],
    relatedCodes: ['AE001', 'PMS', 'FIS'],
    keywords: ['legal', 'lawyer', 'attorney', 'litigation', 'law firm', 'legal advice'],
  },

  IFS: {
    code: 'IFS',
    shortDescription: 'Information services',
    detailedDescription:
      'Use this code for payments for information services including data services, news services, database access, market data subscriptions, and information provider fees.',
    useCases: [
      'Market data subscription fees',
      'News service subscriptions',
      'Database access fees',
      'Information provider charges',
    ],
    examples: [
      'Bloomberg terminal subscription',
      'Reuters data feed charges',
      'Research database access fees',
    ],
    relatedCodes: ['ITS', 'TCS'],
    keywords: ['information', 'data', 'news', 'database', 'subscription'],
  },

  ITS: {
    code: 'ITS',
    shortDescription: 'Computer and IT services',
    detailedDescription:
      'Use this code for payments for computer and information technology services including software development, IT consulting, system integration, cloud services, and technical support.',
    useCases: [
      'Software development fees',
      'IT consulting services',
      'System integration charges',
      'Cloud service subscriptions',
      'Technical support fees',
      'Website development',
    ],
    examples: [
      'Payment to software company for app development',
      'AWS/Azure cloud hosting fees',
      'IT support contract payment',
      'Website redesign project payment',
    ],
    commonMistakes: [
      'Using for software license purchase (may use IPC for IP)',
      'Using for hardware purchase (use GDI)',
    ],
    relatedCodes: ['IFS', 'TCS', 'IPC'],
    keywords: ['IT', 'computer', 'software', 'technology', 'cloud', 'development'],
  },

  PMS: {
    code: 'PMS',
    shortDescription: 'Professional and management consulting',
    detailedDescription:
      'Use this code for professional and management consulting services that combine multiple disciplines. This includes general management consulting, professional services firms, and multi-disciplinary advisory engagements.',
    useCases: [
      'Management consulting engagement',
      'Professional services fees',
      'Multi-disciplinary advisory',
      'Organizational consulting',
    ],
    examples: [
      'Deloitte consulting engagement',
      'PwC advisory services',
      'Management restructuring consulting',
    ],
    relatedCodes: ['AE001', 'AE002', 'FIS'],
    keywords: ['management', 'professional', 'consulting', 'advisory'],
  },

  RDS: {
    code: 'RDS',
    shortDescription: 'Research and development services',
    detailedDescription:
      'Use this code for payments for research and development services including scientific research, product development, R&D consulting, laboratory services, and technical research.',
    useCases: [
      'R&D project fees',
      'Scientific research services',
      'Product development consulting',
      'Laboratory testing services',
      'Technical research engagement',
    ],
    examples: [
      'Payment for pharmaceutical research',
      'Product development R&D fees',
      'University research project funding',
    ],
    relatedCodes: ['ITS', 'PMS'],
    keywords: ['R&D', 'research', 'development', 'scientific', 'laboratory'],
  },

  TCS: {
    code: 'TCS',
    shortDescription: 'Telecommunication services',
    detailedDescription:
      'Use this code for payments for telecommunication services including phone services, internet services, data communication, network services, and telecom infrastructure.',
    useCases: [
      'International calling charges',
      'Internet service fees',
      'Data communication services',
      'Network infrastructure services',
      'Telecom equipment leasing',
    ],
    examples: [
      'Payment for international leased lines',
      'Cross-border data services',
      'International roaming settlement',
    ],
    relatedCodes: ['ITS', 'IFS'],
    keywords: ['telecom', 'communication', 'phone', 'internet', 'network'],
  },

  TTS: {
    code: 'TTS',
    shortDescription: 'Technical trade-related business services',
    detailedDescription:
      'Use this code for technical services related to trade including inspection services, surveying, quality control, testing, and certification services for traded goods.',
    useCases: [
      'Pre-shipment inspection fees',
      'Quality control services',
      'Goods testing and certification',
      'Trade-related surveying',
    ],
    examples: [
      'SGS inspection fees for export shipment',
      'Quality certification for imported goods',
      'Technical testing before shipment',
    ],
    relatedCodes: ['GDE', 'GDI', 'GMS'],
    keywords: ['technical', 'inspection', 'testing', 'certification', 'quality'],
  },

  FIS: {
    code: 'FIS',
    shortDescription: 'Financial services',
    detailedDescription:
      'Use this code for payments for financial services including banking fees, brokerage charges, financial advisory, audit fees, and accounting services.',
    useCases: [
      'Banking service charges',
      'Brokerage fees',
      'Audit and accounting fees',
      'Financial advisory services',
      'Fund management fees',
    ],
    examples: [
      'External audit fees to Big 4 firm',
      'Investment banking advisory fees',
      'Asset management fees',
    ],
    relatedCodes: ['AE001', 'COM', 'ACM'],
    keywords: ['financial', 'banking', 'audit', 'accounting', 'brokerage'],
  },

  // ============================================================================
  // TRAVEL AND TRANSPORT (TRV Category)
  // ============================================================================
  ATS: {
    code: 'ATS',
    shortDescription: 'Air transport services',
    detailedDescription:
      'Use this code for payments related to air transport services including air freight charges, airline ticket payments to foreign carriers, aircraft charter fees, and air cargo services.',
    useCases: [
      'Air freight charges',
      'International airline ticket purchase',
      'Aircraft charter fees',
      'Air cargo transport payment',
    ],
    examples: [
      'Payment to Emirates for cargo shipment',
      'Air freight charges for export goods',
      'Charter flight payment',
    ],
    notes: ['For OFFSHORE transactions only'],
    relatedCodes: ['STS', 'OTS', 'STR'],
    keywords: ['air', 'freight', 'airline', 'cargo', 'flight', 'transport'],
  },

  STS: {
    code: 'STS',
    shortDescription: 'Sea transport services',
    detailedDescription:
      'Use this code for payments related to sea/maritime transport services including shipping charges, sea freight, port charges, vessel charter, and maritime cargo services.',
    useCases: [
      'Sea freight charges',
      'Container shipping fees',
      'Port handling charges',
      'Vessel charter payment',
    ],
    examples: [
      'Payment to Maersk for container shipping',
      'Sea freight for bulk cargo',
      'Port charges at foreign port',
    ],
    notes: ['For OFFSHORE transactions only'],
    relatedCodes: ['ATS', 'OTS', 'STR'],
    keywords: ['sea', 'shipping', 'maritime', 'freight', 'container', 'port'],
  },

  STR: {
    code: 'STR',
    shortDescription: 'Travel expenses',
    detailedDescription:
      'Use this code for general travel expenses including hotel accommodation abroad, travel-related purchases, tourism expenses, and business travel costs outside UAE.',
    useCases: [
      'Hotel accommodation abroad',
      'Business travel expenses',
      'Tourism spending',
      'Travel-related purchases',
    ],
    examples: [
      'Hotel booking payment in London',
      'Business trip expenses reimbursement',
      'Tourism package payment',
    ],
    notes: ['For OFFSHORE transactions only'],
    relatedCodes: ['ATS', 'STS', 'EDU'],
    keywords: ['travel', 'hotel', 'tourism', 'accommodation', 'trip'],
  },

  OTS: {
    code: 'OTS',
    shortDescription: 'Other modes of transport',
    detailedDescription:
      'Use this code for transport services not covered by air or sea, including road transport, rail transport, pipeline transport, and multimodal transport services.',
    useCases: [
      'Road freight charges',
      'Rail transport services',
      'Pipeline transport fees',
      'Multimodal transport payment',
    ],
    examples: [
      'Truck transport to GCC country',
      'Rail freight payment',
      'Cross-border road transport',
    ],
    notes: ['For OFFSHORE transactions only'],
    relatedCodes: ['ATS', 'STS'],
    keywords: ['transport', 'road', 'rail', 'logistics', 'freight'],
  },

  // ============================================================================
  // EDUCATION (EDU Category)
  // ============================================================================
  EDU: {
    code: 'EDU',
    shortDescription: 'Educational expenses and tuition',
    detailedDescription:
      'Use this code for payments related to education including tuition fees, school/university fees abroad, educational course payments, and academic expenses for study overseas.',
    useCases: [
      'University tuition fees abroad',
      'School fees for children studying overseas',
      'Online course payments to foreign institutions',
      'Educational program fees',
    ],
    examples: [
      'Tuition payment to UK university',
      'School fees for child studying in India',
      'Online MBA program payment to US institution',
    ],
    notes: ['For OFFSHORE transactions only'],
    relatedCodes: ['FAM', 'STR', 'TKT'],
    keywords: ['education', 'tuition', 'school', 'university', 'academic', 'study'],
  },

  TKT: {
    code: 'TKT',
    shortDescription: 'Tickets for education/travel',
    detailedDescription:
      'Use this code for ticket purchases related to education or specific ticketed events/services. This includes air tickets for students, event tickets, and similar ticketed purchases.',
    useCases: [
      'Student air ticket purchase',
      'Event ticket purchase',
      'Conference registration',
    ],
    examples: [
      'Flight ticket for student traveling to university',
      'Conference ticket payment',
    ],
    relatedCodes: ['EDU', 'STR', 'ATS'],
    keywords: ['ticket', 'booking', 'student', 'event'],
  },

  // ============================================================================
  // CHARITY (CHR Category)
  // ============================================================================
  CHC: {
    code: 'CHC',
    shortDescription: 'Charitable contributions and donations',
    detailedDescription:
      'Use this code for charitable donations and contributions to registered charities, non-profit organizations, religious institutions, and humanitarian causes.',
    useCases: [
      'Donation to registered charity',
      'Religious institution contribution',
      'Humanitarian aid payment',
      'Non-profit organization support',
    ],
    examples: [
      'Donation to Red Crescent',
      'Zakat payment to charity organization',
      'Contribution to education foundation',
    ],
    notes: ['For OFFSHORE charitable payments'],
    relatedCodes: ['ALW', 'TOF'],
    keywords: ['charity', 'donation', 'zakat', 'humanitarian', 'non-profit'],
  },

  ALW: {
    code: 'ALW',
    shortDescription: 'Allowances',
    detailedDescription:
      'Use this code for allowance payments that are not part of regular salary, including special allowances, stipends, and periodic non-salary payments to individuals.',
    useCases: [
      'Student allowance/stipend',
      'Special purpose allowance',
      'Periodic non-salary payment',
    ],
    examples: [
      'Monthly stipend to sponsored student',
      'Research allowance payment',
    ],
    relatedCodes: ['SAL', 'CHC', 'EDU'],
    keywords: ['allowance', 'stipend', 'support', 'periodic'],
  },

  // ============================================================================
  // DIVIDENDS (DIV Category)
  // ============================================================================
  DIV: {
    code: 'DIV',
    shortDescription: 'Dividend payouts from financial institutions',
    detailedDescription:
      'Use this code for dividend payments from financial institutions including banks, investment funds, and financial services companies. This covers regular dividend distributions to shareholders.',
    useCases: [
      'Bank dividend payment',
      'Financial institution dividend distribution',
      'Investment company dividend',
    ],
    examples: [
      'Quarterly dividend from ADCB',
      'Annual dividend from investment fund',
    ],
    relatedCodes: ['DOE', 'IGD', 'AE025', 'ISH'],
    keywords: ['dividend', 'distribution', 'shareholder', 'payout'],
  },

  DOE: {
    code: 'DOE',
    shortDescription: 'Dividends on equity (not intragroup)',
    detailedDescription:
      'Use this code for dividend payments on equity investments that are not between related/group companies. This includes dividends from portfolio investments and non-related company shareholdings.',
    useCases: [
      'Portfolio investment dividends',
      'Non-related company dividends',
      'Listed company dividend receipt',
    ],
    examples: [
      'Dividend received from listed company shares',
      'Portfolio dividend distribution',
    ],
    notes: ['For OFFSHORE transactions only'],
    relatedCodes: ['DIV', 'IGD', 'FSA'],
    keywords: ['dividend', 'equity', 'shares', 'investment'],
  },

  IGD: {
    code: 'IGD',
    shortDescription: 'Dividends intragroup',
    detailedDescription:
      'Use this code for dividend payments between related/group companies. This includes dividends from subsidiaries to parent companies, inter-company dividend distributions, and group company profit distributions.',
    useCases: [
      'Subsidiary dividend to parent',
      'Inter-company dividend payment',
      'Group profit distribution',
    ],
    examples: [
      'UAE subsidiary paying dividend to UK parent',
      'Holding company receiving dividend from subsidiary',
    ],
    notes: ['For OFFSHORE intragroup transactions only'],
    relatedCodes: ['DIV', 'DOE', 'IGT'],
    keywords: ['dividend', 'intragroup', 'subsidiary', 'parent', 'intercompany'],
  },

  'AE025': {
    code: 'AE025',
    shortDescription: 'Investment income - dividends',
    detailedDescription:
      'Alternative code for dividend income from investments. Use when the payment system specifically requires the AE025 format for investment dividend receipts.',
    useCases: ['Same as DOE/DIV - investment dividend income'],
    examples: ['Investment dividend using AE-format code'],
    relatedCodes: ['DIV', 'DOE', 'ISH'],
    keywords: ['dividend', 'investment', 'income'],
  },

  // ============================================================================
  // INTEREST (INT Category)
  // ============================================================================
  IOL: {
    code: 'IOL',
    shortDescription: 'Income on loans',
    detailedDescription:
      'Use this code for interest income received on loans provided. This includes interest payments received from borrowers, loan interest income, and returns on lending activities.',
    useCases: [
      'Loan interest receipt',
      'Interest income from lending',
      'Borrower interest payment received',
    ],
    examples: [
      'Interest received on inter-company loan',
      'Loan interest payment from subsidiary',
    ],
    relatedCodes: ['LIP', 'IOD', 'LND'],
    keywords: ['interest', 'loan', 'income', 'lending'],
  },

  IOD: {
    code: 'IOD',
    shortDescription: 'Income on deposits',
    detailedDescription:
      'Use this code for interest income received on bank deposits. This includes savings account interest, fixed deposit returns, and interest from deposit accounts.',
    useCases: [
      'Bank deposit interest',
      'Fixed deposit returns',
      'Savings account interest',
    ],
    examples: [
      'Interest received on foreign currency deposit',
      'Fixed deposit maturity with interest',
    ],
    relatedCodes: ['IOL', 'LDL', 'DLF'],
    keywords: ['interest', 'deposit', 'savings', 'fixed deposit'],
  },

  LIP: {
    code: 'LIP',
    shortDescription: 'Loan interest payments',
    detailedDescription:
      'Use this code for interest payments made on loans. This includes interest payments to lenders, loan servicing interest, and periodic interest payments on borrowed funds.',
    useCases: [
      'Loan interest payment to bank',
      'Inter-company loan interest',
      'Mortgage interest payment',
    ],
    examples: [
      'Monthly interest payment on business loan',
      'Interest payment to foreign lender',
    ],
    relatedCodes: ['IOL', 'LNC', 'LND'],
    keywords: ['interest', 'loan', 'payment', 'borrowing'],
  },

  LNC: {
    code: 'LNC',
    shortDescription: 'Loan charges',
    detailedDescription:
      'Use this code for loan-related charges that are not interest, including processing fees, commitment fees, arrangement fees, and other loan charges.',
    useCases: [
      'Loan processing fee',
      'Commitment fee payment',
      'Arrangement fee',
      'Loan administration charges',
    ],
    examples: [
      'Loan arrangement fee to foreign bank',
      'Commitment fee on unutilized facility',
    ],
    relatedCodes: ['LIP', 'LND', 'FIS'],
    keywords: ['loan', 'charges', 'fees', 'processing'],
  },

  LND: {
    code: 'LND',
    shortDescription: 'Loan disbursements from financial institutions',
    detailedDescription:
      'Use this code for loan disbursements and drawdowns from financial institutions. This includes receipt of loan proceeds, facility drawdowns, and credit disbursements.',
    useCases: [
      'Loan disbursement receipt',
      'Facility drawdown',
      'Credit line utilization',
    ],
    examples: [
      'Receipt of term loan from foreign bank',
      'Drawdown on credit facility',
    ],
    relatedCodes: ['LIP', 'LNC', 'LLA', 'SLA'],
    keywords: ['loan', 'disbursement', 'drawdown', 'credit'],
  },

  IPC: {
    code: 'IPC',
    shortDescription: 'Charges for use of intellectual property',
    detailedDescription:
      'Use this code for payments related to intellectual property rights including royalties, license fees, patent fees, trademark fees, and copyright payments.',
    useCases: [
      'Royalty payment',
      'Software license fee',
      'Patent licensing fee',
      'Trademark usage fee',
      'Copyright payment',
    ],
    examples: [
      'Annual software license fee to Microsoft',
      'Royalty payment for brand usage',
      'Patent licensing fee payment',
    ],
    relatedCodes: ['ITS', 'FIS'],
    keywords: ['IP', 'royalty', 'license', 'patent', 'trademark', 'copyright'],
  },

  IGT: {
    code: 'IGT',
    shortDescription: 'Inter-group transfer',
    detailedDescription:
      'Use this code for transfers between related/group companies that are not classified under other specific categories like dividends or loans. This includes general inter-company transfers, working capital movements, and group treasury operations.',
    useCases: [
      'Inter-company working capital transfer',
      'Group treasury movement',
      'Related party transfer',
    ],
    examples: [
      'Working capital transfer to subsidiary',
      'Group cash pooling movement',
    ],
    relatedCodes: ['IGD', 'IID', 'CEA'],
    keywords: ['intercompany', 'group', 'transfer', 'related party'],
  },

  IID: {
    code: 'IID',
    shortDescription: 'Interest on debt intragroup',
    detailedDescription:
      'Use this code for interest payments on debt between related/group companies. This includes inter-company loan interest and intragroup debt servicing.',
    useCases: [
      'Inter-company loan interest',
      'Intragroup debt interest payment',
    ],
    examples: [
      'Interest payment to parent company on inter-company loan',
    ],
    notes: ['For OFFSHORE intragroup transactions only'],
    relatedCodes: ['IGT', 'LIP', 'IGD'],
    keywords: ['interest', 'intragroup', 'intercompany', 'debt'],
  },

  // ============================================================================
  // LOANS (LNR Category)
  // ============================================================================
  LLA: {
    code: 'LLA',
    shortDescription: 'Long-term loans to non-residents',
    detailedDescription:
      'Use this code for disbursement of long-term loans (typically over 1 year maturity) to non-resident borrowers. This includes providing credit facilities to foreign entities and overseas lending.',
    useCases: [
      'Long-term loan to foreign subsidiary',
      'Cross-border lending',
      'Overseas project financing',
    ],
    examples: [
      '5-year loan to subsidiary in Singapore',
      'Long-term credit to foreign joint venture',
    ],
    notes: [
      'For OFFSHORE transactions only',
      'LEI typically required for these transactions',
    ],
    relatedCodes: ['SLA', 'LLL', 'LND'],
    keywords: ['loan', 'long-term', 'non-resident', 'lending', 'credit'],
  },

  LLL: {
    code: 'LLL',
    shortDescription: 'Long-term foreign loans to residents',
    detailedDescription:
      'Use this code for receipt of long-term loans (typically over 1 year maturity) from non-resident lenders by UAE residents. This includes foreign bank loans and overseas borrowing.',
    useCases: [
      'Long-term loan from foreign bank',
      'Overseas borrowing receipt',
      'Foreign credit facility drawdown',
    ],
    examples: [
      'Receipt of 7-year syndicated loan',
      'Long-term borrowing from foreign bank',
    ],
    notes: [
      'For OFFSHORE transactions only',
      'LEI typically required for these transactions',
    ],
    relatedCodes: ['SLL', 'LLA', 'LND'],
    keywords: ['loan', 'long-term', 'borrowing', 'foreign'],
  },

  SLA: {
    code: 'SLA',
    shortDescription: 'Short-term loans to non-residents',
    detailedDescription:
      'Use this code for disbursement of short-term loans (typically under 1 year maturity) to non-resident borrowers. This includes short-term credit facilities and working capital loans to foreign entities.',
    useCases: [
      'Short-term loan to foreign entity',
      'Working capital loan to overseas subsidiary',
      'Trade finance to foreign buyer',
    ],
    examples: [
      '6-month loan to subsidiary',
      'Short-term credit to foreign distributor',
    ],
    notes: ['For OFFSHORE transactions only'],
    relatedCodes: ['LLA', 'SLL'],
    keywords: ['loan', 'short-term', 'non-resident', 'credit'],
  },

  SLL: {
    code: 'SLL',
    shortDescription: 'Short-term foreign loans to residents',
    detailedDescription:
      'Use this code for receipt of short-term loans (typically under 1 year maturity) from non-resident lenders by UAE residents. This includes short-term foreign bank facilities and overseas working capital borrowing.',
    useCases: [
      'Short-term loan from foreign bank',
      'Working capital facility from overseas',
      'Trade finance receipt',
    ],
    examples: [
      '90-day trade finance facility',
      'Short-term borrowing from parent company',
    ],
    notes: ['For OFFSHORE transactions only'],
    relatedCodes: ['LLL', 'SLA'],
    keywords: ['loan', 'short-term', 'borrowing', 'foreign'],
  },

  // ============================================================================
  // INVESTMENT (INV Category)
  // ============================================================================
  CEA: {
    code: 'CEA',
    shortDescription: 'Equity investment in company abroad by residents',
    detailedDescription:
      'Use this code for UAE residents making equity investments in foreign companies. This includes purchase of shares in overseas companies, foreign direct investment, and acquisition of equity stakes abroad.',
    useCases: [
      'Investment in foreign company shares',
      'FDI in overseas subsidiary',
      'Equity stake acquisition abroad',
    ],
    examples: [
      'Purchase of shares in UK company',
      'Investment in Singapore subsidiary equity',
    ],
    notes: [
      'For OFFSHORE transactions only',
      'LEI typically required',
    ],
    relatedCodes: ['CEL', 'FSA', 'REA'],
    keywords: ['equity', 'investment', 'shares', 'foreign', 'FDI'],
  },

  FSA: {
    code: 'FSA',
    shortDescription: 'Equity shares in foreign companies',
    detailedDescription:
      'Use this code for purchase of equity shares in foreign listed or unlisted companies. This includes portfolio investments in overseas stocks and acquisition of foreign company shares.',
    useCases: [
      'Purchase of foreign listed shares',
      'Portfolio investment abroad',
      'Stock market investment overseas',
    ],
    examples: [
      'Purchase of Apple shares on NYSE',
      'Investment in London-listed company',
    ],
    notes: [
      'For OFFSHORE transactions only',
      'LEI required for significant investments',
    ],
    relatedCodes: ['CEA', 'FSL', 'FIA'],
    keywords: ['shares', 'equity', 'stock', 'foreign', 'portfolio'],
  },

  FSL: {
    code: 'FSL',
    shortDescription: 'Equity shares in UAE companies',
    detailedDescription:
      'Use this code for investment in equity shares of UAE companies. This includes purchase of UAE-listed shares and investment in local company equity.',
    useCases: [
      'Purchase of UAE listed shares',
      'Investment in local company equity',
      'DFM/ADX share purchase',
    ],
    examples: [
      'Purchase of Emaar shares on DFM',
      'Investment in ADNOC-listed company',
    ],
    notes: ['For DOMESTIC transactions'],
    relatedCodes: ['FSA', 'FIL'],
    keywords: ['shares', 'equity', 'UAE', 'local', 'DFM', 'ADX'],
  },

  FIA: {
    code: 'FIA',
    shortDescription: 'Investment fund shares - foreign',
    detailedDescription:
      'Use this code for investment in foreign investment funds including mutual funds, ETFs, and other collective investment schemes domiciled abroad.',
    useCases: [
      'Foreign mutual fund investment',
      'International ETF purchase',
      'Overseas fund subscription',
    ],
    examples: [
      'Investment in US mutual fund',
      'Purchase of Luxembourg-domiciled fund',
    ],
    notes: [
      'For OFFSHORE transactions only',
      'LEI required for significant investments',
    ],
    relatedCodes: ['FIL', 'FSA', 'ISH'],
    keywords: ['fund', 'mutual fund', 'ETF', 'investment', 'foreign'],
  },

  FIL: {
    code: 'FIL',
    shortDescription: 'Investment fund shares - UAE',
    detailedDescription:
      'Use this code for investment in UAE-domiciled investment funds including local mutual funds, UAE ETFs, and locally registered collective investment schemes.',
    useCases: [
      'UAE mutual fund investment',
      'Local ETF purchase',
      'DIFC-domiciled fund subscription',
    ],
    examples: [
      'Investment in Emirates NBD fund',
      'Purchase of UAE-listed ETF',
    ],
    notes: ['For DOMESTIC transactions'],
    relatedCodes: ['FIA', 'FSL', 'ISH'],
    keywords: ['fund', 'mutual fund', 'ETF', 'investment', 'UAE'],
  },

  INS: {
    code: 'INS',
    shortDescription: 'Insurance services',
    detailedDescription:
      'Use this code for insurance-related payments including premium payments, claim settlements, and reinsurance transactions with foreign insurers.',
    useCases: [
      'Insurance premium payment',
      'Claim settlement receipt',
      'Reinsurance premium',
    ],
    examples: [
      'Annual insurance premium to Lloyd\'s',
      'Reinsurance premium payment',
      'Insurance claim receipt',
    ],
    relatedCodes: ['FIS'],
    keywords: ['insurance', 'premium', 'claim', 'reinsurance'],
  },

  CIN: {
    code: 'CIN',
    shortDescription: 'Commercial investments',
    detailedDescription:
      'Use this code for commercial investments that don\'t fit other specific investment categories. This includes general business investments, commercial ventures, and mixed investment activities.',
    useCases: [
      'General business investment',
      'Commercial venture funding',
      'Mixed investment activity',
    ],
    examples: [
      'Investment in commercial property fund',
      'Business expansion investment',
    ],
    relatedCodes: ['CEA', 'PIN'],
    keywords: ['commercial', 'investment', 'business', 'venture'],
  },

  ISH: {
    code: 'ISH',
    shortDescription: 'Income on investment fund shares',
    detailedDescription:
      'Use this code for income distributions received from investment funds including fund dividends, capital gains distributions, and income from collective investment schemes.',
    useCases: [
      'Fund dividend receipt',
      'Capital gains distribution',
      'Investment fund income',
    ],
    examples: [
      'Quarterly dividend from investment fund',
      'Annual fund distribution receipt',
    ],
    relatedCodes: ['FIA', 'FIL', 'DIV'],
    keywords: ['fund', 'income', 'distribution', 'dividend'],
  },

  // ============================================================================
  // CARDS AND DIGITAL PAYMENTS (CRD Category)
  // ============================================================================
  CCP: {
    code: 'CCP',
    shortDescription: 'Corporate card payments',
    detailedDescription:
      'Use this code for corporate/business card payment settlements including company credit card payments, corporate card bills, and business expense card settlements.',
    useCases: [
      'Corporate credit card payment',
      'Business expense card settlement',
      'Company card bill payment',
    ],
    examples: [
      'Monthly corporate Amex payment',
      'Business travel card settlement',
    ],
    relatedCodes: ['CRP', 'DCP'],
    keywords: ['corporate', 'card', 'credit card', 'business'],
  },

  CRP: {
    code: 'CRP',
    shortDescription: 'Credit card payment',
    detailedDescription:
      'Use this code for personal credit card payment settlements including credit card bill payments and credit card balance settlements.',
    useCases: [
      'Personal credit card payment',
      'Credit card bill settlement',
    ],
    examples: [
      'Monthly credit card payment',
      'Credit card balance payoff',
    ],
    relatedCodes: ['CCP', 'DCP'],
    keywords: ['credit card', 'payment', 'personal'],
  },

  DCP: {
    code: 'DCP',
    shortDescription: 'Debit card payments',
    detailedDescription:
      'Use this code for debit card related payments and settlements that need to be specifically categorized as debit card transactions.',
    useCases: [
      'Debit card transaction settlement',
      'Direct debit payment',
    ],
    examples: [
      'Debit card purchase settlement',
    ],
    relatedCodes: ['CRP', 'CCP'],
    keywords: ['debit card', 'payment'],
  },

  MWP: {
    code: 'MWP',
    shortDescription: 'Mobile wallet payments',
    detailedDescription:
      'Use this code for mobile wallet payment transactions including Apple Pay, Google Pay, and other digital wallet payments.',
    useCases: [
      'Mobile wallet transaction',
      'Digital wallet payment',
      'E-wallet transfer',
    ],
    examples: [
      'Apple Pay transaction settlement',
      'Mobile wallet merchant payment',
    ],
    relatedCodes: ['MWI', 'MWO', 'SVP'],
    keywords: ['mobile', 'wallet', 'digital', 'e-wallet'],
  },

  MWI: {
    code: 'MWI',
    shortDescription: 'Mobile wallet cash-in',
    detailedDescription:
      'Use this code for loading funds into a mobile wallet. This is for domestic transactions only when topping up digital wallet balances.',
    useCases: [
      'Mobile wallet top-up',
      'E-wallet loading',
    ],
    examples: [
      'Loading AED 500 into mobile wallet',
    ],
    notes: ['DOMESTIC only'],
    relatedCodes: ['MWO', 'MWP'],
    keywords: ['mobile', 'wallet', 'top-up', 'load'],
  },

  MWO: {
    code: 'MWO',
    shortDescription: 'Mobile wallet cash-out',
    detailedDescription:
      'Use this code for withdrawing funds from a mobile wallet to a bank account. This is for domestic transactions only.',
    useCases: [
      'Mobile wallet withdrawal',
      'E-wallet cash-out',
    ],
    examples: [
      'Withdrawing AED 1,000 from mobile wallet to bank',
    ],
    notes: ['DOMESTIC only'],
    relatedCodes: ['MWI', 'MWP'],
    keywords: ['mobile', 'wallet', 'withdraw', 'cash-out'],
  },

  SVP: {
    code: 'SVP',
    shortDescription: 'Stored value card payments',
    detailedDescription:
      'Use this code for prepaid/stored value card payment transactions. This includes prepaid card purchases and gift card payments.',
    useCases: [
      'Prepaid card transaction',
      'Gift card purchase',
      'Stored value card payment',
    ],
    examples: [
      'Prepaid card payment settlement',
    ],
    relatedCodes: ['SVI', 'SVO', 'MWP'],
    keywords: ['prepaid', 'stored value', 'gift card'],
  },

  SVI: {
    code: 'SVI',
    shortDescription: 'Stored value card cash-in',
    detailedDescription:
      'Use this code for loading funds onto a prepaid/stored value card. Domestic transactions only.',
    useCases: [
      'Prepaid card loading',
      'Gift card top-up',
    ],
    examples: [
      'Loading funds onto prepaid card',
    ],
    notes: ['DOMESTIC only'],
    relatedCodes: ['SVO', 'SVP'],
    keywords: ['prepaid', 'load', 'top-up'],
  },

  SVO: {
    code: 'SVO',
    shortDescription: 'Stored value card cash-out',
    detailedDescription:
      'Use this code for withdrawing/redeeming funds from a prepaid/stored value card. Domestic transactions only.',
    useCases: [
      'Prepaid card redemption',
      'Stored value withdrawal',
    ],
    examples: [
      'Redeeming prepaid card balance',
    ],
    notes: ['DOMESTIC only'],
    relatedCodes: ['SVI', 'SVP'],
    keywords: ['prepaid', 'redeem', 'withdraw'],
  },

  // ============================================================================
  // RENT AND REAL ESTATE (RNT Category)
  // ============================================================================
  RNT: {
    code: 'RNT',
    shortDescription: 'Rent payments',
    detailedDescription:
      'Use this code for rental payments including residential rent, commercial rent, office rent, and property lease payments.',
    useCases: [
      'Residential rent payment',
      'Commercial rent payment',
      'Office lease payment',
      'Property rental',
    ],
    examples: [
      'Monthly apartment rent payment',
      'Annual office lease payment',
      'Commercial property rent',
    ],
    relatedCodes: ['LEA', 'LEL', 'PRR'],
    keywords: ['rent', 'lease', 'property', 'rental'],
  },

  LEA: {
    code: 'LEA',
    shortDescription: 'Leasing abroad',
    detailedDescription:
      'Use this code for lease payments for assets located abroad or lease payments to foreign lessors. This includes equipment leasing, vehicle leasing, and property leasing internationally.',
    useCases: [
      'Equipment lease to foreign lessor',
      'International property lease',
      'Cross-border vehicle leasing',
    ],
    examples: [
      'Aircraft lease payment to Irish lessor',
      'Equipment lease to German company',
    ],
    notes: ['For OFFSHORE transactions only'],
    relatedCodes: ['LEL', 'RNT'],
    keywords: ['lease', 'leasing', 'foreign', 'equipment'],
  },

  LEL: {
    code: 'LEL',
    shortDescription: 'Leasing in UAE',
    detailedDescription:
      'Use this code for lease payments for assets in UAE or to UAE-based lessors. This is for domestic leasing transactions.',
    useCases: [
      'Domestic equipment lease',
      'UAE vehicle leasing',
      'Local property lease',
    ],
    examples: [
      'Office equipment lease payment',
      'Vehicle lease to local company',
    ],
    notes: ['For DOMESTIC transactions only'],
    relatedCodes: ['LEA', 'RNT'],
    keywords: ['lease', 'leasing', 'UAE', 'domestic'],
  },

  PRR: {
    code: 'PRR',
    shortDescription: 'Profits or rents on real estate',
    detailedDescription:
      'Use this code for receiving rental income or profits from real estate investments. This includes rent collection, property income, and real estate investment returns.',
    useCases: [
      'Rental income receipt',
      'Property investment returns',
      'Real estate income',
    ],
    examples: [
      'Monthly rental income from investment property',
      'Commercial property rental receipt',
    ],
    relatedCodes: ['RNT', 'PPA', 'PPL'],
    keywords: ['rent', 'income', 'real estate', 'property'],
  },

  PPA: {
    code: 'PPA',
    shortDescription: 'Purchase real estate abroad',
    detailedDescription:
      'Use this code for payments to purchase real estate property located abroad. This includes buying residential or commercial property overseas by UAE residents.',
    useCases: [
      'Purchase of foreign property',
      'Overseas real estate investment',
      'Foreign property acquisition',
    ],
    examples: [
      'Purchase of apartment in London',
      'Buying commercial property in Dubai (from abroad)',
    ],
    notes: [
      'For OFFSHORE transactions only',
      'LEI typically required',
    ],
    relatedCodes: ['PPL', 'PRR'],
    keywords: ['real estate', 'property', 'purchase', 'foreign'],
  },

  PPL: {
    code: 'PPL',
    shortDescription: 'Purchase real estate in UAE from non-residents',
    detailedDescription:
      'Use this code for real estate purchases in UAE from non-resident sellers. This applies to domestic property transactions with foreign sellers.',
    useCases: [
      'Purchase UAE property from foreign owner',
      'Real estate from non-resident seller',
    ],
    examples: [
      'Buying Dubai apartment from UK resident',
    ],
    notes: ['For DOMESTIC transactions only'],
    relatedCodes: ['PPA', 'PRR'],
    keywords: ['real estate', 'property', 'purchase', 'UAE'],
  },

  // ============================================================================
  // TAX AND GOVERNMENT (TAX Category)
  // ============================================================================
  GRI: {
    code: 'GRI',
    shortDescription: 'Government related - taxes, tariffs, capital transfers',
    detailedDescription:
      'Use this code for various government-related payments including taxes, customs duties, tariffs, government fees, and capital transfers to/from government entities.',
    useCases: [
      'Tax payment to foreign government',
      'Customs duty payment',
      'Government fee payment',
      'Tariff payment',
    ],
    examples: [
      'Withholding tax payment to foreign tax authority',
      'Import customs duty',
    ],
    relatedCodes: ['TAX', 'XAT'],
    keywords: ['government', 'tax', 'tariff', 'customs', 'duty'],
  },

  TAX: {
    code: 'TAX',
    shortDescription: 'Tax payment (domestic only)',
    detailedDescription:
      'Use this code for domestic tax payments within UAE including VAT payments, corporate tax, and other local tax obligations.',
    useCases: [
      'VAT payment',
      'Corporate tax payment',
      'Local tax obligations',
    ],
    examples: [
      'Quarterly VAT payment to FTA',
      'Corporate tax payment',
    ],
    notes: ['DOMESTIC only'],
    relatedCodes: ['GRI', 'XAT'],
    keywords: ['tax', 'VAT', 'corporate tax'],
  },

  XAT: {
    code: 'XAT',
    shortDescription: 'Tax refund',
    detailedDescription:
      'Use this code for receiving tax refunds including VAT refunds, income tax refunds, and other tax rebates.',
    useCases: [
      'VAT refund receipt',
      'Tax rebate',
      'Overpaid tax refund',
    ],
    examples: [
      'VAT refund from FTA',
      'Foreign tax refund',
    ],
    relatedCodes: ['TAX', 'GRI'],
    keywords: ['tax', 'refund', 'rebate'],
  },

  // ============================================================================
  // MISCELLANEOUS (OTH Category)
  // ============================================================================
  EOS: {
    code: 'EOS',
    shortDescription: 'End of service / final settlement',
    detailedDescription:
      'Use this code for end of service payments and final settlements to employees. This includes gratuity, accumulated leave encashment, and all components of final settlement upon employment termination.',
    useCases: [
      'End of service gratuity',
      'Final settlement payment',
      'Employment termination payment',
      'Resignation settlement',
    ],
    examples: [
      'Payment of 5-year gratuity plus accumulated leave',
      'Final settlement to departing employee',
    ],
    commonMistakes: [
      'Confusing with regular leave salary (use LAS for standalone leave)',
      'Using for ongoing salary (use SAL)',
    ],
    relatedCodes: ['SAL', 'LAS', 'AES'],
    keywords: ['EOS', 'gratuity', 'final settlement', 'termination', 'end of service'],
  },

  AES: {
    code: 'AES',
    shortDescription: 'Advance payment against EOS',
    detailedDescription:
      'Use this code for advance payments made against future end of service benefits. This is an early/partial payment of gratuity or EOS entitlements.',
    useCases: [
      'Advance gratuity payment',
      'Partial EOS advance',
    ],
    examples: [
      'Employee requesting advance against accrued gratuity',
    ],
    relatedCodes: ['EOS', 'SAA'],
    keywords: ['advance', 'EOS', 'gratuity'],
  },

  EMI: {
    code: 'EMI',
    shortDescription: 'Equated monthly installments',
    detailedDescription:
      'Use this code for EMI payments including loan EMIs, financing installments, and regular periodic payments for financed purchases.',
    useCases: [
      'Loan EMI payment',
      'Car finance installment',
      'Mortgage EMI',
      'Consumer financing payment',
    ],
    examples: [
      'Monthly car loan EMI',
      'Personal loan installment',
    ],
    relatedCodes: ['LIP', 'LNC'],
    keywords: ['EMI', 'installment', 'loan', 'financing'],
  },

  IPO: {
    code: 'IPO',
    shortDescription: 'IPO subscriptions',
    detailedDescription:
      'Use this code for payments made to subscribe to Initial Public Offerings (IPOs) and new share issuances.',
    useCases: [
      'IPO subscription payment',
      'New share issue subscription',
      'Rights issue subscription',
    ],
    examples: [
      'Subscription payment for ADNOC IPO',
      'Rights issue payment',
    ],
    relatedCodes: ['FSA', 'FSL', 'POR'],
    keywords: ['IPO', 'subscription', 'shares', 'issuance'],
  },

  POR: {
    code: 'POR',
    shortDescription: 'Refunds/reversals on IPO subscriptions',
    detailedDescription:
      'Use this code for receiving refunds from IPO subscriptions when allocation is less than subscribed amount or IPO is cancelled.',
    useCases: [
      'IPO refund receipt',
      'Subscription reversal',
      'Excess subscription refund',
    ],
    examples: [
      'Refund for unallocated IPO shares',
    ],
    relatedCodes: ['IPO'],
    keywords: ['IPO', 'refund', 'reversal'],
  },

  UTL: {
    code: 'UTL',
    shortDescription: 'Utility bill payments',
    detailedDescription:
      'Use this code for utility bill payments including electricity, water, gas, and other utility services.',
    useCases: [
      'Electricity bill payment',
      'Water bill payment',
      'Gas bill payment',
      'Utility services',
    ],
    examples: [
      'Monthly DEWA bill payment',
      'SEWA utility payment',
    ],
    relatedCodes: ['RNT'],
    keywords: ['utility', 'electricity', 'water', 'DEWA', 'bills'],
  },

  SCO: {
    code: 'SCO',
    shortDescription: 'Construction',
    detailedDescription:
      'Use this code for construction-related payments including construction contracts, building work, project construction, and related services.',
    useCases: [
      'Construction contract payment',
      'Building work payment',
      'Project construction',
    ],
    examples: [
      'Progress payment to contractor',
      'Construction milestone payment',
    ],
    relatedCodes: ['GMS', 'SRV'],
    keywords: ['construction', 'building', 'contractor', 'project'],
  },

  MCR: {
    code: 'MCR',
    shortDescription: 'Monetary claim reimbursements',
    detailedDescription:
      'Use this code for reimbursement of monetary claims including expense reimbursements, claim settlements, and repayment of advanced expenses.',
    useCases: [
      'Expense reimbursement',
      'Claim settlement',
      'Advance repayment',
    ],
    examples: [
      'Business expense reimbursement',
      'Claim settlement payment',
    ],
    relatedCodes: ['COP', 'POR'],
    keywords: ['reimbursement', 'claim', 'expense', 'repayment'],
  },

  PIN: {
    code: 'PIN',
    shortDescription: 'Personal investments',
    detailedDescription:
      'Use this code for personal investment transactions that don\'t fit other specific investment categories. This is a general code for individual investment activities.',
    useCases: [
      'Personal investment transfer',
      'Individual investment activity',
    ],
    examples: [
      'Personal investment in overseas opportunity',
    ],
    relatedCodes: ['CIN', 'FSA', 'FIA'],
    keywords: ['personal', 'investment', 'individual'],
  },

  POS: {
    code: 'POS',
    shortDescription: 'POS merchant settlement',
    detailedDescription:
      'Use this code for Point of Sale merchant settlement payments. This is the settlement of card transactions to merchants from payment processors.',
    useCases: [
      'Merchant settlement',
      'Card payment settlement to merchant',
      'POS transaction settlement',
    ],
    examples: [
      'Daily POS settlement to retail merchant',
    ],
    notes: ['DOMESTIC only'],
    relatedCodes: ['CRP', 'DCP'],
    keywords: ['POS', 'merchant', 'settlement', 'card'],
  },

  UFP: {
    code: 'UFP',
    shortDescription: 'Unclaimed funds placement',
    detailedDescription:
      'Use this code for transfer of unclaimed funds to designated accounts or authorities as required by regulation.',
    useCases: [
      'Unclaimed fund transfer',
      'Dormant account transfer',
    ],
    examples: [
      'Transfer of unclaimed deposits',
    ],
    notes: ['DOMESTIC only'],
    relatedCodes: [],
    keywords: ['unclaimed', 'dormant', 'funds'],
  },

  CBP: {
    code: 'CBP',
    shortDescription: 'Cross border payments',
    detailedDescription:
      'Use this code for general cross-border payments that don\'t fit other specific categories. This is a catch-all for international transfers not classified elsewhere.',
    useCases: [
      'General international transfer',
      'Cross-border payment not otherwise classified',
    ],
    examples: [
      'International payment with mixed purpose',
    ],
    notes: ['For OFFSHORE transactions only'],
    relatedCodes: ['OTH', 'TOF'],
    keywords: ['cross-border', 'international', 'payment'],
  },

  OTH: {
    code: 'OTH',
    shortDescription: 'Other payments',
    detailedDescription:
      'Use this code ONLY when no other purpose code applies. This is a last-resort code for payments that cannot be classified under any other specific category. Avoid using this code when a more specific code exists.',
    useCases: [
      'Payment that doesn\'t fit any other category',
      'Miscellaneous payment',
    ],
    examples: [
      'Unique payment type not covered elsewhere',
    ],
    commonMistakes: [
      'Using OTH when a specific code exists - always look for the most appropriate code first',
    ],
    notes: [
      'Use sparingly - only when no other code applies',
      'May trigger additional scrutiny',
    ],
    relatedCodes: [],
    keywords: ['other', 'miscellaneous', 'general'],
  },

  COM: {
    code: 'COM',
    shortDescription: 'Commission',
    detailedDescription:
      'Use this code for commission payments including sales commission, broker commission, and general commission payments for services rendered.',
    useCases: [
      'Sales commission payment',
      'Broker commission',
      'Agent commission',
    ],
    examples: [
      'Sales agent commission',
      'Broker fee payment',
    ],
    relatedCodes: ['ACM', 'FIS'],
    keywords: ['commission', 'broker', 'sales', 'agent'],
  },

  ACM: {
    code: 'ACM',
    shortDescription: 'Agency commissions',
    detailedDescription:
      'Use this code for agency commission payments specifically. This includes payments to agents, representatives, and intermediaries for their agency services.',
    useCases: [
      'Agent commission',
      'Representative fees',
      'Intermediary commission',
    ],
    examples: [
      'Insurance agent commission',
      'Real estate agent fee',
      'Travel agent commission',
    ],
    relatedCodes: ['COM', 'FIS'],
    keywords: ['agency', 'agent', 'commission', 'representative'],
  },

  AFA: {
    code: 'AFA',
    shortDescription: 'Personal resident bank account abroad',
    detailedDescription:
      'Use this code for transfers to a UAE resident\'s own bank account held abroad. This is for moving funds to your own foreign account.',
    useCases: [
      'Transfer to own account abroad',
      'Foreign account funding by UAE resident',
    ],
    examples: [
      'UAE resident sending to own UK bank account',
    ],
    notes: ['For OFFSHORE transactions only'],
    relatedCodes: ['AFL', 'OAT'],
    keywords: ['own account', 'foreign', 'resident'],
  },

  AFL: {
    code: 'AFL',
    shortDescription: 'Personal non-resident bank account in UAE',
    detailedDescription:
      'Use this code for transfers related to non-resident owned bank accounts in UAE. This is for non-residents managing their UAE accounts.',
    useCases: [
      'Non-resident account in UAE',
      'Foreign owner UAE account transfer',
    ],
    examples: [
      'Non-resident transferring to own UAE account',
    ],
    notes: ['For DOMESTIC transactions only'],
    relatedCodes: ['AFA', 'OAT'],
    keywords: ['own account', 'UAE', 'non-resident'],
  },
};

/**
 * Get description for a code, returning a default if not found
 */
export function getCodeDescription(code: string): CodeDescription | null {
  return CODE_DESCRIPTIONS[code] || null;
}

/**
 * Search codes by keyword
 */
export function searchCodesByKeyword(keyword: string): string[] {
  const lowerKeyword = keyword.toLowerCase();
  return Object.entries(CODE_DESCRIPTIONS)
    .filter(([_, desc]) =>
      desc.keywords.some(k => k.toLowerCase().includes(lowerKeyword)) ||
      desc.shortDescription.toLowerCase().includes(lowerKeyword) ||
      desc.detailedDescription.toLowerCase().includes(lowerKeyword)
    )
    .map(([code]) => code);
}

/**
 * Get codes by category keyword
 */
export function getCodesByCategory(category: string): string[] {
  const lowerCategory = category.toLowerCase();
  return Object.entries(CODE_DESCRIPTIONS)
    .filter(([code]) => {
      // Match first 2-3 characters as category prefix
      return code.slice(0, 3).toLowerCase().includes(lowerCategory) ||
        code.slice(0, 2).toLowerCase().includes(lowerCategory);
    })
    .map(([code]) => code);
}
