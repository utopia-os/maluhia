export default function MapSection() {
  return (
    <section className="py-2 sm:py-16 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-xl">
          <iframe
            src="https://dev.utopia-map.org?embedded=true"
            className="w-full h-full border-0"
            title="Utopia Map"
          />
        </div>
      </div>
    </section>
  )
}