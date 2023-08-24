import { cn } from "@nextui-org/react"
import { AnimatePresence, motion } from "framer-motion"

export const AnimationTab = ({ children, key, className }: { children: React.ReactNode, key: string, className?: string }) => {
    return (
        <AnimatePresence><motion.div
            key={key}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: .2 }}
            className={cn("flex justify-center", className)}
        >
            {children}
        </motion.div></AnimatePresence>)
}