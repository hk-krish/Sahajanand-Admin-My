import { Post } from "@/Api";
import { Url_Keys } from "@/Constant";
import { CommonFileUploadProps } from "@/Types/CoreComponents";
import { Toaster } from "@/Utils/ToastNotification";
import { GalleryAdd } from "iconsax-react";
import { FC, Fragment, useState } from "react";
import Dropzone from "react-dropzone";

const CommonFileUpload: FC<CommonFileUploadProps> = ({ multiple, errors, setValue, setPhoto, uploadedFiles, setUploadedFiles }) => {

  const onDrop = async (acceptedFiles: File[]) => {
    const updatedFiles = multiple ? [...uploadedFiles, ...acceptedFiles] : acceptedFiles;

    for (const file of acceptedFiles) {
      const imageURL = new FormData();
      imageURL.append("image", file);
      try {
        const result = await Post(Url_Keys.Upload.Upload, imageURL);
        setPhoto(result.data as string);
      } catch {
        Toaster("error", "Image upload failed.");
        return;
      }
    }
    setUploadedFiles(updatedFiles);
    setValue("image", updatedFiles);
  };

  const removeFile = (indexToRemove: number) => {
    const updatedFiles = uploadedFiles.filter((_, index) => index !== indexToRemove);
    setUploadedFiles(updatedFiles);
    setValue("image", updatedFiles);
  };

  return (
    <Fragment>
      {uploadedFiles.length === 0 ? (
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="dropzone-container">
              <input {...getInputProps()} />
              <div className="dz-message needsclick">
                <GalleryAdd color="#cca270" variant="Bulk" />
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
      {errors?.image && <p className="text-danger">{errors.image.message}</p>}
    </Fragment>
  );
};

export default CommonFileUpload;
