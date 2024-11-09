import React from "react"

const Button = ({ children }: { children: React.ReactNode}) => {
  return (
    <button className="relative py-2 px-3 rounded-lg font-medium text-sm bg-gradient-to-b from-[#190d2e] to-[#4a208a] shadow-[0px_0px_12px_#8c45ff]">
        <div className="absolute inset-0">
        <div className="rounded-lg border border-white/20 absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transperant)]"></div>
        <div className="rounded-lg border absolute inset-0 border-white/40 [mask-image:linear-gradient(to_top,black,transperant)]"></div>
        <div className="rounded-lg absolute shadow-[0px_0px_10px_rgb(140,69,225,.7)_inset]"></div>
        </div>
        <span className="">{children}</span>
    </button>
  )
}

export default Button