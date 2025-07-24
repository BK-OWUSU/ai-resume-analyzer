import { prepareInstructions } from '../../constants/index';
import { convertPdfToImage } from 'lib/pdfToImage';
import { usePuterStore } from 'lib/puter';
import { generateUUID } from 'lib/utils';
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router';
import FileUploader from '~/components/FileUploader';
import Navbar from '~/components/Navbar'

interface ResumeProps {
    companyName: string,
    jobTitle: string,
    jobDescription: string,
    file: File
}

const upload = () => {
    const {auth, isLoading, fs, ai, kv} = usePuterStore();
    const navigate = useNavigate();
    const[isProcessing, setIsProcessing] = useState(false);
    const[statusText, setStatusText] = useState("");
    const [file, setFile] = useState<File | null>(null)

    const handleAnalyze = async({companyName, jobTitle, jobDescription, file}: ResumeProps) => {
        setIsProcessing(true);
        setStatusText("Uploading the file...");
        //Uploading pdf
        const uploadedFile = await fs.upload([file]);
        //If there is no uploaded file
        if (!uploadedFile) return setStatusText("Error: Failed to upload file")
        setStatusText("Converting to image...")
        //Converting pdf to image
        const imageFile = await convertPdfToImage(file);
        //if there is no image file
        if (!imageFile) return setStatusText("Error: ailed to convert PDF to Image");
        //Uploading the image
        setStatusText("Uploading the image");
        const uploadedImage = await fs.upload([imageFile.file])
        //if there is no uploaded image file
        if (!uploadedImage) return setStatusText("Error: Failed to upload image");
        //Generating random UUID
        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle , jobDescription,
            feedback: '',
        }
        //save data
        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        //Analyzing
        setStatusText("Analyzing...")
        //ai
        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({jobTitle,jobDescription}),
            true
        )
        //if analysis fail
        if(!feedback) return setStatusText("Error: Failed to analyze resume");
        const feedbackText = typeof feedback.message.content === 'string' 
        ? feedback.message.content
        : feedback.message.content[0].text
        console.log("🧾 Raw feedbackText:", feedbackText);
        //Set the feedback to the data
        data.feedback = JSON.parse(feedbackText)
        //save data
        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        setStatusText("Analysis complete, redirecting")
        //Redirecting
        navigate(`/resume/${uuid}`);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form') ;
        if (!form) return;
        const formData = new FormData(form)
        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;
        if (!file) return;
        handleAnalyze({companyName,jobTitle,jobDescription, file})
    }

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }
  return (
     <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar/>
      {/* Hero section */}
        <section className="main-section">
            <div className="page-heading py-16">
                <h1>Smart Feedback For Dream Work</h1>
                {isProcessing ? 
                    (<div>
                        <h2>{statusText}</h2>
                        <img src="/images/resume-scan.gif" alt="Uploading image" className='w-full' />
                    </div>) : 
                    (<h2>Drop your resume for and ATS score and improvement tips</h2>)
                }
                {
                    !isProcessing && (
                        <form id='upload-form' onSubmit={handleSubmit} className='flex flex-col gap-4 mt-8'>
                            <div className="form-div">
                                <label htmlFor="company-name">Company Name</label>
                                <input id='company-name' type="text" name="company-name" placeholder="Company name" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-title">Job Title</label>
                                <input id='job-title' type="text" name="job-title" placeholder="Job Title" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-description">Job Description</label>
                                <textarea id='job-description' rows={5} name="job-description" placeholder="Job Description" />
                            </div>
                             <div className="form-div">
                                <label htmlFor="uploader">Upload Resume</label>
                                <FileUploader onFileSelect={handleFileSelect}/>
                            </div>
                            <button type='submit' className='primary-button'>Analyze Resume</button>
                        </form>
                    )
                }
            </div>
        </section>
      </main>
  )
}

export default upload