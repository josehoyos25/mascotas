"use client";

import Link from 'next/link'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import btnBack from "../../img/btn-back.svg"
import Image from 'next/image';
import Close from "../../components/Close"
import { protectRoutes } from "../../components/Protect"

function page() {

 const [mascota, setMascota] = useState([])
 const {id} = useParams();

 const getMascota = async () => {
    try {
        const respuesta = await axios.get(`http://localhost:3000/api/mascotas/${id}`)
    setMascota(respuesta.data)
    } catch (error) {
        console.log(error);
    }
 }

 useEffect(() => {
    getMascota()
 }, [])

  return (
   <div className='flex justify-center items-center'>
     <div className='bg-back-image bg-cover bg-center md:w-1/4 w-full h-screen flex flex-col p-3 gap-3'>
    <div className='flex h-12 w-full justify-center items-center gap-4' >
    <Link href="/pets">
        <Image
        src={btnBack}
        alt='btn-back'
        />
        </Link>
    <h1 className='text-white text-center w-full text-xl'>Propietario y Municipio</h1>
     <Close/>

    </div>
    <div className='h-64 flex justify-center items-center'>
        <div className='bg-gray-500 rounded-full p-1 w-40 h-40 text-center'>
        <img 
            src={`/img/${mascota.photo}`} 
            alt={mascota.name} 
            className="h-full w-full object-cover rounded-full" />
            </div>
        </div>
            <div className="flex flex-col items-center gap-3">
            <div className=' flex w-full'>
                <div className='  bg-[#ffffff56]  flex items-center justify-start p-2 w-[200px]'><h1 className='font-bold ml-2 text-[#ffffff83]'>Dueño:</h1></div>
                <input className='p-3 w-full bg-[#ffffff82] placeholder:text-[#333a60] rounded-r-lg' 
                readOnly type="text" value={mascota.fk_propietario?.name} />
            </div> 
            <div className=' flex w-full'>
                <div className='  bg-[#ffffff56]  flex items-center justify-start p-2 w-[200px]'><h1 className='font-bold ml-2 text-[#ffffff83]'>Municipio:</h1></div>
                <input className='p-3 w-full bg-[#ffffff82] placeholder:text-[#333a60] rounded-r-lg' 
                readOnly type="text" value={mascota.fk_municipio?.municipio} />
            </div> 
    </div>
 </div>
   </div>
  )
}

export default protectRoutes(page)