"use client";
import { AuthGuard } from "@/components/AuthGuard";
import ResumeCard from "@/components/ResumeCard";
import { usePuterStore } from "@/lib/puter";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import resumeLoading from "@/public/images/resume-scan-2.gif";
import Link from "next/link";

function Home() {
  const { kv } = usePuterStore();
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      const resume = (await kv.list("resume:*", true)) as KVItem[];
      const parsedResumes = resume?.map(
        (item) => JSON.parse(item.value) as Resume
      );
      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };
    loadResumes();
  }, []);

  return (
    <AuthGuard>
      <section className="main-section">
        <div className="page-heading md:py-16">
          <h1>Track Your Application & Resume Ratings</h1>
          {!loadingResumes && resumes.length === 0 ? (
            <h2 className="text-gray-500">
              No resumes found. Upload your resume to get started!
            </h2>
          ) : (
            <h2>Review your submission and check AI-powered feedback</h2>
          )}
        </div>
        {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <Image
              src={resumeLoading}
              alt="Loading resumes"
              className="w-[200px]"
            />
          </div>
        )}
        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((items) => (
              <ResumeCard key={items.id} resume={items} />
            ))}
          </div>
        )}
        {!loadingResumes && resumes.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link
              href={"/upload"}
              className="primary-button w-fit text-xl font-semibold "
            >
              Upload your resume now
            </Link>
          </div>
        )}
      </section>
    </AuthGuard>
  );
}

export default Home;
