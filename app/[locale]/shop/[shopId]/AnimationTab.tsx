import { cn } from "@nextui-org/react"
import { AnimatePresence, motion } from "framer-motion"

export const AnimationTab = ({ children, id, className }: { children: React.ReactNode, id: string, className?: string }) => {
    return (
        <AnimatePresence><motion.div
            key={id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: .2 }}
            className={cn("flex justify-center", className)}
        >
            {children}
        </motion.div></AnimatePresence>)
}