import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
      <h1
        style={{ fontFamily: "Oswald, sans-serif" }}
        className="text-9xl font-bold text-[#ccff00] mb-4"
      >
        404
      </h1>
      <h2
        style={{ fontFamily: "Oswald, sans-serif" }}
        className="text-3xl font-bold uppercase text-white mb-3"
      >
        Page Not Found
      </h2>
      <p className="text-gray-400 mb-8 max-w-sm">
        This route doesn&apos;t exist. Get back to the gym.
      </p>
      <Link
        href="/"
        className="bg-[#ccff00] text-black font-bold px-6 py-3 rounded-full text-sm uppercase hover:opacity-90 transition"
      >
        💪 Back to Library
      </Link>
    </div>
  );
}
