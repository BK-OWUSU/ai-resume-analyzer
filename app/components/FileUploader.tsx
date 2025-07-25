import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { formatSize } from 'lib/utils'

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void
}

const FileUploader = ({onFileSelect}: FileUploaderProps) => {
 const [selectedFile, setSelectedFile] = useState<File | null>(null)   
 const onDrop = useCallback((acceptedFiles: File[]) => {
   const file = acceptedFiles[0] || null;
   setSelectedFile(file)
   onFileSelect?.(file);
  }, [onFileSelect])

  const maxFileSize =  20 * 1024 * 1024  //this is 20 MB

  const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
    onDrop,
    multiple: false,
    accept: {'application/pdf':['.pdf']},
    maxSize: maxFileSize
})

  const handleRemove = () => {
    setSelectedFile(null)
    onFileSelect?.(null)
  }

  return (
    <div className="w-full gradient-border">
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className="space-y-4 cursor-pointer">
                {
                    selectedFile ? (
                        <div onClick={(e)=> e.stopPropagation()} className="uploader-selected-file">
                            <div className='flex items-center space-x-3'>
                            <img src="/images/pdf.png" alt="uploaded pdf"  className='size-10'/>
                            <div>
                                <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                                {selectedFile.name}
                            </p>
                            <p className="text-sm text-gray-500">
                                {formatSize(selectedFile.size)}
                            </p>
                            </div>
                        </div>
                         <button className='p-2 cursor-pointer bg-gray-200 rounded-xl'  onClick={(e)=> {
                            e.stopPropagation();
                            handleRemove();
                         }}>
                            <img src="/icons/cross.svg" alt="remove" className='w-4 h-4'/>
                         </button>
                        </div>
                    ) : (
                    <div>
                         <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
                            <img src="/icons/info.svg" alt="upload Image" className="size-20" />
                        </div>
                        <p className="text-lg text-gray-500">
                            <span className='font-semibold'>Click to upload</span> or Drag and Drop
                        </p>
                        <p className="text-lg text-gray-500">PDF (max {formatSize(maxFileSize)})</p>
                    </div>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default FileUploader