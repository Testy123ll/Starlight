import Image from 'next/image';

export const metadata = { title: 'About Us' };

export default function AboutPage() {
  const coreValues = [
    { title: "Uncompromising Quality", desc: "We deal strictly in premium-grade MDF, HDF, Blockboards, and Marine Plywood sourced from the world's most reputable manufacturers." },
    { title: "Precision & Scale", desc: "Whether for an independent contractor or a large-scale development firm, we deliver exact sizing and massive volume without failure." },
    { title: "Integrity", desc: "Transparent pricing, honest specifications, and dedicated support from the first quote to final delivery." }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 lg:py-24">
      {/* Header */}
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-gradient-amber text-4xl sm:text-5xl md:text-6xl font-black mb-4 leading-tight">About Starlight de Prince</h1>
        <p className="text-lg md:text-xl text-warm-gray/90 max-w-2xl mx-auto">Building Nigeria's future with uncompromising quality since 2012.</p>
      </div>
      
      {/* Intro Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">The Gold Standard in Wood Boards</h2>
          <p className="text-base md:text-lg text-warm-gray/90 leading-relaxed mb-6">
            Established in Ibadan, Starlight de Prince is Nigeria's premier supplier of industrial-grade wood boards, catering to interior designers, construction firms, and large-scale developers across all 36 states.
          </p>
          <p className="text-base md:text-lg text-warm-gray/90 leading-relaxed">
            Our mission is to provide premium MDF, HDF, Blockboard, and Plywood with unmatched reliability and precise dimensions. We source only the finest commercial and marine-grade materials to ensure that your furniture and structural projects stand the test of time. We don't just supply materials; we engineer construction success.
          </p>
        </div>
        <div className="relative h-64 sm:h-80 md:h-[450px] w-full rounded-2xl overflow-hidden shadow-ambient">
          <Image src="/images/about_office_wood.png" alt="Starlight Office Showroom" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-steel-darkest/80 to-transparent" />
        </div>
      </div>

      {/* Core Values */}
      <div className="mt-20 md:mt-32">
        <h2 className="text-3xl md:text-4xl font-black text-amber mb-10 text-center">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {coreValues.map((v, i) => (
            <div key={i} className="card-dark p-8 border-t-4 border-amber rounded-2xl">
              <div className="text-4xl text-amber/60 font-black mb-4">0{i + 1}</div>
              <h3 className="text-xl font-bold text-white mb-3">{v.title}</h3>
              <p className="text-warm-gray/90 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div className="mt-20 md:mt-32 mb-10 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-10 text-center">Facility & Quality Showcase</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden group">
            <Image src="/images/gallery_warehouse_1774653938996.png" alt="Warehouse Overview" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden group">
            <Image src="/images/gallery_boards_1774653955330.png" alt="Material Close Up" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden group sm:col-span-2 lg:col-span-1">
            <Image src="/images/gallery_construction_1774653971295.png" alt="Project Execution" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
        </div>
      </div>
    </div>
  );
}
