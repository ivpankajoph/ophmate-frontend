"use client";

import { JSX } from "react";
import { useSelector } from "react-redux";

import { Leaf, Users, Award, Heart } from "lucide-react";
import { useTemplateVariant } from "@/app/template/components/useTemplateVariant";

// map icon names from API to actual icons
const iconMap: Record<string, JSX.Element> = {
  leaf: <Leaf size={40} />,
  users: <Users size={40} />,
  award: <Award size={40} />,
  heart: <Heart size={40} />,
};

export default function AboutPage() {
  const variant = useTemplateVariant();
  const { aboutpage, previewImage, loading, error } = useSelector(
    (state: any) => ({
      aboutpage: state.alltemplatepage?.data?.components?.about_page,
      previewImage: state.alltemplatepage?.data?.previewImage,
      loading: state.alltemplatepage?.loading,
      error: state.alltemplatepage?.error,
    })
  );
  console.log("asdsadsa", aboutpage);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  if (!aboutpage) {
    return (
      <>
        <h1>Work in progress </h1>
      </>
    );
  }

  const { hero, story, values, team, stats } = aboutpage;

  if (variant.key === "studio") {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                Our Studio
              </p>
              <h1 className="mt-4 text-5xl font-semibold">{hero?.title}</h1>
              <p className="mt-4 text-lg text-slate-300">{hero?.subtitle}</p>
            </div>
            <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70">
              {hero?.backgroundImage ? (
                <img
                  src={hero.backgroundImage}
                  alt="Studio hero"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-72 items-center justify-center text-xs uppercase tracking-[0.4em] text-slate-500">
                  Hero Image
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
              <h2 className="text-3xl font-semibold">{story?.heading}</h2>
              <div className="mt-4 space-y-4 text-slate-300">
                {story?.paragraphs?.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
              {story?.image ? (
                <img
                  src={story.image}
                  alt="Story"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full min-h-[260px] items-center justify-center text-xs uppercase tracking-[0.4em] text-slate-500">
                  Story Image
                </div>
              )}
            </div>
          </div>
        </section>

        {values?.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 pb-16">
            <h2 className="text-3xl font-semibold">Values & Culture</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value: any, index: number) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
                >
                  <div className="mb-4 text-slate-200">
                    {iconMap[value.icon] || <Leaf size={32} />}
                  </div>
                  <h3 className="text-lg font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {team?.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 pb-16">
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl font-semibold">The Team</h2>
                <p className="mt-2 text-sm text-slate-400">
                  The people behind the storefront.
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {team.map((member: any, index: number) => (
                <div
                  key={index}
                  className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 text-center"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="mx-auto h-36 w-36 rounded-2xl object-cover"
                  />
                  <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
                  <p className="mt-1 text-sm text-slate-400">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {stats?.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 pb-16">
            <div className="grid gap-6 md:grid-cols-3">
              {stats.map((item: any, i: number) => (
                <div
                  key={i}
                  className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6"
                >
                  <p className="text-4xl font-semibold">{item.value}</p>
                  <p className="mt-2 text-sm text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  if (variant.key === "minimal") {
    return (
      <div className="min-h-screen bg-[#f5f5f7] text-slate-900">
        <section className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
            About the brand
          </p>
          <h1 className="mt-4 text-5xl font-semibold">{hero?.title}</h1>
          <p className="mt-4 text-lg text-slate-600">{hero?.subtitle}</p>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-start">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
              {story?.image ? (
                <img
                  src={story.image}
                  alt="Story"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-72 items-center justify-center text-xs uppercase tracking-[0.4em] text-slate-400">
                  Story Image
                </div>
              )}
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-8">
              <h2 className="text-3xl font-semibold">{story?.heading}</h2>
              <div className="mt-4 space-y-4 text-slate-600">
                {story?.paragraphs?.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {values?.length > 0 && (
          <section className="mx-auto max-w-6xl px-6 pb-16">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value: any, index: number) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <div className="mb-3 text-slate-600">
                    {iconMap[value.icon] || <Leaf size={28} />}
                  </div>
                  <h3 className="text-lg font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {stats?.length > 0 && (
          <section className="mx-auto max-w-6xl px-6 pb-16">
            <div className="grid gap-4 md:grid-cols-3">
              {stats.map((item: any, i: number) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <p className="text-3xl font-semibold">{item.value}</p>
                  <p className="mt-2 text-sm text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(color-mix(in srgb, var(--template-banner-color) 60%, transparent), color-mix(in srgb, var(--template-banner-color) 60%, transparent)), url('${aboutpage.hero?.backgroundImage}')`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-4">
              {hero?.title}
            </h1>
            <p className="text-xl lg:text-2xl">{hero?.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {story?.heading}
            </h2>
            {story?.paragraphs?.map((p: string, i: number) => (
              <p
                key={i}
                className="text-gray-700 text-lg leading-relaxed mb-4"
              >
                {p}
              </p>
            ))}
          </div>
          {story?.image && (
            <div>
              <img
                src={story.image}
                alt="Our story"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>

        {/* Our Values */}
        {values?.length > 0 && (
          <div className="mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-12">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center template-accent-soft template-accent">
                    {iconMap[value.icon] || <Leaf size={40} />}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Our Team */}
        {team?.length > 0 && (
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600 text-lg text-center mb-12">
              The passionate people behind our journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member: any, index: number) => (
                <div key={index} className="text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 mx-auto rounded-full object-cover mb-4 shadow-lg"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="font-medium template-accent">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats Section */}
        {stats?.length > 0 && (
          <div className="mt-20 rounded-2xl p-12 template-accent-gradient">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {stats.map((item: any, i: number) => (
                <div key={i}>
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    {item.value}
                  </div>
                  <div className="text-gray-600 text-lg">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 text-white w-12 h-12 rounded-md shadow-lg flex items-center justify-center transition-all transform hover:scale-105 z-50 template-accent-bg template-accent-bg-hover"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}
