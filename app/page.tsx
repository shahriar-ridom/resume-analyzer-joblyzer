import { AuthGuard } from "@/components/AuthGuard";
import ResumeCard from "@/components/ResumeCard";
import { resumes } from "@/constants/page";

function Home() {
  return (
    <AuthGuard>
        <section className="main-section">
          <div className="page-heading md:py-16">
            <h1>Track Your Application & Resume Ratings</h1>
            <h2>Review your submission and check AI-powered feedback</h2>
          </div>
          {resumes.length > 0 && (
            <div className="resumes-section">
              {resumes.map((resume) => (
                <ResumeCard key={resume.id} resume={resume} />
              ))}
            </div>
          )}
        </section>
    </AuthGuard>
  );
}

export default Home;
