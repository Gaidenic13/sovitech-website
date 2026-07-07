import {
  Thermometer,
  Wind,
  Lightbulb,
  Shield,
  BarChart3,
  Wifi,
  FlaskConical,
  Stethoscope,
  ShoppingBag,
  Hotel,
  Factory,
  GraduationCap,
  Building2,
  Zap,
  Clock,
  Leaf,
  type LucideIcon,
} from "lucide-react"

export interface SectorFeature {
  icon: LucideIcon
  title: string
  description: string
}

export interface SectorMetric {
  value: string
  label: string
}

export interface SectorTestimonial {
  quote: string
  name: string
  role: string
  company: string
}

export interface Sector {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  accentColor: string
  accentTextDark: boolean
  heroHeadline: string
  heroSubheadline: string
  metrics: SectorMetric[]
  features: SectorFeature[]
  capabilities: string[]
  testimonial: SectorTestimonial
  relatedSectors: string[]
  image: string
}

export const sectors: Sector[] = [
  {
    id: "civil",
    slug: "civil",
    title: "Civil & Office",
    subtitle: "Office buildings & commercial spaces",
    description:
      "BMS solutions tailored for modern office buildings and commercial spaces — maximising comfort, reducing operational costs, and meeting energy certification requirements.",
    accentColor: "#C5C0F5",
    accentTextDark: true,
    heroHeadline: "Smarter offices.\nHappier teams.",
    heroSubheadline:
      "From single-tenant HQs to multi-floor commercial towers, SOVITECH BMS systems bring full visibility and control over every building system — from HVAC to access — in one unified platform.",
    metrics: [
      { value: "30–40%", label: "Reduction in operational costs" },
      { value: "98%", label: "System uptime guaranteed" },
      { value: "<18mo", label: "Average ROI payback period" },
      { value: "A+", label: "Energy certification achieved" },
    ],
    features: [
      {
        icon: Thermometer,
        title: "Adaptive climate control",
        description:
          "Automatically adjust HVAC zones based on occupancy, CO2 levels, and weather data for optimal thermal comfort throughout the day.",
      },
      {
        icon: Lightbulb,
        title: "Intelligent lighting",
        description:
          "Presence-based lighting scenes that adapt to natural light levels, time of day, and occupancy schedules across all zones.",
      },
      {
        icon: BarChart3,
        title: "Energy reporting & certification",
        description:
          "Automated energy consumption dashboards and reporting for LEED, BREEAM and EPBD compliance with zero manual effort.",
      },
      {
        icon: Shield,
        title: "Integrated security & access",
        description:
          "Unified management of access control, CCTV, and intrusion detection alongside building systems from a single interface.",
      },
      {
        icon: Wifi,
        title: "Remote monitoring",
        description:
          "24/7 remote access to all building systems via web or mobile, with real-time alerts and predictive maintenance notifications.",
      },
      {
        icon: Zap,
        title: "Peak demand management",
        description:
          "Automated load shifting and demand response to reduce peak energy consumption and lower electricity tariffs.",
      },
    ],
    capabilities: [
      "Integrated HVAC system management for optimal thermal comfort",
      "Lighting monitoring and control with automated scenes based on occupancy",
      "Integration of security, access control and energy management systems",
      "Automated energy consumption reporting and energy certification",
      "Multi-zone scheduling aligned to working hours and occupancy patterns",
      "BACnet, KNX and Modbus protocol integration",
    ],
    testimonial: {
      quote:
        "Before SOVITECH, we had no visibility into what was consuming energy across our three office buildings. Within six months of deployment, we reduced our electricity bill by 34% and finally achieved our A energy certification.",
      name: "Andrei Popescu",
      role: "Facilities Director",
      company: "Bucharest Business Park",
    },
    relatedSectors: ["medical", "retail", "educational"],
    image: "/placeholder.svg?height=800&width=1200",
  },
  {
    id: "medical",
    slug: "medical",
    title: "Medical & Pharma",
    subtitle: "Hospitals, clinics & pharmaceutical production",
    description:
      "Precision-grade BMS systems for medical facilities and pharmaceutical environments — where control, compliance, and patient safety are non-negotiable.",
    accentColor: "#C8E6C9",
    accentTextDark: true,
    heroHeadline: "Precision control.\nCompliant by design.",
    heroSubheadline:
      "Hospitals and pharmaceutical plants demand the highest standards of environmental control. SOVITECH delivers certified BMS solutions that ensure compliance, patient safety, and operational continuity.",
    metrics: [
      { value: "GMP", label: "Compliant environments" },
      { value: "±0.5°C", label: "Temperature accuracy in critical zones" },
      { value: "100%", label: "Audit trail for all parameter changes" },
      { value: "24/7", label: "Continuous monitoring & alerting" },
    ],
    features: [
      {
        icon: Thermometer,
        title: "Critical zone climate control",
        description:
          "Precise temperature, humidity and differential pressure management in operating rooms, clean rooms and sterile production areas.",
      },
      {
        icon: Wind,
        title: "Ventilation & air quality",
        description:
          "Continuous monitoring and automated control of air changes per hour, HEPA filtration status, and contamination prevention.",
      },
      {
        icon: FlaskConical,
        title: "GMP compliance management",
        description:
          "Automated parameter logging, deviation alerts, and audit-ready reports aligned with EU GMP Annex 11 and FDA 21 CFR Part 11.",
      },
      {
        icon: Stethoscope,
        title: "Patient safety monitoring",
        description:
          "Real-time environmental monitoring in patient rooms with automated escalation alerts to nursing stations and facility management.",
      },
      {
        icon: BarChart3,
        title: "Compliance reporting",
        description:
          "Fully automated regulatory reporting for ISO 14644, GxP environments, and hospital accreditation standards.",
      },
      {
        icon: Shield,
        title: "Redundant system architecture",
        description:
          "Fail-safe design with redundant controllers, UPS integration and automatic failover to guarantee zero interruption.",
      },
    ],
    capabilities: [
      "Precise temperature, humidity and differential pressure control in critical zones",
      "Continuous air quality monitoring and ventilation system management",
      "Automated management of medical equipment and specialist machinery",
      "Real-time alarms and reporting for compliance with medical standards",
      "Integration with hospital information systems (HIS/LIMS)",
      "FDA 21 CFR Part 11 and EU GMP Annex 11 compliant data logging",
    ],
    testimonial: {
      quote:
        "The level of control and auditability that SOVITECH provides in our cleanroom environments has transformed our compliance process. Our last FDA audit had zero findings related to environmental monitoring.",
      name: "Dr. Elena Ionescu",
      role: "Quality Assurance Manager",
      company: "Antibiotice Iași",
    },
    relatedSectors: ["pharma", "civil", "educational"],
    image: "/placeholder.svg?height=800&width=1200",
  },
  {
    id: "retail",
    slug: "retail",
    title: "Retail & Shopping",
    subtitle: "Shopping centres, hypermarkets & retail chains",
    description:
      "Centralised BMS automation for retail environments — delivering consistent customer comfort across hundreds of locations while driving significant energy savings.",
    accentColor: "#8B7B5C",
    accentTextDark: false,
    heroHeadline: "Better comfort.\nHigher footfall.",
    heroSubheadline:
      "In retail, the environment is part of the product. SOVITECH BMS systems maintain perfect conditions for customers and merchandise while cutting energy costs by up to 35% across your entire portfolio.",
    metrics: [
      { value: "25–35%", label: "Energy cost reduction" },
      { value: "Multi-site", label: "Centralised management" },
      { value: "+12%", label: "Average dwell time improvement" },
      { value: "Real-time", label: "Refrigeration monitoring" },
    ],
    features: [
      {
        icon: Thermometer,
        title: "Comfort-optimised climate",
        description:
          "Zone-by-zone climate management adapting to customer density, time of day, and seasonal conditions to maintain ideal shopping conditions.",
      },
      {
        icon: Lightbulb,
        title: "Adaptive lighting scenes",
        description:
          "Dynamic lighting profiles that shift across opening, peak and closing hours, with presence detection in low-traffic zones.",
      },
      {
        icon: ShoppingBag,
        title: "Refrigeration monitoring",
        description:
          "Continuous temperature monitoring of all refrigerated display cases with automated alerts before product loss occurs.",
      },
      {
        icon: BarChart3,
        title: "Multi-site energy dashboard",
        description:
          "Consolidated energy reporting across all locations, identifying inefficiencies and benchmarking performance between stores.",
      },
      {
        icon: Clock,
        title: "Schedule-based automation",
        description:
          "Pre-programmed opening and closing routines that automatically adjust all building systems — reducing waste during closed hours.",
      },
      {
        icon: Shield,
        title: "Security & access management",
        description:
          "Integrated management of CCTV, alarm systems and access control across all sites from a single operations centre.",
      },
    ],
    capabilities: [
      "Integrated climate management for customer comfort and cost reduction",
      "Smart lighting control with adaptive zone and schedule scenarios",
      "Refrigeration system monitoring and optimisation",
      "Security and access system integration for enhanced safety",
      "Centralised management of multiple locations from single dashboard",
      "BMS integration with retail POS and footfall analytics systems",
    ],
    testimonial: {
      quote:
        "Managing 14 hypermarkets from a single dashboard was unthinkable before SOVITECH. Now our facilities team handles everything remotely, and we've cut our energy spend by 31% in the first year.",
      name: "Mihai Constantin",
      role: "Operations Director",
      company: "Cora Romania",
    },
    relatedSectors: ["horeca", "civil", "industrial"],
    image: "/placeholder.svg?height=800&width=1200",
  },
  {
    id: "horeca",
    slug: "horeca",
    title: "HoReCa",
    subtitle: "Hotels, restaurants & leisure facilities",
    description:
      "Dedicated BMS automation for hotels, resorts and restaurants — delivering exceptional guest experience while dramatically reducing energy and operational costs per room.",
    accentColor: "#1F6B4A",
    accentTextDark: false,
    heroHeadline: "Five-star comfort.\nFour-star efficiency.",
    heroSubheadline:
      "Guest experience is everything in hospitality. SOVITECH BMS systems integrate with your PMS to automate room comfort, reduce energy waste during vacancies, and give your team full visibility across the property.",
    metrics: [
      { value: "25–38%", label: "Energy reduction per room" },
      { value: "PMS", label: "Full integration (Opera, Fidelio)" },
      { value: "+0.8★", label: "Average review score improvement" },
      { value: "Per-room", label: "Consumption reporting" },
    ],
    features: [
      {
        icon: Hotel,
        title: "PMS integration",
        description:
          "Full two-way integration with Opera, Fidelio and other PMS systems — automatically adjusting room conditions on check-in and check-out.",
      },
      {
        icon: Thermometer,
        title: "Guest comfort profiles",
        description:
          "Individual room climate control with guest preferences stored and applied automatically upon return visits.",
      },
      {
        icon: Zap,
        title: "Vacancy energy management",
        description:
          "Automatic setback of HVAC, lighting and other systems during unoccupied periods — eliminating waste without compromising readiness.",
      },
      {
        icon: BarChart3,
        title: "Consumption reporting per room",
        description:
          "Detailed energy and water consumption data per room and per cost centre for precise operational budgeting.",
      },
      {
        icon: Wind,
        title: "Spa & wellness integration",
        description:
          "Specialised control for pool, spa, sauna and fitness areas with automated temperature, humidity and ventilation management.",
      },
      {
        icon: Clock,
        title: "Event & banquet automation",
        description:
          "Pre-configured climate and lighting scenarios for conference rooms and banquet halls, activated automatically from your event calendar.",
      },
    ],
    capabilities: [
      "Individual room control via PMS integration (Fidelio, Opera)",
      "Automated check-in/check-out scenarios for guaranteed savings",
      "Consumption monitoring per room and cost centre",
      "Spa, pool and fitness centre systems integration",
      "Restaurant and kitchen ventilation automation",
      "Guest app integration for in-room personalisation",
    ],
    testimonial: {
      quote:
        "Our guests consistently comment on how comfortable the rooms feel the moment they walk in. The SOVITECH integration with our Opera PMS means every room is perfectly prepared before the guest arrives — and we use 32% less energy than before.",
      name: "Radu Georgescu",
      role: "General Manager",
      company: "Radisson Blu Bucharest",
    },
    relatedSectors: ["retail", "civil", "educational"],
    image: "/placeholder.svg?height=800&width=1200",
  },
  {
    id: "pharma",
    slug: "pharma",
    title: "Industrial",
    subtitle: "Warehouses, logistics & manufacturing",
    description:
      "High-performance BMS automation for industrial facilities — ensuring optimal working conditions, process efficiency, and significant reductions in energy and maintenance costs.",
    accentColor: "#5C5FD4",
    accentTextDark: false,
    heroHeadline: "Industrial scale.\nEngineered precision.",
    heroSubheadline:
      "Industrial environments demand reliability above all else. SOVITECH delivers robust BMS systems integrated with SCADA and production platforms to ensure maximum uptime, process quality, and energy efficiency.",
    metrics: [
      { value: "SCADA", label: "Full integration capability" },
      { value: "20–30%", label: "Reduction in energy costs" },
      { value: "Predictive", label: "Maintenance scheduling" },
      { value: "24/7", label: "Remote monitoring & response" },
    ],
    features: [
      {
        icon: Factory,
        title: "Industrial HVAC automation",
        description:
          "Full automation of high-capacity ventilation, heating and cooling systems aligned to production schedules and process requirements.",
      },
      {
        icon: BarChart3,
        title: "Process environment monitoring",
        description:
          "Continuous monitoring of temperature, humidity, dust and chemical exposure levels critical to production quality.",
      },
      {
        icon: Wifi,
        title: "SCADA & MES integration",
        description:
          "Native integration with SCADA and Manufacturing Execution Systems for real-time production data overlay on building systems.",
      },
      {
        icon: Zap,
        title: "Energy cost centre reporting",
        description:
          "Granular energy consumption data broken down by production line, building zone and shift — enabling precise cost attribution.",
      },
      {
        icon: Shield,
        title: "Safety & compliance",
        description:
          "Automated safety monitoring for hazardous zones, gas detection integration, and emergency ventilation activation.",
      },
      {
        icon: Clock,
        title: "Predictive maintenance",
        description:
          "AI-assisted anomaly detection on critical equipment such as compressors, chillers and AHUs — preventing unexpected downtime.",
      },
    ],
    capabilities: [
      "Full automation of high-capacity industrial HVAC systems",
      "Continuous environmental parameter monitoring for production processes",
      "Integration with production and SCADA systems for maximum efficiency",
      "Advanced energy management and consumption reporting per cost centre",
      "Emergency ventilation and gas detection system integration",
      "ISO 50001 energy management system support",
    ],
    testimonial: {
      quote:
        "SOVITECH gave us something we never had before — complete visibility across our entire production facility. We identified three major energy waste points in the first month and recovered the full investment within 14 months.",
      name: "Ionut Popa",
      role: "Plant Manager",
      company: "Ursus Breweries Cluj",
    },
    relatedSectors: ["medical", "civil", "retail"],
    image: "/placeholder.svg?height=800&width=1200",
  },
  {
    id: "educational",
    slug: "educational",
    title: "Educational",
    subtitle: "Schools, universities & campus buildings",
    description:
      "BMS automation designed around the rhythms of education — delivering healthy learning environments, simplified campus management, and compliance with sustainability targets.",
    accentColor: "#E07B6A",
    accentTextDark: false,
    heroHeadline: "Healthy spaces.\nFocused minds.",
    heroSubheadline:
      "The quality of the learning environment directly impacts academic performance. SOVITECH BMS systems maintain optimal CO2, temperature and lighting conditions throughout the school day — automatically.",
    metrics: [
      { value: "20–30%", label: "Energy savings vs conventional systems" },
      { value: "CO2", label: "Continuous classroom monitoring" },
      { value: "Multi-campus", label: "Centralised management" },
      { value: "EPBD", label: "Compliance & reporting" },
    ],
    features: [
      {
        icon: GraduationCap,
        title: "Timetable-based scheduling",
        description:
          "Automatic climate and lighting adjustments aligned to your school timetable — rooms are ready before students arrive and powered down after they leave.",
      },
      {
        icon: Wind,
        title: "CO2 & air quality monitoring",
        description:
          "Continuous monitoring of CO2 levels in classrooms with automated ventilation increases when concentration affects concentration.",
      },
      {
        icon: Building2,
        title: "Multi-building campus control",
        description:
          "Unified management of all campus buildings — classrooms, labs, sports halls, canteens and dormitories — from a single platform.",
      },
      {
        icon: Leaf,
        title: "Sustainability reporting",
        description:
          "Automated energy and carbon reporting for EPBD compliance, ESG targets, and institutional sustainability commitments.",
      },
      {
        icon: Lightbulb,
        title: "Daylight-responsive lighting",
        description:
          "Adaptive lighting that responds to natural light levels and presence, ensuring ideal conditions for study without waste.",
      },
      {
        icon: BarChart3,
        title: "Utility cost management",
        description:
          "Detailed consumption reporting per building and per department, giving administrators clear visibility to manage budgets.",
      },
    ],
    capabilities: [
      "Automated schedules adapted to school timetables",
      "Air quality and CO2 monitoring in classrooms",
      "Centralised management of multi-building campuses",
      "Energy compliance and sustainability reporting",
      "Holiday and vacation setback scheduling for zero-waste periods",
      "Integration with smart metering and utility billing systems",
    ],
    testimonial: {
      quote:
        "Since deploying SOVITECH across our campus, CO2 levels in classrooms have dropped by 40%, attendance is up, and our energy bill fell by 27%. The system practically manages itself — our maintenance team can now focus on real issues.",
      name: "Prof. Cristina Marin",
      role: "Campus Operations Director",
      company: "Politehnica University of Bucharest",
    },
    relatedSectors: ["civil", "medical", "horeca"],
    image: "/placeholder.svg?height=800&width=1200",
  },
]

export function getSectorBySlug(slug: string): Sector | undefined {
  return sectors.find((s) => s.slug === slug)
}

export function getRelatedSectors(ids: string[]): Sector[] {
  return sectors.filter((s) => ids.includes(s.id))
}
