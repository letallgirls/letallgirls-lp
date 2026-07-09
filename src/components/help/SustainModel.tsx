import { Reveal } from '../ui/Reveal'

const model = [
  {
    value: '$200',
    label: 'Shipping & deployment',
    body: 'A one-time fee per DIDI unit that covers getting a device on the ground. This is often waived.',
  },
  {
    value: '$25',
    label: 'Per month, per device',
    body: 'A subscription covering remote support, software updates, and content refreshes.',
  },
]

export function SustainModel() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal>
            <span className="text-13 text-label font-semibold text-brave-primary uppercase tracking-widest">
              Built to last
            </span>
            <h2 className="text-31 md:text-49 font-semibold mt-4 leading-[1.1] tracking-tight">
              A model built for the long run, not one-time gifts.
            </h2>
            <p className="mt-5 text-16 text-night/70 font-medium leading-[1.55]">
              LetAllGirls is a nonprofit, but DIDI is priced for sustainability. This lets schools
              access DIDI at a fraction of the cost of alternatives like satellite internet, while
              giving us a recurring path to fund manufacturing, R&D, and expansion.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {model.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.1}>
                <div className="h-full p-8 rounded-3xl bg-brave-light border border-brave-primary/10">
                  <div className="text-61 font-semibold text-brave-primary leading-none">{m.value}</div>
                  <h3 className="mt-4 text-20 font-semibold">{m.label}</h3>
                  <p className="mt-2 text-night/60 font-medium leading-[1.45]">{m.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
