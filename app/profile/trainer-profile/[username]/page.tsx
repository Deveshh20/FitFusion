"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/app/ui/sidebar";
import {
  IconArrowLeft,
  IconSettings,
  IconUserBolt,
  IconCalendar,
  IconMessage,
  IconChartLine,
  IconBell, // Changed from IconDumbbell to IconBell
  IconApple,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import logo from '@/app/asset/logo.png';
import { cn } from "@/app/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SidebarDemo() {
  const router = useRouter();
  const pathname = usePathname();
  const username = pathname.split("/").pop(); // Extract username from pathname

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/");
    } catch (error: any) {
      console.log(error.message);
      toast.error("Logout failed");
    }
  };

  const links = [
    {
      label: "Clients",
      href: "#",
      icon: <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      onClick: async () => { // Changed to async function
        if (username) {
          await router.push(`/clients/${username}`);
        } else {
          toast.error("Username not found");
        }
      }
    },
    {
      label: "Schedule",
      href: "#",
      icon: <IconCalendar className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Workout Plans",
      href: "#",
      icon: <IconBell className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Diet Plans",
      href: "#",
      icon: <IconApple className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Progress",
      href: "#",
      icon: <IconChartLine className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Messages",
      href: "#",
      icon: <IconMessage className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Profile",
      href: "#",
      icon: <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Logout",
      href: "#",
      icon: <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
      onClick: async () => { // Changed to async function
        try {
          await axios.get("/api/users/logout");
          toast.success("Logout successful");
          router.push("/");
        } catch (error: any) {
          console.log(error.message);
          toast.error("Logout failed");
        }
      },
    },
  ];
  

  const [open, setOpen] = useState(false);

  return (
    <div className={cn("rounded-xl shadow-lg flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-[90vw] mt-10 flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden", "h-[90vh]")}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Devesh",
                href: "#",
                icon: <Image src="" className="h-7 w-7 flex-shrink-0 rounded-full" width={50} height={50} alt="Avatar" />,
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}

const Logo = () => (
  <Link href="#" className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
    <Image src={logo} width={50} height={50} alt="logo" />
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium text-lg text-black dark:text-white whitespace-pre">
      FitFusion
    </motion.span>
  </Link>
);

const LogoIcon = () => (
  <Link href="#" className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
    <Image src={logo} width={50} height={50} alt="logo" />
  </Link>
);

const Dashboard = () => {
  const dummyData = {
    overview: "This is an overview of your activities and progress.",
    clients: [
      { name: "John Doe", status: "Active" },
      { name: "Jane Smith", status: "Inactive" },
      { name: "Chris Johnson", status: "Active" },
    ],
    schedule: [
      { date: "2024-07-25", event: "Morning Workout" },
      { date: "2024-07-26", event: "Client Meeting" },
      { date: "2024-07-27", event: "Yoga Session" },
    ],
    messages: [
      { from: "John Doe", content: "Hey, I need to reschedule our session." },
      { from: "Jane Smith", content: "Can you send me the workout plan?" },
    ],
    workoutPlans: [
      { plan: "Beginner Plan", duration: "4 weeks" },
      { plan: "Advanced Plan", duration: "8 weeks" },
    ],
    dietPlans: [
      { plan: "Keto Diet", duration: "4 weeks" },
      { plan: "Vegan Diet", duration: "6 weeks" },
    ],
    progressTracking: "You have made significant progress in the last month.",
  };

  return (
    <div className="flex flex-1 ">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="grid grid-cols-3 gap-4 h-[900px]">
          <div className="col-span-3 bg-gray-100 dark:bg-neutral-800 p-4 rounded-lg text-red-800">
            <h2>Overview</h2>
            <p>{dummyData.overview}</p>
          </div>
          <div className="col-span-1 bg-gray-100  dark:bg-neutral-800 p-4 rounded-lg text-red-800">
            <h2>Clients</h2>
            <ul>
              {dummyData.clients.map((client, index) => (
                <li key={index}>{client.name} - {client.status}</li>
              ))}
            </ul>
          </div>
          <div className="col-span-1 bg-gray-100 dark:bg-neutral-800 p-4 rounded-lg text-red-800">
            <h2>Schedule</h2>
            <ul>
              {dummyData.schedule.map((item, index) => (
                <li key={index}>{item.date} - {item.event}</li>
              ))}
            </ul>
          </div>
          <div className="col-span-1 bg-gray-100 dark:bg-neutral-800 p-4 rounded-lg text-red-800">
            <h2>Messages</h2>
            <ul>
              {dummyData.messages.map((message, index) => (
                <li key={index}><strong>{message.from}:</strong> {message.content}</li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 bg-gray-100 dark:bg-neutral-800 p-4 rounded-lg text-red-800">
            <h2>Workout Plans</h2>
            <ul>
              {dummyData.workoutPlans.map((plan, index) => (
                <li key={index}>{plan.plan} - {plan.duration}</li>
              ))}
            </ul>
          </div>
          <div className="col-span-1 bg-gray-100 dark:bg-neutral-800 p-4 rounded-lg text-red-800">
            <h2>Diet Plans</h2>
            <ul>
              {dummyData.dietPlans.map((plan, index) => (
                <li key={index}>{plan.plan} - {plan.duration}</li>
              ))}
            </ul>
          </div>
          <div className="col-span-3 bg-gray-100 dark:bg-neutral-800 p-4 rounded-lg text-red-800">
            <h2>Progress Tracking</h2>
            <p>{dummyData.progressTracking}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
