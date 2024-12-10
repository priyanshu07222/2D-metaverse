import axios from "axios";
import { useRef, useState } from "react"

export const CreateMap = () => {
  const thumbnailRef = useRef(null);
  const [name, setName] = useState("");
  const [width, setWidth] = useState<Number>(0);
  const [height, setHeight] = useState<Number>(0);
  const [arrayElement, setArrayElement] = useState([]);

  const createMap = async () => {
    const response = await axios.post('http://localhost:3000/api/v1/admin/map', {}, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } })
  }
  return (
    <div>
      <h3 className="text-xl font-semibold">Create a map</h3>
      <div className="flex flex-col gap-2 max-w-screen-sm mx-auto">
        <input type="file" ref={thumbnailRef} />
        <input type="text" onChange={(e) => setName(e.target.value)} className="border outline-none border-gray-300 rounded-lg p-2" placeholder="Map name" />
        <input onChange={(e) => setWidth(Number(e.target.value))} type="number" className='border outline-none border-gray-300 w-20 p-2 rounded-lg' />
        <input onChange={(e) => setHeight(Number(e.target.value))} type="number" className='border outline-none border-gray-300 w-20 p-2 rounded-lg' />
        <button onClick={createMap} className="bg-black text-white p-2 rounded-lg">Submit</button>
      </div>
    </div>
  )
}
