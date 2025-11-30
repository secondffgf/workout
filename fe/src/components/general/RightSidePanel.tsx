import { motion, AnimatePresence } from "framer-motion";

export default function RightSidePanel({
  width = "w-96", // for example: w-80, w-96, w-[420px]
  panelContent = null,
  open = false,
  setOpen = (value:boolean) => {}
}) {

  return (
    <div className="relative z-10">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setOpen(false)}
            aria-hidden
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed top-0 right-0 h-full ${width} bg-white z-50 shadow-2xl border-l border-gray-200 flex flex-col`}
            role="dialog"
            aria-modal="true"
          >
            <header className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-medium">Admin Panel</h3>
            </header>

            <div className="p-8 flex-1 overflow-y-auto">
              {panelContent || (
                <div>
                  <p className="mb-2">Це права панель. Тут можна показувати налаштування, деталі елементів або навігацію.</p>
                  <p className="text-sm text-gray-600">Скрольте, щоб побачити більше контенту. Панель адаптивна та закривається при натисненні на оверлей або кнопку «Закрити».</p>
                </div>
              )}
            </div>

            <footer className="p-4 border-t">
              <button
                onClick={() => setOpen(false)}
                className="w-full rounded-md px-3 py-2 bg-gray-100 hover:bg-gray-200"
              >
                Close
              </button>
            </footer>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
