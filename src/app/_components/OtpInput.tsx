import { useEffect, useRef, useState } from "react";

interface VerifyProps {
  length?: number;
  email: string;
  onOtpSubmit: (otp: string) => void;
}

export default function Verify({
  length = 8,
  email,
  onOtpSubmit,
}: VerifyProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [hashEmail, setHashEmail] = useState("");

  useEffect(() => {
    if (email) {
      const [localPart, domainPart] = email.split("@");
      const hashLocalPart = localPart.slice(0, email.indexOf("@") - 3) + "***";
      const hashedEmail = hashLocalPart + "@" + domainPart;
      setHashEmail(hashedEmail);
    }
  }, []);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index: number) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    const combinedOtp = otp.join("");
    if (combinedOtp.length === length) {
      onOtpSubmit(combinedOtp);
    }
  };

  return (
    <main className="my-8 flex justify-center px-4 lg:px-0">
      <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl rounded-xl border-2 border-gray-300 py-8 px-6 lg:px-10 xl:px-12">
        <h1 className="text-center text-xl font-bold">Verify your email</h1>

        <p className="mt-4 text-center text-xs sm:text-sm font-semibold">
          Enter the {length}-digit code you have received on{" "}
          {hashEmail ? hashEmail : <span>your email</span>}
        </p>

        <div className="mt-6 flex justify-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              ref={(input) =>
                (inputRefs.current[index] = input as HTMLInputElement)
              }
              value={digit}
              onChange={(e) => handleChange(index, e)}
              onClick={() => handleClick(index)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-10 sm:w-10 rounded-md border border-gray-300 p-2 text-center text-sm"
            />
          ))}
        </div>

        <button
          className="mt-6 w-full rounded-md bg-black p-2 text-sm text-white hover:bg-gray-900"
          onClick={handleSubmit}
        >
          VERIFY
        </button>
      </div>
    </main>
  );
}
