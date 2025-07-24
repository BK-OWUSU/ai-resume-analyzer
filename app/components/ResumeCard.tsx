import { Link } from "react-router"
import ScoreCircle from "./ScoreCircle"
import { useEffect, useState } from "react";
import { usePuterStore } from "lib/puter";


export const ResumeCard = ({resume: {id, companyName, jobTitle, feedback,imagePath}}: {resume: Resume}) => {
     const { fs} = usePuterStore();
      const [resumeUrl, setResumeUrl] = useState('')
     useEffect(()=> {
    const loadResume = async() => {
      const resumeBlob = await fs.read(imagePath);
      if (!resumeBlob) return;
      let url = URL.createObjectURL(resumeBlob);
      setResumeUrl(url)

    }
    loadResume();
  },[imagePath]);
  return (
    <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000">
        <div className="resume-card-header"> 
            <div className="flex flex-col gap-2">
                {companyName && <h2 className=" !text-black font-bold break-words">{companyName}</h2>}
                {jobTitle && <h3 className=" text-lg break-words text-gray-500">{jobTitle}</h3>}
                {!companyName && !jobTitle && <h2 className=" !text-black font-bold break-words">Resume</h2>}
            </div>
            <div className="flex-shrink-0">
                <ScoreCircle score={feedback.overallScore}/> 
            </div>
        </div>
        {/* uploaded image of resume */}
        {resumeUrl && (
            <div className="gradient-border animate-in fade-in duration-1000">
             <div className="w-full h-full">
                <img src={resumeUrl}
                    alt="Resume Image"
                    className="w-full h-[350px] max-sm:h-[200px] object-cover"
                />
             </div>
        </div>
        )}
    </Link>
  )
}
