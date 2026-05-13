truncate table public.directory_pages;

with categories(slug, name, page_types, products, verbs, fields) as (
  values
    ('ai-tools','AI Tools',array['comparison','calculator','directory'],array['Jasper','Clay','Fireflies','Writer','Notion AI','Mem','Copy.ai','Glean','Otter','Synthesia'],array['draft','score','summarize','enrich','route'],array['prompt control','source recall','handoff depth','review speed','security posture']),
    ('crm','CRM',array['directory','comparison','calculator'],array['HubSpot','Pipedrive','Close','Salesforce','Folk','Attio','Copper','Zoho CRM','Freshsales','Nimble'],array['qualify','assign','forecast','sync','revive'],array['pipeline fit','contact depth','sales cadence','reporting load','admin lift']),
    ('analytics','Analytics',array['calculator','directory','comparison'],array['Mixpanel','Amplitude','PostHog','Looker','Mode','Metabase','Heap','June','ChartMogul','ThoughtSpot'],array['segment','trace','model','alert','explain'],array['event quality','funnel clarity','seat cost','query speed','retention view']),
    ('automation','Automation',array['comparison','directory','calculator'],array['Zapier','Make','n8n','Workato','Relay','Tray.io','Bardeen','Pipedream','Parabola','Power Automate'],array['trigger','clean','approve','notify','archive'],array['workflow depth','error handling','connector range','run volume','audit trail']),
    ('customer-support','Customer Support',array['directory','calculator','comparison'],array['Intercom','Zendesk','Help Scout','Freshdesk','Gorgias','Front','Kustomer','Tidio','Crisp','Ada'],array['triage','deflect','merge','escalate','measure'],array['queue control','bot accuracy','agent load','handoff path','CSAT signal'])
), use_cases(slug, name, pain, metric) as (
  values
    ('for-real-estate-agents','For Real Estate Agents','lead notes, listing tasks, and follow-up calls','reply lift'),
    ('for-solo-founders','For Solo Founders','support replies, sales notes, and launch chores','founder hours returned'),
    ('for-ecommerce-teams','For Ecommerce Teams','merchandising checks, returns, and promo timing','margin protection'),
    ('for-healthcare-clinics','For Healthcare Clinics','intake gaps, appointment changes, and payer requests','front desk relief'),
    ('for-law-firms','For Law Firms','matter intake, research notes, and client status updates','billable time saved'),
    ('for-marketing-agencies','For Marketing Agencies','briefs, approvals, and campaign reporting','retainer capacity'),
    ('for-nonprofits','For Nonprofits','donor follow-up, grant dates, and volunteer notes','program hours protected'),
    ('for-saas-startups','For SaaS Startups','trial behavior, support demand, and sales handoffs','activation lift'),
    ('for-finance-teams','For Finance Teams','close tasks, vendor checks, and budget variance notes','close cycle speed'),
    ('for-hr-leaders','For HR Leaders','recruiting intake, policy questions, and manager nudges','people ops time saved'),
    ('for-product-managers','For Product Managers','feedback tags, roadmap evidence, and release notes','decision cycle speed'),
    ('for-field-service-crews','For Field Service Crews','job notes, dispatch changes, and parts tracking','truck roll reduction'),
    ('for-education-programs','For Education Programs','student questions, cohort tracking, and advising records','advisor capacity'),
    ('for-manufacturing-teams','For Manufacturing Teams','shift logs, quality checks, and supplier updates','downtime avoided'),
    ('for-consultants','For Consultants','discovery notes, scope drift, and client deliverables','margin kept'),
    ('for-cybersecurity-teams','For Cybersecurity Teams','alerts, evidence trails, and incident updates','response speed'),
    ('for-recruiting-agencies','For Recruiting Agencies','candidate outreach, interview loops, and client feedback','submittal quality'),
    ('for-hotel-operators','For Hotel Operators','guest messages, staffing changes, and review follow-up','guest recovery'),
    ('for-construction-firms','For Construction Firms','change orders, site notes, and subcontractor updates','schedule risk cut'),
    ('for-local-retailers','For Local Retailers','stock checks, loyalty outreach, and staff scheduling','repeat visit lift')
), expanded as (
  select c.slug as category_slug, c.name as category_name, case when c.slug = 'ai-tools' and u.slug = 'for-real-estate-agents' then 'crm-for-real-estate-agents' else u.slug end as use_case_slug, case when c.slug = 'ai-tools' and u.slug = 'for-real-estate-agents' then 'CRM For Real Estate Agents' else u.name end as use_case_name, u.pain, u.metric, c.page_types, c.products, c.verbs, c.fields, row_number() over (order by c.slug, u.slug) - 1 as i from categories c cross join use_cases u
)
insert into public.directory_pages (id, category_slug, category_name, use_case_slug, use_case_name, page_type, title, description, canonical_path, og_title, og_description, summary, option_labels, comparison_rows, calculator_config, faqs)
select
  category_slug || '-' || use_case_slug,
  category_slug,
  category_name,
  use_case_slug,
  use_case_name,
  page_types[(i % 3) + 1],
  category_name || ' ' || use_case_name || ': ' || (array['Shortlist','ROI Guide','Stack Review','Buying Map','Field Test'])[(i % 5) + 1] || ' for 2026',
  lower(replace(use_case_name, 'For ', '')) || ' get a clear read on ' || products[(i % 10) + 1] || ', ' || products[((i + 3) % 10) + 1] || ', setup effort, cost fit, and a ' || (7 + (i % 9) * 2)::text || '-hour monthly payback case.',
  case when category_slug = 'ai-tools' and use_case_slug = 'crm-for-real-estate-agents' then '/ai-tools/crm/for-real-estate-agents' else '/' || category_slug || '/' || use_case_slug end,
  category_name || ' Guide ' || use_case_name,
  'Compare practical ' || lower(category_name) || ' choices for ' || lower(use_case_name) || ' with benchmarks, tradeoffs, and a live calculator.',
  'The work is clear: ' || pain || '. For ' || replace(use_case_name, 'For ', '') || ', ' || products[(i % 10) + 1] || ', ' || products[((i + 2) % 10) + 1] || ', and ' || products[((i + 5) % 10) + 1] || ' make the first cut. The test is ' || metric || '. Expect about ' || (8 + ((i * 3) % 17))::text || ' hours back, a ' || (11 + ((i * 5) % 19))::text || ' percent operating lift, and a monthly budget near $' || (260 + ((i * 73) % 940))::text || ' before add-ons.',
  jsonb_build_array(products[(i % 10) + 1], products[((i + 2) % 10) + 1], products[((i + 5) % 10) + 1]),
  jsonb_build_array(
    jsonb_build_object('dimension', fields[(i % 5) + 1], 'optionA', products[(i % 10) + 1] || ' fits teams needing ' || verbs[(i % 5) + 1] || ' support with ' || (12 + (i % 8))::text || ' tracked steps.', 'optionB', products[((i + 2) % 10) + 1] || ' works best when ' || metric || ' is reviewed weekly across ' || (3 + (i % 4))::text || ' roles.', 'optionC', products[((i + 5) % 10) + 1] || ' is strongest for lean rollout with a ' || (5 + (i % 6))::text || ' day setup window.'),
    jsonb_build_object('dimension', fields[((i + 1) % 5) + 1], 'optionA', products[(i % 10) + 1] || ' keeps admin effort near ' || (2 + (i % 5))::text || ' hours each month after launch.', 'optionB', products[((i + 2) % 10) + 1] || ' trades setup depth for cleaner handoffs on ' || (7 + (i % 9))::text || ' recurring tasks.', 'optionC', products[((i + 5) % 10) + 1] || ' suits teams that prize reporting clarity over advanced customization.'),
    jsonb_build_object('dimension', fields[((i + 2) % 5) + 1], 'optionA', products[(i % 10) + 1] || ' has the best fit below $' || (240 + i * 11)::text || ' in monthly spend.', 'optionB', products[((i + 2) % 10) + 1] || ' earns its cost when volume passes ' || (90 + i * 7)::text || ' records or tickets.', 'optionC', products[((i + 5) % 10) + 1] || ' is the safer pick for teams testing adoption before a wider rollout.')
  ),
  case page_types[(i % 3) + 1]
    when 'comparison' then jsonb_build_object('inputs', jsonb_build_array(jsonb_build_object('key','monthlyRevenue','label','Monthly influenced revenue','min',1000,'max',250000,'step',1000,'defaultValue',18000 + i * 410,'unit','$'), jsonb_build_object('key','monthlyCost','label','Current monthly software cost','min',0,'max',20000,'step',100,'defaultValue',420 + i * 9,'unit','$')), 'formula', jsonb_build_object('type','roi','revenueInput','monthlyRevenue','costInput','monthlyCost','efficiencyMultiplier',0.08 + (i % 6) * 0.012,'monthlyToolCost',140 + (i % 9) * 35), 'outputLabel','Estimated ROI')
    when 'calculator' then jsonb_build_object('inputs', jsonb_build_array(jsonb_build_object('key','hoursSaved','label','Monthly hours saved','min',1,'max',300,'step',1,'defaultValue',24 + (i % 13),'unit','hrs'), jsonb_build_object('key','hourlyRate','label','Loaded hourly rate','min',20,'max',250,'step',5,'defaultValue',55 + (i % 11) * 5,'unit','$')), 'formula', jsonb_build_object('type','cost-savings','hoursInput','hoursSaved','rateInput','hourlyRate','automationRate',0.45 + (i % 7) * 0.05,'monthlyToolCost',90 + (i % 10) * 28), 'outputLabel','Monthly savings')
    else jsonb_build_object('inputs', jsonb_build_array(jsonb_build_object('key','setupCost','label','One-time setup cost','min',0,'max',50000,'step',500,'defaultValue',2200 + i * 37,'unit','$'), jsonb_build_object('key','monthlySavings','label','Expected monthly savings','min',100,'max',50000,'step',100,'defaultValue',950 + i * 23,'unit','$')), 'formula', jsonb_build_object('type','payback-period','setupCostInput','setupCost','monthlySavingsInput','monthlySavings','monthlyToolCost',110 + (i % 8) * 25), 'outputLabel','Payback period')
  end,
  jsonb_build_array(products[(i % 10) + 1] || ' is the strongest first trial when ' || metric || ' is the main goal.', products[((i + 2) % 10) + 1] || ' is worth piloting when the team needs deeper ' || fields[((i + 1) % 5) + 1] || ' checks.', products[((i + 5) % 10) + 1] || ' fits a smaller rollout because setup can stay within ' || (5 + (i % 6))::text || ' working days.')
from expanded;
