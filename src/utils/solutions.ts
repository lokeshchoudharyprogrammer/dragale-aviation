// src/utils/solutions.ts

export type Solution = {
  slug: string;
  title: string;
  shortDescription: string;
  seo: {
    title: string;
    description: string;
  };
  content: {
    heading: string;
    paragraphs: string[];
  };
};

/**
 * NOTE:
 * - Keep this list small for now (1–2 solutions only)
 * - This file is the single source of truth for:
 *   - routing
 *   - metadata
 *   - solution rendering
 * - Adding a new solution later should NOT require code changes elsewhere
 */

export const solutions: Solution[] = [
  {
    slug: "seamless-vtol-patient-transport",
    title: "Seamless VTOL Patient Transport",
    shortDescription:
      "Vertical takeoff and landing capability for fast, reliable patient transport from dense cities to remote zones.",
    seo: {
      title: "Seamless VTOL Patient Transport | Dragle Aviation",
      description:
        "Explore Dragle Aviation’s VTOL-enabled patient transport solution for rapid access, predictable timelines, and safe critical-care movement across challenging terrain.",
    },
    content: {
      heading: "Rapid access when every minute matters",
      paragraphs: [
        "In medical transport, delays often happen before an aircraft ever takes off: traffic, distance to runways, and transfer handoffs can consume valuable time. Our VTOL-oriented approach is designed to reduce those friction points so care teams can focus on stabilizing the patient, not managing logistics.",
        "Vertical takeoff and landing capability enables operations closer to the point of care, helping bridge the gap between urban hospitals and hard-to-reach locations. This makes it easier to plan predictable pickup and transfer workflows—even when roads are congested or terrain is difficult.",
        "We design operations around clinical priorities: smooth patient loading, controlled cabin environment, and transport procedures aligned with critical-care needs. The objective is continuity—maintaining stability from departure through arrival rather than resetting care at every handoff.",
        "Our transport planning emphasizes safety and readiness: route considerations, weather awareness, pre-briefing, and coordination with receiving facilities. That coordination reduces surprises at arrival and supports faster bedside-to-bedside transitions.",
        "For hospitals, emergency coordinators, and healthcare networks, VTOL-enabled transport can become a reliable link in a broader care pathway—supporting quicker access to specialists, time-sensitive interventions, and higher levels of care.",
      ],
    },
  },
  {
    slug: "hospital-to-hospital-transfers",
    title: "Hospital-to-Hospital Transfers",
    shortDescription:
      "Efficient inter-facility patient transfers that reduce transit time and improve handoff quality for critical cases.",
    seo: {
      title: "Hospital-to-Hospital Patient Transfers | Dragle Aviation",
      description:
        "Learn how Dragle Aviation supports rapid hospital-to-hospital patient transfers with coordinated handoffs, predictable routing, and clinically informed transport workflows.",
    },
    content: {
      heading: "Faster inter-facility transfers with better coordination",
      paragraphs: [
        "Hospital-to-hospital transfers are rarely just transportation—they are a clinical bridge. The goal is to move a patient to the right level of care quickly while preserving stability and minimizing disruptions to treatment.",
        "We support transfers with end-to-end coordination: aligning pickup timing, confirming receiving readiness, and planning transfer points so that teams, equipment, and documentation move together. Strong coordination reduces idle time and prevents delays that can impact outcomes.",
        "Our approach is built around repeatable processes: clear pre-transfer checklists, transport planning based on acuity, and structured handoffs designed to reduce information loss between facilities.",
        "Reducing transit time is important, but reliability is equally critical. Predictable operations allow sending and receiving teams to plan staffing and prepare the next intervention without uncertainty.",
        "Whether the transfer is time-sensitive specialty care, post-operative escalation, or multi-disciplinary support, our objective is the same: help ensure the patient arrives ready for the next step of treatment.",
      ],
    },
  },
  {
    slug: "live-patient-monitoring-system",
    title: "Live Patient Monitoring System",
    shortDescription:
      "Real-time vital monitoring during transport so clinicians can track trends, respond early, and arrive prepared.",
    seo: {
      title: "Live Patient Monitoring During Transport | Dragle Aviation",
      description:
        "Discover Dragle Aviation’s live patient monitoring system for medical transport—supporting real-time vitals visibility, trend tracking, and safer clinical decision-making en route.",
    },
    content: {
      heading: "Continuous visibility from departure to arrival",
      paragraphs: [
        "In-transit care requires decisions with limited time and incomplete context. Live monitoring reduces that uncertainty by providing real-time visibility into key physiological signals so the transport team can act early rather than reacting late.",
        "A strong monitoring workflow prioritizes trends, not just numbers. Tracking changes over time helps clinicians recognize deterioration, evaluate interventions, and maintain stability throughout the transport window.",
        "Real-time data also improves handoffs: when the receiving team has access to the patient’s trajectory during transport, they can prepare equipment, staffing, and next-step procedures before arrival.",
        "Our goal is a monitoring approach that supports clinical clarity without distraction—clear information, dependable capture, and an operational workflow that fits the realities of transport.",
        "When every minute matters, continuous monitoring helps teams maintain a high standard of care across distance, enabling safer transfers and better readiness at the point of arrival.",
      ],
    },
  },
  {
    slug: "critical-heart-patient-support",
    title: "Critical Heart Patient Support",
    shortDescription:
      "Specialized transport support for cardiac patients with careful stabilization, monitoring, and coordinated escalation pathways.",
    seo: {
      title: "Critical Heart Patient Transport Support | Dragle Aviation",
      description:
        "Explore Dragle Aviation’s critical heart patient support solution—focused on safe stabilization, transport planning, continuous monitoring, and rapid access to advanced cardiac care.",
    },
    content: {
      heading: "Transport workflows tailored for cardiac acuity",
      paragraphs: [
        "Cardiac cases demand a transport plan that treats time, stability, and coordination as a single system. The objective is to protect the patient’s condition during movement and enable rapid access to advanced interventions at the receiving facility.",
        "We support cardiac transport with a clinically informed workflow: careful preparation before departure, consistent monitoring en route, and structured handoffs on arrival. Every step is designed to reduce avoidable stressors and prevent gaps in care.",
        "Operational coordination is essential—confirming receiving readiness, planning the transfer path, and aligning teams so escalation is immediate when the patient reaches the destination.",
        "Our focus is not only speed but safety and predictability. A reliable workflow helps clinicians make confident decisions under pressure and ensures the next stage of treatment begins without delay.",
        "For hospitals and emergency coordinators, specialized cardiac transport support can strengthen regional care pathways by connecting patients to the right resources faster—while maintaining high clinical standards throughout the journey.",
      ],
    },
  },
];

/**
 * Helper utilities
 * These are intentionally simple to avoid over-engineering on Day 3
 */

export function getAllSolutionSlugs() {
  return solutions.map((solution) => solution.slug);
}

export function getSolutionBySlug(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}

export function isSolutionSlug(slug: string): slug is Solution['slug'] {
  return solutions.some((solution) => solution.slug === slug);
}
