import Link from 'next/link'

export default function Custom404() {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-[#111d20]">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">
        404
      </h1>
      <div className="bg-[#587cfe] px-2 text-sm font-medium rounded rotate-12 absolute">
        Page Not Found
      </div>
      <Link href="https://www.dropgala.com" className="mt-5">
        <div className="relative text-base font-semibold inline-block text-[#587cfe] group active:text-[#100055] focus:outline-none focus:ring">
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#587cfe] group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
            Take Me Somewhere Safe!
          </span>
        </div>
      </Link>
    </main>
  )
}
