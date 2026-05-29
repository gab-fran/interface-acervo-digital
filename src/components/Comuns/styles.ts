export function cx(...classes: Array<string | false | null | undefined>): string {
    return classes.filter(Boolean).join(" ");
}

export const ui = {
    page: "bg-gray-200 flex-1 py-6 sm:py-10 px-3 sm:px-4 overflow-x-hidden",
    pageInner: "w-full max-w-[100rem] mx-auto",
    formInner: "w-full max-w-4xl mx-auto",
    card: "bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden",
    formCard: "bg-white border border-slate-200 rounded-xl shadow-xl p-5 sm:p-8 md:p-10",
    pageTitle: "text-3xl md:text-5xl lg:text-6xl font-bold text-slate-800 tracking-tight",
    pageSubtitle: "text-base md:text-xl text-gray-600",
    sectionTitle: "text-xl font-bold text-slate-700 flex items-center gap-2 border-b-2 border-blue-500 pb-2 w-fit",
    label: "block text-sm font-semibold text-slate-700 mb-2",
    input: "w-full min-w-0 px-4 py-3 border-2 border-slate-200 rounded-xl bg-white text-slate-700 placeholder:text-slate-400 outline-none transition-all focus:border-slate-600 focus:ring-4 focus:ring-slate-200 disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed",
    select: "w-full min-w-0 px-4 py-3 border-2 border-slate-200 rounded-xl bg-white text-slate-700 outline-none transition-all focus:border-slate-600 focus:ring-4 focus:ring-slate-200 disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed",
    readonlyInput: "w-full min-w-0 px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-100 text-slate-500 outline-none cursor-not-allowed",
    primaryButton: "w-full bg-slate-700 hover:bg-slate-800 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-700 flex items-center justify-center gap-2 text-base sm:text-lg",
    secondaryButton: "w-full bg-white text-slate-700 hover:bg-slate-50 border-2 border-slate-300 px-6 py-4 rounded-xl font-bold transition-all shadow-sm hover:shadow-md active:scale-[0.98] flex items-center justify-center gap-2 text-base sm:text-lg",
    headerActionButton: "w-full md:w-auto bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 font-semibold text-base md:text-lg active:scale-95",
    tableWrapper: "overflow-auto rounded-lg shadow-md max-w-[100rem] mx-auto bg-white mb-4 border border-slate-200",
    table: "w-full min-w-full md:min-w-[50rem] border-collapse bg-white",
    tableHeadCell: "bg-slate-700 text-white p-3 text-left font-semibold",
    tableHeadCellCenter: "bg-slate-700 text-white p-3 text-center font-semibold",
    tableCell: "p-3 text-gray-700",
    actionInfoButton: "flex-1 md:flex-none bg-sky-500 hover:bg-sky-600 text-white px-3 py-2 rounded-md shadow-sm transition-colors text-xs font-semibold flex items-center justify-center gap-1 active:scale-95",
    actionEditButton: "flex-1 md:flex-none bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md shadow-sm transition-colors text-xs font-semibold flex items-center justify-center gap-1 active:scale-95",
    actionDangerButton: "flex-1 md:flex-none bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md shadow-sm transition-colors text-xs font-semibold flex items-center justify-center gap-1 active:scale-95",
};
