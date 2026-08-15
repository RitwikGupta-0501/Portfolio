import React from 'react';

interface ProcessPhase {
  eyebrow: string;
  title: string;
  narrative: string;
}

const PHASES: ProcessPhase[] = [
  {
    eyebrow: '01 • THE BLUEPRINT',
    title: 'Understand the "Why"',
    narrative:
      'Before writing a single line of code, I need to understand the actual problem we are trying to solve. I spend time talking to stakeholders, mapping out the business logic, and defining the physical constraints of the system. I firmly believe that an hour of planning saves weeks of debugging.',
  },
  {
    eyebrow: '02 • THE FOUNDATION',
    title: 'Architect & Align',
    narrative:
      'Once the problem is clear, I start drafting the architecture. I prefer to keep things boring and reliable over chasing the latest trendy framework. I map out the data structures, API contracts, and failure states, ensuring the rest of the team is aligned before we start building.',
  },
  {
    eyebrow: '03 • THE EXECUTION',
    title: 'Deep Work',
    narrative:
      'This is where the headphones go on. I focus on writing clean, modular, and heavily tested code. Whether I am building a Python web backend or tinkering with a Rust runtime, my goal is always the same: write software that is easy to reason about and hard to break.',
  },
  {
    eyebrow: '04 • THE HANDSHAKE',
    title: 'Telemetry & Handoff',
    narrative:
      "A system isn't finished just because it compiles. I ensure my code is fully documented, equipped with proper logging, and ready to be maintained by someone else. The best code is code that doesn't require me to be in the room to explain it.",
  },
];

export const ProcessTimelineSection: React.FC = () => {
  return (
    <section id="engineering-process" className="w-full">
      {/* The Main Container: Sticky Left / Scrolling Right Architecture */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-32 flex flex-col md:flex-row relative">
        {/* The Left Column (The Anchor): 35% Width, Locks into place on scroll */}
        <div className="w-full md:w-1/3 md:sticky top-32 h-fit flex flex-col pr-8">
          {/* The Section Title */}
          <h2 className="font-serif-display text-4xl lg:text-5xl text-[#EAEAEA] mb-6 tracking-tight">
            How I Build
          </h2>

          {/* The Subtitle */}
          <p className="font-sans text-base text-[#8c8c8c] leading-relaxed max-w-sm">
            A disciplined, pragmatic approach to engineering. I focus on understanding the constraints,
            collaborating on the architecture, and writing code that the next developer will actually enjoy reading.
          </p>
        </div>

        {/* The Right Column (The Narrative): 65% Width with Faint Visual Anchor Spine */}
        <div className="w-full md:w-2/3 mt-16 md:mt-0 md:pl-16 lg:pl-24 border-l border-white/5 pl-8 flex flex-col gap-32">
          {PHASES.map((phase) => (
            <div key={phase.eyebrow} className="flex flex-col">
              {/* The Eyebrow (Chapter Marker) */}
              <span className="text-[#B58E62] text-xs tracking-[0.2em] font-medium uppercase block mb-3 font-mono">
                {phase.eyebrow}
              </span>

              {/* The Phase Title */}
              <h3 className="font-serif-display text-2xl lg:text-3xl text-[#EAEAEA] mb-4 tracking-tight">
                {phase.title}
              </h3>

              {/* The Narrative Text */}
              <p className="font-sans text-lg text-gray-300 leading-relaxed font-light">
                {phase.narrative}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
