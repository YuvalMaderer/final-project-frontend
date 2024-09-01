import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function ReceiptPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    setSearchParams({ step: "receipt" });
  }, []);
  return <div>ReceiptPage</div>;
}

export default ReceiptPage;
