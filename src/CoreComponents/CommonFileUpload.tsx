import { Post } from "@/Api";
import Delete from "@/Api/Delete";
import { Url_Keys } from "@/Constant";
import { CommonFileUploadProps } from "@/Types/CoreComponents";
import { Toaster } from "@/Utils/ToastNotification";
import { GalleryAdd } from "iconsax-react";
import { FC, Fragment } from "react";
import Dropzone from "react-dropzone";

const CommonFileUpload: FC<CommonFileUploadProps> = ({ multiple, errors, setValue, setPhoto, uploadedFiles = [], setUploadedFiles, photo }) => {
  const normalizedPhoto: string[] = Array.isArray(photo) ? photo : photo ? [photo] : [];

  const onDrop = async (acceptedFiles: File[]) => {
    const updatedFiles = multiple ? [...uploadedFiles, ...acceptedFiles] : acceptedFiles;

    const uploadedPhotoURLs: string[] = [];

    for (const file of acceptedFiles) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const result = await Post(Url_Keys.Upload.Upload, formData);
        uploadedPhotoURLs.push(result.data as string);
      } catch {
        Toaster("error", "Image upload failed.");
        return;
      }
    }

    const newPhotos = multiple ? [...normalizedPhoto, ...uploadedPhotoURLs] : uploadedPhotoURLs;

    setPhoto?.(multiple ? newPhotos : newPhotos[0]);

    setUploadedFiles?.(updatedFiles);
    setValue?.("image",  updatedFiles);
  };

  const removeFile = async (indexToRemove: number) => {
    const updatedFiles = uploadedFiles.filter((_, index) => index !== indexToRemove);
    const updatedPhoto = normalizedPhoto.filter((_, index) => index !== indexToRemove);

    try {
      const toDelete = normalizedPhoto[indexToRemove];
      // await Delete(`${Url_Keys.Upload.Delete}/${toDelete}`);
      setUploadedFiles?.(updatedFiles);
      setValue?.("image", multiple ? updatedFiles : updatedFiles[0]);
      setPhoto?.(updatedPhoto);
    } catch {
      Toaster("error", "Failed to delete image");
    }
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
            {uploadedFiles.map((file: any, index) => {
              const isURL = typeof file === "string" || file.preview;
              const imageSrc = isURL ? file.preview || file : URL.createObjectURL(file);

              return (
                <div key={index} className="file-card">
                  <img src={imageSrc} alt={file.name || `image-${index}`} className="file-thumbnail" />
                  <button onClick={() => removeFile(index)} className="remove-button" title="Remove file">
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        </Fragment>
      )}
      {errors?.image && <p className="text-danger">{errors.image.message}</p>}
    </Fragment>
  );
};

export default CommonFileUpload;
