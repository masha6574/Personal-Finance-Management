import { useState } from "react";
import { motion } from "framer-motion";

export default function CurvedTimeline() {
    const [hovered, setHovered] = useState(null);

    return (
        <div className="flex flex-col items-center mt-12 w-full">
            <h2 className="text-3xl font-bold mb-10">How It Works</h2>

            <div className="relative w-full max-w-5xl h-48">
                {/* SVG Sine Wave */}
                <svg width="600" height="200" viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 0 100 
                 Q 50 0, 100 100 
                 T 200 100 
                 T 300 100 
                 T 400 100 
                 T 500 100 
                 T 600 100"
                        stroke="blue" fill="none" stroke-width="3" />
                </svg>

                {/* Step 1: Sign Up */}
                <motion.div
                    className="absolute flex flex-col items-center"
                    style={{ left: "50px", top: "80px" }}
                    onMouseEnter={() => setHovered(1)}
                    onMouseLeave={() => setHovered(null)}
                >
                    <motion.div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg cursor-pointer" whileHover={{ scale: 1.2 }} />
                    <motion.div className="absolute w-40 p-3 bg-white text-center shadow-lg rounded-lg bottom-12"
                        animate={{ width: hovered === 1 ? 200 : 160, transition: { type: "spring", stiffness: 100, damping: 12 } }}>
                        <strong>Sign Up</strong>
                        <p className="text-sm">Create an account</p>
                        {hovered === 1 && <motion.p className="mt-2 text-xs text-gray-600" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Register using email or social login.</motion.p>}
                    </motion.div>
                </motion.div>

                {/* Step 2: Connect Bank */}
                <motion.div
                    className="absolute flex flex-col items-center"
                    style={{ left: "250px", top: "130px" }}
                    onMouseEnter={() => setHovered(2)}
                    onMouseLeave={() => setHovered(null)}
                >
                    <motion.div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg cursor-pointer" whileHover={{ scale: 1.2 }} />
                    <motion.div className="absolute w-40 p-3 bg-white text-center shadow-lg rounded-lg top-12"
                        animate={{ width: hovered === 2 ? 200 : 160, transition: { type: "spring", stiffness: 100, damping: 12 } }}>
                        <strong>Connect Bank</strong>
                        <p className="text-sm">Link your bank</p>
                        {hovered === 2 && <motion.p className="mt-2 text-xs text-gray-600" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Securely connect your bank account.</motion.p>}
                    </motion.div>
                </motion.div>

                {/* Step 3: Set Budget */}
                <motion.div
                    className="absolute flex flex-col items-center"
                    style={{ left: "450px", top: "80px" }}
                    onMouseEnter={() => setHovered(3)}
                    onMouseLeave={() => setHovered(null)}
                >
                    <motion.div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg cursor-pointer" whileHover={{ scale: 1.2 }} />
                    <motion.div className="absolute w-40 p-3 bg-white text-center shadow-lg rounded-lg bottom-12"
                        animate={{ width: hovered === 3 ? 200 : 160, transition: { type: "spring", stiffness: 100, damping: 12 } }}>
                        <strong>Set Budget</strong>
                        <p className="text-sm">Define financial goals</p>
                        {hovered === 3 && <motion.p className="mt-2 text-xs text-gray-600" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Customize your spending limits.</motion.p>}
                    </motion.div>
                </motion.div>

                {/* Step 4: Track Expenses */}
                <motion.div
                    className="absolute flex flex-col items-center"
                    style={{ left: "650px", top: "130px" }}
                    onMouseEnter={() => setHovered(4)}
                    onMouseLeave={() => setHovered(null)}
                >
                    <motion.div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg cursor-pointer" whileHover={{ scale: 1.2 }} />
                    <motion.div className="absolute w-40 p-3 bg-white text-center shadow-lg rounded-lg top-12"
                        animate={{ width: hovered === 4 ? 200 : 160, transition: { type: "spring", stiffness: 100, damping: 12 } }}>
                        <strong>Track Expenses</strong>
                        <p className="text-sm">Monitor spending</p>
                        {hovered === 4 && <motion.p className="mt-2 text-xs text-gray-600" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Track income and expenses in real-time.</motion.p>}
                    </motion.div>
                </motion.div>

                {/* Step 5: Save Money */}
                <motion.div
                    className="absolute flex flex-col items-center"
                    style={{ left: "850px", top: "80px" }}
                    onMouseEnter={() => setHovered(5)}
                    onMouseLeave={() => setHovered(null)}
                >
                    <motion.div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg cursor-pointer" whileHover={{ scale: 1.2 }} />
                    <motion.div className="absolute w-40 p-3 bg-white text-center shadow-lg rounded-lg bottom-12"
                        animate={{ width: hovered === 5 ? 200 : 160, transition: { type: "spring", stiffness: 100, damping: 12 } }}>
                        <strong>Save Money</strong>
                        <p className="text-sm">Optimize savings</p>
                        {hovered === 5 && <motion.p className="mt-2 text-xs text-gray-600" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Smart insights for better savings.</motion.p>}
                    </motion.div>
                </motion.div>

            </div>
        </div>
    );
}
