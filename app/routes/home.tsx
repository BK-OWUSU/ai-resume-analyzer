import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { ResumeCard } from "~/components/ResumeCard";
import { usePuterStore } from "lib/puter"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resunalyzer" },
    { name: "description", content: "Smart feedback for your dream job resume" },
  ];
}

export default function Home() {

  const {auth, kv} = usePuterStore();
  const [resumes, setResumes] = useState<Resume[]>([])
  const [isLoading,setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate();

  useEffect(()=> {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  },[auth.isAuthenticated])

  useEffect(()=> {
    const loadResumes = async()=> {
      setIsLoading(true)
      const resumes = (await kv.list('resume:*', true)) as KVItem[];
      const parseResume = resumes?.map((resume)=>(
        JSON.parse(resume.value) as Resume
      ))
      setResumes(parseResume || []);
      setIsLoading(false)
    }
    loadResumes();
  },[])
  

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar/>
      {/* Hero section */}
      <section className="main-section">
        <div className="page-heading py-16 ">
          <h1>Track Your Application & Resume Ratings</h1>
          {!isLoading && resumes.length === 0 ? (
            <h2>No resume found. Upload your first resume to get feedback</h2>
          ):(
            <h2>Review your submissions and check Ai powered feedback</h2>
          )}
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" alt="resume scan" className="w-[200px]" />
          </div>
        )}
    

        {/* Application section */}
        {!isLoading && resumes.length > 0 && (
          <div className="resumes-section ">
            {resumes.map((resume)=> (
              <ResumeCard key={resume.id} resume = {resume} />
            ))}
          </div>  
        )}

        {!isLoading && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link to="/upload" className="primary-button text-xl w-fit font-semibold">
              upload Resume
            </Link>
          </div>
        )}
      </section>
    </main>
  )
}
