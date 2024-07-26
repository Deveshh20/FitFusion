import Image from "next/image";
import Link from 'next/link'
import logo from '@/app/asset/logo.png'
import homeimg from '@/app/asset/homeimg.png'
import { FlipWords } from "./ui/FlipWords";
export default function Home() {
    const words = ["strong", "healthy", "fit", "powerful", "balanced"]
  return (
    <div>
      {/* Navbar */}
        <nav>
        <div className="absolute flex items-center h-fit justify-between w-screen top-0 text-stone-900">
            <ul className="flex items-center ml-20 gap-x-8">
                <li className="flex items-center">
                    <Image src={logo} alt="logo" className="w-16 mr-[-0.6rem]" />
                    <h1 className="text-xl font-bold">FitFusion</h1>
                </li>
                <li>
                    <Link href='/' className="text-neutral-600 hover:text-stone-900">Workout Plan</Link>
                </li>
                <li>
                    <Link href='/' className="text-neutral-600 hover:text-stone-900">Diet Plan</Link>
                </li>
            </ul>
            <ul className="flex gap-x-4 mr-20">
                <li>
                    <Link href='/login' className="relative group text-lg text-neutral-600 hover:text-stone-900">
                        Login
                        <div className="absolute w-full h-[2px] bg-stone-900 bottom-[-5px] left-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
                    </Link>
                </li>
                <li>
                    <Link href='/signup' className="relative group text-lg text-neutral-600 hover:text-stone-900">
                        SignUp
                        <div className="absolute w-full h-[2px] bg-stone-900 bottom-[-5px] left-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
                    </Link>
                </li>
            </ul>
        </div>
        </nav>
        {/* Home */}
        <div className="flex justify-between w-screen">
        <div className="h-[40rem] flex pl-24 pt-10 justify-center flex-col items-start px-4">
      <div className="text-5xl font-normal text-neutral-600 dark:text-neutral-400">
        Achieve 
        <FlipWords words={words} /> <br />
        fitness goals with FitFusion
      </div>
      <div>
      <p className='text-neutral-600 text-lg mt-4 font-semibold '>Streamline your fitness journey—hire a trainer or find clients with ease.</p>
      <button className="text-neutral-100 font-semibold px-4 py-3 hover:shadow-2xl rounded-lg mt-6 w-[170px] bg-stone-900">Get Started!</button>
      </div>
    </div>
        <Image src={homeimg} width={600} alt="homeimg" className="mt-14 mr-10 "/>
        </div>
    </div>
  );
}
