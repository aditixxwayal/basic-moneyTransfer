/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
export default function InputBox({label, placeholder, value, onChange}) {
    return <div>
      <div className="text-sm font-medium text-left py-2">
        {label}
      </div>
      <input placeholder={placeholder} value={value} onChange={onChange} className="w-full px-2 py-1 border rounded border-slate-200" />
    </div>
}