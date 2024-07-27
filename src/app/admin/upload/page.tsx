"use client";

import PageHeader from "@/components/molecules/header/page-header";
import InputField from "@/components/molecules/form/input-field";

import styles from "./upload.module.scss";
import { ChangeEvent, MouseEvent, useState } from "react";
import Image from "next/image";
import Button from "@/components/atoms/button";

const imageUploadLength = 6;

const UploadTestPage = () => {
  const [preview, setPreview] = useState<Array<string | undefined>>([]);

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!files) return;

    const fileList = Array.from(files).slice(0, 6 - preview.length);

    fileList.forEach((file) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const result = fileReader.result as string;
        setPreview((prev) => {
          return prev.concat(result);
        });
      };

      fileReader.readAsDataURL(file);
    });
  };

  const handleDeletePreview = (e: MouseEvent<HTMLDivElement>, i: number) => {
    e.preventDefault();

    setPreview((prev) => prev.filter((e, idx) => i !== idx));
  };

  return (
    <main>
      <PageHeader name="Upload Test" />

      <form className={styles.form}>
        <InputField label={"name"} name={"name"} />
        <InputField label={"sugeries"} name={"sugeries"} />

        <div className={styles.title}>
          <h2>image 등록</h2>
          <p>
            등록 {preview.length}/{imageUploadLength}
          </p>
        </div>

        <div className={styles.img_wrapper}>
          {Array.from({ length: imageUploadLength }, (v, i) => {
            return (
              <div className={styles.img_box} key={i}>
                <label className={styles.img_label} htmlFor={`img`}>
                  {preview[i] ? (
                    <div
                      className={styles.delete_btn}
                      onClick={(e) => handleDeletePreview(e, i)}
                    >
                      삭제
                    </div>
                  ) : (
                    "이미지 업로드"
                  )}
                </label>

                {preview[i] ? (
                  <Image
                    src={preview[i]}
                    alt={`preview-${i}`}
                    fill
                    className={styles.img_preview}
                  />
                ) : (
                  <input
                    id={"img"}
                    multiple
                    accept="image/*"
                    className={styles.img}
                    type="file"
                    onChange={handleUpload}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className={styles.btn_group}>
          <Button color="red">cancel</Button>
          <Button color="blue">register</Button>
        </div>
      </form>
    </main>
  );
};

export default UploadTestPage;
