import { notFound } from "next/navigation";
import { LessonRunner } from "@/components/LessonRunner";
import { LESSONS } from "@/lib/content";

export function generateStaticParams() {
  return LESSONS.map((l) => ({ slug: l.slug }));
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = LESSONS.find((l) => l.slug === slug);
  if (!lesson) notFound();
  return <LessonRunner key={lesson.slug} slug={lesson.slug} />;
}