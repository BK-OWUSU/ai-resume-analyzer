// import { cn } from "lib/utils"

interface Suggestion {
    type: "good" | "improve"
    tip: string 
}
interface ATSProps {
    score: number
    suggestions:Suggestion[]
}

const ATS: React.FC<ATSProps> = ({score, suggestions}) => {
    const gradientClass = score > 69 ? 'from-green-100': score > 49 ? 'from-yellow-100' :'from-red-100';
    const iconSrc = score > 69 ? '/icons/ats-good.svg': score > 49 ? '/icons/warning.svg' :'/icons/ats-bad.svg';
    const subTitle = score > 69 ? 'Great Job': score > 49 ? 'Good Start' :'Needs Improvement';

  return (
   <div className={`bg-gradient-to-b ${gradientClass} to-white rounded-2xl shadow-md w-full p-4`}>
    {/*Top section with icons and headline */}
    <div className="flex items-center gap-4 mb-6">
        <img src={iconSrc} alt="ATS Score Icon" className="w-12 h-12" />
        <div><h2 className="text-2xl font-bold">ATS Score - {score}/100</h2></div>
    </div>

    {/* Description */}
    <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">{subTitle}</h3>
        <p className="text-gray-600 mb-4">This score represents how well your resume is likely to perform in Applicant Tracking</p>
        {/* Suggestion List */}
        <div className="space-y-3">
            {suggestions.map((sug, index)=>(
                <div key={index} className="flex items-start gap-3">
                    <img src={sug.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"} 
                         alt={sug.type === "good" ? "Check": "Warning"}
                         className="w-5 h-5 mt-1" 
                    />
                    <p className={sug.type === "good" ? "text-green-700" : "text-amber-700"}> {sug.tip}</p>
                </div>
            ))}
        </div>
    </div>

    {/* Closing encouragement */}
    <p className="text-gray-700 italic">Keep refining your resume to improve your chances if getting past ATS filters and into the hands of recruiters</p>    
   </div>
  );
};

export default ATS;