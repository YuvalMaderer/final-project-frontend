import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function ReceiptPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    setSearchParams({ step: "receipt" });
  }, []);
  return (
    <div className="h-screen">
      <div>
        <div className="pl-2 space-y-2">
          <h1 className="text-4xl font-[500]">Review your listing</h1>
          <p className="text-lg text-[#9d9d9d]">
            Here's what we'll show to guests. Make sure everything looks good.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReceiptPage;
