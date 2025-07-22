import React, { useState, type FormEvent } from 'react'
import FileUploader from '~/components/FileUploader';
import Navbar from '~/components/Navbar'

const upload = () => {
    const[isProcessing, setIsProcessing] = useState(false);
    const[statusText, setStatusText] = useState("");
    const [file, setFile] = useState<File | null>()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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