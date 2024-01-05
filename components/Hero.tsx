export default function Hero() {
  return (
    <div className="flex flex-col gap-16 items-center py-32">
      <h1 className="sr-only">Flexhire App</h1>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        The <em>fastest</em> way to land into your new job
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-16" />
    </div>
  )
}
