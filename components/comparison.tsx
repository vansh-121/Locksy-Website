export default function Comparison() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h2 className="section-title">Why Choose Locksy?</h2>
        <p className="section-subtitle">The only extension designed specifically for tab protection.</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm md:text-base">
            <thead>
              <tr className="border-b-2 border-neutral-200">
                <th className="text-left py-4 px-4 font-bold">Feature</th>
                <th className="text-center py-4 px-4 font-bold text-primary">Locksy</th>
                <th className="text-center py-4 px-4 font-bold text-neutral-600">Browser Profiles</th>
                <th className="text-center py-4 px-4 font-bold text-neutral-600">Tab Managers</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Lock Individual Tabs", true, false, false],
                ["One-Click Operation", true, false, false],
                ["No Account Required", true, true, false],
                ["100% Offline", true, true, false],
                ["Incognito Support", true, true, false],
                ["Free Forever", true, true, false],
                ["Military-Grade Security", true, false, false],
              ].map((row, idx) => (
                <tr key={idx} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-4 px-4 font-medium">{row[0]}</td>
                  <td className="py-4 px-4 text-center">{row[1] ? "✅" : "❌"}</td>
                  <td className="py-4 px-4 text-center">{row[2] ? "✅" : "❌"}</td>
                  <td className="py-4 px-4 text-center">{row[3] ? "✅" : "❌"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
