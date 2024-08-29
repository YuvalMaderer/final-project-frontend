import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

function AddTitlePage() {
  const [text, setText] = useState("");

  return (
    <div className="h-screen flex justify-center mt-40">
      <div className="max-w-[700px] w-full space-y-6">
        <div className="pl-2 space-y-2">
          <h1 className="text-4xl font-[500]">
            Now, let's give your cabin a title
          </h1>
          <p className="text-lg text-[#9d9d9d]">
            Short titles work best. Have fun with it—you can always change it
            later.
          </p>
        </div>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={32}
      
          className="w-full"
        />
        <div className=" text-sm text-gray-500 font-600">
          {text.length}/32 
        </div>
      </div>
    </div>
  );
}

export default AddTitlePage;
