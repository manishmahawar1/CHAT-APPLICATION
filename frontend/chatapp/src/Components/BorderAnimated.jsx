import React from 'react'

const BorderAnimated = ({children}) => {
    return (
        <div className="w-full h-full rounded-2xl border border-transparent animate-border flex overflow-hidden
[background:linear-gradient(45deg,#172033,#1e293b_50%,#172033)_padding-box,
conic-gradient(from_var(--border-angle),#334155_80%,#06b6d4_86%,#67e8f9_90%,#06b6d4_94%,#334155)_border-box]">{children}</div>
    )
}

export default BorderAnimated
