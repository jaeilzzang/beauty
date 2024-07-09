"use client";

import React, { forwardRef } from "react";
import styles from "./input-field.module.scss";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, name, onChange, ...props }, ref) => {
    return (
      <div className={styles.input_form}>
        <label className={styles.label}>
          {label}
          <input
            className={styles.input}
            name={name}
            ref={ref}
            onChange={onChange}
            {...props}
          />
        </label>
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
