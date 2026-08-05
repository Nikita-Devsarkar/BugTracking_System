function StatsCard({ title, count, icon, type }) {

    const styles = {
        blue: {
            icon: "bg-blue-50 text-blue-600",
            number: "text-slate-800",
            accent: "bg-blue-500"
        },

        orange: {
            icon: "bg-amber-50 text-amber-600",
            number: "text-slate-800",
            accent: "bg-amber-500"
        },

        purple: {
            icon: "bg-violet-50 text-violet-600",
            number: "text-slate-800",
            accent: "bg-violet-500"
        },

        green: {
            icon: "bg-emerald-50 text-emerald-600",
            number: "text-slate-800",
            accent: "bg-emerald-500"
        }
    };

    const currentStyle = styles[type] || styles.blue;

    return (
        <div className="relative bg-white rounded-2xl border border-slate-200
                        shadow-sm p-5 overflow-hidden
                        hover:shadow-md hover:-translate-y-0.5
                        transition-all duration-200">

            {/* Small accent line */}
            <div
                className={`absolute left-0 top-0 bottom-0 w-1
                ${currentStyle.accent}`}
            ></div>

            <div className="flex items-center justify-between">

                {/* Text */}
                <div>

                    <p className="text-sm text-slate-500 font-medium">
                        {title}
                    </p>

                    <h2
                        className={`text-3xl font-bold mt-2
                        ${currentStyle.number}`}
                    >
                        {count}
                    </h2>

                </div>

                {/* Icon */}
                <div
                    className={`w-12 h-12 rounded-xl flex items-center
                    justify-center ${currentStyle.icon}`}
                >
                    {icon}
                </div>

            </div>

        </div>
    );
}

export default StatsCard;