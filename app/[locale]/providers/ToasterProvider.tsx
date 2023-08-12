'use client';

// import { Toaster } from "react-hot-toast";
import { Toaster } from 'sonner';


const ToasterProvider = () => {
  return ( 
    <Toaster position='top-center'richColors closeButton />
   );
}
 
export default ToasterProvider;
