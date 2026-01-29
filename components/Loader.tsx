import { TbLoader3 } from "react-icons/tb";

export const Loader = () => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="flex flex-col items-center gap-3">
        <TbLoader3 className="animate-spin text-amber-600" size={32} />
        <p className="text-sm text-gray-500">Memuat...</p>
      </div>
    </div>
  )
}
