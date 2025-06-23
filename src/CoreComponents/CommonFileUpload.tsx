import { GalleryAdd } from "iconsax-react";
import { FC, Fragment, useState } from "react";
import Dropzone from "react-dropzone";

const CommonFileUpload: FC<{ multiple?: boolean }> = ({ multiple }) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const onDrop = (acceptedFiles: File[]) => setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  const removeFile = (indexToRemove: number) => setUploadedFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
  return (
    <Fragment>
      {uploadedFiles.length === 0 ? (
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="dropzone-container">
              <input {...getInputProps()} />
              <div className="dz-message needsclick">
                <GalleryAdd color="#cca270" variant="Bulk"/>
                <h5>Image upload</h5>
              </div>
            </div>
          )}
        </Dropzone>
      ) : (
        <Fragment>
          {multiple && (
            <Dropzone onDrop={onDrop}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="add-more-files-zone">
                  <input {...getInputProps()} />
                  <p>Click or drag more files to add</p>
                </div>
              )}
            </Dropzone>
          )}

          <div className="uploaded-files">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="file-card">
                {file.type.startsWith("image/") ? <img src={URL.createObjectURL(file)} alt={file.name} className="file-thumbnail" /> : <div className="file-placeholder">{file.name.split(".").pop()?.toUpperCase()} File</div>}
                <p className="file-name">{file.name}</p>
                <button onClick={() => removeFile(index)} className="remove-button" title="Remove file">
                  ×
                </button>
              </div>
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CommonFileUpload;
